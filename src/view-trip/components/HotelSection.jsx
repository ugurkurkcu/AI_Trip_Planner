import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

const HotelSection = ({ trip }) => {
  const location = trip?.tripData?.tripDetails?.location;
  return (
    <div>
      <h2 className=" font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className=" grid gap-5  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-3">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HotelSection;
