package database

import (
	"database/sql"
)

/*
When creating a new account; if the user inputs an email during registration, the
`Username` attribute value will be the characters before the `@` of the provided email,
then the `Email` attribute value will be set to the provided (whole) email.

If instead the user provided a username (not an email) during registration, the `Email` attribute
will be left empty, and the `Username` attribute will be set to the provided username.
*/
type User struct {
	Id                int
	Username          string
	Email             string
	SaltedHashPasswrd string
	DateCreated       string
}

type PropertyImage struct {
	Id       int
	Url      string
	PublicID string
}

type Property struct {
	Id            int
	Region        string
	Province      string
	City          string
	Barangay      string
	StreetAddress string

	Description string
	Name        string
	Type        string
	Price       float32
	Storeys     int

	LivableAreaSQM float32
	GrossAreaSQM   float32
	LotLengthM     float32
	LotWidthM      float32

	LivingRoom     int
	Kitchen        int
	DiningRoom     int
	BathRoom       int
	Bedroom        int
	MastersBedroom int
	MaidRoom       int
	Toilet         int
	WalkInCloset   int
	Balcony        int
	Lanai          int
	CarPort        int

	SampleImagesURL []string
	FloorPlansURL   []string
}

type I interface {
	Connect() error
	GetInstance() *sql.DB
	InitializeTables() error

	SaveUserWithEmail(*User) error
	SaveUserWithUsername(*User) error

	GetUserWithEmail(email string) (*User, error)
	GetUserWithUsername(username string) (*User, error)

	FindRegCode(reg_code string) (string, error)

	SaveProperty(*Property) error
	EditProperty(*Property) error
	DeleteProperty(property_id int) error

	GetPropertyID(address string) (int, error)
	GetProperties(
		region, province, city, barangay, street_address string,

		property_name, property_type string, min_price, max_price float32, storeys int,

		livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m float32,

		living_room, kitchen, dining_room, bath_room int,
		bedroom, masters_bedroom, maid_room, toilet int,
		walk_in_closet, balcony, lanai, car_port int,
	) ([]Property, error)

	SaveImageData(associated_property_id int, cloudinary_url, cloudinary_img_id string) error
	GetImageSamples(associated_property_id int) ([]PropertyImage, error)
	GetImageFloorPlans(associated_property_id int) ([]PropertyImage, error)
	GetImageData(associated_property_id int) ([]PropertyImage, error)
	DeleteImageData(associated_property_id int) error
	DeleteImageSamples(associated_property_id int) error
	DeleteImageFloorPlans(associated_property_id int) error
}

func NewUser(username, email, salted_hash_passwrd, data_created string) *User {
	return &User{
		Username:    username,
		Email:       salted_hash_passwrd,
		DateCreated: data_created,
	}
}

func NewProperty(
	region, province, city, barangay, street_address string,

	description, name, property_type string, price float32, storeys int,

	livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m float32,

	living_room, kitchen, dining_room, bath_room int,
	bedroom, masters, maid_room, toilet int,
	walkincloset, balcony, lanai, carport int,
) *Property {
	return &Property{
		Region: region, Province: province, City: city, Barangay: barangay, StreetAddress: street_address,
		Description: description, Name: name, Type: property_type, Price: price, Storeys: storeys,
		LivableAreaSQM: livable_area_sqm, GrossAreaSQM: gross_area_sqm, LotLengthM: lot_length_m, LotWidthM: lot_width_m,
		LivingRoom: living_room, Kitchen: kitchen, DiningRoom: dining_room, BathRoom: bath_room,
		Bedroom: bedroom, MastersBedroom: masters, MaidRoom: maid_room, Toilet: toilet,
		WalkInCloset: walkincloset, Balcony: balcony, Lanai: lanai, CarPort: carport,
	}
}
