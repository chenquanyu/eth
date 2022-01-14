require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
const baasTestnet = require("./.networks/baas-testnet");
const polyTestnet = require("./.networks/poly-testnet");
const nftTestnet = require("./.networks/nft-testnet");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


function __init_networks__() {
  let networks = {};
  networks.baasTestnet = baasTestnet;
  networks.polyTestnet = polyTestnet;
  networks.nftTestnet = nftTestnet;
  // networks.kovanTestnet = kovanTestnet;
  // networks.bscTestnet = bscTestnet;
  // networks.localTestnet = localTestnet;
  return networks;
}

function __init_etherscan__() {
  let etherscan = {};
  etherscan = apiKey;
  return etherscan;
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: __init_networks__(),
  // etherscan: __init_etherscan__(),
  abiExporter: {
    path: './abi',
    clear: true,
    flat: false,
    only: [],
    spacing: 2
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
