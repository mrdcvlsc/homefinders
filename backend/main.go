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
		fmt.Println("\nPersistence Initialization Error : ", err)
		os.Exit(1)
	}

	use_secure_cookie := false
	same_site := http.SameSiteDefaultMode
	if os.Getenv("GIN_MODE") == "release" {
		use_secure_cookie = true
		same_site = http.SameSiteNoneMode
	}

	routes.SetSessionOptions(sessions.Options{
		// MaxAge:   259200, // 3 days
		// MaxAge:   60, // 1 minute
		MaxAge:   60 * 15, // 15 minute
		Secure:   use_secure_cookie,
		HttpOnly: true,
		SameSite: same_site,
	})

	router := gin.Default()

	// maximum memory limit for multipart form file uploads
	router.MaxMultipartMemory = 50 << 20 // 50 MiB

	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))
	router.Use(sessions.Sessions("session_id", routes.SessionStore))

	router.GET("/", routes.ServeWebApp)

	router.GET("/logout", routes.LogOut)
	router.GET("/who", routes.Who)

	router.POST("/register", routes.Register)
	router.POST("/login", routes.LogIn)
	router.POST("/upload", routes.Upload)
	router.POST("/get-properties", routes.GetProperties)
	router.GET("/get-all-properties", routes.GetPropertiesTemporary)

	router.POST("/add-property", routes.AddProperty)
	router.POST("/save-edit-property", routes.EditProperty)
	router.POST("/generate-recovery-code", routes.Generate4DigitCode)
	router.POST("/validate-recovery-code", routes.Validate4DigitCode)
	router.POST("/send-inquiry", routes.SendInquiry)

	router.DELETE("/delete-property/:id", routes.DeleteProperty)

	/*
		A NOTE TO SELF: PLEASE USE THE CORRECT HTTP VERB FOR YOUR ROUTES IN THE FUTURE
	*/

	/////// examples routes ////////

	router.GET("/albums", routes.GetAlbums)
	router.GET("/albums/:id", routes.GetAlbumByID)
	router.POST("/albums", routes.PostAlbums)

	////////////////////////////////

	routes.DisplayOutboundIP()
	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))

}
