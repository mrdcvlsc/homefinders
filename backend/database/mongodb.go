package database

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"net/url"
	"os"
	"regexp"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB struct {
	Client        *mongo.Client
	Database      *mongo.Database
	users         *mongo.Collection
	regCodes      *mongo.Collection
	properties    *mongo.Collection
	images        *mongo.Collection
	recoveryCodes *mongo.Collection
	counters      *mongo.Collection
}

func (db *MongoDB) GetInstance() *sql.DB {
	return nil
}

func (db *MongoDB) Connect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		return errors.New("MONGODB_URI is not set")
	}

	clientOpts := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		return err
	}

	// Verify connection
	if err := client.Ping(ctx, nil); err != nil {
		return err
	}

	// Determine DB name: prefer URI path, fallback to env var
	var dbName string
	if parsed, err := url.Parse(uri); err == nil {
		dbName = strings.TrimPrefix(parsed.Path, "/")
	}
	if dbName == "" {
		dbName = os.Getenv("MONGODB_DATABASE")
	}
	if dbName == "" {
		return errors.New("database name not provided: set it in the URI path (mongodb://host:port/yourdb) or via MONGODB_DATABASE")
	}

	db.Client = client
	db.Database = client.Database(dbName)
	db.users = db.Database.Collection("Users")
	db.regCodes = db.Database.Collection("RegCodes")
	db.properties = db.Database.Collection("Properties")
	db.images = db.Database.Collection("Images")
	db.recoveryCodes = db.Database.Collection("RecoveryCodes")
	db.counters = db.Database.Collection("counters")

	log.Println("Successfully connected to MongoDB!")
	return nil
}

func (db *MongoDB) InitializeTables() error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	// Users indexes: unique username, unique email (partial)
	_, _ = db.users.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{
			Keys:    bson.D{{Key: "username", Value: 1}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys:    bson.D{{Key: "email", Value: 1}},
			Options: options.Index().SetUnique(true).SetPartialFilterExpression(bson.D{{Key: "email", Value: bson.D{{Key: "$exists", Value: true}}}}),
		},
	})

	// RegCodes unique reg_code
	_, _ = db.regCodes.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys:    bson.D{{Key: "reg_code", Value: 1}},
		Options: options.Index().SetUnique(true),
	})

	// Properties unique street_address and unique numeric id
	_, _ = db.properties.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: bson.D{{Key: "street_address", Value: 1}}, Options: options.Index().SetUnique(true)},
		{Keys: bson.D{{Key: "id", Value: 1}}, Options: options.Index().SetUnique(true)},
	})

	// Images unique image_url and image_public_id
	_, _ = db.images.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: bson.D{{Key: "image_url", Value: 1}}, Options: options.Index().SetUnique(true)},
		{Keys: bson.D{{Key: "image_public_id", Value: 1}}, Options: options.Index().SetUnique(true)},
	})

	// RecoveryCodes index on username + date_issued for sorting
	_, _ = db.recoveryCodes.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{{Key: "username", Value: 1}, {Key: "date_issued", Value: -1}},
	})

	// Initialize counters document for Properties if not exists
	_, _ = db.counters.UpdateByID(ctx, "Properties", bson.D{{Key: "$setOnInsert", Value: bson.D{{Key: "seq", Value: 0}}}}, options.Update().SetUpsert(true))

	// Insert default registration code if not existing
	_, _ = db.regCodes.UpdateOne(ctx, bson.D{{Key: "reg_code", Value: "cafebabe03"}}, bson.D{{Key: "$setOnInsert", Value: bson.D{{Key: "reg_code", Value: "cafebabe03"}}}}, options.Update().SetUpsert(true))

	return nil
}

func (db *MongoDB) SaveUserWithEmail(user *User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.users.InsertOne(ctx, bson.D{
		{Key: "username", Value: user.Username},
		{Key: "email", Value: user.Email},
		{Key: "salted_hash_passwrd", Value: user.SaltedHashPasswrd},
		{Key: "date_created", Value: time.Now()},
	})
	return err
}

func (db *MongoDB) SaveUserWithUsername(user *User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.users.InsertOne(ctx, bson.D{
		{Key: "username", Value: user.Username},
		{Key: "salted_hash_passwrd", Value: user.SaltedHashPasswrd},
		{Key: "date_created", Value: time.Now()},
	})
	return err
}

func (db *MongoDB) GetUserWithEmail(email string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var doc struct {
		ID                primitive.ObjectID `bson:"_id"`
		Username          string             `bson:"username"`
		Email             string             `bson:"email"`
		SaltedHashPasswrd string             `bson:"salted_hash_passwrd"`
		DateCreated       time.Time          `bson:"date_created"`
	}
	res := db.users.FindOne(ctx, bson.D{{Key: "email", Value: email}})
	if err := res.Err(); err != nil {
		return &User{}, err
	}
	if err := res.Decode(&doc); err != nil {
		return &User{}, err
	}
	return &User{Id: 0, Username: doc.Username, Email: doc.Email, SaltedHashPasswrd: doc.SaltedHashPasswrd, DateCreated: doc.DateCreated.Format(time.RFC3339)}, nil
}

func (db *MongoDB) GetUserWithUsername(username string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var doc struct {
		ID                primitive.ObjectID `bson:"_id"`
		Username          string             `bson:"username"`
		SaltedHashPasswrd string             `bson:"salted_hash_passwrd"`
		DateCreated       time.Time          `bson:"date_created"`
	}
	res := db.users.FindOne(ctx, bson.D{{Key: "username", Value: username}})
	if err := res.Err(); err != nil {
		return &User{}, err
	}
	if err := res.Decode(&doc); err != nil {
		return &User{}, err
	}
	return &User{Id: 0, Username: doc.Username, SaltedHashPasswrd: doc.SaltedHashPasswrd, DateCreated: doc.DateCreated.Format(time.RFC3339)}, nil
}

func (db *MongoDB) EditUserPassword(username, new_password_hash string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.users.UpdateOne(ctx, bson.D{{Key: "username", Value: username}}, bson.D{{Key: "$set", Value: bson.D{{Key: "salted_hash_passwrd", Value: new_password_hash}}}})
	return err
}

func (db *MongoDB) FindRegCode(reg_code string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var doc struct {
		ID      primitive.ObjectID `bson:"_id"`
		RegCode string             `bson:"reg_code"`
	}
	res := db.regCodes.FindOne(ctx, bson.D{{Key: "reg_code", Value: reg_code}})
	if err := res.Err(); err != nil {
		return "", err
	}
	if err := res.Decode(&doc); err != nil {
		return "", err
	}
	return doc.RegCode, nil
}

func (db *MongoDB) nextSequence(sequenceName string) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var updated struct {
		Seq int `bson:"seq"`
	}
	res := db.counters.FindOneAndUpdate(ctx, bson.D{{Key: "_id", Value: sequenceName}}, bson.D{{Key: "$inc", Value: bson.D{{Key: "seq", Value: 1}}}}, options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After))
	if err := res.Err(); err != nil {
		return 0, err
	}
	if err := res.Decode(&updated); err != nil {
		return 0, err
	}
	return updated.Seq, nil
}

func (db *MongoDB) SaveProperty(property *Property) error {
	id, err := db.nextSequence("Properties")
	if err != nil {
		return err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err = db.properties.InsertOne(ctx, bson.D{
		{Key: "id", Value: id},
		{Key: "region", Value: property.Region},
		{Key: "province", Value: property.Province},
		{Key: "city", Value: property.City},
		{Key: "barangay", Value: property.Barangay},
		{Key: "street_address", Value: property.StreetAddress},
		{Key: "property_description", Value: property.Description},
		{Key: "property_name", Value: property.Name},
		{Key: "property_type", Value: property.Type},
		{Key: "property_price", Value: property.Price},
		{Key: "storeys", Value: property.Storeys},
		{Key: "livable_area_sqm", Value: property.LivableAreaSQM},
		{Key: "gross_area_sqm", Value: property.GrossAreaSQM},
		{Key: "lot_length_m", Value: property.LotLengthM},
		{Key: "lot_width_m", Value: property.LotWidthM},
		{Key: "living_room", Value: property.LivingRoom},
		{Key: "kitchen", Value: property.Kitchen},
		{Key: "dining_room", Value: property.DiningRoom},
		{Key: "bath_room", Value: property.BathRoom},
		{Key: "bedroom", Value: property.Bedroom},
		{Key: "masters_bedroom", Value: property.MastersBedroom},
		{Key: "maid_room", Value: property.MaidRoom},
		{Key: "toilet", Value: property.Toilet},
		{Key: "walk_in_closet", Value: property.WalkInCloset},
		{Key: "balcony", Value: property.Balcony},
		{Key: "lanai", Value: property.Lanai},
		{Key: "car_port", Value: property.CarPort},
	})
	return err
}

func (db *MongoDB) EditProperty(property *Property) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := db.properties.UpdateOne(ctx, bson.D{{Key: "id", Value: property.Id}}, bson.D{{Key: "$set", Value: bson.D{
		{Key: "region", Value: property.Region},
		{Key: "province", Value: property.Province},
		{Key: "city", Value: property.City},
		{Key: "barangay", Value: property.Barangay},
		{Key: "street_address", Value: property.StreetAddress},
		{Key: "property_description", Value: property.Description},
		{Key: "property_name", Value: property.Name},
		{Key: "property_type", Value: property.Type},
		{Key: "property_price", Value: property.Price},
		{Key: "storeys", Value: property.Storeys},
		{Key: "livable_area_sqm", Value: property.LivableAreaSQM},
		{Key: "gross_area_sqm", Value: property.GrossAreaSQM},
		{Key: "lot_length_m", Value: property.LotLengthM},
		{Key: "lot_width_m", Value: property.LotWidthM},
		{Key: "living_room", Value: property.LivingRoom},
		{Key: "kitchen", Value: property.Kitchen},
		{Key: "dining_room", Value: property.DiningRoom},
		{Key: "bath_room", Value: property.BathRoom},
		{Key: "bedroom", Value: property.Bedroom},
		{Key: "masters_bedroom", Value: property.MastersBedroom},
		{Key: "maid_room", Value: property.MaidRoom},
		{Key: "toilet", Value: property.Toilet},
		{Key: "walk_in_closet", Value: property.WalkInCloset},
		{Key: "balcony", Value: property.Balcony},
		{Key: "lanai", Value: property.Lanai},
		{Key: "car_port", Value: property.CarPort},
	}}})
	return err
}

func (db *MongoDB) DeleteProperty(property_id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.properties.DeleteOne(ctx, bson.D{{Key: "id", Value: property_id}})
	return err
}

func (db *MongoDB) GetPropertyID(address string) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var doc struct {
		Id int `bson:"id"`
	}
	res := db.properties.FindOne(ctx, bson.D{{Key: "street_address", Value: address}})
	if err := res.Err(); err != nil {
		return 0, err
	}
	if err := res.Decode(&doc); err != nil {
		return 0, err
	}
	return doc.Id, nil
}

func (db *MongoDB) GetProperties(
	region, province, city, barangay, street_address string,
	property_name, property_type string, min_price, max_price float32, storeys int,
	livable_area_sqm, gross_area_sqm, lot_length_m, lot_width_m float32,
	living_room, kitchen, dining_room, bath_room int,
	bedroom, masters_bedroom, maid_room, toilet int,
	walk_in_closet, balcony, lanai, car_port int,
) ([]Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	filter := bson.D{}

	like := func(s string) bson.D {
		if s == "" {
			return bson.D{}
		}
		// Escape regex special characters to simulate LIKE %s%
		escaped := regexp.QuoteMeta(s)
		return bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: ".*" + escaped + ".*", Options: "i"}}}
	}

	// Text fields via regex
	if region != "" {
		filter = append(filter, bson.E{Key: "region", Value: like(region)})
	}
	if province != "" {
		filter = append(filter, bson.E{Key: "province", Value: like(province)})
	}
	if city != "" {
		filter = append(filter, bson.E{Key: "city", Value: like(city)})
	}
	if barangay != "" {
		filter = append(filter, bson.E{Key: "barangay", Value: like(barangay)})
	}
	if street_address != "" {
		filter = append(filter, bson.E{Key: "street_address", Value: like(street_address)})
	}
	if property_name != "" {
		filter = append(filter, bson.E{Key: "property_name", Value: like(property_name)})
	}
	if property_type != "" {
		filter = append(filter, bson.E{Key: "property_type", Value: like(property_type)})
	}

	// Numeric ranges
	filter = append(filter, bson.E{Key: "property_price", Value: bson.D{{Key: "$gte", Value: min_price}, {Key: "$lte", Value: max_price}}})
	if livable_area_sqm > -1 {
		filter = append(filter, bson.E{Key: "livable_area_sqm", Value: bson.D{{Key: "$gte", Value: livable_area_sqm}}})
	}
	if gross_area_sqm > -1 {
		filter = append(filter, bson.E{Key: "gross_area_sqm", Value: bson.D{{Key: "$gte", Value: gross_area_sqm}}})
	}
	if lot_length_m > -1 {
		filter = append(filter, bson.E{Key: "lot_length_m", Value: bson.D{{Key: "$gte", Value: lot_length_m}}})
	}
	if lot_width_m > -1 {
		filter = append(filter, bson.E{Key: "lot_width_m", Value: bson.D{{Key: "$gte", Value: lot_width_m}}})
	}

	if living_room > -1 {
		filter = append(filter, bson.E{Key: "living_room", Value: bson.D{{Key: "$gte", Value: living_room}}})
	}
	if kitchen > -1 {
		filter = append(filter, bson.E{Key: "kitchen", Value: bson.D{{Key: "$gte", Value: kitchen}}})
	}
	if dining_room > -1 {
		filter = append(filter, bson.E{Key: "dining_room", Value: bson.D{{Key: "$gte", Value: dining_room}}})
	}
	if bath_room > -1 {
		filter = append(filter, bson.E{Key: "bath_room", Value: bson.D{{Key: "$gte", Value: bath_room}}})
	}
	if bedroom > -1 {
		filter = append(filter, bson.E{Key: "bedroom", Value: bson.D{{Key: "$gte", Value: bedroom}}})
	}
	if masters_bedroom > -1 {
		filter = append(filter, bson.E{Key: "masters_bedroom", Value: bson.D{{Key: "$gte", Value: masters_bedroom}}})
	}
	if maid_room > -1 {
		filter = append(filter, bson.E{Key: "maid_room", Value: bson.D{{Key: "$gte", Value: maid_room}}})
	}
	if toilet > -1 {
		filter = append(filter, bson.E{Key: "toilet", Value: bson.D{{Key: "$gte", Value: toilet}}})
	}
	if walk_in_closet > -1 {
		filter = append(filter, bson.E{Key: "walk_in_closet", Value: bson.D{{Key: "$gte", Value: walk_in_closet}}})
	}
	if balcony > -1 {
		filter = append(filter, bson.E{Key: "balcony", Value: bson.D{{Key: "$gte", Value: balcony}}})
	}
	if lanai > -1 {
		filter = append(filter, bson.E{Key: "lanai", Value: bson.D{{Key: "$gte", Value: lanai}}})
	}
	if car_port > -1 {
		filter = append(filter, bson.E{Key: "car_port", Value: bson.D{{Key: "$gte", Value: car_port}}})
	}

	if storeys > -1 {
		filter = append(filter, bson.E{Key: "storeys", Value: storeys})
	}

	cursor, err := db.properties.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	properties := make([]Property, 0)
	for cursor.Next(ctx) {
		var doc struct {
			Id             int     `bson:"id"`
			Region         string  `bson:"region"`
			Province       string  `bson:"province"`
			City           string  `bson:"city"`
			Barangay       string  `bson:"barangay"`
			StreetAddress  string  `bson:"street_address"`
			Description    string  `bson:"property_description"`
			Name           string  `bson:"property_name"`
			Type           string  `bson:"property_type"`
			Price          float32 `bson:"property_price"`
			Storeys        int     `bson:"storeys"`
			LivableAreaSQM float32 `bson:"livable_area_sqm"`
			GrossAreaSQM   float32 `bson:"gross_area_sqm"`
			LotLengthM     float32 `bson:"lot_length_m"`
			LotWidthM      float32 `bson:"lot_width_m"`
			LivingRoom     int     `bson:"living_room"`
			Kitchen        int     `bson:"kitchen"`
			DiningRoom     int     `bson:"dining_room"`
			BathRoom       int     `bson:"bath_room"`
			Bedroom        int     `bson:"bedroom"`
			MastersBedroom int     `bson:"masters_bedroom"`
			MaidRoom       int     `bson:"maid_room"`
			Toilet         int     `bson:"toilet"`
			WalkInCloset   int     `bson:"walk_in_closet"`
			Balcony        int     `bson:"balcony"`
			Lanai          int     `bson:"lanai"`
			CarPort        int     `bson:"car_port"`
		}
		if err := cursor.Decode(&doc); err != nil {
			return properties, err
		}

		p := Property{
			Id:             doc.Id,
			Region:         doc.Region,
			Province:       doc.Province,
			City:           doc.City,
			Barangay:       doc.Barangay,
			StreetAddress:  doc.StreetAddress,
			Description:    doc.Description,
			Name:           doc.Name,
			Type:           doc.Type,
			Price:          doc.Price,
			Storeys:        doc.Storeys,
			LivableAreaSQM: doc.LivableAreaSQM,
			GrossAreaSQM:   doc.GrossAreaSQM,
			LotLengthM:     doc.LotLengthM,
			LotWidthM:      doc.LotWidthM,
			LivingRoom:     doc.LivingRoom,
			Kitchen:        doc.Kitchen,
			DiningRoom:     doc.DiningRoom,
			BathRoom:       doc.BathRoom,
			Bedroom:        doc.Bedroom,
			MastersBedroom: doc.MastersBedroom,
			MaidRoom:       doc.MaidRoom,
			Toilet:         doc.Toilet,
			WalkInCloset:   doc.WalkInCloset,
			Balcony:        doc.Balcony,
			Lanai:          doc.Lanai,
			CarPort:        doc.CarPort,
		}

		// Sample images
		sampleCur, sErr := db.images.Find(ctx, bson.D{{Key: "id", Value: p.Id}, {Key: "image_public_id", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "sample-image", Options: ""}}}}})
		if sErr == nil {
			for sampleCur.Next(ctx) {
				var img struct {
					Url string `bson:"image_url"`
				}
				if err := sampleCur.Decode(&img); err == nil {
					p.SampleImagesURL = append(p.SampleImagesURL, img.Url)
				}
			}
			sampleCur.Close(ctx)
		}

		// Floor plan images
		floorCur, fErr := db.images.Find(ctx, bson.D{{Key: "id", Value: p.Id}, {Key: "image_public_id", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "floor-plan", Options: ""}}}}})
		if fErr == nil {
			for floorCur.Next(ctx) {
				var img struct {
					Url string `bson:"image_url"`
				}
				if err := floorCur.Decode(&img); err == nil {
					p.FloorPlansURL = append(p.FloorPlansURL, img.Url)
				}
			}
			floorCur.Close(ctx)
		}

		properties = append(properties, p)
	}

	if err := cursor.Err(); err != nil {
		return properties, err
	}

	return properties, nil
}

func (db *MongoDB) SaveImageData(associated_property_id int, cloudinary_url, cloudinary_img_id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.images.InsertOne(ctx, bson.D{
		{Key: "id", Value: associated_property_id},
		{Key: "image_url", Value: cloudinary_url},
		{Key: "image_public_id", Value: cloudinary_img_id},
	})
	return err
}

func (db *MongoDB) GetImageSamples(associated_property_id int) ([]PropertyImage, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := db.images.Find(ctx, bson.D{{Key: "id", Value: associated_property_id}, {Key: "image_public_id", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "sample-image", Options: ""}}}}})
	if err != nil {
		return []PropertyImage{}, err
	}
	defer cursor.Close(ctx)

	images := make([]PropertyImage, 0)
	for cursor.Next(ctx) {
		var doc struct {
			Id       int    `bson:"id"`
			Url      string `bson:"image_url"`
			PublicID string `bson:"image_public_id"`
		}
		if err := cursor.Decode(&doc); err != nil {
			return images, err
		}
		images = append(images, PropertyImage{Id: doc.Id, Url: doc.Url, PublicID: doc.PublicID})
	}

	return images, cursor.Err()
}

func (db *MongoDB) GetImageFloorPlans(associated_property_id int) ([]PropertyImage, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := db.images.Find(ctx, bson.D{{Key: "id", Value: associated_property_id}, {Key: "image_public_id", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "floor-plan", Options: ""}}}}})
	if err != nil {
		return []PropertyImage{}, err
	}
	defer cursor.Close(ctx)

	images := make([]PropertyImage, 0)
	for cursor.Next(ctx) {
		var doc struct {
			Id       int    `bson:"id"`
			Url      string `bson:"image_url"`
			PublicID string `bson:"image_public_id"`
		}
		if err := cursor.Decode(&doc); err != nil {
			return images, err
		}
		images = append(images, PropertyImage{Id: doc.Id, Url: doc.Url, PublicID: doc.PublicID})
	}

	return images, cursor.Err()
}

func (db *MongoDB) GetImageData(associated_property_id int) ([]PropertyImage, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := db.images.Find(ctx, bson.D{{Key: "id", Value: associated_property_id}})
	if err != nil {
		return []PropertyImage{}, err
	}
	defer cursor.Close(ctx)

	images := make([]PropertyImage, 0)
	for cursor.Next(ctx) {
		var doc struct {
			Id       int    `bson:"id"`
			Url      string `bson:"image_url"`
			PublicID string `bson:"image_public_id"`
		}
		if err := cursor.Decode(&doc); err != nil {
			return images, err
		}
		images = append(images, PropertyImage{Id: doc.Id, Url: doc.Url, PublicID: doc.PublicID})
	}

	return images, cursor.Err()
}

func (db *MongoDB) DeleteImageData(associated_property_id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.images.DeleteMany(ctx, bson.D{{Key: "id", Value: associated_property_id}})
	return err
}

func (db *MongoDB) DeleteImageSamples(associated_property_id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.images.DeleteMany(ctx, bson.D{{Key: "id", Value: associated_property_id}, {Key: "image_public_id", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "sample-image", Options: ""}}}}})
	return err
}

func (db *MongoDB) DeleteImageFloorPlans(associated_property_id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.images.DeleteMany(ctx, bson.D{{Key: "id", Value: associated_property_id}, {Key: "image_public_id", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "floor-plan", Options: ""}}}}})
	return err
}

func (db *MongoDB) SaveRecoveryCode(recovery_code *RecoveryCode) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := db.recoveryCodes.InsertOne(ctx, bson.D{
		{Key: "code", Value: recovery_code.Code},
		{Key: "username", Value: recovery_code.Username},
		{Key: "date_issued", Value: time.Now()},
	})
	return err
}

func (db *MongoDB) GetLatestRecoveryCode(username string) (*RecoveryCode, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var doc struct {
		Code       int       `bson:"code"`
		Username   string    `bson:"username"`
		DateIssued time.Time `bson:"date_issued"`
	}
	res := db.recoveryCodes.FindOne(ctx, bson.D{{Key: "username", Value: username}}, options.FindOne().SetSort(bson.D{{Key: "date_issued", Value: -1}}))
	if err := res.Err(); err != nil {
		return &RecoveryCode{}, err
	}
	if err := res.Decode(&doc); err != nil {
		return &RecoveryCode{}, err
	}
	return &RecoveryCode{Code: doc.Code, Username: doc.Username, DateIssued: doc.DateIssued.Format(time.RFC3339)}, nil
}
