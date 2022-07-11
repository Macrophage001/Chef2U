export const tryCatch = (fn, fallback = (err) => console.error(err)) => {
    return (...args) => {
        try {
            return fn(...args)
        } catch (e) {
            return fallback(e)
        }
    }
}

export const generateUUID = (item) => {
    return `${item.toString()}-${Date.now}`
}

export class ArrayExtension extends Array {
    remove(...indices) {
        const removeArrayElements = (arr) => {
            let copyArr = arr.slice();
            for (let i = 0; i < indices.length; i++) {
                copyArr.splice(indices[i], 1);
            }
            return copyArr;
        }
        return removeArrayElements(this);
    }
    deepCopy() {
        const deepCopyArray = (arr) => {
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (typeof arr[i] === 'object') {
                    newArr[i] = deepCopyArray(arr[i]);
                } else {
                    newArr[i] = arr[i];
                }
            }
            return newArr;
        }
        return deepCopyArray(this);
    }
}

export const currencyFormat = (new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})).format;

export const trace = (message, fn) => {
    console.log(message);
    return fn();
}

export const getAvatar = (user, onAvatarFound) => {
    const axios = require('axios');
    tryCatch(async () => {
        if (user) {
            // console.log('User received: ', user);
            const response = await axios.get(`/api/account/avatar?userId=${user._id}`);
            console.log("Avatar Response Data: ", response.data);
            onAvatarFound(response.data);
            // onAvatarFound(response.data);
        }
    })();
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

