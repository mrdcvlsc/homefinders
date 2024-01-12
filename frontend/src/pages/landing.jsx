import UploadDragOrSelect from "../components/UploadDragOrSelect";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div id="landing-page">
      <h1>Discover Your Perfect Home</h1>
      <h3>Your Journey Starts Here</h3>

      <div className="search-box">
        <div className="drop-box-container">
          <p>Choose preferred province</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option key={"default"} value={""} label="No Selection" />
            <option key={"Cavite"} value={"Cavite"} label="Cavite" />
            <option key={"Batangas"} value={"Batangas"} label="Batangas" />
          </select>
        </div>

        <div className="drop-box-container">
          <p>Choose property type</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option key={"default"} value={""} label="No Selection" />
            <option
              key={"Residential"}
              value={"Residential"}
              label="Residential"
            />
            <option
              key={"Semi-Detached"}
              value={"Semi-Detached"}
              label="Semi-Detached"
            />
          </select>
        </div>

        <div className="drop-box-container">
          <p>Choose preferred price range</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option key={"default"} value={""} label="No Selection" />
            <option key={"1"} value={"1"} label="1,000,000 - 3,000,000" />
            <option key={"2"} value={"2"} label="3,000,000 - 5,000,000" />
            <option key={"3"} value={"3"} label="5,000,000 - 10,000,000" />
            <option key={"4"} value={"4"} label="10,000,000 or Above" />
          </select>
        </div>

        <div className="drop-box-container">
          <button>SEARCH</button>
        </div>
      </div>
    </div>
  );
}
