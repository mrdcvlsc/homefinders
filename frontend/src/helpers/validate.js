const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/

// Password should contain at least 1 lowercase and uppercase letter each, 1 number and 1 special character
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/

export function validateForm(username, password, retyped_password = null) {
  const form_errors = {}

  if (!username) {
      form_errors.username = '*Email or Username is required'
  } else if (username.includes('@') && !EMAIL_REGEX.test(username)) {
      form_errors.username = "*Invalid Email"
  } else if (!username.includes('@') && !USERNAME_REGEX.test(username)) {
      form_errors.username = "*Invalid Username"
  }

  if (!password) {
      form_errors.password = '*Password is required'
  } else if (password.length < 8) {
      form_errors.password = '*Password length is too short'
  }

  if (retyped_password !== null) {
    if (password && !retyped_password) {
      form_errors.retyped = '*Retyped Password is required'
    } else if (password && retyped_password !== password) {
        form_errors.retyped = '*Re-typed Password mismatched'
    }
  }

  return form_errors
}