import { tryCatch } from "./util";

export const tryGetFromStorage = (storageType, key) => {
    return tryCatch(() => {
        switch (storageType) {
            case 'session':
                return JSON.parse(sessionStorage.getItem(key));
            case 'local':
                return JSON.parse(localStorage.getItem(key));
            default:
                return null;
        }
    }, err => {
        console.log(`Could not get ${storageType} avatar for key: ${key}`, err);
    })();
}
export const tryAddToStorage = (storageType, key, value) => {
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
export const tryRemoveFromStorage = (storageType, key) => {
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
export const tryClearStorage = (storageType) => {
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