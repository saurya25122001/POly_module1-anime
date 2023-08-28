// This script batch mints criceket ERC721A tokens.

// Import required libraries
const { ethers } = require("hardhat"); // Hardhat is a development environment for Ethereum smart contracts
require("dotenv").config();// Load environment variables from a .env file

async function main() {
  // Get private key from environment variables (Make sure PRIVATE_KEY is defined in the .env file)
  const privateKey = process.env.PRIVATE_KEY;

  // The URL of the network provider (Goerli test network in this case)
  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt";

  // Create a provider using the specified URL to connect to the Ethereum network
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a signer (account) from the private key and provider
  const signer = new ethers.Wallet(privateKey, provider);

  // The address of the deployed contract that we want to interact with
  const contractAddress = "0x123d6Ae5bF7b3a5a00fB85f5F2699f17c53C9632";
  
  // Get the contract factory for the Anime contract and attach it to the signer
  const OneNFT = await ethers.getContractFactory("Anime", signer);
  const contract = await OneNFT.attach(contractAddress);

  // Call the mint function on the contract to mint 5 tokens
  await contract.mint(5);

  // Log a message to the console to indicate that the tokens have been minted
  console.log("Minted 05 tokens.");
}

main()
  .then(() => process.exit(0))// Exit the process with success status code (0) after execution
  .catch((error) => {
    console.error(error);
    process.exit(1);// Log any errors that occur during execution and exit the process with an error status code (1)
  }); 
