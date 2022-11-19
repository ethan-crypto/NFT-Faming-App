async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Frame = await ethers.getContractFactory('Frame');
  // TODO: You may change this if you want
  // Make sure that the Json files uploaded starts from 0 and is named like 0,1,2,3 and 0.json, 1.json etc..
  const frame = await Frame.deploy('https://ipfs.io/ipfs/QmUmnivf5vKwzZwbb8EwABVgfzpMKERimhXqGrArzUVCUC', 10);

  console.log("Frame was deployed to Address: ", frame.address);

  const Framable = await ethers.getContractFactory('Framable');
  const framable = await Framable.deploy();

  console.log("Framable was deployed to Address: ", framable.address);

  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(frame, 'Frame');
  saveFrontendFiles(framable, 'Framable');
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