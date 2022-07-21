import * as bcrypt from 'bcryptjs';

type TryCatchCallback = (...args: any[]) => any;
type TryCatchFunction = (...args: any[]) => any;

export const tryCatch = (fn: TryCatchCallback, fallback = (err: unknown) => console.error(err)): TryCatchFunction => {
    return (...args: any[]) => {
        try {
            return fn(...args)
        } catch (e) {
            return fallback(e)
        }
    }
}

export const generateUUID = (item: any): string => {
    return `${item.toString()}-${Date.now()}`;
}

export const encryptPassword = (password: string): any => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export class ArrayExtension extends Array {
    remove(...indices: any[]): any[] {
        const removeArrayElements = (arr: any[]) => {
            let copyArr = arr.slice();
            for (let i = 0; i < indices.length; i++) {
                copyArr.splice(indices[i], 1);
            }
            return copyArr;
        }
        return removeArrayElements(this);
    }
    deepCopy(): any[] {
        const deepCopyArray = (arr: any[]): any[] => {
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

export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

