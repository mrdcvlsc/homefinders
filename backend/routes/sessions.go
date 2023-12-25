package routes

import (
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

// in memory session secret should be 32 bytes to use AES256
var SessionStore = cookie.NewStore([]byte(os.Getenv("SESSION_SECRET")))

func SetSessionOptions(opt sessions.Options) {
	SessionStore.Options(opt)
}
