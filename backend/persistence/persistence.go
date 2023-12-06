package persistence

import (
	"database/sql"

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
