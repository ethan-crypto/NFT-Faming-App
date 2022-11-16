import React, { useState } from 'react';

const SelectNFT = ({ setFirstNFT, firstNFT, address,contractAddress }) => {
  const [allNfts, setAllNfts] = useState([]);

  const getNFTData = async () => {
    try {

      const options = {
        method: 'GET',
        headers: { Accept: 'application/json' },
      };
      // Mainnet
      // https://api.opensea.io/api/v1/assets?owner=${address}&limit=200
      // Goelri
      // `https://testnets-api.opensea.io/api/v1/assets?owner=${address}&limit=200`
      let fetchURL;
      if(contractAddress == null){
        fetchURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/demo/getNFTs?owner=${address}&withMetadata=true&filters=SPAM&filters=AIRDROPS`
      }else{
        fetchURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/demo/getNFTs?owner=${address}&contractAddresses[]=${contractAddress}&withMetadata=true&filters=SPAM&filters=AIRDROPS`
      }
      fetch(
        fetchURL,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.ownedNfts);
          setAllNfts(response.ownedNfts);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {firstNFT !== null && (
          <div
            className='card col-lg-4 m-auto mb-5 shadow border-0'
            style={{ width: '20rem' }}
          >
            <div className='image-box'>
              <img
                src={firstNFT.media[0].gateway} //firstNFT.media[0].gateway
                className='nft-img card-img-top pt-3'
                alt='...'
              />
            </div>
            <div className='card-body'>
              <h5 className='card-title fs-6'>#{Number(firstNFT.id.tokenId)}</h5>
              {/* <p className='card-text lead fs-6'>
                 <img
                  alt={firstNFT.token_id}
                  src={firstNFT.collection.image_url}
                  className='collection-image me-2'
                ></img> 
                {firstNFT.collection.name}
              </p> */}
            </div>
          </div>
        )}
        <button
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          onClick={getNFTData}
        >
          Select NFT
        </button>
      </div>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
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
                {allNfts !== [] &&
                  allNfts.map((nft, i) => {
                    // if (nft.image_preview_url !== null) {
                      return (
                        <div
                          key={i}
                          className='card col-lg-4 m-auto mb-5 shadow border-0'
                          style={{ width: '10rem' }}
                        >
                          <div className='image-box'>
                            <img
                              src={nft.media[0].gateway}
                              className='nft-img card-img-top pt-3'
                              alt='...'
                            />
                          </div>
                          <div className='card-body'>
                            <h5 className='card-title fs-6'>#{Number(nft.id.tokenId)}</h5>
                            {/* <p className='card-text fw-light' style={{fontSize: "12px"}}>
                               <img
                                alt={nft.token_id}
                                src={nft.collection.image_url}
                                className='collection-image me-2'
                              ></img> 
                              {nft.collection.name}
                            </p> */}
                            <button
                              className='btn btn-primary btn-sm'
                              data-bs-dismiss='modal'
                              onClick={() => setFirstNFT(nft)}
                            >
                              Select this
                            </button>
                          </div>
                        </div>
                      );
                    // }
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

export default SelectNFT;