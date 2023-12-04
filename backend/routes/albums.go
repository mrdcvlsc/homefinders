package routes

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/persistence"
)

// Album represents data about a record Album.
type Album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

func NewAlbumCollection() []Album {
	var albums []Album
	return albums
}

func NewEmptyAlbum() Album {
	return Album{}
}

func NewAlbum(ID, Title, Artist string, Price float64) Album {
	return Album{ID, Title, Artist, Price}
}

//////////////////// handlers ///////////////////////

// getAlbums responds with the list of all albums as JSON.
func GetAlbums(c *gin.Context) {
	album_collection := NewAlbumCollection()

	db := persistence.GetInstanceDB()
	rows, err := db.Query("SELECT * FROM album")

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	defer rows.Close()

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		read_album := NewEmptyAlbum()
		if err := rows.Scan(&read_album.ID, &read_album.Title, &read_album.Artist, &read_album.Price); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}
		album_collection = append(album_collection, read_album)
	}

	if err := rows.Err(); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, album_collection)
}

// postAlbums adds an album from JSON received in the request body.
func PostAlbums(c *gin.Context) {
	newAlbum := NewEmptyAlbum()

	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	db := persistence.GetInstanceDB()
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
func GetAlbumByID(c *gin.Context) {
	album := NewEmptyAlbum()

	id := c.Param("id")

	db := persistence.GetInstanceDB()
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
