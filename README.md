# POly_module1-anime

The **Anime** contract is an Ethereum-based smart contract that implements the ERC721A standard and allows the creation and management of unique Non-Fungible Tokens (NFTs). NFTs are digital assets that represent ownership of unique items or pieces of content, and they have become popular in various applications, including digital art, collectibles, and gaming.


## Smart Contract Details

### SPDX License Identifier

```
// SPDX-License-Identifier: MIT
```
### ERC721A Import

The contract imports the `ERC721A` contract, which provides the implementation for the ERC721A standard.

### Contract Name and Symbol

```
contract Anime is ERC721A & Symbol is ANI
```

The `Anime` contract extends the `ERC721A` contract and represents a collection of unique NFTs.

### Maximum Quantity of Tokens

```
uint256 public maxQuantity = 5;
```

The `maxQuantity` variable sets the maximum number of NFTs that can be minted within this collection. In this contract, the maximum limit is set to 5 tokens.

### Base URL for NFTs (IPFS Base URL)

```
string baseUrl = "https://gateway.pinata.cloud/ipfs/QmdMjaRHhZcyuyTwV7HGbxRenVwuMHBavgvjj9UWSFpBqc/";
```

The `baseUrl` variable defines the base URL for the NFTs' metadata. This URL will be combined with the token ID to form the complete URL for accessing each NFT's metadata stored on the IPFS platform.

### Prompt Description

```
string public prompt = "I'm going to be Hokage";
```

The `prompt` variable contains a descriptive prompt that is displayed to users of the NFT collection. This prompt could serve as an invitation or an instruction related to the theme of the NFT collection.

### Constructor

```
constructor() ERC721A("Anime", "ANI") {
    owner = msg.sender;
}
```

The constructor initializes the contract with a name and symbol for the NFTs. In this case, the NFTs will be identified by the name "Clover" and the symbol "CLV."

### Modifier: `onlyOwner`

```
modifier onlyOwner() {
    require(msg.sender == owner, "Can be performed only by the owner.");
    _;
}
```

The `onlyOwner` modifier restricts certain functions to be executed only by the contract owner (the deployer). It checks if the caller's address matches the owner's address; otherwise, it will revert the transaction with an error message.

### Mint Function

```
function mint(uint256 quantity) external payable onlyOwner {
    require(
        totalSupply() + quantity <= maxQuantity,
        "You can not mint more than 5 NFTs"
    );
    _mint(msg.sender, quantity);
}
```

The `mint` function allows the contract owner to mint a specified quantity of new NFTs. The `quantity` parameter indicates the number of NFTs to be minted. Before minting, the function checks if the total supply of existing tokens, plus the requested quantity, exceeds the `maxQuantity` limit. If the minting is allowed, the NFTs are created and assigned to the contract owner's address.

### Base URI Override

```
function _baseURI() internal view override returns (string memory) {
    return baseUrl;
}
```

The `_baseURI` function is an internal function that overrides the base URI for the NFTs. It returns the `baseUrl`, which is the common base part of the metadata URLs for all NFTs in the collection.

### Prompt Description Function

```
function promptDescription() external view returns (string memory) {
    return prompt;
}
```

The `promptDescription` function allows external parties to access the descriptive prompt stored in the `prompt` variable. It returns the text of the prompt that was set during contract deployment.

## Getting Started

### Prerequisites

Before you begin setting up and executing the project, make sure you have the following:

- DALLE 2, Midjourney, or Lexica for generating images, depending on the specific AI model chosen.
- An IPFS account and access to pinata.cloud or a similar service for storing the NFT images securely.
- Access to the Ethereum network to deploy the smart contract.
- Familiarity with the Polygon network and understanding of the token mapper tool.
- Hardhat framework installed to facilitate scripting and testing.

### Execution

To successfully execute the project, follow these steps:

1. **Generate a 5-item collection**: Utilize Lexica, DALLE 2, or Midjourney AI model to create a collection of 5 unique NFTs. Ensure that each NFT represents a distinct and desirable piece for your collection.

2. **Store items on IPFS**: Upload the generated NFT items to IPFS using a service like pinata.cloud. Obtain the IPFS hashes for each item, as they will serve as the token URIs for the NFTs.

3. **Deploy the NFT Contract**: Deploy the MyNFT contract on the Ethereum network. During deployment, provide a suitable name and symbol for the contract and include a detailed prompt description for the NFTs.
   - Execute the following command: `npx hardhat run scripts/deploy.js --network goerli`

4. **Implement promptDescriptionDetail function**: Enhance the MyNFT contract by implementing the `promptDescriptionDetail` function. This function should return a comprehensive description of the prompt used to generate the NFTs.

5. **Map the NFT collection**: Optionally, you can map the NFT collection on the Polygon network using the token mapper tool. This step helps visualize and interact with the collection on the Polygon network.
  
6. **Batch Mint NFTs**: Write a script to perform batch minting of all 5 NFTs. Utilize the `batchMint` function of the MyNFT contract to assign each NFT to a recipient address and set the corresponding IPFS hash as the token URI.
   - Execute the command: `npx hardhat run scripts/Mint.js --network goerli`

7. **Approve NFTs for Transfer**: Implement the necessary steps to approve the NFTs for transfer from the Ethereum network to the Polygon Mumbai network.

8. **Deposit NFTs to the Bridge**: Perform the required operations to deposit the NFTs to the FxPortal Bridge. This step facilitates the secure transfer of the NFTs from the Ethereum network to the Polygon Mumbai network.
- Execute the command: `npx hardhat run scripts/Deposite.js --network goerli`

9. **Test balanceOf on Mumbai**: Finally, test the `balanceOf` function on the Polygon Mumbai network to verify the NFT balance of a specific address.
- Execute the command: `npx hardhat run scripts/getBalance.js --network mumbai`

Please exercise caution and follow best practices while executing the project, especially when handling sensitive data, interacting with smart contracts, and managing NFT assets.

# Batch Mint ERC721A Tokens

This script facilitates the batch minting of ERC721A tokens on the Ethereum network. It uses the Hardhat development environment for Ethereum smart contracts and requires the specification of the private key and network provider URL to interact with the network. The script utilizes the `Clover` contract with the ERC721A implementation for creating the tokens.

## Prerequisites

Before running the script, ensure the following:

- Install the required dependencies by running `npm install`.
- Set up a `.env` file and define the `PRIVATE_KEY` variable with the private key of the account performing the minting.

## Execution

To batch mint ERC721A tokens, follow these steps:

1. **Define the Private Key**: Set the private key of the account that will execute the minting process in the `.env` file.

2. **Network Provider**: The script is currently configured to connect to the Goerli test network using Alchemy's node (`https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt`). You may modify the `networkAddress` variable if you want to connect to a different Ethereum network.

3. **Contract Address**: Ensure that the `contractAddress` variable is set to the address of the deployed `Anime` contract on the desired network. This contract should have the ERC721A implementation for tokens.

4. **Run the Script**: Execute the script by running `node <script_name>.js` in your terminal.

5. **Batch Minting**: The script will use the provided private key to create a signer (account) and interact with the `Anime` contract at the specified address. It will call the `mint` function on the contract to batch mint 5 tokens.

6. **Output**: After successful execution, the script will log a message to the console indicating that 5 tokens have been minted.

# Transfer ERC721A Tokens to Ethereum FxChain Network

This script facilitates the transfer of ERC721A tokens from the Ethereum Goerli network to the Ethereum FxChain network. It requires the necessary packages and contracts to interact with both networks. The script also utilizes the `Anime` contract for ERC721A tokens and the `fxRootContractABI` for communication with the Ethereum FxChain network.

## Prerequisites

Before executing the script, ensure you have the following:

- Install the required dependencies by running `npm install`.
- Set up a `.env` file and define the `PRIVATE_KEY` variable with the private key of the account performing the transfers.

## Execution

To transfer ERC721A tokens to the Ethereum FxChain network, follow these steps:

1. **Define the Private Key**: Set the private key of the account that will execute the transfers in the `.env` file.

2. **Network Connection**: The script is currently configured to connect to the Ethereum Goerli network using Alchemy's node (`https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt`). Ensure you have access to an Ethereum Goerli node with sufficient balance to cover gas costs.

3. **Contract Address**: Ensure that the `nft` variable in the script is set to the address of the deployed `Anime` contract on the Ethereum Goerli network. This contract should hold the ERC721A tokens to be transferred.

4. **FXRoot Contract Address**: Verify that the `fxRootAddress` variable is set to the address of the FXRoot contract on the Ethereum FxChain network. This contract acts as the FxChildTunnel and facilitates the transfer of tokens between the Ethereum networks.

5. **Token IDs**: The `tokenIds` array should contain the token IDs to be transferred from the `Anime` contract. Adjust this array to include the specific token IDs you want to transfer.

6. **Run the Script**: Execute the script by running `node <script_name>.js` in your terminal.

7. **Approval and Deposit**: The script will use the provided private key to create a signer (account) and interact with both the `Clover` contract and the FXRoot contract. It will first approve the NFTs for transfer to the FxChildTunnel. Then, it will deposit the specified NFTs to the FXRoot contract on the Ethereum FxChain network.

8. **Output**: After successful execution, the script will log messages to the console confirming approval and deposit of the NFTs. It will also display the NFT wallet balance after the transfers are completed.

# ERC721A Token Balance Checker

This script allows you to check the balance of ERC721A tokens owned by a specific Ethereum wallet address. It retrieves the total number of ERC721A tokens owned by the specified wallet address from the deployed `Anime` contract.

## Prerequisites

Before running the script, ensure you have the following:

- Install the required dependencies by running `npm install`.
- Confirm that the `tokenAddress` variable is set to the Ethereum address of the deployed `Clover` contract on the Ethereum network you wish to interact with.
- Set the `walletAddress` variable to the Ethereum public address of the wallet for which you want to check the token balance.

## Execution

To check the ERC721A token balance, follow these steps:

1. **Contract Address**: Ensure that the `tokenAddress` variable is set to the Ethereum address of the deployed `Anime` contract on the desired network. This contract should have the ERC721A tokens you want to check.

2. **Wallet Address**: Set the `walletAddress` variable to the Ethereum public address of the wallet for which you want to check the token balance.

3. **Run the Script**: Execute the script by running `node <script_name>.js` in your terminal.

4. **Token Balance**: The script will use Hardhat to connect to the deployed `Clover` contract at the specified address. It will then retrieve and log the total number of ERC721A tokens owned by the specified wallet address.

**Output**: After successful execution, the script will log the total number of ERC721A tokens owned by the specified wallet address.

**Important Note**: Ensure you have access to an Ethereum node compatible with the network where the `Clover` contract is deployed. Also, make sure you have provided the correct contract address and wallet address for accurate balance checking.

Please ensure that you handle private keys and sensitive data securely and understand the implications of querying blockchain data with the provided script. It is essential to have proper authorization and permissions for interacting with contracts on the Ethereum network.


### Author
SAURYA PRATAP

- GitHub:  https://github.com/saurya25122001
- Email: 22bcs80056@cuchd.in


## License

_This Project is licensed under the [MIT License.](https://github.com/saurya25122001/POly_module1-anime/blob/53ae1906908dd8253d766b5140d6c55d71c90274/LICENSE)_
