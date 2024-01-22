import "../styles/landing.css";

import PhLocationJSON from "../assets/locations";
import { get } from "../requests/get";
import React from "react";

export default function Landing() {
  const [propertiesArray, setPropertiesArray] = React.useState([])
  const [availableProvinces, setAvailableProvinces] = React.useState([])
  const [availablePropertyTypes, setAvailablePropertyTypes] = React.useState([])

  const quickDirtyGetProperties = async () => {
    try {
      const [ok, data] = await get('/get-all-properties')
        
      if (ok) {
        console.log('data = ')
        console.log(data)
      } else {
        throw new Error(data.msg)
      }

      let provinces = new Set()
      let property_types = new Set()

      for (let i = 0; i < data.length; ++i) {
        console.log('data[i].Province = ', data[i].Province)
        console.log('data[i].Type     = ', data[i].Type)
        console.log()
        provinces.add(data[i].Province)
        property_types.add(data[i].Type) 
      }

      console.log('provinces = ', provinces)
      console.log('property_types = ', property_types)

      setPropertiesArray(data)
      setAvailableProvinces(Array.from(provinces))
      setAvailablePropertyTypes(Array.from(property_types))
    } catch (err) {
      console.error('quickDirtyGetProperties()')
      console.error(err)
    }
  }

  React.useEffect(() => {
    quickDirtyGetProperties()
  }, [])

  return (
    <div id="landing-page">
      <h1>Discover Your Perfect Home</h1>
      <h3>Your Journey Starts Here</h3>

      <div className="search-box">
        <div className="drop-box-container">
          <p>Preferred province</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option
              key={"default"}
              value={""}
              label="Select Province"
              disabled
              selected
            />
            {availableProvinces.map((value, index) => {
              return (
                <option key={index} value={value} label={value} />
              )
            })}
          </select>
        </div>

        <div className="drop-box-container">
          <p>Preferred Property type</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option
              key={"default"}
              value={""}
              label="Select Property Type"
              disabled
              selected
            />
            {availablePropertyTypes.map((value, index) => {
              return (
                <option key={index} value={value} label={value} />
              )
            })}
          </select>
        </div>

        <div className="drop-box-container">
          <p>Preferred price range</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option
              key={"default"}
              value={""}
              label="Select Price Range"
              disabled
              selected
            />
            <option key={"1"} value={{min: 1_000_000, max: 3_000_000}} label="₱1,000,000 - ₱3,000,000" />
            <option key={"2"} value={{min: 3_000_000, max: 5_000_000}} label="₱3,000,000 - ₱5,000,000" />
            <option key={"3"} value={{min: 5_000_000, max: 10_000_000}} label="₱5,000,000 - ₱10,000,000" />
            <option key={"4"} value={{min: 10_000_000, max: 999_999_999_999}} label="₱10,000,000 or Above" />
          </select>
        </div>

        <div className="drop-box-container">
          <button>SEARCH</button>
        </div>
      </div>
    </div>
  );
}
