package persistence

import (
	"database/sql"
	"os"
	"strings"

	"github.com/mrdcvlsc/homefinders/database"
)

var db database.I

func Initialize() error {
	backend := os.Getenv("DB_BACKEND")
	if backend == "mongodb" {
		db = &database.MongoDB{}
	} else {
		db = &database.MariaDB{}
	}

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

func EditUserPassword(username, new_password_hash string) error {
	return db.EditUserPassword(username, new_password_hash)
}

func SaveProperty(property *database.Property) error {
	return db.SaveProperty(property)
}

func DeleteProperty(property_id int) error {
	return db.DeleteProperty(property_id)
}

func EditProperty(property *database.Property) error {
	return db.EditProperty(property)
}

func SaveImageData(associated_property_id int, cloudinary_url, cloudinary_img_id string) error {
	return db.SaveImageData(associated_property_id, cloudinary_url, cloudinary_img_id)
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

func GetPropertyID(address string) (int, error) {
	return db.GetPropertyID(address)
}

func GetProperties(
	region, province, city, barangay, street_address string,

	property_name, property_type string, min_price, max_price float32, storeys int,

	livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m float32,

	living_room, kitchen, dining_room, bath_room int,
	bedroom, masters_bedroom, maid_room, toilet int,
	walk_in_closet, balcony, lanai, car_port int,
) ([]database.Property, error) {
	return db.GetProperties(
		region, province, city, barangay, street_address,
		property_name, property_type, min_price, max_price, storeys,
		livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m,
		living_room, kitchen, dining_room, bath_room,
		bedroom, masters_bedroom, maid_room, toilet,
		walk_in_closet, balcony, lanai, car_port,
	)
}

// returns true if the given registration code is available.
func IsValidRegCode(reg_code string) bool {
	_, err := db.FindRegCode(reg_code)
	return err == nil
}

func GetImageData(associated_property_id int) ([]database.PropertyImage, error) {
	return db.GetImageData(associated_property_id)
}

func GetImageSamples(associated_property_id int) ([]database.PropertyImage, error) {
	return db.GetImageSamples(associated_property_id)
}

func GetImageFloorPlans(associated_property_id int) ([]database.PropertyImage, error) {
	return db.GetImageFloorPlans(associated_property_id)
}

func DeleteImageData(associated_property_id int) error {
	return db.DeleteImageData(associated_property_id)
}

func DeleteImageSamples(associated_property_id int) error {
	return db.DeleteImageSamples(associated_property_id)
}

func DeleteImageFloorPlans(associated_property_id int) error {
	return db.DeleteImageFloorPlans(associated_property_id)
}

func SaveRecoveryCode(recovery_code *database.RecoveryCode) error {
	return db.SaveRecoveryCode(recovery_code)
}

func GetLatestRecoveryCode(username string) (*database.RecoveryCode, error) {
	return db.GetLatestRecoveryCode(username)
}
