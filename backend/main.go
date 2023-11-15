package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

// Album represents data about a record Album.
type Album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

func main() {
	// Capture connection properties.
	cfg := mysql.Config{
		User:                 os.Getenv("DBUSER"),
		Passwd:               os.Getenv("DBPASS"),
		Net:                  os.Getenv("PROTOCOL"),
		Addr:                 os.Getenv("DBADDRES"),
		DBName:               "golangdb",
		AllowNativePasswords: true,
	}

	// Get a database handle.
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))
	router.GET("/", serveWebApp)
	router.GET("/albums", getAlbums)
	router.GET("/albums/:id", getAlbumByID)
	router.POST("/albums", postAlbums)

	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}

func serveWebApp(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
}

// getAlbums responds with the list of all albums as JSON.
func getAlbums(c *gin.Context) {
	var albums []Album

	rows, err := db.Query("SELECT * FROM album")

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	defer rows.Close()

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var read_album Album
		if err := rows.Scan(&read_album.ID, &read_album.Title, &read_album.Artist, &read_album.Price); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}
		albums = append(albums, read_album)
	}

	if err := rows.Err(); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, albums)
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
	var newAlbum Album

	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	result, err := db.Exec("INSERT INTO album (title, artist, price) VALUES (?, ?, ?)", newAlbum.Title, newAlbum.Artist, newAlbum.Price)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("ID = %d already exists in the database", id),
		})
		return
	}

	c.IndentedJSON(http.StatusCreated, newAlbum)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getAlbumByID(c *gin.Context) {
	var album Album

	id := c.Param("id")

	row := db.QueryRow("SELECT * FROM album WHERE id = ?", id)
	if err := row.Scan(&album.ID, &album.Title, &album.Artist, &album.Price); err != nil {
		if err == sql.ErrNoRows {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
			return
		}
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error retreiving from database"})
		return
	}

	c.IndentedJSON(http.StatusOK, album)
}
