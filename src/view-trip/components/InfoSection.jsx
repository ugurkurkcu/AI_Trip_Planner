import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { GrSend } from "react-icons/gr";
import { getPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalAPI";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && getPlaceImg();
  }, [trip]);

  const getPlaceImg = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await getPlaceDetails(data).then((res) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[4].name
      );

      setPhotoUrl(photoUrl);
    });
  };

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/placeholderImage.jpg"}
        className=" h-[300px] w-full object-cover object-center rounded-xl"
      />

      <div className="  items-center max-sm:items-start">
        <div className=" my-5 flex flex-col gap-2">
          <h2 className=" font-bold text-xl">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className=" flex gap-5 max-sm:flex-col">
            <h2 className=" text-center p-1 px-3 bg-indigo-100 text-indigo-500 rounded-full text-sm max-sm:rounded-xl md:text-lg">
              📅 {trip?.userSelection?.numberOfDays}{" "}
              {trip?.userSelection?.numberOfDays != "1" ? "Days" : "Day"}
            </h2>
            <h2 className=" text-center p-1 px-3 bg-indigo-100 text-indigo-500 rounded-full text-sm md:text-lg max-sm:rounded-xl">
              💵 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className=" text-center p-1 px-3 bg-indigo-100 text-indigo-500 rounded-full text-sm md:text-lg max-sm:rounded-xl">
              🧑🏻‍🤝‍🧑🏼 {trip?.userSelection?.travelers}{" "}
              {trip?.userSelection?.numberOfDays != "1"
                ? "are Traveling"
                : "is Traveling"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
