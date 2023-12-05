package routes

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

// in memory session secret should be 32 bytes to use AES256
var SessionStore = cookie.NewStore([]byte("random_session_secret_0xdeadbeef"))

func SetSessionOptions(opt sessions.Options) {
	SessionStore.Options(opt)
}
