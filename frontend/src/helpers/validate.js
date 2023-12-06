const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^[a-zA-Z0-9!#$%^&*_.+-]+$/

// Password should contain at least 1 lowercase and uppercase letter each, 1 number and 1 special character
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/

export function validateForm(username, password, retyped_password = null) {
    const form_errors = {}

    if (!username) {
        form_errors.username = '*Email or Username is required'
    } else if (username.includes('@') && username.length < 4) {
        form_errors.username = "*Minimum email characters is 4"
    } else if (username.includes('@') && username.length > 254) {
        form_errors.username = "*RFC 2821 violation, maximum email characters is 254"
    } else if (username.includes('@') && !EMAIL_REGEX.test(username)) {
        form_errors.username = "*Invalid email format or might contain invalid characters"
    } else if (!username.includes('@') && !USERNAME_REGEX.test(username)) {
        form_errors.username = "*Only alphanumeric characters and !#$%^&*_.+- are allowed"
    } else if (!username.includes('@') && username.length > 25) {
        form_errors.username = "*Invalid username, maximum username characters is 25"
    }

    if (!password) {
        form_errors.password = '*Password is required'
    } else if (password.length < 8) {
        form_errors.password = '*Password requires to be at least 8 characters long'
    } else if (password.length > 64) {
        form_errors.password = '*Password requires to be less than 65 characters long'
    }

    if (retyped_password !== null) {
      if (password && !retyped_password) {
        form_errors.retyped = '*Retyped password is required'
      } else if (password && retyped_password !== password) {
          form_errors.retyped = '*Re-typed password mismatched'
      }
    }

    return form_errors
}