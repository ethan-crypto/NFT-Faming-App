const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
    const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
    const { expect } = require("chai");
  
  describe("NFT framing protocol", function () {

    const baseUri = 'https://ipfs.io/ipfs/QmUmnivf5vKwzZwbb8EwABVgfzpMKERimhXqGrArzUVCUC'
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deployOneYearLockFixture() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner] = await ethers.getSigners();
      // TODO: You may change this if you want
      // Make sure that the Json files uploaded starts from 0 and is named like 0,1,2,3 and 0.json, 1.json etc..
     
      const frame = await (await ethers.getContractFactory('Frame')).deploy(baseUri, 3);

      const framable = await (await ethers.getContractFactory("Framable")).deploy();

      const nft = await (await ethers.getContractFactory("MockNFT")).deploy();
  
      return { owner, frame, framable, nft };
    }
  
    describe("Deployment", function () {
      it("Should set the name and symbol for Framable.sol", async function () {
        const { framable } = await loadFixture(deployOneYearLockFixture);
        expect(await framable.name()).to.equal("MergedNFT");
        expect(await framable.symbol()).to.equal("MNFT");
      });
  
      it("Should set the base uri for Frame.sol", async function () {
        const { frame } = await loadFixture(deployOneYearLockFixture);
       await expect(frame.uri(3)).revertedWith("URI requested for invalid tokenId");
       expect(await frame.uri(0)).to.equal(baseUri + "0");
      });
    });
  
    describe("Merging and unmerging", function () {
        it("Framable.sol should merge and unmerge a frame", async function () {
          const { owner, framable, frame, nft } = await loadFixture(deployOneYearLockFixture);
          await nft.mint();
          await nft.approve(framable.address, 1);
          await framable.merge("ipfs://Qmb1GFH64ZsrVUMoLqtL1i87rgecfweWwp9EwHBjcYe6so", nft.address, 1);
          expect(await framable.ownerOf(0)).to.equal(owner.address);
          expect(await nft.ownerOf(1)).to.equal(framable.address);
          let myNFT = await framable.myNft(0);
          expect(myNFT.contractAddress).to.equal(nft.address);
          expect(myNFT.tokenId).to.equal(1);
          expect(myNFT.owner).to.equal(owner.address);
          expect(myNFT.isFramed).to.equal(true);
          expect(await framable.tokenURI(0)).to.equal("ipfs://Qmb1GFH64ZsrVUMoLqtL1i87rgecfweWwp9EwHBjcYe6so");
          // should fail when passing invalid frame address
          await expect(framable.merge("sampleURI", framable.address, 1)).to.be.revertedWith(
            "Invalid contract address"
          );
          // should fail when passing invalid frame address
          await expect(framable.merge("sampleURI", "0x0000000000000000000000000000000000000000", 1)).to.be.revertedWith(
            "Invalid contract address"
          );
          // should unmerge a frame
          await framable.unmerge(0);
          expect(await nft.ownerOf(1)).to.equal(owner.address);
          myNFT = await framable.myNft(0);
          expect(myNFT.isFramed).to.equal(false);
        });
    });
  });
  