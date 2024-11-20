import React, { useEffect, useState } from "react";
import { getPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalAPI";
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
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
    <Link to={"/view-trip/" + trip?.id}>
      <div className=" max-sm:max-w-[400px] shadow-md shadow-slate-700 p-2 rounded-2xl hover:shadow-lg hover:shadow-slate-700">
        <img
          src={photoUrl ? photoUrl : "/placeholderImage.jpg"}
          className=" h-[180px] w-full object-cover rounded-xl"
        />

        <div>
          <h2 className=" font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>

          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.numberOfDays} days for trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
