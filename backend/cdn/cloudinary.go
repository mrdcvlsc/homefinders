package cdn

import (
	"context"
	"fmt"
	"log"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/admin"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

var cld *cloudinary.Cloudinary
var ctx context.Context
var initialized bool = false

var cloudinary_folder string = "homefinders"

func InitializeCloudinary() error {
	var err error

	cld, err = cloudinary.NewFromParams("dqfelf82g", "825479935843716", "qYMZYY2yatd2vuCDVtJOkBY77no")
	ctx = context.Background()

	initialized = err == nil

	return err
}

// returns the URL of the uploaded image if there is no error
func UploadImage(image, out_img_public_id string) (string, error) {
	if !initialized {
		if cloudinary_err := InitializeCloudinary(); cloudinary_err != nil {
			return "", cloudinary_err
		}
	}

	// Upload the my_picture.jpg image and set the PublicID to "my_image".
	resp, err := cld.Upload.Upload(ctx, image, uploader.UploadParams{
		ResourceType: "image",
		Folder:       cloudinary_folder,
		PublicID:     out_img_public_id,
	})

	if err != nil {
		return "", err
	}

	return resp.SecureURL, err
}

// delete an image in the cloudinary storage
func DeleteImage(img_public_id string) error {
	var ctx = context.Background()
	result, err := cld.Admin.DeleteAssets(ctx, admin.DeleteAssetsParams{
		PublicIDs:    []string{fmt.Sprintf("%s/%s", cloudinary_folder, img_public_id)},
		DeliveryType: "upload",
		AssetType:    "image",
	})

	log.Println(result)
	return err
}
