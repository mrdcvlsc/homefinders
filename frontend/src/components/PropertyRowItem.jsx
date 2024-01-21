import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/PropertyRowItem.css";

let empty_img_link =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

const currency_formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",

  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const PropertyRowItem = ({
  propertyData,
  setSelectedProperty,
  deletePropertyHandler,
}) => {
  const navigate = useNavigate();

  return (
    <div className="property-row-item">
      <div className="property-row-img-container">
        <img
          src={
            propertyData?.SampleImagesURL
              ? propertyData.SampleImagesURL[0]
              : empty_img_link
          }
        ></img>
      </div>
      <div className="property-row-txt-container">
        <h4>{propertyData.Name}</h4>
        <p>
          {propertyData.Storeys} Storey{propertyData.Storeys > 1 ? "s" : ""}{" "}
          {propertyData.Type} Property
        </p>
        <p>
          {propertyData.Barangay}, {propertyData.City}, {propertyData.Province}
        </p>

        <p>{currency_formatter.format(propertyData.Price)}</p>
      </div>
      <div className="property-row-btn-container">
        <button
          className="homfinders-btn"
          onClick={() => setSelectedProperty(propertyData)}
        >
          Edit
        </button>
        <button
          className="homfinders-btn"
          onClick={(e) => deletePropertyHandler(e, propertyData.Id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyRowItem;
