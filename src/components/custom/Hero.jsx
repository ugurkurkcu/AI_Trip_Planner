import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{ minHeight: "80%" }}
      className={` flex flex-col items-center mx-56 max-md:mx-36 max-sm:mx-20 gap-9`}
    >
      <h1 className=" font-extrabold text-[50px] max-sm:text-[40px] text-center mt-16">
        <span className=" text-[#f56551] max-sm:gap-6">
          Discover Your Next Adventure with Al:
        </span>{" "}
        <span>Personalized Itineraries at Your Fingertips</span>
      </h1>

      <p className=" text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started for Free</Button>
      </Link>

      {width < 400 ? <img src="/mobile.png" /> : <img src="/laptop.png" />}
    </div>
  );
};

export default Hero;
