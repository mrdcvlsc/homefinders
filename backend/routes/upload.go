package routes

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/respond"
)

func Upload(c *gin.Context) {
	form, err := c.MultipartForm()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		log.Println("error parsing form data in the server")
	}

	// key of form.File[] should match the frontend upload post request key of files array
	files := form.File["files[]"]

	for _, file := range files {
		fmt.Println("\nfile.Filename : ")
		fmt.Println(file.Filename)

		saveErr := c.SaveUploadedFile(file, fmt.Sprintf("uploads/%s", file.Filename))

		if saveErr != nil {
			fmt.Println("Save Upload Error : ")
			fmt.Print(saveErr, "\n\n")
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": respond.UploadSuccess})
}
