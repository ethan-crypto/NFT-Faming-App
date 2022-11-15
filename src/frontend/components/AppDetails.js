import React from 'react';
import { GiEgyptianProfile } from "react-icons/gi";
import bayc from "../Assets/bayc.png"


const AppDetails = () => {

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Frame your <br /> favorite NFT.
          </h1>
          <p className="text-left text-light mt-3 text-white font-light md:w-9/12 w-11/12 text-base">
            How beautiful can NFTs be? Find out by framing your NFT with one of our beautiful frames.
          </p>
            <button
            type="button"
            onClick={null}
            className="flex flex-row justify-center items-center my-5 p-2 rounded-full cursor-pointer bg-gradient-to-r from-blue to-purple hover:from-blue hover:via-purple hover:to-bubble-gum"
          >
            <GiEgyptianProfile className="text-white mr-2" />
            <p className="text-white text-base font-semibold">Start Framing</p>
          </button>
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