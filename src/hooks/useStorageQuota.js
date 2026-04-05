import { useState, useEffect } from 'react';

export const useStorageQuota = () => {
  const [quotaState, setQuotaState] = useState({
    usage: 0,
    quota: 0,
    percentageLoaded: false,
    percentageUsed: 0,
    isNearlyFull: false, 
    isFull: false,
    error: null,
  });

  const checkQuota = async () => {
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        // Avoid division by zero
        if (estimate.quota > 0) {
          const percentageUsed = (estimate.usage / estimate.quota) * 100;
          
          setQuotaState({
            usage: estimate.usage,
            quota: estimate.quota,
            percentageLoaded: true,
            percentageUsed,
            isNearlyFull: percentageUsed > 90, // Trigger graceful degradation
            isFull: percentageUsed >= 99, // Trigger user warnings
            error: null,
          });
        }
      } catch (err) {
        setQuotaState(prev => ({ ...prev, error: err }));
      }
    }
  };

  const clearCacheStorage = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        // Re-check quota after clearing to confirm space freed
        await checkQuota();
        return true;
      } catch (err) {
        console.error("Failed to clear cache storage", err);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    // Check on mount
    checkQuota();
  }, []);

  return { ...quotaState, checkQuota, clearCacheStorage };
};
