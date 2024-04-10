import React, { useEffect, useState } from "react";
import "./event.css";
import { Link } from "react-router-dom";

const Event = () => {
  const [selectedOption, setSelectedOption] = useState("");
  // useEffect(() => {
  //   const fetchData  = async () => {
  //     let response = await fetch("http://localhost:6600/api/events/Events/")
  // },[])

  return (
    <div className="main">
      <div className="mt-20 w-full  bg-red-200 items-center">
        <Link to="/Showevent" target="_blank">
          <img
            src="../assets/event.jpg"
            className="eveimg w-full auto-height"
            alt="event"
          />
        </Link>
      </div>
    </div>
  );
};

export default Event;
