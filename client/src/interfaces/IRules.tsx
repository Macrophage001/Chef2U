export interface IRules {
    [key: string]: {
        error: string,
        regex: RegExp,
    };
}