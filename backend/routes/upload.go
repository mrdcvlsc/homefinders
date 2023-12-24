package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Upload(c *gin.Context) {
	form, err := c.MultipartForm()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": "error parsing form data in the server"})
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

	c.JSON(http.StatusOK, gin.H{"msg": "upload success"})
}
