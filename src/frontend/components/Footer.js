import React from "react";

const container = "w-inherit flex md:justify-center justify-between items-center flex-col mt-16 pb-4"
const footerText = "sm:w-[90%] w-full flex justify-between items-center mt-3";
const rowship = "text-white text-left text-xs";
const rightReserved = "text-white text-right text-xs"; 

const Footer = () => (
  <div className={container}>
    <div className={footerText}>
      <p className={rowship}>Rowship 2022</p>
      <p className={rightReserved}>All rights reserved</p>
    </div>
  </div>
);

export default Footer;
