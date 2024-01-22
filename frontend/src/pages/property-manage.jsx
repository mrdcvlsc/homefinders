import React from "react";
// import { useNavigate } from "react-router-dom";

import AddressForm from "../components/AddressForm";
import PropertyForm from "../components/PropertyForm";
import UploadDragOrSelect from "../components/UploadDragOrSelect";

import "../styles/property-manage.css";
import "../styles/property-add.css";

import { delete_with_credentials } from "../requests/delete";
import { post_with_credentials } from "../requests/post";
import DummyData from "../assets/dummy-data";
import PropertyRowItem from "../components/PropertyRowItem";
import Loading from "../components/Loading";
import { get } from "../requests/get";

const PropertyManage = () => {
  // const navigate = useNavigate();

  const [propertyCollection, setPropertyCollection] = React.useState([]); // prod
  // const [propertyCollection, setPropertyCollection] = React.useState(DummyData); // dev
  const [selectedProperty, setSelectedProperty] = React.useState(null);

  const quickDirtyGetProperties = async () => {
    try {
      const [ok, data] = await get("/get-all-properties");

      if (ok) {
        console.log("data = ");
        console.log(data);
      } else {
        throw new Error(data.msg);
      }

      setPropertyCollection(data);
    } catch (err) {
      console.error("quickDirtyGetProperties()");
      console.error(err);
    }
  };

  React.useEffect(() => {
    quickDirtyGetProperties();
  }, []);

  /////////////////////// Filter States And Methods ///////////////////////
  // set every filter state back to it's initail value
  const handleFilterClose = () => {
    setShowFilter(false)
    setFetchSize(20)
    setMaxViewTable(20)
    setMatchRegion("")
    setMatchProvince("")
    setMatchCity("")
    setMatchBarangay("")
    setMatchExactAddress("")
    setMatchPropertyName("")
    setMinPrice(-1)
    setMaxPrice(999_999_999_999)
    setMatchPropertyType("")
    setMatchStoreys(-1)
    setMinLivableFloorArea(-1)
    setMinGrossArea(-1)
    setMinLotLength(-1)
    setMinLotWidth(-1)
    setMinLivingRoom(-1)
    setMinKitchen(-1)
    setMinDiningRoom(-1)
    setMinBathRoom(-1)
    setMinBedroom(-1)
    setMinMastersBedroom(-1)
    setMinMaidRoom(-1)
    setMinToilet(-1)
    setMinWalkInCloset(-1)
    setMinBalcony(-1)
    setMinLanai(-1)
    setMinCarPort(-1)

    setShowFilter(false)
  }

  const [showFilter, setShowFilter] = React.useState(false);

  const [fetchSize, setFetchSize] = React.useState(20);
  const [maxViewTable, setMaxViewTable] = React.useState(20);

  const [matchRegion, setMatchRegion] = React.useState("");
  const [matchProvince, setMatchProvince] = React.useState("");
  const [matchCity, setMatchCity] = React.useState("");
  const [matchBarangay, setMatchBarangay] = React.useState("");
  const [matchExactAddress, setMatchExactAddress] = React.useState("");

  const [matchPropertyName, setMatchPropertyName] = React.useState("");

  const [minPrice, setMinPrice] = React.useState(-1);
  const [maxPrice, setMaxPrice] = React.useState(999_999_999_999);
  const [matchPropertyType, setMatchPropertyType] = React.useState("");
  const [matchStoreys, setMatchStoreys] = React.useState(-1);

  const [minLivableFloorArea, setMinLivableFloorArea] = React.useState(-1);
  const [minGrossArea, setMinGrossArea] = React.useState(-1);
  const [minLotLength, setMinLotLength] = React.useState(-1);
  const [minLotWidth, setMinLotWidth] = React.useState(-1);
  const [minLivingRoom, setMinLivingRoom] = React.useState(-1);
  const [minKitchen, setMinKitchen] = React.useState(-1);
  const [minDiningRoom, setMinDiningRoom] = React.useState(-1);
  const [minBathRoom, setMinBathRoom] = React.useState(-1);
  const [minBedroom, setMinBedroom] = React.useState(-1);
  const [minMastersBedroom, setMinMastersBedroom] = React.useState(-1);
  const [minMaidRoom, setMinMaidRoom] = React.useState(-1);
  const [minToilet, setMinToilet] = React.useState(-1);
  const [minWalkInCloset, setMinWalkInCloset] = React.useState(-1);
  const [minBalcony, setMinBalcony] = React.useState(-1);
  const [minLanai, setMinLanai] = React.useState(-1);
  const [minCarPort, setMinCarPort] = React.useState(-1);

  const handleApplyFilters = async (e) => {
    console.log("handleApplyFilters()");
    // setDisable(true);
    e.preventDefault();

    setFetched(false);
    setSuccess(false);

    try {
      setShow(true);

      const [ok, data] = await post_with_credentials("/get-properties", {
        fetch_size: fetchSize,
        region: matchRegion,
        province: matchProvince,
        city: matchCity,
        barangay: matchBarangay,
        street_address: matchExactAddress,
        name: matchPropertyName,
        type: matchPropertyType,
        min_price: minPrice,
        max_price: maxPrice,
        storeys: matchStoreys,
        livable_area_sqm: minLivableFloorArea,
        gross_area_sqm: minGrossArea,
        lot_length_m: minLotLength,
        lot_width_m: minLotWidth,
        living_room: minLivingRoom,
        kitchen: minKitchen,
        dining_room: minDiningRoom,
        bath_room: minBathRoom,
        bedroom: minBedroom,
        masters_bedroom: minMastersBedroom,
        maid_room: minMaidRoom,
        toilet: minToilet,
        walk_in_closet: minWalkInCloset,
        balcony: minBalcony,
        lanai: minLanai,
        car_port: minCarPort,
      });

      if (ok) {
        console.log("success fetching properties");

        console.log("data = ");
        setPropertyCollection(data);
      } else {
        throw new Error(data.msg);
      }

      setSuccess(ok);
    } catch (err) {
      setSuccess(false);
      console.log("add-property page error : ");
      console.log(err);
    }

    setFetched(true);
  };

  /////////////////////// Edit Property States And Methods ///////////////////////

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

  const [sampleImages, setSampleImages] = React.useState(null);
  const [floorPlans, setFloorPlans] = React.useState(null);

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    setShow(true);
    setSuccess(false);
    setFetched(false);

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
        id: selectedProperty?.Id,
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
      const response = await fetch("/save-edit-property", {
        credentials: "include",
        method: "POST",
        body: selectedFiles,
      });

      const data = await response.json();
      console.log("fetched data = ");
      console.log(data);

      if (!response.ok) {
        throw new Error(data.msg)
      }

      //// fetch new data /////

      const [refetched_ok, new_data] = await post_with_credentials("/get-properties", {
        fetch_size: fetchSize,
        region: matchRegion,
        province: matchProvince,
        city: matchCity,
        barangay: matchBarangay,
        street_address: matchExactAddress,
        name: matchPropertyName,
        type: matchPropertyType,
        min_price: minPrice,
        max_price: maxPrice,
        storeys: matchStoreys,
        livable_area_sqm: minLivableFloorArea,
        gross_area_sqm: minGrossArea,
        lot_length_m: minLotLength,
        lot_width_m: minLotWidth,
        living_room: minLivingRoom,
        kitchen: minKitchen,
        dining_room: minDiningRoom,
        bath_room: minBathRoom,
        bedroom: minBedroom,
        masters_bedroom: minMastersBedroom,
        maid_room: minMaidRoom,
        toilet: minToilet,
        walk_in_closet: minWalkInCloset,
        balcony: minBalcony,
        lanai: minLanai,
        car_port: minCarPort,
      });

      if (refetched_ok) {
        console.log("success fetching new properties");

        console.log("new_data = ");
        setPropertyCollection(new_data);
      } else {
        throw new Error(new_data.msg);
      }

      ///////

      setSuccess(refetched_ok);
    } catch (err) {
      setSuccess(false);
      console.log("upload try catch error = ");
      console.error(err);
    }

    setFetched(true);
  };

  /////////////////////// Delete Property States And Methods ///////////////////////

  const handleDeleteProperty = async (e, property_id) => {
    setShow(true);
    setSuccess(false);
    setFetched(false);

    try {
      ////// delete request ///////
      const [deleteOk, deleteData] = await delete_with_credentials(
        `/delete-property/${property_id}`,
      );

      if (deleteOk) {
        console.log("delete request success");
        console.log(deleteData);
      }

      //// fetch new data /////

      const [ok, data] = await post_with_credentials("/get-properties", {
        fetch_size: fetchSize,
        region: matchRegion,
        province: matchProvince,
        city: matchCity,
        barangay: matchBarangay,
        street_address: matchExactAddress,
        name: matchPropertyName,
        type: matchPropertyType,
        min_price: minPrice,
        max_price: maxPrice,
        storeys: matchStoreys,
        livable_area_sqm: minLivableFloorArea,
        gross_area_sqm: minGrossArea,
        lot_length_m: minLotLength,
        lot_width_m: minLotWidth,
        living_room: minLivingRoom,
        kitchen: minKitchen,
        dining_room: minDiningRoom,
        bath_room: minBathRoom,
        bedroom: minBedroom,
        masters_bedroom: minMastersBedroom,
        maid_room: minMaidRoom,
        toilet: minToilet,
        walk_in_closet: minWalkInCloset,
        balcony: minBalcony,
        lanai: minLanai,
        car_port: minCarPort,
      });

      if (ok) {
        console.log("success fetching new properties");

        console.log("data = ");
        setPropertyCollection(data);
      } else {
        throw new Error(data.msg);
      }

      ///////

      setSuccess(ok);
    } catch (err) {
      setSuccess(false);
      console.log("delete request error : ");
      console.error(err);
    }

    setFetched(true);
  };

  ////////////////////// Loading State Properties //////////////////////

  const [show, setShow] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);

  ////////////////////////////////////////////////////////////////////////////////

  return !selectedProperty ? (
    // ============================= Manage Property / Filter Page =============================

    <div className="manage-property-page">
      <div className="filter-container">
        {showFilter ? (
          <>
            <h1>Manage Properties</h1>

            <div className="manage-property-form-container">
              <div className="manage-property-form-left-side">
                <AddressForm
                  componentHeadingText={"Match Address Filter"}
                  setRegion={setMatchRegion}
                  setProvince={setMatchProvince}
                  setCity={setMatchCity}
                  setBarangay={setMatchBarangay}
                  setExactAddress={setMatchExactAddress}
                />

                <div className="manage-property-pagnation-form">
                  <h3>Pagination Settings</h3>

                  <div className="manage-property-pagnation-form-two-select">
                    <select
                      className="homefinders-form-fields"
                      onChange={(e) => setFetchSize(Number(e.target.value))}
                      required
                    >
                      s
                      <option
                        key={20}
                        value={20}
                        label="Fetch Size 20"
                        selected
                      />
                      <option key={50} value={50} label="Fetch Size 50" />
                      <option key={100} value={100} label="Fetch Size 100" />
                    </select>

                    <select
                      className="homefinders-form-fields"
                      onChange={(e) => setMaxViewTable(Number(e.target.value))}
                      required
                    >
                      <option
                        key={20}
                        value={20}
                        label="Maximum Table Rows  20"
                        selected
                      />
                      <option
                        key={50}
                        value={50}
                        label="Maximum Table Rows  50"
                      />
                      <option
                        key={100}
                        value={100}
                        label="Maximum Table Rows 100"
                      />
                    </select>
                  </div>
                </div>
              </div>
              <div className="manage-property-form-right-side">
                <PropertyForm
                  componentHeadingText={"Match Property Information"}
                  setPropertyName={setMatchPropertyName}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  setPropertyType={setMatchPropertyType}
                  setStoreys={setMatchStoreys}
                  setLivableFloorArea={setMinLivableFloorArea}
                  setGrossArea={setMinGrossArea}
                  setLotLength={setMinLotLength}
                  setLotWidth={setMinLotWidth}
                  setLivingRoom={setMinLivingRoom}
                  setKitchen={setMinKitchen}
                  setDiningRoom={setMinDiningRoom}
                  setBathRoom={setMinBathRoom}
                  setBedroom={setMinBedroom}
                  setMastersBedroom={setMinMastersBedroom}
                  setMaidRoom={setMinMaidRoom}
                  setToilet={setMinToilet}
                  setWalkInCloset={setMinWalkInCloset}
                  setBalcony={setMinBalcony}
                  setLanai={setMinLanai}
                  setCarPort={setMinCarPort}
                />
              </div>
            </div>

            <div className="add-property-form-btns">
              <button
                className="homefinders-btn"
                onClick={(e) => handleApplyFilters(e)}
                type="submit"
              >
                Apply Filter
              </button>
              <button
                className="homefinders-btn"
                onClick={() => handleFilterClose()}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <button
            className="homefinders-btn"
            onClick={() => {
              console.log("properties = ");
              console.log(propertyCollection);
              setShowFilter(true);
            }}
          >
            Filters
          </button>
        )}
      </div>

      <div className="manage-property-contents-container">
        {propertyCollection
          ? propertyCollection.map((p, i) => {
              return (
                <PropertyRowItem
                  key={i}
                  propertyData={p}
                  setSelectedProperty={setSelectedProperty}
                  deletePropertyHandler={handleDeleteProperty}
                />
              );
            })
          : null}
      </div>

      <Loading
        show={show}
        setShow={setShow}
        success={success}
        setSuccess={setSuccess}
        fetched={fetched}
        setFetched={setFetched}
        successAfterAction={() => {
          setShow(false);
        }}
      />
    </div>
  ) : (
    // ============================= Edit Property Page =============================
    <div className="add-property-page">
      <h1>Edit Selected Property</h1>

      <form>
        <div className="add-property-form-container">
          <div className="add-property-form-left-side">
            <AddressForm
              componentHeadingText={"Address"}
              defaultProperty={selectedProperty}
              setRegion={setRegion}
              setProvince={setProvince}
              setCity={setCity}
              setBarangay={setBarangay}
              setExactAddress={setExactAddress}
            />
            <PropertyForm
              componentHeadingText={"Property Information"}
              defaultProperty={selectedProperty}
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
              <h3>Upload New Property Sample Images</h3>
              <UploadDragOrSelect
                files={sampleImages}
                setFiles={setSampleImages}
              />
            </div>
            <div className="add-property-form-right-content">
              <h3>Upload New Floor Plan Images</h3>
              <UploadDragOrSelect files={floorPlans} setFiles={setFloorPlans} />
            </div>
          </div>
        </div>
        <div className="add-property-form-btns">
          <button
            className="homefinders-btn"
            onClick={(e) => handleSaveEdit(e)}
            type="submit"
          >
            Save
          </button>
          <button
            className="homefinders-btn"
            onClick={() => setSelectedProperty(null)}
          >
            Cancel
          </button>
        </div>
      </form>

      <Loading
        show={show}
        setShow={setShow}
        success={success}
        setSuccess={setSuccess}
        fetched={fetched}
        setFetched={setFetched}
        successAfterAction={() => {}}
      />
    </div>
  );
};

export default PropertyManage;
