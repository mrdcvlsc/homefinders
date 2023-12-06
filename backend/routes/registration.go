package routes

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/database"
	"github.com/mrdcvlsc/homefinders/persistence"
	"golang.org/x/crypto/bcrypt"
)

type RegistrationForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Register(c *gin.Context) {
	regform_data := RegistrationForm{}

	/////////////////////// parse the form data ///////////////////////

	if err := c.BindJSON(&regform_data); err != nil {
		fmt.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}

	/////////////////////// hash the raw password ///////////////////////

	raw_passwrd_byte := []byte(regform_data.Password)
	hash, hashErr := bcrypt.GenerateFromPassword(raw_passwrd_byte, bcrypt.DefaultCost)
	if hashErr != nil {
		fmt.Println(hashErr)
		c.Status(http.StatusInternalServerError)
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
		c.Status(http.StatusForbidden)
		return
	}

	/////////////////////// registration success ///////////////////////

	c.Status(http.StatusOK)
}
