import React from "react";
import bayc from "../Assets/bayc.png";
import image1 from "../Assets/1.png";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const StoryCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-col justify-center items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col justify-center items-center text-center">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-center text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const slideShow = () => {
  return (
    <div id="cf">
      <img class="bottom" src={bayc} />
      <img class="top" src={image1} />
    </div>
  );
};

const Home = () => {
  return (
    <><div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 ml-10">
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
          {/* <div className="sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism"> */}
          {/* <img src={bayc} alt="bayc nft image" /> */}
          <div id="cf">
            <img className="bottom h-5/6 w-3/6" src={bayc} />
            <img className="top h-5/6 w-3/6" src={image1} />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div><div className="flex flex-col md:flex-row w-full justify-center items-center pb-16">
        <div className="flex flex-col items-center justify-between">
          <div className="flex-1 flex flex-col justify-center items-center my-4">
            <h1 className="text-white text-3xl text- center sm:text-5xl py-2">Why Framing?</h1>
            <p className="text-left my-2 text-white text-center font-light md:w-9/12 w-11/12 text-base">
              Our frames offer an opportunity to stand out from the rest.
            </p>
          </div>

          <div className="flex-1 flex flex-row justify-start items-center">
            <StoryCard
              color="bg-[#2952E3]"
              title="Rarity"
              icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
              subtitle="Uncover scarce add ons" />
            <StoryCard
              color="bg-[#8945F8]"
              title="Upgradability"
              icon={<BiSearchAlt fontSize={21} className="text-white" />}
              subtitle="Enhance perks without sacrificing authenticity" />
            <StoryCard
              color="bg-[#F84550]"
              title="Engagement"
              icon={<RiHeart2Fill fontSize={21} className="text-white" />}
              subtitle="Retain community attention" />
          </div>
        </div>
      </div></>
  );
};

export default Home;
