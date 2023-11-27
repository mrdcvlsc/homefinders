package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/mrdcvlsc/homefinders/database"
	"github.com/mrdcvlsc/homefinders/routes"
)

func main() {
	database.InitializeMariaDB()

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("../../frontend/dist", true)))
	router.GET("/", routes.ServeWebApp)
	router.GET("/albums", routes.GetAlbums)
	router.GET("/albums/:id", routes.GetAlbumByID)
	router.POST("/albums", routes.PostAlbums)

	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}