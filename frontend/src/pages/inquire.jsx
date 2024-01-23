import "../styles/inquire.css";

import { useLocation } from "react-router-dom";

const currency_formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",

  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

let empty_img_link =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

export default function Inquire() {
  const { state } = useLocation();

  return (
    <form action="#">
      <h1 className="inquire-heading">Inquire</h1>
      <div id="inquire-page">
        <div className="inquire-section">
          <h2>Personal Information</h2>

          <input
            className="homefinders-form-fields"
            type="text"
            placeholder="First Name"
          />
          <input
            className="homefinders-form-fields"
            type="text"
            placeholder="Last Name"
          />
          <input
            className="homefinders-form-fields"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="homefinders-form-fields"
            type="tel"
            placeholder="Phone Number"
          />
          <textarea
            className="homefinders-form-fields"
            placeholder="Message"
            cols="30"
            rows="5"
          />

          <div className="inquire-section-buttons">
            <button type="submit" className="homefinders-btn">
              Send Inquiry
            </button>
          </div>

          <p>Or contact us through phone : 09xx-xxx-xxxx</p>
        </div>

        <div className="inquire-section">
          <h2>
            {state.Name} - {currency_formatter.format(state.Price)}
          </h2>
          <div className="inquire-property-image-container">
            <img src={state.SampleImagesURL ? state.SampleImagesURL[0] : empty_img_link} />
          </div>
          <p>
            {state.Barangay}, {state.City}, {state.Province}
          </p>
          <p>{state.StreetAddress}</p>
        </div>
      </div>
    </form>
  );
}
