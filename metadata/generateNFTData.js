const fs = require("fs");
const path = require("path");
console.log(__dirname);

// Imports the nfts array from a separate file
const nfts = require("./nfts");

for (let i = 0; i < nfts.length; i++) {
  // Creates a JSON object for each NFT
  const json = {
    name: nfts[i].name,
    description: nfts[i].description,
    image: `https://gateway.pinata.cloud/ipfs/${nfts[i].image}`,
  };

  const name = nfts[i].name;

  // Replaces any non-alphanumeric characters in the name with an empty string for the filename
  const fileName = `${name.replace(/[^a-zA-Z0-9]/g, "")}`;

  // Writes the JSON object to a file
  fs.writeFileSync(
    path.join(__dirname, "NFTs", String(fileName)),
    JSON.stringify(json)
  );
}


