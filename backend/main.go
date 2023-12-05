package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-contrib/sessions"
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

	secure_cookie := false
	same_site := http.SameSiteDefaultMode
	if os.Getenv("GIN_MODE") == "release" {
		secure_cookie = true
		same_site = http.SameSiteNoneMode
	}

	routes.SetSessionOptions(sessions.Options{
		MaxAge:   30, // seconds
		Secure:   secure_cookie,
		HttpOnly: true,
		SameSite: same_site,
	})

	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))
	router.Use(sessions.Sessions("admin", routes.SessionStore))

	router.GET("/", routes.ServeWebApp)

	router.POST("/register", routes.Register)
	router.POST("/login", routes.Login)

	router.GET("/test/session", routes.TestSession)

	/////// examples routes ////////

	router.GET("/albums", routes.GetAlbums)
	router.GET("/albums/:id", routes.GetAlbumByID)
	router.POST("/albums", routes.PostAlbums)

	////////////////////////////////

	routes.DisplayOutboundIP()
	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))

}
