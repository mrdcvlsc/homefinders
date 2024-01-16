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

  const [PropertyName, setPropertyName] = React.useState("");
  const [Price, setPrice] = React.useState(0);
  const [PropertyType, setPropertyType] = React.useState("");
  const [Storeys, setStoreys] = React.useState(0);
  const [LivableFloorArea, setLivableFloorArea] = React.useState(0);
  const [GrossArea, setGrossArea] = React.useState(0);
  const [LotLength, setLotLength] = React.useState(0);
  const [LotWidth, setLotWidth] = React.useState(0);
  const [LivingRoom, setLivingRoom] = React.useState(0);
  const [Kitchen, setKitchen] = React.useState(0);
  const [DiningRoom, setDiningRoom] = React.useState(0);
  const [BathRoom, setBathRoom] = React.useState(0);
  const [Bedroom, setBedroom] = React.useState(0);
  const [MastersBedroom, setMastersBedroom] = React.useState(0);
  const [MaidRoom, setMaidRoom] = React.useState(0);
  const [Toilet, setToilet] = React.useState(0);
  const [WalkInCloset, setWalkInCloset] = React.useState(0);
  const [Balcony, setBalcony] = React.useState(0);
  const [Lanai, setLanai] = React.useState(0);
  const [CarPort, setCarPort] = React.useState(0);

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
