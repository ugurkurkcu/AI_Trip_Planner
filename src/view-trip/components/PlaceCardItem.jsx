import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalAPI";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    place && getPlaceImg();
  }, [place]);

  const getPlaceImg = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    const result = await getPlaceDetails(data).then((res) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[4].name
      );

      setRating(res.data.places[0].rating);

      setPhotoUrl(photoUrl);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
      className=" flex flex-row max-sm:flex-col gap-3 shadow-inner bg-white rounded-xl p-2 hover:scale-[0.98] hover:bg-slate-100  transition-all cursor-pointer"
    >
      <img
        src={photoUrl}
        className=" h-[100px] w-[100px] max-md:w-auto object-cover rounded-lg shadow-sm shadow-black"
      />
      <div>
        <h2 className=" text-sm text-rose-300 font-black mb-2">
          {place?.timeTravel}
        </h2>
        <h2 className=" text-md font-semibold flex flex-row items-center gap-2">
          {place?.placeName} <span className=" text-nowrap text-amber-500 bg-indigo-50 px-1.5 justify-center rounded-full">⭐ {rating?rating:"-"}</span>
        </h2>
        <h2 className=" text-sm text-gray-400">{place?.placeDetails}</h2>
        <h2 className=" text-xs text-gray-400">
          <span className=" text-xs text-rose-300 font-black">Ticket: </span>
          {place?.ticketPricing}
        </h2>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
