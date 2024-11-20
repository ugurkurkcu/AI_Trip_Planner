import React, { useEffect, useState } from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    handlePlans();
    console.log(trip?.tripData?.itinerary);
  }, [trip?.tripData?.itinerary]);

  const handlePlans = async () => {
    const data = await trip?.tripData?.itinerary;
    const plans = Object.values(await data)?.map((day) => day?.plan);

    // console.log(plans);
    setPlans(plans);
  };

  return (
    <div className="  mt-2">
      <h2 className=" font-bold text-lg">Places to Visit</h2>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        {plans.map((item, index) => (
          <div
            key={index}
            className=" mt-2 rounded-xl p-2 shadow-lg flex flex-col gap-2"
          >
            <h2 className=" text-lg font-medium">Day {index + 1}</h2>

            {item.map((place, index) => (
              <div key={index}>
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
