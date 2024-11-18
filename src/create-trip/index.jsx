import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  AI_PROMPTS,
  SelectBudgetOptions,
  SelectTravellersList,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("======", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res?.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData.numberOfDays > 5) {
      toast.error("You can plan your trip for maximum 5 days");
      return;
    } else if (
      !formData?.travelers ||
      !formData?.budget ||
      !formData?.numberOfDays ||
      !formData?.location
    ) {
      toast.error("Please fill all the details");
      return;
    }
    toast.success("Trip will be generated in a moment");

    setLoading(true);

    const FINAL_PROMT = AI_PROMPTS.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.numberOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget);

    console.log(FINAL_PROMT);

    const result = await chatSession.sendMessage(FINAL_PROMT);

    const response = result?.response?.text();
    console.log(response);

    setLoading(false);

    saveAiTrip(response);
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);

    navigate("/view-trip/" + docId);
  };

  return (
    <div className=" sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 mb-10">
      <h2 className=" font-bold text-3xl">
        Tell us your travel preferences 🧳 🌴
      </h2>

      <p className=" mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className=" mt-20 flex flex-col gap-9">
        <div>
          <h2 className=" text-xl my-3 font-medium">
            What is your choice for destination?
          </h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          />
        </div>
        <div>
          <h2>How many days are you plannig your trip?</h2>

          <Input
            placeholder={"Ex. 3"}
            type="number"
            min={1}
            max={5}
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2>What is your Budget?</h2>

        <div className=" grid grid-cols-3 gap-5 mt-5 cursor-pointer">
          {SelectBudgetOptions.map((item, index) => (
            <div
              onClick={() => handleInputChange("budget", item.title)}
              key={index}
              className={` p-4 border rounded-lg hover:shadow-lg ${
                formData.budget == item.title && "shadow-lg border-indigo-300"
              }`}
            >
              <h2 className=" text-4xl">{item.icon}</h2>
              <h2 className=" text-lg font-bold">{item.title}</h2>
              <h2 className=" text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>What do you plan your next adventure?</h2>

        <div className=" grid grid-cols-4 max-sm:grid-cols-2 gap-5 mt-5 cursor-pointer">
          {SelectTravellersList.map((item, index) => (
            <div
              onClick={() => handleInputChange("travelers", item.people)}
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg ${
                formData?.travelers == item.people &&
                "shadow-lg border-indigo-300"
              }`}
            >
              <h2 className=" text-4xl">{item.icon}</h2>
              <h2 className=" text-lg font-bold">{item.title}</h2>
              <h2 className=" text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-10 flex justify-end">
        <Button disabled={loading} onClick={() => onGenerateTrip()}>
          {loading ? (
            <AiOutlineLoading className=" h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" alt="" />
            </DialogTitle>
            <DialogDescription>
              <h2 className=" font-bold text-xl text-left mt-7">
                Sign In With Google
              </h2>

              <p className="  text-sm text-left">
                Sign in to the App with Google authentication securely
              </p>

              <Button
                onClick={login}
                className=" w-full mt-5 flex gap-4 items-center"
              >
                <>
                  <FcGoogle className=" w-7 h-7" />
                  Sign In With Google
                </>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
