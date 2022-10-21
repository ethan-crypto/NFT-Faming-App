async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Frame = await ethers.getContractFactory('Frame');
  //TODO: You may change this if you want
  const frame = await Frame.deploy('ipfs://Qmd2g8bcYcAR1ezrTJ1s97isFr7Je6a4suT2FehqwbYEF1/');

  console.log("Frame was deployed to Address: ", frame.address);

  const MergedNFT = await ethers.getContractFactory('MergedNFT');
  const mergedNFT = await MergedNFT.deploy();

  console.log("MergedNFT was deployed to Address: ", mergedNFT.address);

  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(frame, 'Frame');
  saveFrontendFiles(mergedNFT, 'MergedNFT');
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
