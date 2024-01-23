package routes

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/respond"
)

func send(email_address_from, email_address_to, subject, body, gmail_app_pass string) error {
	from := email_address_from
	to := email_address_to

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n\n" +
		body

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, gmail_app_pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return err
	}

	log.Println("Successfully sended to " + to)
	return nil
}

type Account struct {
	Username      string `json:"username"`
	NewPassword   string `json:"new_password"`
	FourDigitCode int    `json:"four_digit_code"`
}

func Generate4DigitCode(c *gin.Context) {
	user_account := Account{}

	if err := c.BindJSON(&user_account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	fmt.Printf("generate user_account = %+v\n", user_account)

	c.JSON(http.StatusOK, gin.H{"msg": "4-digit recovery code generated and sent to your email"})
}

func Validate4DigitCode(c *gin.Context) {
	user_account := Account{}

	if err := c.BindJSON(&user_account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	fmt.Printf("validate user_account = %+v\n", user_account)

	c.JSON(http.StatusOK, gin.H{"msg": "password successfully changed"})
}
