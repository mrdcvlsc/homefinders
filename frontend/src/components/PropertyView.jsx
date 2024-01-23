import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/PropertyView.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

let empty_img_link =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

const currency_formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",

  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const PropertyView = ({ propertyData, setSelectedProperty }) => {
  const navigate = useNavigate();

  return (
    <div className="property-view">
      <button
        className="homefinders-btn btn-color-red"
        onClick={() => setSelectedProperty(null)}
      >
        Go Back
      </button>

      <div className="property-view-section">
        <h1>{propertyData.Name}</h1>
        <h3>{currency_formatter.format(propertyData.Price)}</h3>
      </div>

      <div className="property-view-section">
        <h5>{propertyData.Region}</h5>
        <p>
          {propertyData.Barangay}, {propertyData.City}, {propertyData.Province}
        </p>
      </div>

      <button
        className="homefinders-btn btn-color-green"
        onClick={() => navigate("/inquire", { state: propertyData })}
      >
        Inquire
      </button>

      {/* ///////////////////////////////////////////////////////////// */}

      <div className="property-view-section">
        <div className="property-view-image">
          <h3>Sample Images</h3>
          <Carousel useKeyboardArrows={true}>
            {propertyData?.SampleImagesURL ? (
              propertyData?.SampleImagesURL.map((URL, index) => (
                <div className="slide">
                  <img alt="sample_file" src={URL} key={index} />
                </div>
              ))
            ) : (
              <div className="slide">
                <img alt="sample_file" src={empty_img_link} key={0} />
              </div>
            )}
          </Carousel>
        </div>

        {/* ///////////////////////////////////////////////////////////// */}

        {propertyData?.Description ? <p>{propertyData?.Description}</p> : null}
      </div>

      {/* ///////////////////////////////////////////////////////////// */}

      <div className="property-view-section">
        <h3>Property Type</h3>
        <p>
          {propertyData.Storeys} Storey{propertyData.Storeys > 1 ? "s" : ""}{" "}
          {propertyData.Type} Property
        </p>
      </div>

      {/* ///////////////////////////////////////////////////////////// */}

      <div className="property-view-section">
        <h3>Location</h3>
        <p>{propertyData.StreetAddress}</p>
      </div>

      {/* ///////////////////////////////////////////////////////////// */}

      <div className="property-view-section">
        <h3>Amenities & Others</h3>
        <div className="property-view-text-container">
          {propertyData?.LivableAreaSQM ? (
            <p>Livable Area {propertyData?.LivableAreaSQM}sqm.</p>
          ) : null}
          {propertyData?.GrossAreaSQM ? (
            <p>Gross Area {propertyData?.GrossAreaSQM}sqm.</p>
          ) : null}
          {propertyData?.LotLengthM ? (
            <p>Lot Length {propertyData?.LotLengthM}m</p>
          ) : null}
          {propertyData?.LotWidthM ? (
            <p>Lot Width {propertyData?.LotWidthM}m</p>
          ) : null}

          {propertyData?.LivingRoom > 0 ? (
            <p>{propertyData?.LivingRoom} LivingRoom</p>
          ) : null}
          {propertyData?.Kitchen > 0 ? (
            <p>{propertyData?.Kitchen} Kitchen</p>
          ) : null}
          {propertyData?.DiningRoom > 0 ? (
            <p>{propertyData?.DiningRoom} DiningRoom</p>
          ) : null}
          {propertyData?.BathRoom > 0 ? (
            <p>{propertyData?.BathRoom} BathRoom</p>
          ) : null}
          {propertyData?.Bedroom > 0 ? (
            <p>{propertyData?.Bedroom} Bedroom</p>
          ) : null}
          {propertyData?.MastersBedroom > 0 ? (
            <p>{propertyData?.MastersBedroom} MastersBedroom</p>
          ) : null}
          {propertyData?.MaidRoom > 0 ? (
            <p>{propertyData?.MaidRoom} MaidRoom</p>
          ) : null}
          {propertyData?.Toilet > 0 ? (
            <p>{propertyData?.Toilet} Toilet</p>
          ) : null}
          {propertyData?.WalkInCloset > 0 ? (
            <p>{propertyData?.WalkInCloset} WalkInCloset</p>
          ) : null}
          {propertyData?.Balcony > 0 ? (
            <p>{propertyData?.Balcony} Balcony</p>
          ) : null}
          {propertyData?.Lanai > 0 ? <p>{propertyData?.Lanai} Lanai</p> : null}
          {propertyData?.CarPort > 0 ? (
            <p>{propertyData?.CarPort} CarPort</p>
          ) : null}
        </div>
      </div>

      {/* ///////////////////////////////////////////////////////////// */}

      <div className="property-view-section">
        <div className="property-view-image">
          <h3>Floor Plans</h3>
          <Carousel useKeyboardArrows={true}>
            {propertyData?.FloorPlansURL ? (
              propertyData?.FloorPlansURL.map((URL, index) => (
                <div className="slide">
                  <img alt="sample_file" src={URL} key={index} />
                </div>
              ))
            ) : (
              <div className="slide">
                <img alt="sample_file" src={empty_img_link} key={0} />
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
