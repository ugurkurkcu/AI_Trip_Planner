import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import TripCard from "./components/TripCard";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    setUserTrips([]);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });

    console.log(userTrips);
  };

  return (
    <div
      style={{ minHeight: "80%" }}
      className=" sm:px-12 md:px-20 lg:px-48 xl:px-64 px-5 mt-10"
    >
      <h2 className=" font-bold text-3xl">My Trips</h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {userTrips.length > 0
          ? userTrips?.map((trip, index) => (
              <TripCard trip={trip} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className=" h-52 w-full bg-slate-300 animate-pulse rounded-xl shadow-md shadow-gray-500"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default MyTrips;
