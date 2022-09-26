import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Cssfiles.css";
import SearchIcon from "@mui/icons-material/Search";
import sun from "./sun.png";
const Searchbar = () => {
  const [state, setState] = useState("Bhadrak");
  const [forcast, setForcast] = useState([]);
  const [search, setSearch] = useState([]);
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=084794216b309ce082311cb015c638e7`;
  const weather = `https://api.openweathermap.org/data/2.5/forecast?q=${state}&appid=084794216b309ce082311cb015c638e7&units=metric&cnt=7`;
  const day = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  async function apicall() {
    let response = await fetch(api);
    let data = await response.json();
    setSearch(data);
    console.log(data);
  }

  async function weatherforcast() {
    let res = await fetch(weather);
    let data = await res.json();
    setForcast(data.list);
    console.log(data.list);
  }

  useEffect(() => {
    apicall();
    weatherforcast();
  },[]);

  const handlesubmit = () => {
    apicall();
    weatherforcast();
  };

  return (
    // main div start here

    <div className="container">
      {/* search bar  */}

      <input
        className="searchbar"
        type="text"
        placeholder="Search here ...."
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <button
        style={{ border: "none", marginLeft: "-40px", padding: "10px" }}
        onClick={handlesubmit}
      >
        <SearchIcon />
      </button>

      {/* week div start here */}

      <div className="day">
        {forcast.map((e, i) => {
          return (
            <div className="flexdiv">
              <span>{day[i]}</span>
              <p style={{ marginTop: "-1px" }}>
                <span>{Math.floor(e.main.temp_max)}°</span>{" "}
                <span>{Math.floor(e.main.temp_min)}°</span>
              </p>
              <img
                style={{ height: "60px", marginTop: "-15px" }}
                src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                alt=""
              />
              <p style={{ marginTop: "-8px" }}>{e.weather[0].main}</p>
            </div>
          );
        })}
      </div>

      {/* week div end here */}

      <div className="chart">
        <div className="chart-one" style={{ display: "flex" }}>
          {search.main ? (
            <div
              className="left"
              style={{ fontSize: "70px", fontWeight: "bold", marginLeft: "5%" }}
            >
              {Math.floor(search.main.temp - 273.15)}°C
            </div>
          ) : null}
          <div className="right" style={{ marginLeft: "5%", marginTop: "2%" }}>
            <img style={{ width: "50px" }} src={sun} alt="img" />
          </div>
        </div>

        <div style={{ display: "flex", gap: "40%" }}>
          <div
            style={{
              marginLeft: "10%",
              marginTop: "5%",
              width: "30%",
              borderRadius: "5px",
              backgroundColor: "rgb(182, 227, 227)",
              padding: "10px 20px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>Pressure</div>
            {search.main ? (
              <div
                style={{
                  marginTop: "3%",
                  marginLeft: "-2%",
                  fontWeight: "bold",
                }}
              >
                {search.main.pressure} hpa
              </div>
            ) : null}
          </div>
          <div
            style={{
              marginTop: "5%",
              width: "30%",
              marginLeft: "-20%",
              borderRadius: "5px",
              backgroundColor: "rgb(182, 227, 227)",
              padding: "10px 20px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>Humidity</div>
            {search.main ? (
              <div
                style={{
                  marginTop: "3%",
                  marginLeft: "-5%",
                  fontWeight: "bold",
                }}
              >
                {search.main.humidity}%
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex", gap: "40%" }}>
          <div style={{ marginLeft: "0%", marginTop: "5%", width: "30%" }}>
            <div style={{ fontWeight: "bold" }}>Sunrise</div>
            {search.main ? (
              <div
                style={{
                  marginTop: "3%",
                  marginLeft: "-2%",
                  fontWeight: "bold",
                }}
              >
                {new Date(search.sys.sunrise * 1000).toLocaleTimeString(
                  "en-IN"
                )}
              </div>
            ) : null}
          </div>
          <div style={{ marginTop: "5%", width: "30%" }}>
            <div style={{ fontWeight: "bold" }}>Sunset</div>
            {search.main ? (
              <div
                style={{
                  marginTop: "3%",
                  marginLeft: "1%",
                  fontWeight: "bold",
                }}
              >
                {new Date(search.sys.sunset * 1000).toLocaleTimeString("en-IN")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
