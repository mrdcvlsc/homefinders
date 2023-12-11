package database

import (
	"database/sql"
)

type I interface {
	Connect() error
	GetInstance() *sql.DB
	InitializeTables() error

	RecordUsingEmail(*User) error
	RecordUsingUsername(*User) error

	GetUserUsingEmail(email string) (*User, error)
	GetUserUsingUsername(username string) (*User, error)

	FindRegistrationCode(reg_code string) (string, error)
}

/*
When creating a new account; if the user inputs an email during registration, the
`Username` attribute value will be the characters before the `@` of the provided email,
then the `Email` attribute value will be set to the provided (whole) email.

If instead the user provided a username (not an email) during registration, the `Email` attribute
will be left empty, and the `Username` attribute will be set to the provided username.
*/
type User struct {
	Id                int
	Username          string
	Email             string
	SaltedHashPasswrd string
	DateCreated       string
}

func NewUser(username, email, salted_hash_passwrd, data_created string) *User {
	return &User{
		Username:    username,
		Email:       salted_hash_passwrd,
		DateCreated: data_created,
	}
}
