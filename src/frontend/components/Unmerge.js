import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SelectNFT from "./SelectNFT";
import MergedNFTAddress from "../contractsData/Framable-address.json";
import MergedNFTAbi from "../contractsData/Framable.json";
import { ethers } from "ethers";

const Unmerge = () => {
  const { address, isDisconnected } = useAccount();
  const [mergedNft, setMergedNft] = useState(null);
  const [mergedNFTContract, setMergedNFTContract] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const mContract = new ethers.Contract(
        MergedNFTAddress.address,
        MergedNFTAbi.abi,
        signer
      );
      setMergedNFTContract(mContract);
    } catch (error) {
      console.log(error);
    }
  };

  const unmerge = async () => {
    try {
      setLoading(true);
      const tx = await mergedNFTContract.unmerge(Number(mergedNft.id.tokenId));
      await tx.wait();
      alert("Success");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container text-center">
      <button
        type="button"
        className={"justify-center items-center text-white py-2 px-4 rounded-full cursor-pointer bg-gradient-to-r from-blue to-purple hover:from-blue hover:via-purple hover:to-bubble-gum"}
        onClick={unmerge}
      >
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="ms-2">Unmerging...</span>
          </span>
        ) : (
          <span>Unmerge</span>
        )}
      </button>
    </div>
  );
};

export default Unmerge;
