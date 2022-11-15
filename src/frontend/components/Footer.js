import React from "react";

const container = "w-inherit flex md:justify-center justify-between items-center flex-col mb-0"
const footerText = "sm:w-[90%] w-full flex justify-between items-center mt-3";
const rowship = "text-black text-left text-xs";
const rightReserved = "text-black text-right text-xs";
const P1 = "text-black text-md text-center";
const P2 = "text-black text-sm text-center font-medium mt-2";
const subContainer = "flex justify-center items-center flex-col mt-5"
const footerLine = "sm:w-[90%] w-full h-[0.25px] bg-black-400 mt-5" 

const Footer = () => (
  <div className={container}>
    <div className={subContainer}>
      <p className={P1}>Beautify your precious avatar in 3 clicks</p>
      <p className={P2}>support@sendcypto.com</p>
    </div>
    <div className={footerLine} />
    <div className={footerText}>
      <p className={rowship}>Rowship 2022</p>
      <p className={rightReserved}>All rights reserved</p>
    </div>
  </div>
);

export default Footer;
