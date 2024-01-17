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
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          placeholder="Price"
          required
        />
        {/*=======================================================================*/}
        <select onChange={(e) => setPropertyType(e.target.value)} required>
          <option label="Property Type" disabled selected />
          {PropertyOptionsJSON.types.map((value, index) => {
            return <option key={index} value={value} label={value} />;
          })}
        </select>
        {/*=======================================================================*/}
        <select onChange={(e) => setStoreys(Number(e.target.value))} required>
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
          onChange={(e) => setLivableFloorArea(Number(e.target.value))}
          type="number"
          placeholder="Livable Floor Area (sqm.)"
          required
        />
        <input
          onChange={(e) => setGrossArea(Number(e.target.value))}
          type="number"
          placeholder="Gross Floor Area (sqm.)"
          required
        />
        <input
          onChange={(e) => setLotLength(Number(e.target.value))}
          type="number"
          placeholder="Lot Length (m)"
          required
        />
        <input
          onChange={(e) => setLotWidth(Number(e.target.value))}
          type="number"
          placeholder="Lot Width (m)"
          required
        />
      </div>

      <div className="property-form-single-row-four-fields">
        {/*=======================================================================*/}
        <select onChange={(e) => setLivingRoom(Number(e.target.value))} required>
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
        <select onChange={(e) => setKitchen(Number(e.target.value))} required>
          <option label="Kitchen" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Kitchen"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setDiningRoom(Number(e.target.value))} required>
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
        <select onChange={(e) => setBathRoom(Number(e.target.value))} required>
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
        <select onChange={(e) => setBedroom(Number(e.target.value))} required>
          <option label="Bedroom" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Bedroom"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setMastersBedroom(Number(e.target.value))} required>
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
        <select onChange={(e) => setMaidRoom(Number(e.target.value))} required>
          <option label="Maid Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Maid Room"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setToilet(Number(e.target.value))} required>
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
        <select onChange={(e) => setWalkInCloset(Number(e.target.value))} required>
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
        <select onChange={(e) => setBalcony(Number(e.target.value))} required>
          <option label="Balcony" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Balcony"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setLanai(Number(e.target.value))} required>
          <option label="Lanai" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Lanai"} />
            );
          })}
        </select>

        {/*=======================================================================*/}
        <select onChange={(e) => setCarPort(Number(e.target.value))} required>
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
          onChange={(e) => setDescription(e.target.value)}
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
