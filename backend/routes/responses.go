package routes

func response_registration_success() string {
	return "Registration successful"
}

func response_login_success() string {
	return "Login successful"
}

func response_already_logged_in() string {
	return "Already logged in"
}

func response_wrong_password() string {
	return "*Wrong password"
}

func response_user_not_found() string {
	return "*User not found"
}

func response_registration_code_not_found() string {
	return "*Unknown registration code"
}

func response_bad_request() string {
	return "*Bad request, body might be corrupted or maliciously altered"
}

func response_username_taken() string {
	return "*That username or email is taken"
}

func response_internal_server_error() string {
	return "*Internal server error"
}
