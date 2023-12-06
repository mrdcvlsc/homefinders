package routes

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/persistence"
	"golang.org/x/crypto/bcrypt"
)

type LoginForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

/*
	`\login` POST handler response status codes:

200 - Successfully Logged In.

208 - Already Logged In.

400 - Body might be corrupted.

401 - Wrong Password.

404 - User not found.

500 - Internal Server Error.
*/
func Login(c *gin.Context) {
	loginform_data := LoginForm{}

	/////////////////////// parse the form data ///////////////////////

	if err := c.BindJSON(&loginform_data); err != nil {
		fmt.Println("Bad Request")
		c.Status(http.StatusBadRequest)
		return
	}

	/////////////////////// find if user exist ///////////////////////

	user, findUserErr := persistence.GetUser(loginform_data.Username)
	if findUserErr != nil {
		if findUserErr == sql.ErrNoRows {
			c.Status(http.StatusNotFound)
		} else {
			fmt.Println(findUserErr)
			c.Status(http.StatusInternalServerError)
		}
		return
	}

	/////////////////////// validate user password ///////////////////////

	if err := bcrypt.CompareHashAndPassword([]byte(user.SaltedHashPasswrd), []byte(loginform_data.Password)); err != nil {
		c.Status(http.StatusUnauthorized)
		return
	}

	/////////////////////// create user session ///////////////////////

	session := sessions.Default(c)
	logged_in_user := session.Get("logged_in_user")

	if logged_in_user == nil {
		session.Set("logged_in_user", user.Username)
		session.Save()
		c.Status(http.StatusOK)
	} else {
		c.Status(http.StatusAlreadyReported)
	}
}

func TestSession(c *gin.Context) {
	session := sessions.Default(c)

	fmt.Printf("\nTest Session : %+v", session)

	user := session.Get("logged_in_user")
	if user == nil {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "please login first"})
	} else {
		c.IndentedJSON(http.StatusOK, gin.H{"error": fmt.Sprintf("hello %s, test is working", user)})
	}
}
