import React from "react";

import "../styles/AddressForm.css";

import PhLocationJSON from "../assets/locations";

export default function AddressForm({
  componentHeadingText,
  setRegion,
  setProvince,
  setCity,
  setBarangay,
  setExactAddress,
  defaultProperty,
}) {
  React.useEffect(() => {
    if (defaultProperty) {
      setRegion(defaultProperty.Region);
      setProvince(defaultProperty.Province);
      setBarangay(defaultProperty.Barangay);
      setCity(defaultProperty.City);
      setExactAddress(defaultProperty.StreetAddress);
    }
  }, []);

  const [regionIndex, setRegionIndex] = React.useState(-1);
  const [provinceIndex, setProvinceIndex] = React.useState(-1);
  const [cityIndex, setCityIndex] = React.useState(-1);
  const [barangayIndex, setBarangayIndex] = React.useState(-1);

  const selectRegion = (e) => {
    setRegion(PhLocationJSON.r[Number(e.target.value)].n);
    setProvince("");
    setCity("");
    setBarangay("");

    setRegionIndex(Number(e.target.value));
    setProvinceIndex(-1);
    setCityIndex(-1);
    setBarangayIndex(-1);
  };

  const selectProvince = (e) => {
    if (setProvince) {
      setProvince(PhLocationJSON.r[regionIndex].p[Number(e.target.value)].n);
      setCity("");
      setBarangay("");
    }

    setProvinceIndex(Number(e.target.value));
    setCityIndex(-1);
    setBarangayIndex(-1);
  };

  const selectCity = (e) => {
    if (setCity) {
      setCity(
        PhLocationJSON.r[regionIndex].p[provinceIndex].c[Number(e.target.value)]
          .n,
      );
      setBarangay("");
    }

    setCityIndex(Number(e.target.value));
    setBarangayIndex(-1);
  };

  const selectBarangay = (e) => {
    if (setBarangay) {
      setBarangay(
        PhLocationJSON.r[regionIndex].p[provinceIndex].c[cityIndex].b[
          Number(e.target.value)
        ],
      );
    }

    setBarangayIndex(Number(e.target.value));
  };

  const extractOptions = (optionsArray) => {
    return optionsArray.map((option, index) => (
      <option key={index} value={index} label={option.n} />
    ));
  };

  const extractBarangayOptions = (barangayArray) => {
    return barangayArray.map((barangay, index) => (
      <option key={index} value={index} label={barangay} />
    ));
  };

  return (
    <div className="address-form">
      <h3>{componentHeadingText}</h3>
      <div className="address-fields-drop-box-row">
        <select
          className="homefinders-form-fields"
          onChange={selectRegion}
          required
        >
          <option
            defaultValue={regionIndex}
            label={!defaultProperty ? "Region" : defaultProperty.Region}
            disabled
            selected={regionIndex === -1}
          />
          {extractOptions(PhLocationJSON.r)}
        </select>

        <select
          className="homefinders-form-fields"
          onChange={selectProvince}
          disabled={regionIndex === -1}
          required
        >
          <option
            defaultValue={provinceIndex}
            label={!defaultProperty ? "Province" : defaultProperty.Province}
            disabled
            selected={provinceIndex === -1}
          />
          {regionIndex !== -1 &&
            extractOptions(PhLocationJSON.r[regionIndex].p)}
        </select>

        <select
          className="homefinders-form-fields"
          onChange={selectCity}
          disabled={provinceIndex === -1}
          required
        >
          <option
            defaultValue={cityIndex}
            label={!defaultProperty ? "City" : defaultProperty.City}
            disabled
            selected={cityIndex === -1}
          />
          {provinceIndex !== -1 &&
            extractOptions(PhLocationJSON.r[regionIndex].p[provinceIndex].c)}
        </select>

        <select
          className="homefinders-form-fields"
          onChange={selectBarangay}
          disabled={cityIndex === -1}
          required
        >
          <option
            defaultValue={barangayIndex}
            label={!defaultProperty ? "Barangay" : defaultProperty.Barangay}
            disabled
            selected={barangayIndex === -1}
          />
          {cityIndex !== -1 &&
            extractBarangayOptions(
              PhLocationJSON.r[regionIndex].p[provinceIndex].c[cityIndex].b,
            )}
        </select>
      </div>
      <input
        className="homefinders-form-fields"
        onChange={(e) => setExactAddress(e.target.value)}
        type="text"
        required
        placeholder="Street Name/House No./Building/Exact Address"
        defaultValue={defaultProperty ? defaultProperty.StreetAddress : null}
      />
    </div>
  );
}
