package persistence

import (
	"database/sql"

	"github.com/mrdcvlsc/homefinders/database"
)

var db database.I

func Initialize() error {
	db = &database.MariaDB{}
	return db.Connect()
}

func GetInstanceDB() *sql.DB {
	return db.GetInstance()
}
