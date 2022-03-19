/* eslint-disable prettier/prettier */

import { ethers } from "hardhat";
import { Signer } from "ethers";

async function main() {
  const proof: [] =  []; 
  // const owner = await ethers.getSigners()
    const claimer = "0x2792f4C16F124942886DF20f3C5B4c2cB195aEe2";
    const claimerSigner = await ethers.getSigner(claimer);

  // We get the contract to deploy
  // const Merkle = await ethers.getContractFactory("Merkle_Airdrop");
  // const merkle = await Merkle.deploy();

  // await merkle.deployed();

  // console.log(`address`, merkle.address);
  
      const instance = await ethers.getContractAt("Merkle_Airdrop","0x7f8BA6f0875272932773e362A6028c38aB649443");
      const getClaim = await instance.connect(claimerSigner).claimForAddress(proof,"10000000000000000","0");
      console.log( await getClaim.wait());
      
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
