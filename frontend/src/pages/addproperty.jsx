import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadDragOrSelect from "../components/UploadDragOrSelect";
import "../styles/addproperty.css";
import PhLocationJSON from "../assets/locations";

const AddProperty = () => {
  const navigate = useNavigate();

  const [regionIndex, setRegion] = useState(-1);
  const [provinceIndex, setProvince] = useState(-1);
  const [cityIndex, setCity] = useState(-1);
  const [barangayIndex, setBarangay] = useState(-1);

  const selectRegion = (e) => {
    setRegion(Number(e.target.value));
    setProvince(-1);
    setCity(-1);
    setBarangay(-1);
  };

  const selectProvince = (e) => {
    setProvince(Number(e.target.value));
    setCity(-1);
    setBarangay(-1);
  };

  const selectCity = (e) => {
    setCity(Number(e.target.value));
    setBarangay(-1);
  };

  const selectBarangay = (e) => {
    setBarangay(Number(e.target.value));
  };

  const extractOptions = (optionsArray) => {
    return optionsArray.map((option, index) => (
      <option key={index} value={index} label={option.name} />
    ));
  };

  const extractBarangayOptions = (barangayArray) => {
    return barangayArray.map((barangay, index) => (
      <option key={index} value={index} label={barangay} />
    ));
  };

  return (
    <div className="add-property-page">
      <h1>Add New Property</h1>

      <div className="add-property-form-container">
        <div className="add-property-form-left-side">
          <h3>Address</h3>
          <div className="address-fields-drop-box-row">
            <select onChange={selectRegion}>
              <option value={regionIndex} label="Region" disabled selected />
              {extractOptions(PhLocationJSON.regions)}
            </select>

            <select
              onChange={selectProvince}
              disabled={regionIndex === -1}
            >
              <option
                value={provinceIndex}
                label="Province"
                disabled
                selected
              />
              {regionIndex !== -1 &&
                extractOptions(PhLocationJSON.regions[regionIndex].provinces)}
            </select>

            <select onChange={selectCity} disabled={provinceIndex === -1}>
              <option value={cityIndex} label="City" disabled selected />
              {provinceIndex !== -1 &&
                extractOptions(
                  PhLocationJSON.regions[regionIndex].provinces[provinceIndex]
                    .cities,
                )}
            </select>

            <select onChange={selectBarangay} disabled={cityIndex === -1}>
              <option
                value={barangayIndex}
                label="Barangay"
                disabled
                selected
              />
              {cityIndex !== -1 &&
                extractBarangayOptions(
                  PhLocationJSON.regions[regionIndex].provinces[provinceIndex]
                    .cities[cityIndex].barangays,
                )}
            </select>
          </div>
          <input
            type="text"
            placeholder="Street Name/House No./Building/Exact Address"
          />
        </div>

        <div className="add-property-form-right-side">
          <h3>Property Sample Images</h3>
          <UploadDragOrSelect />
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
