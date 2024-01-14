import { useNavigate } from "react-router-dom";
import UploadDragOrSelect from "../components/UploadDragOrSelect";
import "../styles/addproperty.css";
import AddressForm from "../components/AddressForm";
import React from "react";
import PropertyForm from "../components/PropertyForm";

const AddProperty = () => {
  const navigate = useNavigate();

  const [region, setRegion] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [barangay, setBarangay] = React.useState("");

  return (
    <div className="add-property-page">
      <h1>Add New Property</h1>

      {/* <h2>region : {region}</h2>
      <h2>province : {province}</h2>
      <h2>city : {city}</h2>
      <h2>barangay : {barangay}</h2> */}

      <div className="add-property-form-container">
        <div className="add-property-form-left-side">
          <AddressForm
            setRegion={setRegion}
            setProvince={setProvince}
            setCity={setCity}
            setBarangay={setBarangay}
          />
          <PropertyForm />
        </div>

        <div className="add-property-form-right-side">
          <div className="add-property-form-right-content">
            <h3>Property Sample Images</h3>
            <UploadDragOrSelect />
          </div>
          <div className="add-property-form-right-content">
            <h3>Floor Plan Images</h3>
            <UploadDragOrSelect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
