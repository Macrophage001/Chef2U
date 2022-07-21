import { IRules } from "../../interfaces/IRules";

export const userNameRules: IRules = {
    length: {
        error: 'Username must be at least 6 characters long',
        regex: /^[a-zA-Z0-9_]+.{6,}$/g,
    },
}