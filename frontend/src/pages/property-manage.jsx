import React from "react";
import { useNavigate } from "react-router-dom";

import AddressForm from "../components/AddressForm";
import PropertyForm from "../components/PropertyForm";

import "../styles/property-manage.css";

import { post_with_credentials } from "../requests/post";

const PropertyManage = () => {
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = React.useState(false);
  const [properties, setProperties] = React.useState([])

  const [fetchSize, setFetchSize] = React.useState(20)
  const [maxViewTable, setMaxViewTable] = React.useState(20)

  const [region, setRegion] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [exactAddress, setExactAddress] = React.useState("");

  const [propertyName, setPropertyName] = React.useState("");
  const [minPrice, setMinPrice] = React.useState(-1);
  const [maxPrice, setMaxPrice] = React.useState(-1);
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

  const handleApplyFilters = async (e) => {
    console.log('handleApplyFilters()')
    // setDisable(true);
    e.preventDefault();

    try {
      const [ok, data] = await post_with_credentials("/get-properties", {
        fetch_size: fetchSize,
        region: region,
        province: province,
        city: city,
        barangay: barangay,
        street_address: exactAddress,
        name: propertyName,
        type: propertyType,
        min_price: minPrice,
        max_price: maxPrice,
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
      });

      if (ok) {
        console.log("success add property");
        // validation_result.success = data.msg;
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      console.log("add-property page error : ");
      console.log(err);
    }
  };

  return (
    <div className="manage-property-page">
      <div className="filter-container">
        {showFilter ? (<>
          <h1>Manage Properties</h1>

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

              <div className="manage-property-pagnation-form">
                <h3>Pagination Settings</h3>

                <div className="manage-property-pagnation-form-two-select">
                <select onChange={(e) => setFetchSize(Number(e.target.value))} required>s
                  <option key={20} value={20} label="Fetch Size 20" selected/>
                  <option key={50} value={50} label="Fetch Size 50" />
                  <option key={100} value={100} label="Fetch Size 100" />
                </select>

                <select onChange={(e) => setMaxViewTable(Number(e.target.value))} required>
                  <option key={20} value={20} label="Maximum Table Rows  20" selected/>
                  <option key={50} value={50} label="Maximum Table Rows  50" />
                  <option key={100} value={100} label="Maximum Table Rows 100" />
                </select>
                </div>
              </div>
            </div>
            <div className="manage-property-form-right-side">
              <PropertyForm
                componentHeadingText={"Match Property Information"}
                setPropertyName={setPropertyName}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
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

          <div className="add-property-form-btns">
            <button onClick={(e) => handleApplyFilters(e)} type="submit">
              Apply Filter
            </button>
            <button onClick={() => setShowFilter(false)}>Close</button>
          </div>
        </>) : <button className="homfinders-btn" onClick={() => setShowFilter(true)}>Filters</button>}
      </div>
    </div>
  );
};

export default PropertyManage;
