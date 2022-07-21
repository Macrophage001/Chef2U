import { IRules } from '../interfaces/IRules';
import { passwordRules } from './rules/passwordRules';
import { userNameRules } from './rules/userNameRules';
import { emailRules } from './rules/emailRules';

type ValidityResults = [boolean, string[]];

const isValid = (value: string, rules: IRules): ValidityResults => {
    const ruleKeys = Object.keys(rules);
    const failedRules = [] as string[];
    for (const rule of ruleKeys) {
        if (!rules[rule as keyof IRules].regex.test(value) || !rules[rule as keyof IRules].condition?.(value)) {
            failedRules.push(rules[rule as keyof IRules].error);
        }
    }
    return [failedRules.length === 0, failedRules];
}

interface IValidator {
    [key: string]: (value: string, rules: IRules) => [boolean, string[]];
}

export const Validator: IValidator = {
    validateUserName: (userName: string, rules: IRules = userNameRules) => isValid(userName, rules),
    validatePassword: (password: string, rules: IRules = passwordRules) => isValid(password, rules),
    validateEmail: (email: string) => isValid(email, emailRules),
}