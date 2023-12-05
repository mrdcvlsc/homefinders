package routes

import (
	"github.com/gin-contrib/sessions/cookie"
)

// in memory session secret should be 32 bytes to use AES256
var SessionStore = cookie.NewStore([]byte("random_session_secret_0xdeadbeef"))

type Options struct {
	Path   string
	Domain string
	// MaxAge=0 means no 'Max-Age' attribute specified.
	// MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'.
	// MaxAge>0 means Max-Age attribute present and given in seconds.
	MaxAge   int
	Secure   bool
	HttpOnly bool
}

func initialize_sessions() {
	// store.Options(sessions.Options{
	// 	HttpOnly: true,
	// 	MaxAge:   60,
	// 	Secure:   false,
	// })
}
