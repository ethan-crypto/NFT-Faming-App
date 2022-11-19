import React, { useState } from 'react';
import { buttonStyle } from '../utils/reusable';

const SelectFrame = ({ frame, setFrame, address, setFrameMetadata, setFrameTokenId }) => {
  const [frameImages, setFrameImages] = useState([]);

  const getAllFrames = async () => {
    try {
      let frames = [];
      let frameMeta = []
      // TODO: Please change the number "3" to the total number of images
      for (let i = 0; i < 3; i++) {
        // TODO: You may change the below IPFS URL. This is the same TokenURI given in during contract deployment
        const tx = await fetch(`https://ipfs.io/ipfs/QmSoioz8PmVGZp2XxYn8aVjriUmL8PNLH9YKKTHooVQCkd/${i}`)
        const res = await tx.json();
        frameMeta.push(res)
        if(res.image.slice(0,7) == 'ipfs://'){
          let cid = res.image.slice(7);
          let img = `https://ipfs.io/ipfs/${cid}`;
          frames.push(img);
        }else{
          frames.push(res.image);
        }
      }
      setFrameImages(frames);
      setFrameMetadata(frameMeta)
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
        <button
          type='button'
          className={buttonStyle}
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
                Your Frames
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
                            Select
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
                className={buttonStyle}
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