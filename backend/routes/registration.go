package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RegistrationForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Register(c *gin.Context) {
	registered_user := RegistrationForm{}

	// if error when parsing jason
	if err := c.BindJSON(&registered_user); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": err})
		return
	}

	fmt.Print("\nregistered_user = ", registered_user, "\n\n")
}
