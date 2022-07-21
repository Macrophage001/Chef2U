/**
 * @description Interface for designing an array of rule objects in order for the validation to succeed.
 */
export interface IRules {
    [key: string]: {
        error: string,
        regex: RegExp,
        condition?: (value: any) => boolean
    };
}