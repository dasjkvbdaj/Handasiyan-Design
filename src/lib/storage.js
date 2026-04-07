const DB_NAME = 'HandasiyanDesignDB';
const DB_VERSION = 1;
const STORE_NAME = 'wizardState';

export const saveWizardState = async (step, designData) => {
    if (typeof window === 'undefined' || !window.indexedDB) return;
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                return resolve();
            }
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put({ step, designData }, 'current');
            
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        };
        
        request.onerror = () => reject(request.error);
    });
};

export const loadWizardState = async () => {
    if (typeof window === 'undefined' || !window.indexedDB) return null;
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                return resolve(null);
            }
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const getRequest = store.get('current');
            
            getRequest.onsuccess = () => resolve(getRequest.result || null);
            getRequest.onerror = () => reject(getRequest.error);
        };
        
        request.onerror = () => reject(request.error);
    });
};

export const clearWizardState = async () => {
    if (typeof window === 'undefined' || !window.indexedDB) return;
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                return resolve();
            }
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.delete('current');
            
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        };
        
        request.onerror = () => reject(request.error);
    });
};
