package routes

import (
	"crypto/rand"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/database"
	"github.com/mrdcvlsc/homefinders/persistence"
	"golang.org/x/crypto/bcrypt"
)

type RegistrationForm struct {
	Username         string `json:"username"`
	Password         string `json:"password"`
	RegistrationCode string `json:"registration_code"`
}

// generate 10 character registration code
func new_registration_code() (string, error) {
	rand_bytes := make([]byte, 1)
	_, err := rand.Read(rand_bytes)
	if err != nil {
		return "", err
	}

	mask := uint64(0x00000000ffffffff)
	curr_unit_time_in_sec := uint64(time.Now().Unix())
	new_registration_code := fmt.Sprintf("%02x%08x", rand_bytes, curr_unit_time_in_sec&mask)
	return new_registration_code, nil
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
		c.JSON(http.StatusBadRequest, gin.H{"msg": response_bad_request()})
		return
	}

	/////////////////////// check if registration code is valid ///////////////////////

	if !persistence.IsAvailableRegCode(regform_data.RegistrationCode) {
		c.JSON(http.StatusNotFound, gin.H{"msg": response_registration_code_not_found()})
		return
	}

	/////////////////////// hash the raw password ///////////////////////

	raw_passwrd_byte := []byte(regform_data.Password)
	hash, hashErr := bcrypt.GenerateFromPassword(raw_passwrd_byte, bcrypt.DefaultCost)
	if hashErr != nil {
		fmt.Println(hashErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": response_internal_server_error()})
		return
	}

	bcrypt_hashed_passwrd_string := string(hash)

	/////////////////////// save the user ///////////////////////

	var saveErr error
	if strings.Contains(regform_data.Username, "@") { // registration using Email

		index := strings.Index(regform_data.Username, "@")

		saveErr = persistence.SaveUserWithEmail(&database.User{
			Username:          regform_data.Username[:index],
			Email:             regform_data.Username,
			SaltedHashPasswrd: bcrypt_hashed_passwrd_string,
		})

		fmt.Println("Email Save Error : ", saveErr)

	} else { // registration using plain Username

		saveErr = persistence.SaveUserWithUsername(&database.User{
			Username:          regform_data.Username,
			SaltedHashPasswrd: bcrypt_hashed_passwrd_string,
		})

		fmt.Println("Username Save Error : ", saveErr)
	}

	if saveErr != nil {
		fmt.Println(saveErr)
		c.JSON(http.StatusForbidden, gin.H{"msg": response_username_taken()})
		return
	}

	/////////////////////// registration success ///////////////////////

	c.JSON(http.StatusOK, gin.H{"msg": response_registration_success()})
}
