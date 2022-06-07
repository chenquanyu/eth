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

  await testInvokeSpeed();
  // await testNFTMethods();
  // await testEthTransfer();
}

async function testMethods() {
  // We get the deployed contract
  const contract = await hre.ethers.getContractAt("MyERC20", "0x2157dFf27c7CaDa46D1224a3bFC0b1D553408B21");
  const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();

  const owner = '0x258af48e28E4A6846E931dDfF8e1Cdf8579821e5';

  var tx = await contract.mint(owner, 1000000000);
  console.log(tx.hash);
  var receipt = await tx.wait();
  console.log(receipt.status);
  console.log('owner balance ', (await contract.balanceOf(owner)).toString());
  // await contract.transfer(gov.address, 100000);
  // console.log('gov balance ', (await contract.balanceOf(gov.address)).toString());

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

async function testInvokeSpeed() {
  // We get the deployed contract
  const contract = await hre.ethers.getContractAt("MyERC20", "0xF845ba923D68214aFA8156dF32E22A21fADc5b18");
  const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();

  const owner = '0x258af48e28E4A6846E931dDfF8e1Cdf8579821e5';

  var txlist = [];

  for (var i = 0; i < 100; i++) {
    var startTime = new Date();
    try {
      var tx = await contract.mint(owner, 1000000000 + i);
      tx.sendTime = startTime.getTime();
      console.log("[" + new Date() + "] " + i + " " + tx.hash + " rpc response time: " + (new Date().getTime() - startTime.getTime()));
      txlist.push(tx);
    } catch (e) {
      console.log( "[" + new Date() + "] " + i + " err tx： " + tx.hash + " err: " + e)
      continue;
    }
  }

  for (var i = 0; i < txlist.length; i++) {
    var tx = txlist[i];
    var receipt = await tx.wait();
    tx.endTime = (await contract.provider.getBlock(receipt.blockNumber)).timestamp * 1000 + 999;
    console.log("[" + new Date() + "] tx hash: " + tx.hash + "  spend time: " + (tx.endTime - tx.sendTime));
  }
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
  // maas test 0x4B750643Bf008fB5F54Fc0B1D59a63b582417665
  const contract = await hre.ethers.getContractAt("MyERC721", "0xfAa7b4A711e995E934eCc15B59e014451e53fa96");
  const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();
  // const accounts = await hre.ethers.getSigners();

  const owner = '0x258af48e28E4A6846E931dDfF8e1Cdf8579821e5';
  const tx = await contract.awardItem(owner);

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
