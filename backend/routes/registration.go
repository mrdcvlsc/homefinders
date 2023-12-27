package routes

import (
	"crypto/rand"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/database"
	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/respond"
	"golang.org/x/crypto/bcrypt"
)

type RegistrationForm struct {
	Username         string `json:"username"`
	Password         string `json:"password"`
	RegistrationCode string `json:"registration_code"`
}

// generate 10 character registration code
func NewRegistrationCode() (string, error) {
	rand_bytes := make([]byte, 1)
	_, err := rand.Read(rand_bytes)
	if err != nil {
		return "", err
	}

	mask := uint64(0x00000000ffffffff)
	curr_time_in_sec := uint64(time.Now().Unix())
	return fmt.Sprintf("%02x%08x", rand_bytes, curr_time_in_sec&mask), nil
}

/*
	`\register` POST handler response status codes:

200 - Successfully created a user.

400 - Body might be corrupted.

403 - That user already exist.

500 - Internal Server Error.
*/
func Register(c *gin.Context) {
	regform_data := RegistrationForm{}

	/////////////////////// parse the form data ///////////////////////

	if err := c.BindJSON(&regform_data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	/////////////////////// check if registration code is valid ///////////////////////

	if !persistence.IsValidRegCode(regform_data.RegistrationCode) {
		c.JSON(http.StatusNotFound, gin.H{"msg": respond.RegisterCodeNotFound})
		return
	}

	/////////////////////// hash the raw password ///////////////////////

	raw_passwrd_byte := []byte(regform_data.Password)
	hash, hashErr := bcrypt.GenerateFromPassword(raw_passwrd_byte, bcrypt.DefaultCost)
	if hashErr != nil {
		fmt.Println(hashErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	bcrypt_hashed_passwrd_string := string(hash)

	/////////////////////// save the user ///////////////////////

	var saveErr error

	if strings.Contains(regform_data.Username, "@") {
		// registration using Email

		index := strings.Index(regform_data.Username, "@")

		saveErr = persistence.SaveUserWithEmail(&database.User{
			Username:          regform_data.Username[:index],
			Email:             regform_data.Username,
			SaltedHashPasswrd: bcrypt_hashed_passwrd_string,
		})

		log.Println("Email Save Error : ", saveErr)

	} else {
		// registration using plain Username

		saveErr = persistence.SaveUserWithUsername(&database.User{
			Username:          regform_data.Username,
			SaltedHashPasswrd: bcrypt_hashed_passwrd_string,
		})

		log.Println("Username Save Error : ", saveErr)
	}

	if saveErr != nil {
		log.Println(saveErr)
		c.JSON(http.StatusForbidden, gin.H{"msg": respond.RegisterUsernameTaken})
		return
	}

	/////////////////////// registration success ///////////////////////

	c.JSON(http.StatusOK, gin.H{"msg": respond.RegisterSuccess})
}
