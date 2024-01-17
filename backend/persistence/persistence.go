package persistence

import (
	"database/sql"
	"strings"

	"github.com/mrdcvlsc/homefinders/database"
)

var db database.I

func Initialize() error {
	db = &database.MariaDB{}

	if err := db.Connect(); err != nil {
		return err
	}

	if err := db.InitializeTables(); err != nil {
		return err
	}

	return nil
}

func GetInstanceDB() *sql.DB {
	return db.GetInstance()
}

func SaveUserWithEmail(user *database.User) error {
	return db.SaveUserWithEmail(user)
}

func SaveUserWithUsername(user *database.User) error {
	return db.SaveUserWithUsername(user)
}

func SaveProperty(property *database.Property) error {
	return db.SaveProperty(property)
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func GetUser(username_or_email string) (*database.User, error) {
	user := &database.User{}
	var err error
	if strings.Contains(username_or_email, "@") {
		user, err = db.GetUserWithEmail(username_or_email)
	} else {
		user, err = db.GetUserWithUsername(username_or_email)
	}

	return user, err
}

// returns true if the given registration code is available.
func IsValidRegCode(reg_code string) bool {
	_, err := db.FindRegCode(reg_code)
	return err == nil
}
