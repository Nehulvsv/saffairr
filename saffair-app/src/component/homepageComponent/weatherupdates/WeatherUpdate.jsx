import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faDroplet,
  faLocationDot,
  faSun,
  faTemperatureHigh,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import "./weatherupdate.css";
import { useContext } from "react";
import { SearchContext } from "../../../page/Home";
import { cityContext } from "../../../page/Home";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { WeatherImageContext } from "../../../page/Home";

export default function WeatherUpdate() {
  const [errormessage, setErormessage] = useState(false);
  const { airData, setAirData } = useContext(WeatherImageContext);
  const { newCity, setNewCity } = useContext(SearchContext);
  const { location, setLocation } = useContext(cityContext);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(location);
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const [aqi, setAqi] = useState("");
  const [pm2_5, setPm2_5] = useState("20");
  const [pm10, setPm10] = useState("20");
  const [co, setCo] = useState("20");
  const [so2, setSo2] = useState("20");
  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  useEffect(() => {
    setLoading(true);
    setWeather({ ...weather });
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = "5162096789da4a96c75f4792c5e4628e";
    axios
      .get(url, {
        params: {
          q: location,
          units: "metric",
          appid: api_key,
        },
      })
      .then((res) => {
        setWeather({ data: res.data, loading: false, error: false });
        setLoading(false);
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setInput("");
      });

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5162096789da4a96c75f4792c5e4628e`
        );
        const data = await response.json();
        const { coord } = data; // Destructure coord from data object
        const apiKey = "5162096789da4a96c75f4792c5e4628e";
        const aqiRes = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
        );
        const aqidata = await aqiRes.json();
        console.log(aqidata);
        const aqi = aqidata.list[0].main.aqi;
        const pm2_5value = aqidata.list[0].components.pm2_5;
        const pm10value = aqidata.list[0].components.pm10;
        const covalue = aqidata.list[0].components.co;
        const so2value = aqidata.list[0].components.so2;
        setPm2_5(pm2_5value);
        setPm10(pm10value);
        setCo(covalue);
        setSo2(so2value);
        setAqi(aqi);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [location]);

  const search = async () => {
    setLoading(true);
    try {
      setNewCity(input);

      setWeather({ ...weather });

      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "5162096789da4a96c75f4792c5e4628e";

      // Fetch weather data using Axios
      const axiosResponse = await axios.get(url, {
        params: {
          q: input,
          units: "metric",
          appid: api_key,
        },
      });
      // console.log(axiosResponse.code);
      // if (axiosResponse.code === 404) {
      //   alert("city  not found");
      //   setLoading(false);
      // }

      // Update weather state with fetched data
      setWeather({ data: axiosResponse.data, error: false });
      const { coord } = axiosResponse.data;
      if (coord) {
        // Destructure coord from data object
        const apiKey = "5162096789da4a96c75f4792c5e4628e";
        const aqiRes = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
        );
        const aqidata = await aqiRes.json();
        const aqi = aqidata.list[0].main.aqi;
        const pm2_5value = aqidata.list[0].components.pm2_5;
        const pm10value = aqidata.list[0].components.pm10;
        const covalue = aqidata.list[0].components.co;
        const so2value = aqidata.list[0].components.so2;
        setPm2_5(pm2_5value);
        setPm10(pm10value);
        setCo(covalue);
        setSo2(so2value);
        setAqi(aqi);
        setLoading(false);
      } else {
        // If coordinates are not available, display an error message
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching weather data:", error);
      setWeather({ ...weather, data: {}, error: true });
      setLoading(false);
      setErormessage(true);
      setInput("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const getBackgroundImage = () => {
    const imageMap = {
      1: "./assets/aqiImg/good.jpg",
      2: "./assets/aqiImg/Moderate.jpg",
      3: "./assets/aqiImg/Very unhealthy.jpg",
      4: "./assets/aqiImg/Unhealthy.jpg",
      5: "./assets/aqiImg/hazardous.png",
    };
    return imageMap[aqi] || "./assets/aqiImg/good.jpg";
  };

  var aqiValue;
  var air_quailty;
  if (aqi === 1) {
    aqiValue = "0 - 100";
    air_quailty = "Good";
  }
  if (aqi === 2) {
    aqiValue = "100 - 200";
    air_quailty = "Moderate";
  }
  if (aqi === 3) {
    aqiValue = "200 - 300";
    air_quailty = "Unhealthy";
  }
  if (aqi === 4) {
    aqiValue = "400 - 500";
    air_quailty = "Unhealthy";
  }
  if (aqi === 5) {
    aqiValue = "500 - 600";
    air_quailty = "Hazardous";
  }

  useEffect(() => {
    let newAqiValue;
    let newAirQuality;
    let imgValue;

    if (aqi === 1) {
      newAqiValue = "0 - 100";
      newAirQuality = "Good";
      imgValue = "./assets/aqiImg/good.jpg";
    } else if (aqi === 2) {
      newAqiValue = "100 - 200";
      newAirQuality = "Moderate";
      imgValue = "./assets/aqiImg/Moderate.jpg";
    } else if (aqi === 3) {
      newAqiValue = "200 - 300";
      newAirQuality = "Unhealthy";
      imgValue = "./assets/aqiImg/Unhealthy.jpg";
    } else if (aqi === 4) {
      newAqiValue = "400 - 500";
      newAirQuality = "Unhealthy";
      imgValue = "./assets/aqiImg/Unhealthy.jpg";
    } else if (aqi === 5) {
      newAqiValue = "500 - 600";
      newAirQuality = "Hazardous";
      imgValue = "./assets/aqiImg/hazardous.png";
    }

    // Set the new values using setAirData
    setAirData((prevAirData) => ({
      ...prevAirData,
      imageUrl: imgValue,
      aqiValue: newAqiValue,
      airQuality: newAirQuality,
    }));
  }, [aqi]); // Run this effect whenever the 'aqi' state changes

  // console.log(aqiValue);

  return (
    <div className="weather-Container">
      <div className="i-container">
        <img
          src={getBackgroundImage()}
          alt="cloudy"
          className="background-image"
        />
        {loading ? (
          <div className="spinnerr">
            <Spinner size="xl" />
          </div>
        ) : (
          <div>
            <div className="content">
              <div className="whole ">
                <div className="fhalf">
                  <div className="mx-auto">
                    {weather.error && (
                      <>
                        <br />
                        <br />
                        <span className="error-message">
                          <span style={{ fontSize: "20px" }}></span>
                        </span>
                      </>
                    )}
                    {!weather.error && weather.data && weather.data.main ? (
                      <div className="bold">
                        <div className=" thevery text-sm   text-left" id="very">
                          {aqi === 4 ? "Very " : ""}
                        </div>
                        <p className="headtext  ">{air_quailty}</p>
                        <div className="infopluslogo flex items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-4xl lg:mr-2"
                          />
                          <div className="infodata">
                            <p className="thecity">{weather.data.name}</p>
                            <p className="timedate">{toDateFunction()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bold">
                        <p className="headtext mt-0">Good</p>
                        <div className="infopluslogo flex items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-3xl lg:mr-2 lc"
                          />
                          <div className="infodata">
                            <p className="thecity">Surat</p>
                            <p className="timedate">27 April</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                </div>
                <div className="shalf">
                  <div className="scontainer">
                    <input
                      type="text"
                      className="bar"
                      placeholder="Your Country, City or Location"
                      name="query"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    {errormessage ? "city not found" : ""}
                    <Button
                      outline
                      color="light"
                      className="sbutton"
                      onClick={() => {
                        search();
                      }}
                    >
                      Search
                    </Button>
                  </div>
                  <div className="twoparts">
                    <div className="wea">
                      <div className="tago">
                        <p className="thetag">Weather</p>
                      </div>
                      {weather && weather.data && weather.data.main ? (
                        <div className="grido wthr">
                          <div className="n1">
                            <FontAwesomeIcon
                              icon={faTemperatureHigh}
                              className="text-4xl lg"
                            />
                            <div className="n1data">
                              <p className="n1name">Temperature</p>
                              <p className="n1value">
                                {" "}
                                {weather.data.main.temp} °C{" "}
                              </p>
                            </div>
                          </div>
                          <div className="n2">
                            <FontAwesomeIcon
                              icon={faWind}
                              className="text-4xl lg"
                            />
                            <div className="n2data">
                              <p className="n2name">Wind</p>
                              <p className="n2value">
                                {weather.data.wind.speed} m/s
                              </p>
                            </div>
                          </div>
                          <div className="n3 special">
                            <FontAwesomeIcon
                              icon={faDroplet}
                              className="text-4xl lg"
                            />
                            <div className="n3data runique plus ">
                              <p className="n3name">Humidity</p>
                              <p className="n3value ">
                                {weather.data.main.humidity}
                              </p>
                            </div>
                          </div>
                          <div className="n4 special">
                            <FontAwesomeIcon
                              icon={faSun}
                              className="text-4xl lg"
                            />
                            <div className="n4data ">
                              <p className="n4name">UV Index</p>
                              <p className="n4value">3</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grido wthr">
                          <div className="n1">
                            <FontAwesomeIcon
                              icon={faTemperatureHigh}
                              className="text-4xl lg"
                            />
                            <div className="n1data">
                              <p className="n1name">Temperature</p>
                              <p className="n1value">21°C </p>
                            </div>
                          </div>
                          <div className="n2">
                            <FontAwesomeIcon
                              icon={faWind}
                              className="text-4xl lg"
                            />
                            <div className="n2data">
                              <p className="n2name">Wind</p>
                              <p className="n2value">2.06 m/s</p>
                            </div>
                          </div>
                          <div className="n3 special">
                            <FontAwesomeIcon
                              icon={faDroplet}
                              className="text-4xl lg"
                            />
                            <div className="n3data runique plus ">
                              <p className="n3name">Humidity</p>
                              <p className="n3value ">36</p>
                            </div>
                          </div>
                          <div className="n4 special">
                            <FontAwesomeIcon
                              icon={faSun}
                              className="text-4xl lg"
                            />
                            <div className="n4data ">
                              <p className="n4name">UV Index</p>
                              <p className="n4value">3</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="theaqi">
                      <div className="hori-line"></div>
                      <div className="charttag">AQI</div>
                      <div className="charts">
                        <FontAwesomeIcon
                          icon={faChartSimple}
                          className="text-4xl text-white lg"
                        />
                        <p className="chartvalue">{aqiValue}</p>
                      </div>
                      <div className="grido sgrid">
                        <div className="n1 sgrp">
                          <div className="n1data txt unique">
                            <p className="n1name grp ">
                              PM
                              <p className="grpvalue">2.5</p>
                            </p>
                            <p className="n1value unique2">
                              {pm2_5} μg/m<sup>3</sup>
                            </p>
                          </div>
                        </div>
                        <div className="n1 sgrp">
                          <div className="n1data txt">
                            <p className="n1name grp">
                              PM
                              <p className="grpvalue">10</p>
                            </p>
                            <p className="n1value unique2">
                              {pm10} μg/m<sup>3</sup>
                            </p>
                          </div>
                        </div>
                        <div className="n3 sgrp">
                          <div className="n3data txt oddone">
                            <p className="n3name">CO</p>
                            <p className="n3value">
                              {co} μg/m<sup>3</sup>
                            </p>
                          </div>
                        </div>
                        <div className="n4 sgrp">
                          <div className="n4data txt">
                            <p className="n4name">
                              SO<sub>2</sub>
                            </p>
                            <p className="n4value unique2">
                              {so2} μg/m<sup>3</sup>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
