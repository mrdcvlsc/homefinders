package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

var database_instance *sql.DB

// Get a thread safe db instance `*sql.DB`.
func GetMariadbInstance() *sql.DB {
	return database_instance
}

// Initialize a thread safe db instance `*sql.DB`.
func InitializeMariaDB() {
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
	database_instance, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := database_instance.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
}
