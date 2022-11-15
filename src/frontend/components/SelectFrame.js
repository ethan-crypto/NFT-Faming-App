import React, { useState } from 'react';

const SelectFrame = ({ frame, setFrame, address, setFrameTokenId }) => {
  const [frameImages, setFrameImages] = useState([]);

  const getAllFrames = () => {
    try {
      //TODO: You may change the below IPFS URL.
      //However, please make sure that you need to give the Image URL here and NOT the metadata one
      //Also, make sure that the filenames of the images are named like 0.png, 1.png, 2.png etc..
      //So the final URL will be something like https://ipfs.io/ipfs/{YOUR-CID}/0.png...
      let frames = [];
      //TODO: Please change the number "2" to the total number of images that you have
      for (let i = 0; i <= 2; i++) {
        frames.push(
          `https://ipfs.io/ipfs/QmcwqTXcTbNMcSYdZC99rhatgvDymKj12bfDpFPnpbENqq/${i}.png`
        );
      }
      setFrameImages(frames);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {frame != null && (
          <div
            className='card col-lg-4 m-auto mb-5 shadow border-0'
            style={{ width: '20rem' }}
          >
            <div className='image-box'>
              <img
                src={frame}
                className='nft-img card-img-top pt-3'
                alt='...'
              />
            </div>
          </div>
        )}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center yellow-glassmorphism mb-5"></div>
        <button
          type='button'
          className='btn border-blue text-black bg-transparent hover:text-white hover:border-green'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal1'
          onClick={getAllFrames}
        >
          Select Frame
        </button>
      </div>
      </div>
      {/* For listing frames */}
      <div
        className='modal fade'
        id='exampleModal1'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel1'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel1'>
                Your NFTs
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='row'>
                {frameImages !== [] &&
                  frameImages.map((frame, i) => {
                    return (
                      <div
                        key={i}
                        className='card col-lg-4 m-auto mb-5 shadow border-0'
                        style={{ width: '10rem' }}
                      >
                        <div className='image-box'>
                          <img
                            src={frame}
                            className='nft-img card-img-top pt-3'
                            alt='...'
                          />
                        </div>
                        <div className='card-body'>
                          <button
                            className='btn btn-primary btn-sm'
                            data-bs-dismiss='modal'
                            onClick={() => {
                              setFrame(frame);
                              setFrameTokenId(i);
                            }}
                          >
                            Select this
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFrame;
