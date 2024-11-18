import React from "react";
import { Link } from "react-router-dom";

const HotelSection = ({ trip }) => {
  console.log(trip?.tripData?.hotels);
  return (
    <div>
      <h2 className=" font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className=" grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-3">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelAddress}`}
          >
            <div className=" shadow-md p-2 rounded-2xl hover:scale-105 transition-all cursor-pointer">
              <img className=" rounded-xl" src="/placeholderImage.jpg" />

              <div className=" my-2 flex flex-col gap-2">
                <h2 className=" font-medium">{hotel.hotelName}</h2>
                <h2 className=" font-medium text-gray-400 text-xs">
                  📍 {hotel.hotelAddress}
                </h2>
                <h2 className=" font-medium text-xs">💵 {hotel.price}</h2>
                <h2 className=" font-medium text-xs">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotelSection;
