import { IRules } from "../../interfaces/IRules";

export const passwordRules: IRules = {
    length: {
        error: 'Password must be at least 8 characters long',
        regex: /^.{6,}$/,
    },
    containsUpperCase: {
        error: 'Password must contain at least one uppercase letter',
        regex: /(?=.*[A-Z])/,
    },
    containsNumber: {
        error: 'Password must contain at least one number',
        regex: /(?=.*[0-9])/,
    },
    containsSpecialCharacter: {
        error: 'Password must contain at least one special character',
        regex: /(?=.*[!@#$%^&*])/,
    },
};