import React, { useState, useEffect } from 'react';
import { useStorageQuota } from '../hooks/useStorageQuota';

/**
 * CloudinaryImage Component
 * 
 * Solves common issues with Cloudinary cached images:
 * 1. Ghost Images: Retries fetching by busting cache if it fails.
 * 2. Stale Assets: Injects dynamic version to bypass CDN headers.
 * 3. Storage Quota Hit: Degrades image quality gracefully if device storage is almost full.
 * 4. User Feedback: Detects QuotaExceededError conditions to alert the user.
 */
const CloudinaryImage = ({
  src,
  alt = '',
  className = '',
  version,
  maxRetries = 2,
  onStorageFull, // Callback for user feedback if full
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);
  const [showQuotaWarning, setShowQuotaWarning] = useState(false);

  // Use the storage quota hook
  const { isNearlyFull, isFull, clearCacheStorage } = useStorageQuota();

  // Helper to inject Cloudinary version
  const injectVersionInfo = (url, newVersion) => {
    if (!url) return url;
    const versionRegex = /\/v\d+\//;
    if (versionRegex.test(url)) {
      return url.replace(versionRegex, `/v${newVersion}/`);
    }
    const hasQuery = url.includes('?');
    return `${url}${hasQuery ? '&' : '?'}cb=${newVersion}`;
  };

  // Helper to gracefully downgrade image size/quality
  const applyGracefulDegradation = (url) => {
    if (!url) return url;

    // Check if Cloudinary URL already has 'upload' parameter we can hook into
    if (url.includes('/upload/')) {
      // By chaining w_300,q_auto:eco after /upload/, we force a low-res heavily compressed version
      // which has a much higher chance of fitting in limited Cache Storage limits
      return url.replace('/upload/', '/upload/w_300,q_auto:eco/');
    }
    return url;
  };

  useEffect(() => {
    let initialSrc = src;

    // 2. GRACEFUL DEGRADATION
    if (isNearlyFull || isFull) {
      initialSrc = applyGracefulDegradation(initialSrc);
    }

    if (version) {
      initialSrc = injectVersionInfo(initialSrc, version);
    }

    setImgSrc(initialSrc);
    setErrorCount(0);

    // Notify parent about critical quota limit for simple User Feedback message
    if (isFull && onStorageFull) {
      onStorageFull(true);
    }
  }, [src, version, isNearlyFull, isFull, onStorageFull]);

  const handleError = async (e) => {
    // 4. USER FEEDBACK via Quota Inference. 
    // If we fail loading an image AND our quota hook says we are full,
    // this is a very strong indicator of a QuotaExceededError in the browser 
    // trying to write the image blob to local disk/cache.
    if (isFull || (e?.name === 'QuotaExceededError')) {
      setShowQuotaWarning(true);

      // 3. CACHE CLEANUP: Optionally attempt to purge cache automatically to make room
      await clearCacheStorage();
    }

    if (errorCount < maxRetries) {
      const timestamp = new Date().getTime();
      let newSrc = injectVersionInfo(imgSrc, timestamp);

      // If we failed and are hitting quotas, definitely force graceful degradation
      if (isNearlyFull || isFull) {
        newSrc = applyGracefulDegradation(newSrc);
      }

      setImgSrc(newSrc);
      setErrorCount(prev => prev + 1);
    } else {
      console.warn(`Failed to load Cloudinary image after ${maxRetries} retries: ${src}`);
    }
  };

  return (
    <div className="relative inline-block w-full h-full">
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        {...props}
      />
      {/* Fallback User Feedback overlay if we hit the Quota error limit on this image */}
      {showQuotaWarning && errorCount >= maxRetries && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-2 text-center rounded">
          <span className="text-white text-xs font-semibold">
            Your device storage is full. Some images may not load.
          </span>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImage;
