import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalAPI";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    hotel && getPlaceImg();
  }, [hotel]);

  const getPlaceImg = async () => {
    const data = {
      textQuery: hotel?.hotelName.includes("[")
        ? hotel?.hotelName.slice(12, hotel?.hotelName?.length - 1).toUpperCase()
        : hotel?.hotelName,
    };
    const result = await getPlaceDetails(data).then((res) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res?.data?.places[0].photos[4].name
      );
      setRating(res?.data?.places[0]?.rating);

      setPhotoUrl(photoUrl);
    });
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${
        hotel?.hotelAddress.includes("[")
          ? hotel?.hotelName.includes("[")
            ? `${hotel?.hotelName.slice(
                12,
                hotel?.hotelName?.length - 1
              )} ${location}`
            : `${hotel?.hotelName} ${location}`
          : hotel?.hotelAddress
      }`}
      target="_blank"
    >
      <div className=" h-96 shadow-md p-2 rounded-2xl hover:scale-[1.02] hover:bg-indigo-50 transition-all cursor-pointer">
        <img
          className=" rounded-xl h-52 w-full object-cover"
          src={photoUrl ? photoUrl : "/placeholderImage.jpg"}
        />

        <div className=" my-2 flex flex-col gap-2">
          <h2 className=" font-medium">
            {hotel?.hotelName.includes("[")
              ? hotel?.hotelName
                  .slice(12, hotel?.hotelName?.length - 1)
                  .toUpperCase()
              : hotel?.hotelName}
          </h2>
          <h2 className=" font-medium text-gray-400 text-xs">
            📍{" "}
            {hotel?.hotelAddress.includes("Search")
              ? hotel.hotelAddress.slice(27, hotel?.hotelAddress.length - 1)
              : hotel?.hotelAddress}
          </h2>
          <h2 className=" font-medium text-xs">💵 {hotel?.priceRange}</h2>
          <h2 className=" font-medium text-nowrap text-amber-500 bg-indigo-50 px-1.5 justify-center rounded-full w-fit">
            ⭐ {rating ? rating : "-"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
