// eslint-disable-next-line no-control-regex
const emailRx = /(?: [a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

const passwordRules = {
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
const strongPasswordRx = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/g

export const isValidEmail = (email: string): boolean => {
    return emailRx.test(email);
}

export const isValidPassword = (password: string): [boolean, string[]] => {
    const rules = Object.keys(passwordRules);
    const failedRules = [] as string[];
    for (const rule of rules) {
        if (!passwordRules[rule as keyof typeof passwordRules].regex.test(password)) {
            failedRules.push(passwordRules[rule as keyof typeof passwordRules].error);
        }
    }
    return [failedRules.length === 0, failedRules];
}