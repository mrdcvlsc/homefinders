package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/routes"
)

func main() {
	err := persistence.Initialize()
	if err != nil {
		fmt.Println("Database Error", err)
		os.Exit(1)
	}

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))

	router.GET("/", routes.ServeWebApp)

	router.POST("/register", routes.Register)
	router.POST("/login", routes.Login)

	router.GET("/albums", routes.GetAlbums)
	router.GET("/albums/:id", routes.GetAlbumByID)
	router.POST("/albums", routes.PostAlbums)

	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
