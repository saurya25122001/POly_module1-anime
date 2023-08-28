// Hardhat is a development environment for Ethereum smart contracts
const hre = require("hardhat");

// File system module for reading and writing files
const fs = require("fs");

// Asynchronous main function to deploy the Anime contract
async function main() {
  // Get the contract factory (ABI and bytecode) using the contract name "Anime"
  const NFT = await hre.ethers.getContractFactory("Anime");

  // Deploy the contract to the blockchain
  const nft = await NFT.deploy();

  // Wait for the contract to be deployed and confirmed
  await nft.deployed();

  // Log the contract address to the console once it is deployed
  console.log("NFT contract deployed to:", nft.address);

  // export the addresses
  fs.writeFileSync(
    "metadata/contractAddress.js",
    `
    export const nftAddress = "${nft.address}"
  `
  );
}

// Execute the main deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });