const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^[a-zA-Z0-9!#$%^&*_.+-]+$/

// Password should contain at least 1 lowercase and uppercase letter each, 1 number and 1 special character
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/

const REGCODE_REGEX = /^[a-f0-9]+$/

export function validateForm(username, password, retyped_password, registration_code) {
    const form_catch = {}

    if (!username) {
        form_catch.invalidUsername = '*Email or Username is required'
    } else if (username.includes('@') && username.length < 4) {
        form_catch.invalidUsername = "*Minimum of 4 characters"
    } else if (username.includes('@') && username.length > 254) {
        form_catch.invalidUsername = "*RFC2821, maximum of 254 characters"
    } else if (username.includes('@') && !EMAIL_REGEX.test(username)) {
        form_catch.invalidUsername = "*Invalid email format"
    } else if (!username.includes('@') && !USERNAME_REGEX.test(username)) {
        form_catch.invalidUsername = "*Alphanumeric characters and !#$%^&*_.+- only"
    } else if (!username.includes('@') && username.length > 25) {
        form_catch.invalidUsername = "*Maximum of 25 characters"
    }

    if (!password) {
        form_catch.invalidPassword = '*Password required'
    } else if (password.length < 8) {
        form_catch.invalidPassword = '*Minimum of 8 characters'
    } else if (password.length > 64) {
        form_catch.invalidPassword = '*Maximum of 65 characters'
    }

    if (retyped_password !== null) {
        if (password && !retyped_password) {
            form_catch.passwordMismatched = '*Retyped password is required'
        } else if (password && retyped_password !== password) {
            form_catch.passwordMismatched = '*Re-typed password mismatched'
        }
    }

    if (registration_code !== null) {
        if (registration_code.length != 10) {
            form_catch.registrationCodeInvalidLength = '*Registration code needs to be 10 characters'
        } else if (!REGCODE_REGEX.test(registration_code)) {
            form_catch.registrationCodeInvalidLength = '*Allowed characters are only "a" to "f" and "0" to "9"'
        }
    }

    return form_catch
}