package database

import (
	"database/sql"
	"fmt"
	"log"
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
		log.Fatal(err)
		return err
	}

	pingErr := db.Instance.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
		return err
	}

	fmt.Println("Successfully connected to MariaDB!")
	return nil
}
