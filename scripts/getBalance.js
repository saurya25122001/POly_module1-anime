const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Anime.sol/Anime.json");

const tokenAddress = "0x123d6Ae5bF7b3a5a00fB85f5F2699f17c53C9632"; // Ethereum address of the deployed ERC721A contract
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x05fE1197504C1E2BA764fa3F51E2671F06587bb3"; // Ethereum public address for the wallet

async function main() {
    // Get the contract instance of the deployed ERC721A contract
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    // Log the total number of ERC721A tokens owned by the specified wallet address
    // console.log("You now have a total number of: " + await token.balanceOf(walletAddress) + "  tokens");
    console.log("You now have a total number of: " + await token.balanceOf(walletAddress) + "tokens");
  }
  
 // Call the main function and handle any errors
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
