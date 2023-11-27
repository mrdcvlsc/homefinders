package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ServeWebApp(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
}
