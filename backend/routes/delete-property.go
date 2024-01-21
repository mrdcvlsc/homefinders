package routes

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/cdn"
	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/respond"
)

func DeleteProperty(c *gin.Context) {
	param_property_id_string := c.Param("id")

	property_id, stringToIntErr := strconv.Atoi(param_property_id_string)

	if stringToIntErr != nil {
		log.Println(stringToIntErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	// delete property from the database
	if err := persistence.DeleteProperty(property_id); err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	// get all the image data of the property from the database
	property_images, getImgErr := persistence.GetImageData(property_id)

	if getImgErr != nil {
		log.Println(getImgErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	// delete the images in cloudinary
	for i := 0; i < len(property_images); i++ {
		if err := cdn.DeleteImage(property_images[i].PublicID); err != nil {
			log.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.ExternalServerError})
			return
		}
	}

	// delete all property images in the database
	if err := persistence.DeleteImageData(property_id); err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": respond.PropertyDeleteSuccess})
}
