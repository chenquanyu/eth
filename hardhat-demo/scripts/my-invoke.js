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

  await testMethods();
  // await testNFTMethods();
  // await testEthTransfer();
}

async function testMethods() {
  // We get the deployed contract
  const contract = await hre.ethers.getContractAt("MyERC20", "0x5bCA6B1c89e1f4f77b6ad1A0b9b8362c4b316556");
  const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();

  const owner = '0x258af48e28E4A6846E931dDfF8e1Cdf8579821e5';

  await contract.mint(owner, 1000000000);
  console.log('owner balance ', (await contract.balanceOf(owner)).toString());
  await contract.transfer(gov.address, 100000);
  console.log('gov balance ', (await contract.balanceOf(gov.address)).toString());

  // await contract.testFail(-2);
  // console.log('user2 balance ', (await contract.balanceOf(user2.address)).toString());

  // await gov.sendTransaction({
  //   to: user1.address,
  //   value: ethers.utils.parseEther("1") // 1 ether
  // })
  // // console.log('1 eth: ', ethers.utils.parseEther("1"));
  // const balanceAfter = await ethers.provider.getBalance(user1.address);
  // console.log('user1 ether balance ', balanceAfter.toString());

}

async function testEthTransfer() {
  // We get the deployed contract
  const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();

  const owner = '0x258af48e28E4A6846E931dDfF8e1Cdf8579821e5';

  const tx = await gov.sendTransaction({
    to: owner,
    value: ethers.utils.parseEther("1") // 1 ether
  })
   console.log('tx: ', tx);
  const balanceAfter = await ethers.provider.getBalance(owner);
  console.log('user1 ether balance ', balanceAfter.toString());
}

async function testNFTMethods() {
  const contract = await hre.ethers.getContractAt("MyERC721", "0x4B750643Bf008fB5F54Fc0B1D59a63b582417665");
  const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();
  // const accounts = await hre.ethers.getSigners();

  const owner = '0x258af48e28E4A6846E931dDfF8e1Cdf8579821e5';
  const tx =  await contract.awardItem(owner);

  console.log('tokenId: ', tokenId);
  console.log('owner balance 1: ', (await contract.balanceOf(owner)).toString());
  await contract.transferFrom(owner, gov.address, 0);
  console.log('owner balance 2:', (await contract.balanceOf(owner)).toString());

  // await contract.testFail(-2);
  // console.log('user2 balance ', (await contract.balanceOf(user2.address)).toString());

  // await gov.sendTransaction({
  //   to: user1.address,
  //   value: ethers.utils.parseEther("1") // 1 ether
  // })
  // // console.log('1 eth: ', ethers.utils.parseEther("1"));
  // const balanceAfter = await ethers.provider.getBalance(user1.address);
  // console.log('user1 ether balance ', balanceAfter.toString());

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
