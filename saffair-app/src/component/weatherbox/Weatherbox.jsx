import "./weatherbox.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WeatherImageContext } from "../../page/Home";

export default function Weatherbox() {
  const { airData } = useContext(WeatherImageContext);

  return (
    <Link to="/">
      <div className="weather-container">
        <div className="wicon">
          <div className="aqi-overlay">
            <div className="air-quality">{airData.airQuality}</div>
            <div className="aqi-value">
            AQI : {airData.aqiValue}</div>
          </div>
          <img src={"." + airData.imageUrl} alt="Weather Icon" />
        </div>
      </div>
    </Link>
  );
}
