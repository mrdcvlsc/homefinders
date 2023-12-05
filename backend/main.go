package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/routes"
)

// Get preferred outbound ip of this machine
func GetOutboundIP() net.IP {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)

	return localAddr.IP
}

func main() {
	err := persistence.Initialize()
	if err != nil {
		fmt.Println("Database Error", err)
		os.Exit(1)
	}

	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))
	router.Use(sessions.Sessions("admin", routes.SessionStore))

	router.GET("/", routes.ServeWebApp)

	router.POST("/register", routes.Register)
	router.POST("/login", routes.Login)

	router.GET("/test/session", routes.TestSession)

	/////// examples ////////

	router.GET("/albums", routes.GetAlbums)
	router.GET("/albums/:id", routes.GetAlbumByID)
	router.POST("/albums", routes.PostAlbums)

	fmt.Printf("\n\nRunning on %v\n\n", GetOutboundIP())

	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))

}
