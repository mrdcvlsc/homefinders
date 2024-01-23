import "../styles/landing.css";

import { useNavigate } from "react-router-dom";

import { get } from "../requests/get";
import React from "react";
import DummyData from "../assets/dummy-data";
import PropertyCard from "../components/PropertyCard";
import PropertyView from "../components/PropertyView";

export default function Landing() {
  const navigate = useNavigate();

  const [selectedProvince, setSelectedProvince] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedPriceRange, setSelectedPriceRange] = React.useState({
    min: 0,
    max: 999_999_999_999,
  });

  const [propertiesArray, setPropertiesArray] = React.useState([]);
  const [selectedProperty, setSelectedProperty] = React.useState(null);

  const [displayedProperties, setDisplayedProperties] = React.useState(null); // prod -------------------
  // const [displayedProperties, setDisplayedProperties] =
  React.useState(DummyData); // dev -------------------

  const [availableProvinces, setAvailableProvinces] = React.useState([]);
  const [availablePropertyTypes, setAvailablePropertyTypes] = React.useState(
    [],
  );

  const quickDirtyGetProperties = async () => {
    try {
      const [ok, data] = await get("/get-all-properties");

      if (ok) {
        console.log("data = ");
        console.log(data);
      } else {
        throw new Error(data.msg);
      }

      let provinces = new Set();
      let property_types = new Set();

      for (let i = 0; i < data.length; ++i) {
        console.log("data[i].Province = ", data[i].Province);
        console.log("data[i].Type     = ", data[i].Type);
        console.log();
        provinces.add(data[i].Province);
        property_types.add(data[i].Type);
      }

      console.log("provinces = ", provinces);
      console.log("property_types = ", property_types);

      setPropertiesArray(data);
      setAvailableProvinces(Array.from(provinces));
      setAvailablePropertyTypes(Array.from(property_types));
    } catch (err) {
      console.error("quickDirtyGetProperties()");
      console.error(err);
    }
  };

  const handleSearch = () => {
    let property_to_display = [];

    console.log("province      = ", selectedProvince);
    console.log("property type = ", selectedType);
    console.log("minimum price = ", selectedPriceRange.min);
    console.log("maximum price = ", selectedPriceRange.max);

    for (let i = 0; i < propertiesArray.length; ++i) {
      if (
        propertiesArray[i].Province.includes(selectedProvince) &&
        propertiesArray[i].Type.includes(selectedType) &&
        propertiesArray[i].Price >= selectedPriceRange.min &&
        propertiesArray[i].Price <= selectedPriceRange.max
      ) {
        property_to_display.push(propertiesArray[i]);
      }
    }

    setDisplayedProperties(property_to_display);
  };

  React.useEffect(() => {
    quickDirtyGetProperties();
  }, []);

  return (
    <div id="landing-page">
      {selectedProperty ? (
        <PropertyView
          propertyData={selectedProperty}
          setSelectedProperty={setSelectedProperty}
        />
      ) : (
        <>
          {!displayedProperties ? (
            <>
              <h1>Discover Your Perfect Home</h1>
              <h3>Your Journey Starts Here</h3>

              {/* <div className="landing-contacts">
                <button
                  className="homefinders-btn"
                  onClick={() => navigate("/inquire")}
                >
                  Inquire Now
                </button>
                <button className="homefinders-btn">Call Us</button>
              </div> */}

              <div className="search-box">
                <div className="drop-box-container">
                  <p>Preferred province</p>
                  <select onChange={(e) => setSelectedProvince(e.target.value)}>
                    <option
                      key={"default"}
                      value={""}
                      label="Select Province"
                      disabled
                      selected
                    />
                    {availableProvinces.map((value, index) => {
                      return <option key={index} value={value} label={value} />;
                    })}
                  </select>
                </div>

                <div className="drop-box-container">
                  <p>Preferred Property type</p>
                  <select onChange={(e) => setSelectedType(e.target.value)}>
                    <option
                      key={"default"}
                      value={""}
                      label="Select Property Type"
                      disabled
                      selected
                    />
                    {availablePropertyTypes.map((value, index) => {
                      return <option key={index} value={value} label={value} />;
                    })}
                  </select>
                </div>

                <div className="drop-box-container">
                  <p>Preferred price range</p>
                  <select
                    onChange={(e) => {
                      let parsed = JSON.parse(e.target.value);
                      setSelectedPriceRange(parsed);
                    }}
                  >
                    <option
                      key={"default"}
                      value={selectedPriceRange}
                      label="Select Price Range"
                      disabled
                      selected
                    />
                    <option
                      key={"1"}
                      value={'{ "min": 1000000, "max": 2000000 }'}
                      label="₱1,000,000 - ₱2,000,000"
                    />
                    <option
                      key={"1"}
                      value={'{ "min": 2000000, "max": 3000000 }'}
                      label="₱2,000,000 - ₱3,000,000"
                    />
                    <option
                      key={"2"}
                      value={'{ "min": 3000000, "max": 5000000 }'}
                      label="₱3,000,000 - ₱5,000,000"
                    />
                    <option
                      key={"3"}
                      value={'{ "min": 5000000, "max": 10000000 }'}
                      label="₱5,000,000 - ₱10,000,000"
                    />
                    <option
                      key={"4"}
                      value={'{ "min": 10000000, "max": 999999999999 }'}
                      label="₱10,000,000 or Above"
                    />
                  </select>
                </div>

                <div className="drop-box-container">
                  <button onClick={handleSearch}>SEARCH</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="content-navigation-container">
                <h3>Search Results</h3>
                <button
                  className="homefinders-btn"
                  onClick={() => {
                    setDisplayedProperties(null);
                    setSelectedProvince("");
                    setSelectedType("");
                    setSelectedPriceRange({
                      min: 0,
                      max: 999_999_999_999,
                    });
                  }}
                >
                  Clear Results
                </button>
              </div>

              <div className="content-result-container">
                {displayedProperties ? (
                  displayedProperties.map((value, index) => {
                    return (
                      <PropertyCard
                        key={index}
                        propertyData={value}
                        setSelectedProperty={setSelectedProperty}
                      />
                    );
                  })
                ) : (
                  <p>Empty</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
