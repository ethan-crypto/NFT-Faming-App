import React from "react";

const container = "w-inherit flex md:justify-center justify-between items-center flex-col pb-4"
const footerText = "sm:w-[90%] w-full flex justify-between items-center mt-3";
const rowship = "text-white text-left text-xs";
const rightReserved = "text-white text-right text-xs";
const P1 = "text-white text-md text-center";
const subContainer = "flex justify-center items-center flex-col mt-5"
const footerLine = "sm:w-[90%] w-full h-[0.25px] bg-black-400 mt-5" 

const Footer = () => (
  <div className={container}>
    <div className={footerText}>
      <p className={rowship}>Rowship 2022</p>
      <p className={rightReserved}>All rights reserved</p>
    </div>
  </div>
);

export default Footer;
