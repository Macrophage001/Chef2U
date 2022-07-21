import { IRules } from '../interfaces/IRules';
import { passwordRules } from './rules/passwordRules';
import { userNameRules } from './rules/userNameRules';
import { emailRules } from './rules/emailRules';

const isValid = (value: string, rules: IRules): [boolean, string[]] => {
    const ruleKeys = Object.keys(rules);
    const failedRules = [] as string[];
    for (const rule of ruleKeys) {
        if (!rules[rule as keyof IRules].regex.test(value)) {
            failedRules.push(rules[rule as keyof IRules].error);
        }
    }
    return [failedRules.length === 0, failedRules];
}

export const Validator = {
    validateUserName: (userName: string, rules: IRules = userNameRules) => isValid(userName, rules),
    validatePassword: (password: string, rules: IRules = passwordRules) => isValid(password, rules),
    validateEmail: (email: string) => isValid(email, emailRules),
}