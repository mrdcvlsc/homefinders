import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/PropertyCard.css";

let empty_img_link =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

const currency_formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",

  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const PropertyCard = ({ propertyData, setSelectedProperty }) => {
  const navigate = useNavigate();

  return (
    <div
      className="property-card"
      onClick={() => {
        console.log("clicked hehe", propertyData.Name);
        setSelectedProperty(propertyData);
      }}
    >
      <div className="property-card-image">
        <img
          src={
            propertyData?.SampleImagesURL
              ? propertyData.SampleImagesURL[0]
              : empty_img_link
          }
        ></img>
      </div>
      <div className="property-card-text-container">
        <h3>{propertyData.Name}</h3>
        <p className="property-card-address">
          {propertyData.Barangay}, {propertyData.City}, {propertyData.Province}
        </p>

        <p className="property-card-type">
          {propertyData.Storeys} Storey{propertyData.Storeys > 1 ? "s" : ""}{" "}
          {propertyData.Type} Property
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
