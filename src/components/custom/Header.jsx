import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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
        window.location.reload();
      });
  };
  return (
    <div
      style={{ minHeight: "8%" }}
      className=" p-2 flex justify-between items-center px-5 bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)]"
    >
      <a href="/" className=" h-auto w-fit flex flex-row items-center gap-3">
        <img src="/logo.png" className=" w-10 h-10" />
        <h2 className=" max-md:hidden text-2xl text-[#00449A] font-mono tracking-tighter font-extrabold">
          Travel<span className=" text-[#FABF00]">Via</span>
          <span className=" text-[#E85002]">AI</span>
        </h2>
      </a>

      <div>
        {user ? (
          <div className=" flex items-center justify-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className=" rounded-full">
                + New Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className=" rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger className="popover">
                <img
                  className=" w-10 h-10 rounded-full object-contain"
                  src={user?.picture ? user?.picture : "/profileImage.png"}
                />
              </PopoverTrigger>
              <PopoverContent className=" w-auto mr-4 py-2 px-3 rounded-full">
                <h2
                  className=" cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent className=" !bg-gray-900">
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" alt="" />
            </DialogTitle>
            <DialogDescription>
              <div>
                <h2 className=" text-white font-bold text-xl text-left mt-7">
                  Sign In With Google
                </h2>

                <p className=" text-white text-sm text-left">
                  Sign in to the App with Google authentication securely
                </p>
              </div>
              <Button
                onClick={login}
                variant="secondary"
                className=" w-full mt-5 flex gap-4 items-center"
              >
                <>
                  <FcGoogle className=" w-7 h-7" />
                  Sign In With Google
                </>
              </Button>
            </DialogDescription>
            <DialogClose asChild>
              <Button
                onClick={() => setOpenDialog(false)}
                type="button"
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
