import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className=" p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="" />
      <Button>Sign In</Button>
    </div>
  );
};

export default Header;
