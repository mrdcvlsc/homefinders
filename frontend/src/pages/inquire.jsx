import React from "react";
import "../styles/inquire.css";

import { useLocation } from "react-router-dom";
import { post, post_with_credentials } from "../requests/post";

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

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [senderEmail, setSenderEmail] = React.useState("");
  const [senderPhone, setSenderPhone] = React.useState("");
  const [senderMessage, setSenderMessage] = React.useState("");

  const [formDisable, setFormDisable] = React.useState(false);

  const [errorMsg, setErrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");

  const handleSubmit = async (e) => {
    setFormDisable(true);

    try {
      if (firstName === "") {
        throw new Error("Fillup First Name");
      }
      if (lastName === "") {
        throw new Error("Fillup Last Name");
      }
      if (senderEmail === "") {
        throw new Error("Fillup Email");
      }
      if (senderPhone === "") {
        throw new Error("Fillup Phone");
      }
      if (senderMessage === "") {
        throw new Error("Fillup Message");
      }

      const [ok, data] = await post("/send-inquiry", {
        first_name: firstName,
        last_name: lastName,
        email: senderEmail,
        phone: senderPhone,
        message: senderMessage,
        property_name: state.Name,
        property_price: state.Price,
        property_address: state.StreetAddress,
      });

      if (!ok) {
        throw new Error(data.msg);
      }

      setSuccessMsg("Your inquiry has been sent");
      setErrorMsg("");
    } catch (err) {
      setFormDisable(false);
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <h1 className="inquire-heading">Inquire</h1>
      <div id="inquire-page">
        <div className="inquire-section">
          <h2>Personal Information</h2>

          <input
            disabled={formDisable}
            onChange={(e) => setFirstName(e.target.value)}
            className="homefinders-form-fields"
            type="text"
            placeholder="First Name"
          />
          <input
            disabled={formDisable}
            onChange={(e) => setLastName(e.target.value)}
            className="homefinders-form-fields"
            type="text"
            placeholder="Last Name"
          />
          <input
            disabled={formDisable}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="homefinders-form-fields"
            type="email"
            placeholder="Email Address"
          />
          <input
            disabled={formDisable}
            onChange={(e) => setSenderPhone(e.target.value)}
            className="homefinders-form-fields"
            type="tel"
            placeholder="Phone Number"
          />
          <textarea
            disabled={formDisable}
            onChange={(e) => setSenderMessage(e.target.value)}
            className="homefinders-form-fields"
            placeholder="Message"
            cols="30"
            rows="5"
          />

          <div className="inquire-section-buttons">
            <button
              onClick={handleSubmit}
              disabled={formDisable}
              type="submit"
              className="homefinders-btn"
            >
              Send Inquiry
            </button>
            <p className="homefinders-color-error">{errorMsg}</p>
            <p className="homefinders-color-success">{successMsg}</p>
          </div>

          <p>Or contact us through phone : 09xx-xxx-xxxx</p>
        </div>

        <div className="inquire-section">
          <h2>
            {state.Name} - {currency_formatter.format(state.Price)}
          </h2>
          <div className="inquire-property-image-container">
            <img
              src={
                state.SampleImagesURL
                  ? state.SampleImagesURL[0]
                  : empty_img_link
              }
            />
          </div>
          <p>
            {state.Barangay}, {state.City}, {state.Province}
          </p>
          <p>{state.StreetAddress}</p>
        </div>
      </div>
    </>
  );
}
