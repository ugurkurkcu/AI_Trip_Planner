import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebase.config";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import HotelSection from "../components/HotelSection";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast.error("No Trip Found");
    }
  };
  return (
    <div className=" p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Info Sec */}

      <InfoSection trip={trip} />

      {/* Recomended Hotels */}

      <HotelSection trip={trip} />

      {/* Daily Plan */}

      {/* Footer */}
    </div>
  );
};

export default ViewTrip;
