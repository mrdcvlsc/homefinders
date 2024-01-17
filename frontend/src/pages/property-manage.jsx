import React from "react";
import { useNavigate } from "react-router-dom";

import AddressForm from "../components/AddressForm";
import PropertyForm from "../components/PropertyForm";

import "../styles/property-manage.css";

const PropertyManage = () => {
  const navigate = useNavigate();

  const [region, setRegion] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [exactAddress, setExactAddress] = React.useState("");

  const [propertyName, setPropertyName] = React.useState("");
  const [price, setPrice] = React.useState(-1);
  const [propertyType, setPropertyType] = React.useState("");
  const [storeys, setStoreys] = React.useState(-1);
  const [livableFloorArea, setLivableFloorArea] = React.useState(-1);
  const [grossArea, setGrossArea] = React.useState(-1);
  const [lotLength, setLotLength] = React.useState(-1);
  const [lotWidth, setLotWidth] = React.useState(-1);
  const [livingRoom, setLivingRoom] = React.useState(-1);
  const [kitchen, setKitchen] = React.useState(-1);
  const [diningRoom, setDiningRoom] = React.useState(-1);
  const [bathRoom, setBathRoom] = React.useState(-1);
  const [bedroom, setBedroom] = React.useState(-1);
  const [mastersBedroom, setMastersBedroom] = React.useState(-1);
  const [maidRoom, setMaidRoom] = React.useState(-1);
  const [toilet, setToilet] = React.useState(-1);
  const [walkInCloset, setWalkInCloset] = React.useState(-1);
  const [balcony, setBalcony] = React.useState(-1);
  const [lanai, setLanai] = React.useState(-1);
  const [carPort, setCarPort] = React.useState(-1);

  return (
    <div className="manage-property-page">
      <h1>Manage Properties</h1>
      {/* 
      <p>region : {region}</p>
      <p>province : {province}</p>
      <p>city : {city}</p>
      <p>barangay : {barangay}</p>
      <p>address : {exactAddress}</p>
      
      <p>PropertyName : {PropertyName}</p>
      <p>Price : {Price}</p>
      <p>PropertyType : {PropertyType}</p>
      <p>Storeys : {Storeys}</p>
      <p>LivableFloorArea : {LivableFloorArea}</p>
      <p>GrossArea : {GrossArea}</p>
      <p>LotLength : {LotLength}</p>
      <p>LotWidth : {LotWidth}</p>
      <p>LivingRoom : {LivingRoom}</p>
      <p>Kitchen : {Kitchen}</p>
      <p>DiningRoom : {DiningRoom}</p>
      <p>BathRoom : {BathRoom}</p>
      <p>Bedroom : {Bedroom}</p>
      <p>MastersBedroom : {MastersBedroom}</p>
      <p>MaidRoom : {MaidRoom}</p>
      <p>Toilet : {Toilet}</p>
      <p>WalkInCloset : {WalkInCloset}</p>
      <p>Balcony : {Balcony}</p>
      <p>Lanai : {Lanai}</p>
      <p>CarPort : {CarPort}</p> */}

      <div className="manage-property-form-container">
        <div className="manage-property-form-left-side">
          <AddressForm
            componentHeadingText={"Match Address Filter"}
            setRegion={setRegion}
            setProvince={setProvince}
            setCity={setCity}
            setBarangay={setBarangay}
            setExactAddress={setExactAddress}
          />
        </div>
        <div className="manage-property-form-right-side">
          <PropertyForm
            componentHeadingText={"Match Property Information"}
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
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyManage;
