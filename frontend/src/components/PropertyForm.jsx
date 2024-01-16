import PropertyOptionsJSON from "../assets/property";
import "../styles/PropertyForm.css";

export default function PropertyForm({
  componentHeadingText,
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
}) {
  return (
    <div className="property-form">
      <h3>{componentHeadingText}</h3>
      {/* <h3>Property Information</h3> */}

      {/*=======================================================================*/}
      <input
        type="text"
        placeholder="Property Name"
        onChange={(e) => setPropertyName(e.target.value)}
        required
      />
      {/*=======================================================================*/}
      <div className="property-form-single-row-price-type-storeys">
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
          required
        />
        {/*=======================================================================*/}
        <select onChange={(e) => setPropertyType(e.target.value)}>
          <option label="Property Type" disabled selected />
          {PropertyOptionsJSON.types.map((value, index) => {
            return <option key={index} value={value} label={value} />;
          })}
        </select>
        {/*=======================================================================*/}
        <select onChange={(e) => setStoreys(e.target.value)}>
          <option label="Storeys/Floors" disabled selected />
          {PropertyOptionsJSON.storeys.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " storey"} />
            );
          })}
        </select>
      </div>

      {/*=======================================================================*/}

      <div className="property-form-single-row-four-fields">
        <input
          onChange={(e) => setLivableFloorArea(e.target.value)}
          type="number"
          placeholder="Livable Floor Area (sqm.)"
          required
        />
        <input
          onChange={(e) => setGrossArea(e.target.value)}
          type="number"
          placeholder="Gross Floor Area (sqm.)"
          required
        />
        <input
          onChange={(e) => setLotLength(e.target.value)}
          type="number"
          placeholder="Lot Length (m)"
          required
        />
        <input
          onChange={(e) => setLotWidth(e.target.value)}
          type="number"
          placeholder="Lot Width (m)"
          required
        />
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select onChange={(e) => setLivingRoom(e.target.value)}>
          <option label="Living Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
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
        <select onChange={(e) => setKitchen(e.target.value)}>
          <option label="Kitchen" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Kitchen"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setDiningRoom(e.target.value)}>
          <option label="Dining Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
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
        <select onChange={(e) => setBathRoom(e.target.value)}>
          <option label="Bath Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Bath Room"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select onChange={(e) => setBedroom(e.target.value)}>
          <option label="Bedroom" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Bedroom"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setMastersBedroom(e.target.value)}>
          <option label="Masters Bedroom" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
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
        <select onChange={(e) => setMaidRoom(e.target.value)}>
          <option label="Maid Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Maid Room"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setToilet(e.target.value)}>
          <option label="Toilet" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Toilet"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select onChange={(e) => setWalkInCloset(e.target.value)}>
          <option label="Walk in Closet" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
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
        <select onChange={(e) => setBalcony(e.target.value)}>
          <option label="Balcony" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Balcony"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setLanai(e.target.value)}>
          <option label="Lanai" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Lanai"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setCarPort(e.target.value)}>
          <option label="Car Port" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Car Port"} />
            );
          })}
        </select>
      </div>
      {setDescription ? (
        <textarea
          onChange={setDescription}
          name=""
          id=""
          cols="30"
          rows="7"
          placeholder="Description/Other Details"
        />
      ) : null}
    </div>
  );
}
