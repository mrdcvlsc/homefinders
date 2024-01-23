package database

import (
	"database/sql"
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
		DBName:               os.Getenv("DATABASE"),
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

	log.Println("Successfully connected to MariaDB!")
	return nil
}

func (db *MariaDB) InitializeTables() error {
	// create registration code tble if it does not exist yet
	regcode_tbl_create_query :=
		`CREATE TABLE IF NOT EXISTS RegCodes (
			reg_code VARCHAR(10) UNIQUE NOT NULL
		)`

	if _, err := db.Instance.Exec(regcode_tbl_create_query); err != nil {
		return err
	}

	// create initial admin user
	if _, err := db.Instance.Exec(
		"INSERT INTO RegCodes (reg_code) VALUES (?)",
		"cafebabe03", // default code
	); err != nil {
		log.Print("\n\nDB INITIALIZATION LOG: an initial registration code is already existing\n\n")
	}

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

	// create property table if it's not created yet
	property_tbl_create_query :=
		`CREATE TABLE IF NOT EXISTS Properties (
			id INT AUTO_INCREMENT PRIMARY KEY,
			region VARCHAR(60) NOT NULL,
			province VARCHAR(30) NOT NULL,
			city VARCHAR(30) NOT NULL,
			barangay VARCHAR(60) NOT NULL,
			street_address VARCHAR(255) UNIQUE NOT NULL,
		
			property_description VARCHAR(400),
			property_name VARCHAR(25) NOT NULL,
			property_type VARCHAR(25) NOT NULL,
			property_price FLOAT NOT NULL,
			storeys INT(2) NOT NULL,
		
			livable_area_sqm FLOAT NOT NULL,
			gross_area_sqm FLOAT NOT NULL,
			lot_length_m FLOAT NOT NULL,
			lot_width_m FLOAT NOT NULL,
		
			living_room INT(2),
			kitchen INT(2),
			dining_room INT(2),
			bath_room INT(2),
			bedroom INT(2),
			masters_bedroom INT(2),
			maid_room INT(2),
			toilet INT(2),
			walk_in_closet INT(2),
			balcony INT(2),
			lanai INT(2),
			car_port INT(2)
		)`

	if _, err := db.Instance.Exec(property_tbl_create_query); err != nil {
		return err
	}

	// create image table if it's not created yet
	image_tbl_create_query :=
		`CREATE TABLE IF NOT EXISTS Images (
			id INT NOT NULL,
			image_url VARCHAR(255) UNIQUE NOT NULL,
			image_public_id VARCHAR(255) UNIQUE NOT NULL
		)`

	if _, err := db.Instance.Exec(image_tbl_create_query); err != nil {
		return err
	}

	// create recovery code table if it's not created yet
	recovery_codes_tbl_create_query :=
		`CREATE TABLE IF NOT EXISTS RecoveryCodes (
			code INT(4) NOT NULL,
			username VARCHAR(25) NOT NULL,
			date_issued DATETIME DEFAULT NOW()
		)`

	if _, err := db.Instance.Exec(recovery_codes_tbl_create_query); err != nil {
		return err
	}

	return nil
}

func (db *MariaDB) SaveUserWithEmail(user *User) error {
	_, err := db.Instance.Exec(
		"INSERT INTO Users (username, email, salted_hash_passwrd) VALUES (?, ?, ?)",
		user.Username,
		user.Email,
		user.SaltedHashPasswrd,
	)
	return err
}

func (db *MariaDB) SaveUserWithUsername(user *User) error {
	_, err := db.Instance.Exec(
		"INSERT INTO Users (username, salted_hash_passwrd) VALUES (?, ?)",
		user.Username,
		user.SaltedHashPasswrd,
	)
	return err
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func (db *MariaDB) GetUserWithEmail(email string) (*User, error) {
	user := &User{}

	row := db.Instance.QueryRow("SELECT * FROM Users WHERE email = ?", email)
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.SaltedHashPasswrd, &user.DateCreated)
	return user, err
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func (db *MariaDB) GetUserWithUsername(username string) (*User, error) {
	user := &User{}

	row := db.Instance.QueryRow("SELECT id, username, salted_hash_passwrd, date_created FROM Users WHERE username = ?", username)
	err := row.Scan(&user.Id, &user.Username, &user.SaltedHashPasswrd, &user.DateCreated)
	return user, err
}

func (db *MariaDB) EditUserPassword(username, new_password_hash string) error {
	_, err := db.Instance.Exec(
		`UPDATE Users SET salted_hash_passwrd = ? WHERE username = ?`,
		new_password_hash, username,
	)

	return err
}

// test with `err == sql.ErrNoRows`, if true user not found, else internal server error
func (db *MariaDB) FindRegCode(reg_code string) (string, error) {
	var read_reg_code string

	row := db.Instance.QueryRow("SELECT reg_code FROM RegCodes WHERE reg_code = ?", reg_code)
	err := row.Scan(&read_reg_code)
	return read_reg_code, err
}

func (db *MariaDB) SaveProperty(property *Property) error {
	_, err := db.Instance.Exec(
		`INSERT INTO Properties (
			region, province, city, barangay, street_address,
			property_description, property_name, property_type, property_price, storeys,
			livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m,
			living_room, kitchen, dining_room, bath_room,
			bedroom, masters_bedroom, maid_room, toilet,
			walk_in_closet, balcony, lanai, car_port
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		property.Region, property.Province, property.City, property.Barangay, property.StreetAddress,
		property.Description, property.Name, property.Type, property.Price, property.Storeys,
		property.LivableAreaSQM, property.GrossAreaSQM, property.LotLengthM, property.LotWidthM,
		property.LivingRoom, property.Kitchen, property.DiningRoom, property.BathRoom,
		property.Bedroom, property.MastersBedroom, property.MaidRoom, property.Toilet,
		property.WalkInCloset, property.Balcony, property.Lanai, property.CarPort,
	)
	return err
}

func (db *MariaDB) EditProperty(property *Property) error {
	_, err := db.Instance.Exec(
		`UPDATE Properties SET
			region = ?, province = ?, city = ?, barangay = ?, street_address = ?,
			property_description = ?, property_name = ?, property_type = ?, property_price = ?, storeys = ?,
			livable_area_sqm = ?, gross_area_sqm = ?, lot_length_m = ?, lot_width_m = ?,
			living_room = ?, kitchen = ?, dining_room = ?, bath_room = ?,
			bedroom = ?, masters_bedroom = ?, maid_room = ?, toilet = ?,
			walk_in_closet = ?, balcony = ?, lanai = ?, car_port = ?
		WHERE id = ?`,
		property.Region, property.Province, property.City, property.Barangay, property.StreetAddress,
		property.Description, property.Name, property.Type, property.Price, property.Storeys,
		property.LivableAreaSQM, property.GrossAreaSQM, property.LotLengthM, property.LotWidthM,
		property.LivingRoom, property.Kitchen, property.DiningRoom, property.BathRoom,
		property.Bedroom, property.MastersBedroom, property.MaidRoom, property.Toilet,
		property.WalkInCloset, property.Balcony, property.Lanai, property.CarPort, property.Id,
	)

	return err
}

func (db *MariaDB) GetPropertyID(address string) (int, error) {
	var id int

	row := db.Instance.QueryRow("SELECT id FROM Properties WHERE street_address = ?", address)
	err := row.Scan(&id)
	return id, err
}

func (db *MariaDB) GetProperties(
	region, province, city, barangay, street_address string,

	property_name, property_type string, min_price, max_price float32, storeys int,

	livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m float32,

	living_room, kitchen, dining_room, bath_room int,
	bedroom, masters_bedroom, maid_room, toilet int,
	walk_in_closet, balcony, lanai, car_port int,
) ([]Property, error) {
	properties := make([]Property, 0)

	query := `SELECT * FROM Properties WHERE
		region LIKE CONCAT('%', ?, '%') AND
		province LIKE CONCAT('%', ?, '%') AND
		city LIKE CONCAT('%', ?, '%') AND
		barangay LIKE CONCAT('%', ?, '%') AND
		street_address LIKE CONCAT('%', ?, '%') AND
		property_name LIKE CONCAT('%', ?, '%') AND
		property_type LIKE CONCAT('%', ?, '%') AND
		property_price >= ? AND property_price <= ? AND
		livable_area_sqm >= ? AND
		gross_area_sqm >= ? AND
		lot_length_m >= ? AND
		lot_width_m >= ? AND
		living_room >= ? AND
		kitchen >= ? AND
		dining_room >= ? AND
		bath_room >= ? AND
		bedroom >= ? AND
		masters_bedroom >= ? AND
		maid_room >= ? AND
		toilet >= ? AND
		walk_in_closet >= ? AND
		balcony >= ? AND
		lanai >= ? AND
		car_port >= ?
	`

	var rows *sql.Rows
	var queryErr error

	if storeys > -1 {
		query += " AND storeys = ?"

		rows, queryErr = db.Instance.Query(query,
			region, province, city, barangay, street_address,
			property_name, property_type, min_price, max_price,
			livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m,
			living_room, kitchen, dining_room, bath_room,
			bedroom, masters_bedroom, maid_room, toilet,
			walk_in_closet, balcony, lanai, car_port, storeys,
		)
	} else {
		rows, queryErr = db.Instance.Query(query,
			region, province, city, barangay, street_address,
			property_name, property_type, min_price, max_price,
			livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m,
			living_room, kitchen, dining_room, bath_room,
			bedroom, masters_bedroom, maid_room, toilet,
			walk_in_closet, balcony, lanai, car_port,
		)
	}

	if queryErr != nil {
		return nil, queryErr
	}

	defer rows.Close()

	for rows.Next() {
		var rp Property
		if err := rows.Scan(
			&rp.Id,
			&rp.Region, &rp.Province, &rp.City, &rp.Barangay,
			&rp.StreetAddress,
			&rp.Description,
			&rp.Name, &rp.Type, &rp.Price, &rp.Storeys,
			&rp.LivableAreaSQM, &rp.GrossAreaSQM, &rp.LotLengthM, &rp.LotWidthM,
			&rp.LivingRoom, &rp.Kitchen, &rp.DiningRoom, &rp.BathRoom,
			&rp.Bedroom, &rp.MastersBedroom, &rp.MaidRoom, &rp.Toilet,
			&rp.WalkInCloset, &rp.Balcony, &rp.Lanai, &rp.CarPort,
		); err != nil {
			return properties, err
		}

		/////////////// get sample images ///////////////

		sampleImgRows, sampleImgQueryErr := db.Instance.Query(
			"SELECT * FROM Images WHERE id = ? AND image_public_id LIKE CONCAT('%', ?, '%')", rp.Id, "sample-image",
		)

		if sampleImgQueryErr != nil {
			log.Print(sampleImgQueryErr)
			continue
		}

		for sampleImgRows.Next() {
			var propertyImage PropertyImage
			if err := sampleImgRows.Scan(&propertyImage.Id, &propertyImage.Url, &propertyImage.PublicID); err != nil {
				log.Print(err)
				break
			}
			rp.SampleImagesURL = append(rp.SampleImagesURL, propertyImage.Url)
		}

		/////////////// get floor plan images ///////////////

		floorPlanRows, floorPlanQueryErr := db.Instance.Query(
			"SELECT * FROM Images WHERE id = ? AND image_public_id LIKE CONCAT('%', ?, '%')", rp.Id, "floor-plan",
		)

		if floorPlanQueryErr != nil {
			log.Print(floorPlanQueryErr)
			continue
		}

		for floorPlanRows.Next() {
			var floorPlanImage PropertyImage
			if err := floorPlanRows.Scan(&floorPlanImage.Id, &floorPlanImage.Url, &floorPlanImage.PublicID); err != nil {
				log.Print(err)
				break
			}

			rp.FloorPlansURL = append(rp.FloorPlansURL, floorPlanImage.Url)
		}

		//////////////////////////////////////////////////////

		properties = append(properties, rp)
	}

	if err := rows.Err(); err != nil {
		return properties, err
	}

	return properties, nil
}

func (db *MariaDB) SaveImageData(associated_property_id int, cloudinary_url, cloudinary_img_id string) error {
	_, err := db.Instance.Exec(
		"INSERT INTO Images (id, image_url, image_public_id) VALUES (?, ?, ?)",
		associated_property_id,
		cloudinary_url,
		cloudinary_img_id,
	)
	return err
}

func (db *MariaDB) GetImageData(associated_property_id int) ([]PropertyImage, error) {
	property_images := []PropertyImage{}

	rows, err := db.Instance.Query(
		"SELECT * FROM Images WHERE id = ?", associated_property_id,
	)

	if err != nil {
		return property_images, err
	}

	for rows.Next() {
		var read_image PropertyImage
		if err := rows.Scan(&read_image.Id, &read_image.Url, &read_image.PublicID); err != nil {
			return property_images, err
		}

		property_images = append(property_images, read_image)
	}

	return property_images, nil
}

func (db *MariaDB) GetImageSamples(associated_property_id int) ([]PropertyImage, error) {
	property_images := []PropertyImage{}

	rows, err := db.Instance.Query(
		"SELECT * FROM Images WHERE id = ? AND image_public_id LIKE CONCAT('%', ?, '%')", associated_property_id, "sample-image",
	)

	if err != nil {
		return property_images, err
	}

	for rows.Next() {
		var read_image PropertyImage
		if err := rows.Scan(&read_image.Id, &read_image.Url, &read_image.PublicID); err != nil {
			return property_images, err
		}

		property_images = append(property_images, read_image)
	}

	return property_images, nil
}

func (db *MariaDB) GetImageFloorPlans(associated_property_id int) ([]PropertyImage, error) {
	property_images := []PropertyImage{}

	rows, err := db.Instance.Query(
		"SELECT * FROM Images WHERE id = ? AND image_public_id LIKE CONCAT('%', ?, '%')", associated_property_id, "floor-plan",
	)

	if err != nil {
		return property_images, err
	}

	for rows.Next() {
		var read_image PropertyImage
		if err := rows.Scan(&read_image.Id, &read_image.Url, &read_image.PublicID); err != nil {
			return property_images, err
		}

		property_images = append(property_images, read_image)
	}

	return property_images, nil
}

func (db *MariaDB) DeleteImageData(associated_property_id int) error {
	_, err := db.Instance.Exec(
		"DELETE FROM Images WHERE id = ?", associated_property_id,
	)

	return err
}

func (db *MariaDB) DeleteImageSamples(associated_property_id int) error {
	_, err := db.Instance.Exec(
		"DELETE FROM Images WHERE id = ? AND image_public_id LIKE CONCAT('%', ?, '%')", associated_property_id, "sample-image",
	)

	return err
}

func (db *MariaDB) DeleteImageFloorPlans(associated_property_id int) error {
	_, err := db.Instance.Exec(
		"DELETE FROM Images WHERE id = ? AND image_public_id LIKE CONCAT('%', ?, '%')", associated_property_id, "floor-plan",
	)

	return err
}

func (db *MariaDB) DeleteProperty(property_id int) error {
	_, err := db.Instance.Exec(
		"DELETE FROM Properties WHERE id = ?", property_id,
	)

	return err
}

func (db *MariaDB) SaveRecoveryCode(recovery_code *RecoveryCode) error {
	_, err := db.Instance.Exec(
		"INSERT INTO RecoveryCodes (code, username) VALUES (?, ?)",
		&recovery_code.Code,
		&recovery_code.Username,
	)
	return err
}

func (db *MariaDB) GetLatestRecoveryCode(username string) (*RecoveryCode, error) {
	recovery_code := &RecoveryCode{}

	latest_recovery_code := db.Instance.QueryRow(
		"SELECT * FROM RecoveryCodes WHERE username = ? ORDER BY date_issued DESC LIMIT 1",
		username,
	)

	err := latest_recovery_code.Scan(&recovery_code.Code, &recovery_code.Username, &recovery_code.DateIssued)
	return recovery_code, err
}
