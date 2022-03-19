/* eslint-disable prettier/prettier */
import { ethers } from "hardhat";
import { Signer } from "ethers";

async function main() {
  //   We get the contract to deploy
  // const signer = await ethers.getSigners();
  // const signer2 = await ethers.getSigner(signer[0].address);
// const ownerAddr = "0x9ae1e982Fc9A9D799e611843CB9154410f11Fe35";
// const signer1 = await ethers.getSigner(ownerAddr);
//   const Dynamo = await ethers.getContractFactory("Dynamo");
//   const dynamo = await Dynamo.connect(signer1).deploy("Dynamos", "DYM", "1000000000000000000000000000000000000000");
  
//   await dynamo.deployed();

//   console.log(`deployed token address`, dynamo.address);

  const claimer = "0x2792f4C16F124942886DF20f3C5B4c2cB195aEe2";

  const instance = await ethers.getContractAt("IERC20","0x0C669838b390DF27CEEdc9Af53da6371590e4Fc4")

  const bal = await instance.balanceOf("0x7f8BA6f0875272932773e362A6028c38aB649443");

  // const transferTo = await instance.transfer("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", "500000000000000000000000000000000000000");
  const allowed = await instance.balanceOf(claimer);
  console.log(`contract balance is ${bal}`);
  
  console.log(`claimer balance is ${allowed}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
