package routes

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mrdcvlsc/homefinders/respond"
)

type InquiryForm struct {
	FirstName       string  `json:"first_name"`
	LastName        string  `json:"last_name"`
	Email           string  `json:"email"`
	Phone           string  `json:"phone"`
	Message         string  `json:"message"`
	PropertyName    string  `json:"property_name"`
	PropertyPrice   float64 `json:"property_price"`
	PropertyAddress string  `json:"property_address"`
}

func SendInquiry(c *gin.Context) {
	inquiry := &InquiryForm{}

	if err := c.BindJSON(&inquiry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": respond.BadRequest})
		return
	}

	/////////////////////////////////
	email_body :=
		"From : " + inquiry.LastName + ", " + inquiry.FirstName + "\n\n" +
			"They are inquiring about the property : \n" +
			inquiry.PropertyName +
			" with a price of ₱" + fmt.Sprintf("%.2f", inquiry.PropertyPrice) + "\n\n" +
			"Located on : " + inquiry.PropertyAddress + "\n\n" +
			"message : " + inquiry.Message + "\n\n" +
			"Contact them back using their given contact\n" +
			"email : " + inquiry.Email + "\n" +
			"phone : " + inquiry.Phone + "\n"

	if err := send(
		os.Getenv("SYSTEM_GMAIL"),
		os.Getenv("SYSTEM_GMAIL"),
		fmt.Sprintf("Homefinders : %s inquiry about %s", inquiry.LastName, inquiry.FirstName),
		email_body,
		os.Getenv("SYSTEM_GMAIL_APP_PASSWORD"),
	); err != nil {
		log.Print(err)
		c.JSON(http.StatusInternalServerError, gin.H{"msg": " error sending recovery code to gmail"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": " message sent"})
}
