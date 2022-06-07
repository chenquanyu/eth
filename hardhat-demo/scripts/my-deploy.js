// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
   await hre.run('compile');

  await deployMyERC20();
}

async function deployMyERC20() {
  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("MyERC20");
  const contract = await Contract.deploy("1000000000000");

  await contract.deployed();

  console.log("KC deployed to:", contract.address);
  console.log("Test start:", contract.address);
  const name = await contract.name();
  console.log("KC name:", name);
  console.log("KC totalSupply:", (await contract.totalSupply()).toString());
  const accounts = await ethers.getSigners();
  console.log("KC balanceOf:", accounts[0].address , (await contract.balanceOf(accounts[0].address)).toString());
}

async function deployProofCrossChain() {
  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("ProofCrossChain");
  const contract = await Contract.deploy("Baas Proof");

  await contract.deployed();

  console.log("contract deployed to:", contract.address);
  const name = await contract.proofName();
  console.log("contract name:", name);
}

async function deployMaasConfig() {
  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("MaasConfig");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("MaasConfig deployed to:", contract.address);
  console.log("Test start:", contract.address);
  const name = await contract.name();
  console.log("KC name:", name);
  console.log("KC totalSupply:", (await contract.totalSupply()).toString());
  const accounts = await ethers.getSigners();
  console.log("KC balanceOf:", accounts[0].address , (await contract.balanceOf(accounts[0].address)).toString());
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
