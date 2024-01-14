import PropertyOptionsJSON from "../assets/property";
import "../styles/PropertyForm.css";

export default function PropertyForm() {
  return (
    <div className="property-form">
      <h3>Property Information</h3>

      <input type="text" placeholder="Property Name" required />

      <div className="property-form-single-row-price-type-storeys">
        <input type="number" placeholder="Price" required />
        <select>
          <option label="Property Type" disabled selected />
          {PropertyOptionsJSON.types.map((value, index) => {
            return <option key={index} value={value} label={value} />;
          })}
        </select>
        <select>
          <option label="Storeys/Floors" disabled selected />
          {PropertyOptionsJSON.storeys.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " storey"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        <input type="number" placeholder="Livable Floor Area (sqm.)" required />
        <input type="number" placeholder="Gross Floor Area (sqm.)" required />
        <input type="number" placeholder="Lot Length (m)" required />
        <input type="number" placeholder="Lot Width (m)" required />
      </div>

      <div className="property-form-single-row-four-fields">
        <select>
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

        <select>
          <option label="Kitchen" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Kitchen"} />
            );
          })}
        </select>

        <select>
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

        <select>
          <option label="Bath Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Bath Room"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        <select>
          <option label="Bedroom" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Bedroom"} />
            );
          })}
        </select>

        <select>
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

        <select>
          <option label="Maid Room" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Maid Room"} />
            );
          })}
        </select>

        <select>
          <option label="Toilet" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Toilet"} />
            );
          })}
        </select>
      </div>

      <div className="property-form-single-row-four-fields">
        <select>
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

        <select>
          <option label="Balcony" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Balcony"} />
            );
          })}
        </select>

        <select>
          <option label="Lanai" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Lanai"} />
            );
          })}
        </select>

        <select>
          <option label="Car Port" disabled selected />
          {PropertyOptionsJSON.roomCounts.map((value, index) => {
            return (
              <option key={index} value={value} label={value + " Car Port"} />
            );
          })}
        </select>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="7"
        placeholder="Description/Other Details"
      ></textarea>
    </div>
  );
}
