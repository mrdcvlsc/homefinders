package routes

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/respond"
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
func LogIn(c *gin.Context) {
	loginform_data := LoginForm{}

	/////////////////////// parse the form data ///////////////////////

	if err := c.BindJSON(&loginform_data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	/////////////////////// find if user exist ///////////////////////

	user, findUserErr := persistence.GetUser(loginform_data.Username)

	if findUserErr == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"msg": respond.LogInUserNotFound})
		return
	} else if findUserErr != nil {
		fmt.Println("findUserErr : ", findUserErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	/////////////////////// validate user password ///////////////////////

	if err := bcrypt.CompareHashAndPassword([]byte(user.SaltedHashPasswrd), []byte(loginform_data.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"msg": respond.LogInWrongPassword})
		return
	}

	/////////////////////// create user session ///////////////////////

	session := sessions.Default(c)
	logged_in_user := session.Get("logged_in_user")

	if logged_in_user == nil {
		session.Set("logged_in_user", user.Username)
		session.Save()
		c.JSON(http.StatusOK, gin.H{"msg": respond.LogInSuccess})
		return
	}

	c.JSON(http.StatusAlreadyReported, gin.H{"msg": respond.LogInDoneAlready})
}

/*
returns the user who is logged in the current session

	`\who` POST handler response status codes:

200 - Successfully responded the logged in user.

401 - No user is logged in yet.
*/
func Who(c *gin.Context) {
	session := sessions.Default(c)

	fmt.Printf("\nTest Session : %+v", session)

	user := session.Get("logged_in_user")
	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"msg": respond.LogInNone})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"msg":  respond.LogInDoneAlready,
		"user": user,
	})
}

func LogOut(c *gin.Context) {
	session := sessions.Default(c)

	user := session.Get("logged_in_user")
	if user == nil {
		c.JSON(http.StatusForbidden, gin.H{"msg": respond.LogInNone})
		return
	}

	session.Delete("logged_in_user")
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.LogOutFail})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": respond.LogOutSuccess})
}
