import { tryCatch } from "./util";

/**
 * @description Returns the parsed object from the storage defined by type.
 * @param {string} storageType 
 * @param {string} key 
 * @returns any | undefined
 */
export const tryGetFromStorage = (storageType: string, key: string): any => {
    return tryCatch(() => {
        switch (storageType) {
            case 'session':
                return JSON.parse(sessionStorage.getItem(key) || '{}');
            case 'local':
                return JSON.parse(localStorage.getItem(key) || '{}');
            default:
                return undefined;
        }
    }, err => {
        console.log(`Could not get ${storageType} avatar for key: ${key}`, err);
    })();
}

/**
 * @description - Sets the stringified value of the key in the storage defined by storage type.
 * @param {string} storageType 
 * @param {string} key 
 * @param {*} value
 */
export const tryAddToStorage = (storageType: string, key: string, value: any): void => {
    return tryCatch(() => {
        switch (storageType) {
            case 'session':
                return sessionStorage.setItem(key, JSON.stringify(value));
            case 'local':
                return localStorage.setItem(key, JSON.stringify(value));
            default:
                return null;
        }
    }, err => {
        console.log(`Could not set ${storageType} avatar for key: ${key}`, err);
    })();
}

/**
 * @description - Removes the key from the storage defined by storage type.
 * @param {string} storageType 
 * @param {string} key 
 * @returns 
 */
export const tryRemoveFromStorage = (storageType: string, key: string): void => {
    return tryCatch(() => {
        switch (storageType) {
            case 'session':
                return sessionStorage.removeItem(key);
            case 'local':
                return localStorage.removeItem(key);
            default:
                return null;
        }
    }, err => {
        console.log(`Could not remove ${storageType} avatar for key: ${key}`, err);
    })();
}

/**
 * @description - Removes all keys from the storage defined by storage type.
 * @param {string} storageType 
 * @returns 
 */
export const tryClearStorage = (storageType: string): void => {
    return tryCatch(() => {
        switch (storageType) {
            case 'session':
                return sessionStorage.clear();
            case 'local':
                return localStorage.clear();
            default:
                return null;
        }
    }, err => {
        console.log(`Could not clear ${storageType}`, err);
    })();
}