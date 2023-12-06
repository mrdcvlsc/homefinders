package database

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/go-sql-driver/mysql"
)

type MariaDB struct {
	Instance *sql.DB
}

func (db *MariaDB) GetInstance() *sql.DB {
	return db.Instance
}

// Initialize a thread safe db instance `*sql.DB`.
func (db *MariaDB) Connect() error {
	// Capture connection properties.
	cfg := mysql.Config{
		AllowNativePasswords: true,
		User:                 os.Getenv("DBUSER"),
		Passwd:               os.Getenv("DBPASS"),
		Net:                  os.Getenv("PROTOCOL"),
		Addr:                 os.Getenv("DBADDRES"),
		DBName:               "golangdb",
	}

	// Get a database handle.
	var err error
	db.Instance, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		return err
	}

	pingErr := db.Instance.Ping()
	if pingErr != nil {
		return err
	}

	fmt.Println("Successfully connected to MariaDB!")
	return nil
}

func (db *MariaDB) InitializeTables() error {
	// create users table if it is not created yet
	user_tbl_create_query :=
		`CREATE TABLE IF NOT EXISTS Users (
			id INT AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(25) UNIQUE NOT NULL,
			email VARCHAR(254) UNIQUE,
			salted_hash_passwrd VARCHAR(72) NOT NULL,
			date_created DATETIME NOT NULL
		)`

	if _, err := db.Instance.Exec(user_tbl_create_query); err != nil {
		return err
	}

	return nil
}
