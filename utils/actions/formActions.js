import {
    validateString,
    validateEmail,
    validatePassword
} from '../ValidationConstraints'

export const validateInput = (inputId, inputValue) => {
    switch (inputId) {
        case 'fullName':
            return validateString(inputId, inputValue);

        case 'email':
            return validateEmail(inputId, inputValue);

        case 'password':
        case 'confirmPassword':
            return validatePassword(inputId, inputValue);

        case 'resetToken':
            return validateString(inputId, inputValue);

        default:
            // Handle unknown inputId or return a default validation
            return true;
    }
}