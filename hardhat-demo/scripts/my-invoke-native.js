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
  // await hre.run('compile');

  // await testMethods();
  // await testNFTMethods();
  await testNodeManager();
}

async function testNodeManager() {

  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "doBlock",
          "type": "bool"
        }
      ],
      "name": "BlockAccount",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "doBlock",
          "type": "bool"
        }
      ],
      "name": "blockAccount",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isBlocked",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const address = '0xD62B67170A6bb645f1c59601FbC6766940ee12e5';
  const blockedAccount ="0x5bCA6B1c89e1f4f77b6ad1A0b9b8362c4b316556";
  const newOwner = '0x45d53a40Ea246BB8eCb1417A7f3cE8Bf5DccC6E3';
  
   // We get the native contract
   var contract = await hre.ethers.getContractAt("IMaasConfig", address,(await hre.ethers.getSigners())[1]);

  //  await contract.mint(owner, 1000000000);
  console.log('contract name: ', (await contract.name()).toString());
  
  const tx =  await contract.blockAccount(blockedAccount, false);
  console.log(tx);
  const receipt = await tx.wait();
  console.log(receipt);
  console.log('isBlocked: ', (await contract.isBlocked(blockedAccount)));

  console.log('owner: ', (await contract.getOwner()).toString());
  const tx1 =  await contract.changeOwner(newOwner);
  console.log(tx1);
  const receipt1 = await tx1.wait();
  console.log(receipt1);
  console.log('new owner: ', (await contract.getOwner()).toString());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
