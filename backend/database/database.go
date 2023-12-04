package database

import "database/sql"

type I interface {
	Connect() error
	GetInstance() *sql.DB
}

/*
When creating a new account; if the user inputs an email during registration, the
`Username` attribute value will be the characters before the `@` of the provided email,
then the `Email` attribute value will be set to the provided (whole) email.

If instead the user provided a username (not an email) during registration, the `Email` attribute
will be left empty, and the `Username` attribute will be set to the provided username.
*/
type User struct {
	Username string
	Email    string
	Password string
}
