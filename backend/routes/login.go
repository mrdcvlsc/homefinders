package routes

import (
	"fmt"
	"net/http"

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

	fmt.Print("\nlogged_in_user = ", logged_in_user, "\n\n")
}
