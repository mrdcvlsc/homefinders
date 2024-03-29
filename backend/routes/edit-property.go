package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/cdn"
	"github.com/mrdcvlsc/homefinders/database"
	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/respond"
)

type EditPropertyForm struct {
	Id int `json:"id"`

	Region        string `json:"region"`
	Province      string `json:"province"`
	City          string `json:"city"`
	Barangay      string `json:"barangay"`
	StreetAddress string `json:"street_address"`

	Name        string  `json:"name"`
	Type        string  `json:"type"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Storeys     int     `json:"storeys"`

	LivableAreaSQM float32 `json:"livable_area_sqm"`
	GrossAreaSQM   float32 `json:"gross_area_sqm"`
	LotLengthM     float32 `json:"lot_length_m"`
	LotWidthM      float32 `json:"lot_width_m"`

	LivingRoom     int `json:"living_room"`
	Kitchen        int `json:"kitchen"`
	DiningRoom     int `json:"dining_room"`
	BathRoom       int `json:"bath_room"`
	Bedroom        int `json:"bedroom"`
	MastersBedroom int `json:"masters_bedroom"`
	MaidRoom       int `json:"maid_room"`
	Toilet         int `json:"toilet"`
	WalkInCloset   int `json:"walk_in_closet"`
	Balcony        int `json:"balcony"`
	Lanai          int `json:"lanai"`
	CarPort        int `json:"car_port"`
}

func EditProperty(c *gin.Context) {
	form, formErr := c.MultipartForm()

	if formErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		log.Println("error parsing form data in the server")
		return
	}

	//////////////// save form inputs ////////////////

	property_form_raw := form.Value["form_inputs"][0]

	property_form := EditPropertyForm{}

	if err := json.Unmarshal([]byte(property_form_raw), &property_form); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.InternalServerError})
		return
	}

	fmt.Printf("\n\nReceived Edit Property : \n%+v\n\n", property_form)

	if err := persistence.EditProperty(&database.Property{
		Id:            property_form.Id,
		Region:        property_form.Region,
		Province:      property_form.Province,
		City:          property_form.City,
		Barangay:      property_form.Barangay,
		StreetAddress: property_form.StreetAddress,

		Description: property_form.Description,
		Name:        property_form.Name,
		Type:        property_form.Type,
		Price:       property_form.Price,
		Storeys:     property_form.Storeys,

		LivableAreaSQM: property_form.LivableAreaSQM,
		GrossAreaSQM:   property_form.GrossAreaSQM,
		LotLengthM:     property_form.LotLengthM,
		LotWidthM:      property_form.LotWidthM,

		LivingRoom:     property_form.LivingRoom,
		Kitchen:        property_form.Kitchen,
		DiningRoom:     property_form.DiningRoom,
		BathRoom:       property_form.BathRoom,
		Bedroom:        property_form.Bedroom,
		MastersBedroom: property_form.MastersBedroom,
		MaidRoom:       property_form.MaidRoom,
		Toilet:         property_form.Toilet,
		WalkInCloset:   property_form.WalkInCloset,
		Balcony:        property_form.Balcony,
		Lanai:          property_form.Lanai,
		CarPort:        property_form.CarPort,
	}); err != nil {
		log.Println(err)
		c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
		return
	}

	//////////////// upload sample images ////////////////

	sample_images := form.File["sample_images[]"]

	// delete previous sample images if there are new sample image uploads
	if len(sample_images) != 0 {

		// retrieve images data from the database
		sample_images_data, retDbImagesErr := persistence.GetImageSamples(property_form.Id)

		if retDbImagesErr != nil {
			log.Println(retDbImagesErr)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
			return
		}

		// delete images cloudinary CDN
		for i := 0; i < len(sample_images_data); i++ {
			cdnDeleteErr := cdn.DeleteImage(sample_images_data[i].PublicID)

			if cdnDeleteErr != nil {
				log.Println(cdnDeleteErr)
				c.JSON(http.StatusForbidden, gin.H{"msg": respond.ExternalServerError})
				return
			}
		}

		// delete images data in database
		persistence.DeleteImageSamples(property_form.Id)
	}

	for index, file := range sample_images {
		// upload to server's file storage temporarily

		if err := c.SaveUploadedFile(file, fmt.Sprintf("uploads/%s", file.Filename)); err != nil {
			log.Println("UPLOAD sample_images ERROR : ", err)
			continue
		}

		// upload the uploaded images in file storage to cloudinary

		cloudinary_img_id := fmt.Sprintf("%d-sample-image-%d", property_form.Id, index)

		cloudinary_url, cloudinaryUploadErr := cdn.UploadImage(fmt.Sprintf("uploads/%s", file.Filename), cloudinary_img_id)

		if cloudinaryUploadErr != nil {
			log.Println(cloudinaryUploadErr)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.ExternalServerError})
			return
		}

		// save the necessary cloudinary data into the database server

		if err := persistence.SaveImageData(property_form.Id, cloudinary_url, cloudinary_img_id); err != nil {
			log.Println(err)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
			return
		}

		// remove the temporarily uploaded images in the file storage of the server

		if err := os.Remove(fmt.Sprintf("uploads/%s", file.Filename)); err != nil {
			log.Println(err)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
			return
		}
	}

	//////////////// upload floor plan images ////////////////

	floor_plans := form.File["floor_plans[]"]

	// delete previous sample images if there are new sample image uploads
	if len(floor_plans) != 0 {

		// retrieve images data from the database
		floor_plan_data, retDbImagesErr := persistence.GetImageFloorPlans(property_form.Id)

		if retDbImagesErr != nil {
			log.Println(retDbImagesErr)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
			return
		}

		// delete images cloudinary CDN
		for i := 0; i < len(floor_plan_data); i++ {
			cdnDeleteErr := cdn.DeleteImage(floor_plan_data[i].PublicID)

			if cdnDeleteErr != nil {
				log.Println(cdnDeleteErr)
				c.JSON(http.StatusForbidden, gin.H{"msg": respond.ExternalServerError})
				return
			}
		}

		// delete images data in database
		persistence.DeleteImageFloorPlans(property_form.Id)
	}

	for index, file := range floor_plans {
		// upload to server's file storage temporarily

		if err := c.SaveUploadedFile(file, fmt.Sprintf("uploads/%s", file.Filename)); err != nil {
			log.Println("UPLOAD floor_plans ERROR : ", err)
			continue
		}

		// upload the uploaded images in file storage to cloudinary

		cloudinary_img_id := fmt.Sprintf("%d-floor-plan-%d", property_form.Id, index)

		cloudinary_url, cloudinaryUploadErr := cdn.UploadImage(fmt.Sprintf("uploads/%s", file.Filename), cloudinary_img_id)

		if cloudinaryUploadErr != nil {
			log.Println(cloudinaryUploadErr)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.ExternalServerError})
			return
		}

		// save the necessary cloudinary data into the database server

		if err := persistence.SaveImageData(property_form.Id, cloudinary_url, cloudinary_img_id); err != nil {
			log.Println(err)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
			return
		}

		// remove the temporarily uploaded images in the file storage of the server

		if err := os.Remove(fmt.Sprintf("uploads/%s", file.Filename)); err != nil {
			log.Println(err)
			c.JSON(http.StatusForbidden, gin.H{"msg": respond.InternalServerError})
			return
		}
	}

	///////////////////////////////////////////

	c.JSON(http.StatusOK, gin.H{"msg": respond.PropertySaveSuccess})
}
