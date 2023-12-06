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
			date_created DATETIME DEFAULT NOW()
		)`

	if _, err := db.Instance.Exec(user_tbl_create_query); err != nil {
		return err
	}

	return nil
}

func (db *MariaDB) RecordUsingEmail(user *User) error {
	_, err := db.Instance.Exec(
		"INSERT INTO Users (username, email, salted_hash_passwrd) VALUES (?, ?, ?)",
		user.Username,
		user.Email,
		user.SaltedHashPasswrd,
	)
	return err
}

func (db *MariaDB) RecordUsingUsername(user *User) error {
	_, err := db.Instance.Exec(
		"INSERT INTO Users (username, salted_hash_passwrd) VALUES (?, ?)",
		user.Username,
		user.SaltedHashPasswrd,
	)
	return err
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func (db *MariaDB) GetUserUsingEmail(email string) (*User, error) {
	user := &User{}

	row := db.Instance.QueryRow("SELECT * FROM Users WHERE email = ?", email)
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.SaltedHashPasswrd, &user.DateCreated)
	return user, err
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func (db *MariaDB) GetUserUsingUsername(username string) (*User, error) {
	user := &User{}

	row := db.Instance.QueryRow("SELECT id, username, salted_hash_passwrd, date_created FROM Users WHERE username = ?", username)
	err := row.Scan(&user.Id, &user.Username, &user.SaltedHashPasswrd, &user.DateCreated)
	return user, err
}
