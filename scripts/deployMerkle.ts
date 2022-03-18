/* eslint-disable prettier/prettier */

import { ethers } from "hardhat";
import { Signer } from "ethers";

async function main() {
    const owner = "0x2792f4C16F124942886DF20f3C5B4c2cB195aEe2";
    const ownerSigner = await ethers.getSigner(owner);
//   We get the contract to deploy
//   const Merkle = await ethers.getContractFactory("Merkle_Airdrop");
//   const merkle = await Merkle.deploy("0x2A156a47A89dfdc68f24E2292D54e9d1F7e7C5b6");

//   await merkle.deployed();
//   console.log('address', merkle.address);

    // @ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [owner],
    });

  // @ts-ignore
  await network.provider.send("hardhat_setBalance", [
    owner,
    "0x2000000000000000000000000000000000000",
  ])

  const option = [];
    const Token = await ethers.getContractAt("IERC20", "0x2A156a47A89dfdc68f24E2292D54e9d1F7e7C5b6")
    const merkle = await ethers.getContractAt("Merkle_Airdrop", "0xb0eb9972e4B7262CcCe8aE72B6ac8651e872592E");
    await Token.approve("0x2A156a47A89dfdc68f24E2292D54e9d1F7e7C5b6", "100000000000000000");
    
    await merkle.connect(ownerSigner).claimForAddress(option);

    const getBalance = await Token.balanceOf(owner);
    console.log(getBalance);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// merkle airdrop
// 0xb0eb9972e4B7262CcCe8aE72B6ac8651e872592E
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
