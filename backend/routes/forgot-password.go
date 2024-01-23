package routes

import (
	"crypto/rand"
	"database/sql"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"net/smtp"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/database"
	"github.com/mrdcvlsc/homefinders/persistence"
	"github.com/mrdcvlsc/homefinders/respond"
	"golang.org/x/crypto/bcrypt"
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

	/////////////////////// find if user exist ///////////////////////

	user, findUserErr := persistence.GetUser(user_account.Username + "@gmail.com")

	if findUserErr == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"msg": respond.LogInUserNotFound})
		return
	} else if findUserErr != nil {
		fmt.Println("findUserErr : ", findUserErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError})
		return
	}

	fmt.Printf("user exist = %+v", user)

	// generate random number

	rng, rngErr := rand.Int(rand.Reader, big.NewInt(8999))

	if rngErr != nil {
		fmt.Println(rngErr)
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	random_number := rng.Int64() + 1000
	fmt.Println("random number generated : ", random_number)

	// save random number in the database

	if err := persistence.SaveRecoveryCode(
		&database.RecoveryCode{
			Code:     int(random_number),
			Username: user_account.Username,
		},
	); err != nil {
		fmt.Println("findUserErr : ", findUserErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": " error saving recovery code to db"})
		return
	}

	fmt.Println("random number generated : ", random_number)

	// send email

	fmt.Println("system gmail   : ", os.Getenv("SYSTEM_GMAIL"))
	fmt.Println("gmail app pass : ", os.Getenv("SYSTEM_GMAIL_APP_PASSWORD"))
	fmt.Printf("user_account   : \n%+v\n", user_account)
	fmt.Printf("user.Email     : \n%+v\n", user)

	if err := send(
		os.Getenv("SYSTEM_GMAIL"),
		user.Email,
		"Homefinders recovery code",
		fmt.Sprintf("Your 4 digit recovery code is %d", random_number),
		os.Getenv("SYSTEM_GMAIL_APP_PASSWORD"),
	); err != nil {
		log.Print(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": " error sending recovery code to gmail"})
		return
	}

	/////////////////

	c.JSON(http.StatusOK, gin.H{"msg": "4-digit recovery code generated and sent to your email"})
}

func Validate4DigitCode(c *gin.Context) {
	user_account := Account{}

	if err := c.BindJSON(&user_account); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	fmt.Printf("validate user_account = %+v\n", user_account)

	// get the latest recovery code in db for the given user

	userRecoveryCode, errGetRecoveryCode := persistence.GetLatestRecoveryCode(user_account.Username)

	if errGetRecoveryCode != nil {
		log.Println(errGetRecoveryCode)
		c.JSON(http.StatusBadRequest, gin.H{"msg": "error getting recovery code from db"})
		return
	}

	// check if recovery code and input code is equal

	if user_account.FourDigitCode != userRecoveryCode.Code {
		c.JSON(http.StatusUnauthorized, gin.H{"msg": "wrong recovery code input"})
		return
	}

	/////////////////////// hash the raw password ///////////////////////

	raw_passwrd_byte := []byte(user_account.NewPassword)
	hash, hashErr := bcrypt.GenerateFromPassword(raw_passwrd_byte, bcrypt.DefaultCost)
	if hashErr != nil {
		fmt.Println(hashErr)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError + " (hashing failed)"})
		return
	}

	bcrypt_hashed_passwrd_string := string(hash)

	/////////////////////// save the new password ///////////////////////

	if err := persistence.EditUserPassword(user_account.Username, bcrypt_hashed_passwrd_string); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": respond.InternalServerError + " (db update hash failed)"})
		return
	}

	/////////////////////////////////////////////////////////////////////

	c.JSON(http.StatusOK, gin.H{"msg": "password successfully changed"})
}
