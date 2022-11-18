
import React, { useEffect, useRef, useState } from 'react';
import { Buffer } from 'buffer';
import { Web3Storage } from 'web3.storage';

import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import MergedNFTAbi from '../contractsData/Framable.json';
import MergedNFTAddress from '../contractsData/Framable-address.json';
import IERC721 from '../contractsData/IERC721.json';
import FrameAbi from '../contractsData/Frame.json';
import FrameAddress from '../contractsData/Frame-address.json';

import { create } from 'ipfs-http-client';
import SelectNFT from './SelectNFT';
import SelectFrame from './SelectFrame';
import Unmerge from './Unmerge';

const Merge = () => {
  const canvasRef = useRef(null);

  const { address, isDisconnected } = useAccount();
  const [firstNFT, setFirstNFT] = useState(null);

  const [frame, setFrame] = useState(null);
  const [frameMetadata, setFrameMetadata] = useState([]);
  const [frameTokenId, setFrameTokenId] = useState(null);

  const [accountSigner, setAccountSigner] = useState(null);
  const [frameContract, setFrameContract] = useState('');
  const [mergedNFTContract, setMergedNFTContract] = useState('');

  const [ipfs, setIpfs] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isDisconnected) {
      loadContracts();
      connectToIPFS();
    }
  }, []);

  //this function loads both our contracts
  const loadContracts = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccountSigner(signer);

      const fContract = new ethers.Contract(
        FrameAddress.address,
        FrameAbi.abi,
        signer
      );
      setFrameContract(fContract);

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

  //This is used to connect to IPFS
  const connectToIPFS = () => {
    try {
      let ipfs;
      const authorization =
        'Basic ' +
        Buffer.from(
          process.env.REACT_APP_PROJECT_ID +
            ':' +
            process.env.REACT_APP_PROJECT_SECRET
        ).toString('base64');
      ipfs = create({
        url: 'https://ipfs.infura.io:5001',
        headers: {
          authorization,
        },
      });
      console.log(ipfs);
      setIpfs(ipfs);
    } catch (error) {
      console.error('IPFS error ', error);
    }
  };

  //The below function is used to merge 2 images together. this function particularly draws the first image
  async function drawFirstImage(ctx, imageURL1) {
    return new Promise((resolve, reject) => {
      let imageObj1 = new Image();
      imageObj1.src = imageURL1;
      imageObj1.crossOrigin = 'anonymous';
      imageObj1.onload = async function () {
        resolve(await ctx.drawImage(imageObj1, 0, 0, 500, 500));
      };
    });
  }

  //And this function draws the second image on top of the first
  async function drawSecondImage(canvas, ctx, frame) {
    return new Promise((resolve, reject) => {
      let imageObj2 = new Image();
      imageObj2.src = frame;
      imageObj2.crossOrigin = 'anonymous';
      let img;
      imageObj2.onload = async function () {
        await ctx.drawImage(imageObj2, 0, 0, 500, 500);
        img = resolve(await canvas.toDataURL('image/png'));
      };
      return img;
    });
  }

  //This uploads metadata to IPFS
  const uploadMetadataToIpfs = async (metadataURI) => {
    try {
      const { cid } = await ipfs.add(metadataURI);
      let realURI = `ipfs://${cid}`;
      return realURI;
    } catch (error) {
      console.log(error);
    }
  };

  //This is the main merge function which will call eventually call the above functions
  const merge = async () => {
    try {
      setLoading(true);
      // first mint the selected nft frame
      console.log('TOPKEN ID is', frameTokenId);
      const mintFrame = await frameContract.mint(frameTokenId);
      await mintFrame.wait();
      // creating a canvas to merge both the images
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 500;
      let ctx = canvas.getContext('2d');

      //Since differenct NFT collection uses different types of TokenURI, it is hard to configure an exact method.
      //Some use IPFS url and some others use other URLs as well.
      //The problem with IPFS url is that we cannot fetch the data inside using fetch or axios and we need to convert it into an actual URL like https://ipfs.io/ipfs/${cid}
      //To solve that problem, I am checking for two different ways to process the URI and get the image from the URI
      //so if the tokenURI is ipfs, I convert it into an actual URL and then fetch the correct image
      //If it's not an IPFS url, I just use the same URL is itself as fetching the data will be possible
      let isIPFS = firstNFT.tokenUri.gateway.slice(0, 7);
      let metadataURL;
      if (isIPFS === 'ipfs://') {
        let cid1 = firstNFT.tokenUri.gateway.slice(7);
        console.log(cid1);
        metadataURL = `https://ipfs.io/ipfs/${cid1}`;
      } else {
        metadataURL = firstNFT.tokenUri.gateway;
      }

      console.log(metadataURL);
      const options = {
        method: 'GET',
        headers: { Accept: 'application/json' },
      };
      //with metadataURI we computed from the above, it will have the corresponding image URl
      const meta = await fetch(metadataURL, options);
      let res = await meta.json();

      //we get the corresponding image associated with the metadata
      //we again check if the imageURI is an IPFS url, if it is - then we do the same thing above else we just use it as it is.
      let isIPFSImage = res.image.slice(0, 7);
      let imageURL1;
      if (isIPFSImage === 'ipfs://') {
        let imageCID1 = res.image.slice(7);
        console.log(imageCID1);
        imageURL1 = `https://ipfs.io/ipfs/${imageCID1}`;
      } else {
        imageURL1 = res.image;
      }
      console.log(imageURL1);
      //Once we get the imageURI of the first image(The nft from our wallet), we call the function which draws the image
      await drawFirstImage(ctx, imageURL1);
      //Getting frame URI, we already know the frame uri when we select it. So we call the next function which draws the second image
      //this function will return the merged image
      let img = await drawSecondImage(canvas, ctx, frame);
      console.log('HERE' + img);
      let imageURL2;
      //this image will be in the base64 format and it needs to be converted to an imageFile before uploading to IPFS
      await fetch(img)
        .then((res) => res.blob())
        .then(async (blob) => {
          //creating the image file
          const file = new File(
            [blob],
            `${Number(firstNFT.id.tokenId)}XFrame.png`,
            {
              type: 'image/png',
            }
          );
          // console.log(file);
          //the below few lines will upload the image using Web3.storage to IPFS
          //I did not use ipfs-http-client here because it was slow
          const storage = new Web3Storage({
            token: process.env.REACT_APP_STORAGE_API,
          });
          console.log('Image is ', file);
          const cid = await storage.put([file]);
          //imageURL2 is the imageURI that will be added to the metadata
          imageURL2 = `https://dweb.link/ipfs/${cid}/${Number(
            firstNFT.id.tokenId
          )}XFrame.png`;
          console.log('finished first upload', imageURL2);
        });
      console.log('ImaageURI2', imageURL2);

      //Building the metadata of the newly merged NFT so that we can upload it to contract and mint it
      let name = `${firstNFT.title}XFrame`;
      let desc = 'A Collection of Framed NFTs';
      let attr = firstNFT.metadata.attributes;
      let frameAttributes = frameMetadata[frameTokenId].attributes;
      for(let i=0; i<frameAttributes.length; i++){
        attr.push(frameAttributes[i])
      }

      const metadataURI = JSON.stringify({
        name: name,
        description: desc,
        image: imageURL2,
        attributes: attr
      });
      console.log("attri" , attr);

      console.log('metadata', metadataURI);
      // uploading the metadata URI to IPFS
      const uriToMint = await uploadMetadataToIpfs(metadataURI);
      // Approve nft to be sent to contract
      const myNftContract = new ethers.Contract(
        firstNFT.contract.address,
        IERC721.abi,
        accountSigner
      );
      if (
        (await myNftContract.isApprovedForAll(
          address,
          mergedNFTContract.address
        )) == false
      ) {
        const approveTx = await myNftContract.setApprovalForAll(
          mergedNFTContract.address,
          true
        );
        await approveTx.wait();
      }
      // Finally minting the token from contract with the above URI
      const tx = await mergedNFTContract.merge(
        uriToMint,
        firstNFT.contract.address,
        firstNFT.id.tokenId
      );
      await tx.wait();
      alert('Awesome! You just framed your NFT');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // USED For Testing
  // const showshow = async () =>{
    
    
  // }

  return (
    <div>
      {' '}
      <div className='px-4 py-5 my-5 text-center'>
        <div className='row'>
          <div className='col'>
            {/* <button onClick={showshow}>Shjow</button> */}
            <SelectNFT
              setFirstNFT={setFirstNFT}
              firstNFT={firstNFT}
              address={address}
              contractAddress={null}
            />
          </div>
          <div className='col'>
            <SelectFrame
              frame={frame}
              setFrame={setFrame}
              address={address}
              setFrameMetadata={setFrameMetadata}
              setFrameTokenId={setFrameTokenId}
            />
          </div>
        </div>

        <div className='mt-5'>
          <canvas className='myCanvas' ref={canvasRef}></canvas>
        </div>
        <button           
          className="justify-center items-center py-2 px-4 hover:p-10 rounded-full cursor-pointer bg-gradient-to-r  from-blue to-purple hover:from-blue hover:via-purple hover:to-bubble-gum  text-white"  
          onClick={merge}
        >
          {loading ? (
            <span>
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>
              <span className='ms-2'>Merging...</span>
            </span>
          ) : (
            <span>Merge</span>
          )}
        </button>
      </div>{' '}
      {/* <button className='btn btn-info' onClick={showshow}>Show</button> */}
      <Unmerge />
    </div>
  );
};

export default Merge;