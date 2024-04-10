import React, { useEffect, useState } from "react";
import "./event.css";
import { Link } from "react-router-dom";

const Event = () => {
  // const [selectedOption, setSelectedOption] = useState("");
  const [event, setEvent] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        let response = await fetch("http://localhost:6600/api/events/Events");
        if (!response.ok) {
          alert("Error while fetching events!");
          throw new Error("HTTP error! status" + response.status);
        } else {
          const data = await response.json();
          setEvent(data);
        }
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(event);
  event.map((val) => console.log(val.eventImage));
  return (
    <>
      {event.map((val) => (
        <div className="main">
          <div className="mt-20 w-full  bg-red-200 items-center">
            {/* <Link to="/Showevent" target="_blank"> */}
            <Link to={`/events/${val._id}`} className="link">
              <img
                src={val.eventImage}
                className="eveimg w-full auto-height"
                alt="event"
              />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Event;
