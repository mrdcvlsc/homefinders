import React from "react";
import "../styles/AddressForm.css";
import PhLocationJSON from "../assets/locations";

export default function AddressForm({
  setRegion,
  setProvince,
  setCity,
  setBarangay,
  setExactAddress,
}) {
  const [regionIndex, setRegionIndex] = React.useState(-1);
  const [provinceIndex, setProvinceIndex] = React.useState(-1);
  const [cityIndex, setCityIndex] = React.useState(-1);
  const [barangayIndex, setBarangayIndex] = React.useState(-1);

  const selectRegion = (e) => {
    setRegion(PhLocationJSON.regions[Number(e.target.value)].name);
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
      setProvince(
        PhLocationJSON.regions[regionIndex].provinces[Number(e.target.value)]
          .name,
      );
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
        PhLocationJSON.regions[regionIndex].provinces[provinceIndex].cities[
          Number(e.target.value)
        ].name,
      );
      setBarangay("");
    }

    setCityIndex(Number(e.target.value));
    setBarangayIndex(-1);
  };

  const selectBarangay = (e) => {
    if (setBarangay) {
      setBarangay(
        PhLocationJSON.regions[regionIndex].provinces[provinceIndex].cities[
          cityIndex
        ].barangays[Number(e.target.value)],
      );
    }

    setBarangayIndex(Number(e.target.value));
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
    <div className="address-form">
      <h3>Address</h3>
      <div className="address-fields-drop-box-row">
        <select onChange={selectRegion}>
          <option value={regionIndex} label="Region" disabled selected={regionIndex === -1} />
          {extractOptions(PhLocationJSON.regions)}
        </select>

        <select onChange={selectProvince} disabled={regionIndex === -1}>
          <option value={provinceIndex} label="Province" disabled selected={provinceIndex === -1} />
          {regionIndex !== -1 &&
            extractOptions(PhLocationJSON.regions[regionIndex].provinces)}
        </select>

        <select onChange={selectCity} disabled={provinceIndex === -1}>
          <option value={cityIndex} label="City" disabled selected={cityIndex === -1} />
          {provinceIndex !== -1 &&
            extractOptions(
              PhLocationJSON.regions[regionIndex].provinces[provinceIndex]
                .cities,
            )}
        </select>

        <select onChange={selectBarangay} disabled={cityIndex === -1}>
          <option value={barangayIndex} label="Barangay" disabled selected={barangayIndex === -1} />
          {cityIndex !== -1 &&
            extractBarangayOptions(
              PhLocationJSON.regions[regionIndex].provinces[provinceIndex]
                .cities[cityIndex].barangays,
            )}
        </select>
      </div>
      <input
        onChange={(e) => setExactAddress(e.target.value)}
        type="text"
        placeholder="Street Name/House No./Building/Exact Address"
      />
    </div>
  );
}
