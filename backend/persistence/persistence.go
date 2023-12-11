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
	return db.RecordUsingEmail(user)
}

func SaveUserWithUsername(user *database.User) error {
	return db.RecordUsingUsername(user)
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func GetUser(username_or_email string) (*database.User, error) {
	user := &database.User{}
	var err error
	if strings.Contains(username_or_email, "@") {
		user, err = db.GetUserUsingEmail(username_or_email)
	} else {
		user, err = db.GetUserUsingUsername(username_or_email)
	}

	return user, err
}

// returns true if the given registration code is available.
func IsAvailableRegCode(reg_code string) bool {
	_, err := db.FindRegistrationCode(reg_code)
	return err == nil
}
