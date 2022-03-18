/* eslint-disable prettier/prettier */
import { ethers } from "hardhat";
import { Signer } from "ethers";

async function main() {
//   const boredApeOwner = "0xcee749f1cfc66cd3fb57cefde8a9c5999fbe7b8f";
//   const owner = "0x9ae1e982Fc9A9D799e611843CB9154410f11Fe35";

//   const boredApeOwnerSigner: Signer = await ethers.getSigner(boredApeOwner);
//   const ownerSigner: Signer = await ethers.getSigner(owner);

//    // @ts-ignore
//    await hre.network.provider.request({
//     method: "hardhat_impersonateAccount",
//     params: [owner],
//   });

//     // @ts-ignore
//     await hre.network.provider.request({
//       method: "hardhat_impersonateAccount",
//       params: [boredApeOwner],
//     });

//   // @ts-ignore
//   await network.provider.send("hardhat_setBalance", [
//     owner,
//     "0x2000000000000000000000000000000000000",
//   ])

//   We get the contract to deploy
  const Dynamo = await ethers.getContractFactory("Dynamo");
  const dynamo = await Dynamo.deploy("Dynamos", "DYM", "1000000000000000000000000000000000000000");

  await dynamo.deployed();
  console.log('address', dynamo.address);

// 0x2B3151a7fBD37f93Ac3F4EDd2ea4154C28B6C03C


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
