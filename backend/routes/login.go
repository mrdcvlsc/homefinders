package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type LoginForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	logged_in_user := LoginForm{}

	// if error when parsing jason
	if err := c.BindJSON(&logged_in_user); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": err})
		return
	}

	session := sessions.Default(c)

	fmt.Printf("\nLogin Session : %+v", session)

	user := session.Get("user")
	if user == nil {
		session.Set("user", logged_in_user.Username)
		session.Save()
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("welcome %s to the server", user)})
	} else {
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("you are already logged in %s to the server", user)})
	}

	fmt.Print("\nlogged_in_user = ", logged_in_user, "\n\n")
}

func TestSession(c *gin.Context) {
	session := sessions.Default(c)

	fmt.Printf("\nTest Session : %+v", session)

	user := session.Get("user")
	if user == nil {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"message": "please login first"})
	} else {
		c.IndentedJSON(http.StatusOK, gin.H{"message": fmt.Sprintf("hello %s, test is working", user)})

	}
}
