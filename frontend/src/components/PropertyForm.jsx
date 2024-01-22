import React from "react";
import PropertyOptionsJSON from "../assets/property";
import "../styles/PropertyForm.css";

export default function PropertyForm({
  componentHeadingText,
  setPropertyName,
  setPrice,
  setMinPrice,
  setMaxPrice,
  setPropertyType,
  setStoreys,
  setLivableFloorArea,
  setGrossArea,
  setLotLength,
  setLotWidth,
  setLivingRoom,
  setKitchen,
  setDiningRoom,
  setBathRoom,
  setBedroom,
  setMastersBedroom,
  setMaidRoom,
  setToilet,
  setWalkInCloset,
  setBalcony,
  setLanai,
  setCarPort,
  setDescription,
  defaultProperty,
}) {
  React.useEffect(() => {
    if (defaultProperty) {
      setPropertyName(defaultProperty.Name);
      setPrice(defaultProperty.Price);
      setPropertyType(defaultProperty.Type);
      setStoreys(defaultProperty.Storeys);
      setLivableFloorArea(defaultProperty.LivableAreaSQM);
      setGrossArea(defaultProperty.GrossAreaSQM);
      setLotLength(defaultProperty.LotLengthM);
      setLotWidth(defaultProperty.LotWidthM);
      setLivingRoom(defaultProperty.LivingRoom);
      setKitchen(defaultProperty.Kitchen);
      setDiningRoom(defaultProperty.DiningRoom);
      setBathRoom(defaultProperty.BathRoom);
      setBedroom(defaultProperty.Bedroom);
      setMastersBedroom(defaultProperty.MastersBedroom);
      setMaidRoom(defaultProperty.MaidRoom);
      setToilet(defaultProperty.Toilet);
      setWalkInCloset(defaultProperty.WalkInCloset);
      setBalcony(defaultProperty.Balcony);
      setLanai(defaultProperty.Lanai);
      setCarPort(defaultProperty.CarPort);
      setDescription(defaultProperty.Description);
    }
  }, [
    defaultProperty,
    setPropertyName,
    setPrice,
    setPropertyType,
    setStoreys,
    setLivableFloorArea,
    setGrossArea,
    setLotLength,
    setLotWidth,
    setLivingRoom,
    setKitchen,
    setDiningRoom,
    setBathRoom,
    setBedroom,
    setMastersBedroom,
    setMaidRoom,
    setToilet,
    setWalkInCloset,
    setBalcony,
    setLanai,
    setCarPort,
    setDescription,
  ]);

  return (
    <div className="property-form">
      <h3>{componentHeadingText}</h3>

      {/*=======================================================================*/}
      <input
        className="homefinders-form-fields"
        type="text"
        placeholder="Property Name"
        onChange={(e) => setPropertyName(e.target.value)}
        defaultValue={defaultProperty ? defaultProperty.Name : null}
        required
      />
      {/*=======================================================================*/}
      {setPrice ? (
        <div className="property-form-single-row-price-type-storeys">
          <input
            className="homefinders-form-fields"
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            placeholder="Price"
            defaultValue={defaultProperty ? defaultProperty.Price : null}
            required
          />
          {/*=======================================================================*/}
          <select
            className="homefinders-form-fields"
            onChange={(e) => setPropertyType(e.target.value)}
            required
          >
            <option
              label={
                defaultProperty
                  ? defaultProperty.Type + " (saved)"
                  : "Property Type"
              }
              selected
              disabled
            />
            {PropertyOptionsJSON.types.map((value, index) => {
              if (value === defaultProperty?.Type) return null;

              return <option key={index} value={value} label={value} />;
            })}
          </select>
          {/*=======================================================================*/}
          <select
            className="homefinders-form-fields"
            onChange={(e) => setStoreys(Number(e.target.value))}
            required
          >
            <option
              label={
                defaultProperty
                  ? defaultProperty.Storeys + " Storeys (saved)"
                  : "Storeys/Floors"
              }
              disabled
              selected
            />
            {PropertyOptionsJSON.storeys.map((value, index) => {
              if (value === defaultProperty?.Storeys) return null;

              return (
                <option key={index} value={value} label={value + " storey"} />
              );
            })}
          </select>
        </div>
      ) : null}

      {setMinPrice && setMaxPrice ? (
        <div className="property-form-single-row-four-fields">
          <input
            className="homefinders-form-fields"
            onChange={(e) => setMinPrice(Number(e.target.value))}
            type="number"
            placeholder="Mininum Price"
            required
          />

          <input
            className="homefinders-form-fields"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            type="number"
            placeholder="Maximum Price"
            required
          />
          {/*=======================================================================*/}
          <select
            className="homefinders-form-fields"
            onChange={(e) => setPropertyType(e.target.value)}
            required
          >
            <option label="Property Type" disabled selected />
            {PropertyOptionsJSON.types.map((value, index) => {
              return <option key={index} value={value} label={value} />;
            })}
          </select>
          {/*=======================================================================*/}
          <select
            className="homefinders-form-fields"
            onChange={(e) => setStoreys(Number(e.target.value))}
            required
          >
            <option label="Storeys/Floors" disabled selected />
            {PropertyOptionsJSON.storeys.map((value, index) => {
              return (
                <option key={index} value={value} label={value + " storey"} />
              );
            })}
          </select>
        </div>
      ) : null}

      {setMinPrice && setMaxPrice ? <h3>Set Minimum Limit</h3> : null}

      {/*=======================================================================*/}

      <div className="property-form-single-row-four-fields">
        <input
          className="homefinders-form-fields"
          onChange={(e) => setLivableFloorArea(Number(e.target.value))}
          type="number"
          placeholder="Livable Floor Area (sqm.)"
          defaultValue={defaultProperty ? defaultProperty.LivableAreaSQM : null}
          required
        />
        <input
          className="homefinders-form-fields"
          onChange={(e) => setGrossArea(Number(e.target.value))}
          type="number"
          placeholder="Gross Floor Area (sqm.)"
          defaultValue={defaultProperty ? defaultProperty.GrossAreaSQM : null}
          required
        />
        <input
          className="homefinders-form-fields"
          onChange={(e) => setLotLength(Number(e.target.value))}
          type="number"
          placeholder="Lot Length (m)"
          defaultValue={defaultProperty ? defaultProperty.LotLengthM : null}
          required
        />
        <input
          className="homefinders-form-fields"
          onChange={(e) => setLotWidth(Number(e.target.value))}
          type="number"
          placeholder="Lot Width (m)"
          defaultValue={defaultProperty ? defaultProperty.LotWidthM : null}
          required
        />
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setLivingRoom(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.LivingRoom + " Living Room (saved)"
                : "Living Room"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.LivingRoom) return null;

            return (
              <option
                key={index}
                value={value}
                label={value + " Living Room"}
              />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setKitchen(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.Kitchen + " Kitchen (saved)"
                : "Kitchen"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.Kitchen) return null;

            return (
              <option key={index} value={value} label={value + " Kitchen"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setDiningRoom(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.DiningRoom + " Dining Room (saved)"
                : "Dining Room"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.DiningRoom) return null;

            return (
              <option
                key={index}
                value={value}
                label={value + " Dining Room"}
              />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setBathRoom(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.BathRoom + " Bath Room (saved)"
                : "Bath Room"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.BathRoom) return null;

            return (
              <option key={index} value={value} label={value + " Bath Room"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setBedroom(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.Bedroom + " Bedroom (saved)"
                : "Bedroom"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.Bedroom) return null;

            return (
              <option key={index} value={value} label={value + " Bedroom"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setMastersBedroom(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.MastersBedroom + " Masters Bedroom (saved)"
                : "Masters Bedroom"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.MastersBedroom) return null;

            return (
              <option
                key={index}
                value={value}
                label={value + " Masters Bedroom"}
              />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setMaidRoom(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.MaidRoom + " Maid's Room (saved)"
                : "Maid's Room"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.MaidRoom) return null;

            return (
              <option key={index} value={value} label={value + " Maid Room"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setToilet(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.Toilet + " Toilet (saved)"
                : "Toilet"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.Toilet) return null;

            return (
              <option key={index} value={value} label={value + " Toilet"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setWalkInCloset(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.WalkInCloset + " Walk in Closet (saved)"
                : "Walk in Closet"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.WalkInCloset) return null;

            return (
              <option
                key={index}
                value={value}
                label={value + " Walk in Closet"}
              />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setBalcony(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.Balcony + " Balcony (saved)"
                : "Balcony"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.Balcony) return null;

            return (
              <option key={index} value={value} label={value + " Balcony"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setLanai(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.Lanai + " Lanai (saved)"
                : "Lanai"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.Lanai) return null;

            return (
              <option key={index} value={value} label={value + " Lanai"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select
          className="homefinders-form-fields"
          onChange={(e) => setCarPort(Number(e.target.value))}
          required
        >
          <option
            label={
              defaultProperty
                ? defaultProperty.CarPort + " Car Port (saved)"
                : "Car Port"
            }
            disabled
            selected
          />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            if (value === defaultProperty?.CarPort) return null;

            return (
              <option key={index} value={value} label={value + " Car Port"} />
            );
          })}
        </select>
      </div>
      {setDescription ? (
        <textarea
          className="homefinders-form-fields"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={
            defaultProperty?.Description ? defaultProperty?.Description : null
          }
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Description/Other Details"
        />
      ) : null}
    </div>
  );
}
