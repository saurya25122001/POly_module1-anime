// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import the ERC721A contract, which provides the implementation for ERC721 standard
import "erc721a/contracts/ERC721A.sol";

// Anime contract that extends ERC721A
contract Anime is ERC721A {
    address public owner;

    // Maximum number of tokens that can be minted
    uint256 public maxQuantity = 5;

    // Base URL for the NFTs (IPFS base URL)
    string baseUrl =
        "https://gateway.pinata.cloud/ipfs/QmdMjaRHhZcyuyTwV7HGbxRenVwuMHBavgvjj9UWSFpBqc/";

    // URL for the prompt description displayed to users
    string public prompt = "I'm going to be Hokage";

    // Constructor to initialize the contract with a name and symbol for the NFTs
    constructor() ERC721A("Anime", "ANI") {
        owner = msg.sender;
    }

    // Modifier that only allows the owner to execute a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Can be performed only by the owner.");
        _;
    }

    // Function to mint NFTs, which can only be called by the owner
    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You can not mint more than 5 NFTs"
        );
        _mint(msg.sender, quantity);
    }
}
