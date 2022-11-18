import React from "react";
import bayc from "../Assets/bayc.png";

const AppDetails = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Frame your <br /> favorite NFT.
          </h1>
          <p className="text-left text-light mt-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Want to upgrade your NFT rarity? Turbo charge the power of your
            digital assets with our unique frames.
          </p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <img src={bayc} alt="bayc nft image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
