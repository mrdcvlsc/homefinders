import React from "react";
import { useNavigate } from "react-router-dom";

import AddressForm from "../components/AddressForm";
import PropertyForm from "../components/PropertyForm";
import UploadDragOrSelect from "../components/UploadDragOrSelect";

import { post_with_credentials } from "../requests/post";

import "../styles/property-add.css";

const PropertyAdd = () => {
  const navigate = useNavigate();

  ////////////////////// Input Field Helpers //////////////////////

  const [region, setRegion] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [exactAddress, setExactAddress] = React.useState("");

  const [propertyName, setPropertyName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [propertyType, setPropertyType] = React.useState("");
  const [storeys, setStoreys] = React.useState(0);
  const [livableFloorArea, setLivableFloorArea] = React.useState(0);
  const [grossArea, setGrossArea] = React.useState(0);
  const [lotLength, setLotLength] = React.useState(0);
  const [lotWidth, setLotWidth] = React.useState(0);
  const [livingRoom, setLivingRoom] = React.useState(0);
  const [kitchen, setKitchen] = React.useState(0);
  const [diningRoom, setDiningRoom] = React.useState(0);
  const [bathRoom, setBathRoom] = React.useState(0);
  const [bedroom, setBedroom] = React.useState(0);
  const [mastersBedroom, setMastersBedroom] = React.useState(0);
  const [maidRoom, setMaidRoom] = React.useState(0);
  const [toilet, setToilet] = React.useState(0);
  const [walkInCloset, setWalkInCloset] = React.useState(0);
  const [balcony, setBalcony] = React.useState(0);
  const [lanai, setLanai] = React.useState(0);
  const [carPort, setCarPort] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const [disable, setDisable] = React.useState(false);

  const [sampleImages, setSampleImages] = React.useState(null);
  const [floorPlans, setFloorPlans] = React.useState(null);

  const handleUpload = async (e) => {
    setDisable(true);
    e.preventDefault();

    console.log("Uploading files :");
    console.log(sampleImages);
    console.log();

    const selectedFiles = new FormData();

    if (sampleImages) {
      for (const file of sampleImages) {
        selectedFiles.append("sample_images[]", file, file.name);
      }
    }

    if (floorPlans) {
      for (const file of floorPlans) {
        selectedFiles.append("floor_plans[]", file, file.name);
      }
    }

    selectedFiles.set(
      "form_inputs",
      JSON.stringify({
        region: region,
        province: province,
        city: city,
        barangay: barangay,
        street_address: exactAddress,
        name: propertyName,
        type: propertyType,
        description: description,
        price: price,
        storeys: storeys,
        livable_area_sqm: livableFloorArea,
        gross_area_sqm: grossArea,
        lot_length_m: lotLength,
        lot_width_m: lotWidth,
        living_room: livingRoom,
        kitchen: kitchen,
        dining_room: diningRoom,
        bath_room: bathRoom,
        bedroom: bedroom,
        masters_bedroom: mastersBedroom,
        maid_room: maidRoom,
        toilet: toilet,
        walk_in_closet: walkInCloset,
        balcony: balcony,
        lanai: lanai,
        car_port: carPort,
      }),
    );

    console.log("selectedFiles = ");
    console.log(selectedFiles);

    try {
      const response = await fetch("/add-property", {
        credentials: "include",
        method: "POST",
        body: selectedFiles,
      });

      const data = await response.json();
      console.log("fetched data = ");
      console.log(data);
    } catch (err) {
      console.log("upload try catch error = ");
      console.error(err);
    }
  };

  ////////////////////// Add Property Page Body //////////////////////

  return (
    <div className="add-property-page">
      <h1>Add New Property</h1>

      <form>
        <div className="add-property-form-container">
          <div className="add-property-form-left-side">
            <AddressForm
              componentHeadingText={"Address"}
              setRegion={setRegion}
              setProvince={setProvince}
              setCity={setCity}
              setBarangay={setBarangay}
              setExactAddress={setExactAddress}
            />
            <PropertyForm
              componentHeadingText={"Property Information"}
              setPropertyName={setPropertyName}
              setPrice={setPrice}
              setPropertyType={setPropertyType}
              setStoreys={setStoreys}
              setLivableFloorArea={setLivableFloorArea}
              setGrossArea={setGrossArea}
              setLotLength={setLotLength}
              setLotWidth={setLotWidth}
              setLivingRoom={setLivingRoom}
              setKitchen={setKitchen}
              setDiningRoom={setDiningRoom}
              setBathRoom={setBathRoom}
              setBedroom={setBedroom}
              setMastersBedroom={setMastersBedroom}
              setMaidRoom={setMaidRoom}
              setToilet={setToilet}
              setWalkInCloset={setWalkInCloset}
              setBalcony={setBalcony}
              setLanai={setLanai}
              setCarPort={setCarPort}
              setDescription={setDescription}
            />
          </div>

          <div className="add-property-form-right-side">
            <div className="add-property-form-right-content">
              <h3>Property Sample Images</h3>
              <UploadDragOrSelect
                imagesUploadPostRoute={"/upload"}
                handleUpload={handleUpload}
                files={sampleImages}
                setFiles={setSampleImages}
              />
            </div>
            <div className="add-property-form-right-content">
              <h3>Floor Plan Images</h3>
              <UploadDragOrSelect
                imagesUploadPostRoute={"/upload"}
                handleUpload={handleUpload}
                files={floorPlans}
                setFiles={setFloorPlans}
              />
            </div>
          </div>
        </div>
        <div className="add-property-form-btns">
          <button onClick={(e) => handleUpload(e)} type="submit">
            Save
          </button>
          <button>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAdd;
