package routes

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/respond"
)

type ManagePropertyForm struct {
	Region        string `json:"region"`
	Province      string `json:"province"`
	City          string `json:"city"`
	Barangay      string `json:"barangay"`
	StreetAddress string `json:"street_address"`

	Name     string  `json:"name"`
	Type     string  `json:"type"`
	MinPrice float32 `json:"min_price"`
	MaxPrice float32 `json:"max_price"`
	Storeys  int     `json:"storeys"`

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

func GetProperties(c *gin.Context) {
	property_filter := ManagePropertyForm{}

	if err := c.BindJSON(&property_filter); err != nil {
		c.IndentedJSON(http.StatusBadRequest, respond.BadRequest)
		return
	}

	fmt.Printf("\npost request payload : \n%+v\n\n", property_filter)

	///
	properties, err := persistence.GetProperties(
		property_filter.Region, property_filter.Province, property_filter.City, property_filter.Barangay,
		property_filter.StreetAddress,
		property_filter.Name, property_filter.Type,
		property_filter.MinPrice, property_filter.MaxPrice,
		property_filter.Storeys,
		property_filter.LivableAreaSQM, property_filter.GrossAreaSQM,
		property_filter.LotLengthM, property_filter.LotWidthM,
		property_filter.LivingRoom, property_filter.Kitchen, property_filter.DiningRoom, property_filter.BathRoom,
		property_filter.Bedroom, property_filter.MastersBedroom, property_filter.MaidRoom, property_filter.Toilet,
		property_filter.WalkInCloset, property_filter.Balcony, property_filter.Lanai, property_filter.CarPort,
	)

	if err != nil {
		log.Print(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	c.IndentedJSON(http.StatusOK, properties)
}

func GetPropertiesTemporary(c *gin.Context) {

	properties, err := persistence.GetProperties(
		"", "", "", "", "",
		"", "", -1, 9999999999999, -1,
		-1, -1, -1, -1,
		-1, -1, -1, -1,
		-1, -1, -1, -1,
		-1, -1, -1, -1,
	)

	if err != nil {
		log.Print(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	c.IndentedJSON(http.StatusOK, properties)
}
