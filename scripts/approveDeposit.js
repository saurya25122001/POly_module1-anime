// Import necessary packages and contracts
const { ethers } = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/Anime.sol/Anime.json");
require("dotenv").config();
const tokenABI = tokenContractJSON.abi;

// Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {
  // Set up connections to the Ethereum Goerli network and wallet using Alchemy
  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet instance using the private key and provider
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance (used for signing transactions)
  const [signer] = await ethers.getSigners();

  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("Anime");
  const nft = await NFT.attach("0x123d6Ae5bF7b3a5a00fB85f5F2699f17c53C9632");

  // Get the FXRoot contract instance (FxChildTunnel contract on Ethereum FxChain)
  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(fxRootContractABI, fxRootAddress);

  // TokenIds to transfer (assuming tokenIds array contains the token IDs to be transferred)
  const tokenIds = [0, 1, 2, 3, 4, 5];

  // Approve the nfts for transfer
  const approveTx = await nft
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Deposit the NFTs to the FXRoot contract on the Ethereum FxChain network
  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(nft.address, wallet.address, tokenIds[i], "0x6566");

    // Wait for the deposit transaction to be confirmed
    await depositTx.wait();
  }
  // Print the balance of the wallet after the transfer
  console.log("Approved and deposited");

  // Test balanceOf to verify the NFT wallet balance after the transfer
  const balance = await nft.balanceOf(wallet.address);

  // Print the balance of the wallet
  console.log("NFT wallet balance", wallet.address,"is: ", balance.toString());
}

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
