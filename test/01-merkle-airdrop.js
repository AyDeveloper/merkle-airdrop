const { expect } = require('chai')
const { ethers } = require('hardhat')
const truffleAsserts = require('truffle-assertions')
//const {allOps} = require('../scripts/generate_merkle_tree.js');

describe('Test merkle', async function () {
  this.timeout(300000000)
  const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  const minter= '0x027Ffd3c119567e85998f4E6B9c3d83D5702660c'
  let minterSign=await ethers.getSigner(minter)


  //will be changed according to generated tree
  let currentRoot= '0x976f83a7cbbc0f173c37574ede2dc7ea66b7277c1dee66e3354c1ccfbffc331d'

  let recipient1Object= {
	leaf: "0x1f5128a820683f23d2c09ba94161b7b38add2f0a8f1aa0d43c81110045690002",
	proof: [
		"0xe64d0d7e49ad28434c85290ef97d35f66aab6408f87cc19b5991d3e9ac3d0b25",
		"0x87d59cadeb17b5117f73ad826691a7f1a03cea1e617ec7f16937f751aebc397c",
		"0x68e0ceaa65ed249cd00c8e4bfba3317ee908511f8e6307b7cfbb8f25960137d6"
	]
,
	itemId: 33,
	amountToClaim: 3


}

let recipient2Object= {
	leaf: "0xe64d0d7e49ad28434c85290ef97d35f66aab6408f87cc19b5991d3e9ac3d0b25",
	proof: [
		"0x1f5128a820683f23d2c09ba94161b7b38add2f0a8f1aa0d43c81110045690002",
		"0x87d59cadeb17b5117f73ad826691a7f1a03cea1e617ec7f16937f751aebc397c",
		"0x68e0ceaa65ed249cd00c8e4bfba3317ee908511f8e6307b7cfbb8f25960137d6"
	],
	itemId: 34,
	amountToClaim: 5

}




  let recipient1='0x15290cd9955154de5d18E0Cc1ef375bb7f9F2e26'
  let recipient2='0x805b01E7F3Fe127769B249763250222630968b4d'
  let itemsToMint=[33,34]//Stani hair,Stani vest
  let amount=[5,5]
  //current root

let airdropContract,
recipient,
gotchiFacet,
daoFacet,
itemsFacet,
airdropAdd,
owner,
airdropContract1,
airdropContract2

before(async function () {
	this.timeout(300000)
gotchiFacet= await ethers.getContractAt('AavegotchiFacet',diamondAddress)
daoFacet= await ethers.getContractAt('DAOFacet',diamondAddress)
itemsFacet= await ethers.getContractAt('ItemsFacet',diamondAddress)
owner = await (await ethers.getContractAt('OwnershipFacet', diamondAddress)).owner()


})


describe('deploy airdrop contract ', async function(){
	this.timeout(3000000)

it('should deploy merkle contract and add the first airdrop correctly',async function(){

	await hre.network.provider.request({
		method: "hardhat_impersonateAccount",
		params: [minter]
	  });

const airdrop= await(await ethers.getContractFactory("MerkleDistributor")).connect(minterSign);
airdropContract=await airdrop.deploy();
airdropAdd=airdropContract.address
console.log('airdrop contract deployed to:',airdropAdd)
await airdropContract.addAirdrop('For Stani fans',currentRoot,diamondAddress,10,itemsToMint)
const details=await airdropContract.checkAirdropDetails(0)
expect(details.name).to.equal('For Stani fans')
expect((details.airdropID).toString()).to.equal('0')
expect(details.merkleRoot).to.equal(currentRoot)
expect(details.tokenAddress).to.equal(diamondAddress)
expect((details.maxUsers).toString()).to.equal('10')
expect((details.tokenIDs).toString()).to.equal((itemsToMint).toString())
await hre.network.provider.request({
	method: "hardhat_stopImpersonatingAccount",
	params: [minter]
  });

})
 
it('should mint two wearable items to the merkle distributor contract',async function(){
await hre.network.provider.request({
		method: "hardhat_impersonateAccount",
		params: [owner]
	  });
let ownerSign=await ethers.getSigner(owner);
let daoOwnerConnect= await daoFacet.connect(ownerSign)
//add the minter as an itemManager
await daoOwnerConnect.addItemManagers([minter])

await hre.network.provider.request({
	method: "hardhat_stopImpersonatingAccount",
	params: [owner]
  });

  await hre.network.provider.request({
	method: "hardhat_impersonateAccount",
	params: [minter]
  });

let daoMinterConnect= await daoFacet.connect(minterSign)
await daoMinterConnect.updateItemTypeMaxQuantity(itemsToMint,[100,100])
await daoMinterConnect.mintItems(airdropAdd,itemsToMint,amount)
const item33balance= await itemsFacet.balanceOf(airdropAdd,33)
const item34balance= await itemsFacet.balanceOf(airdropAdd,34)
expect(item33balance.toString()).to.equal('5')
expect(item34balance.toString()).to.equal('5')

})

it('should allow the users to claim their assigned wearables', async function(){
	await hre.network.provider.request({
		method: "hardhat_stopImpersonatingAccount",
		params: [minter]
	  });
	  await hre.network.provider.request({
		method: "hardhat_impersonateAccount",
		params: [recipient1]
	  });
let rec1sign=await ethers.getSigner(recipient1)
let rec2sign=await ethers.getSigner(recipient2) 
airdropContract1=await airdropContract.connect(rec1sign)
airdropContract2=await airdropContract.connect(rec2sign)
await airdropContract1.claim(0,recipient1,recipient1Object.itemId,recipient1Object.amountToClaim,recipient1Object.proof,"0x00")
await hre.network.provider.request({
	method: "hardhat_stopImpersonatingAccount",
	params: [recipient1]
  });
  await hre.network.provider.request({
	method: "hardhat_impersonateAccount",
	params: [recipient2]
  });
  await airdropContract2.claim(0,recipient2,recipient2Object.itemId,recipient2Object.amountToClaim,recipient2Object.proof,"0x00")
const item33balance= await itemsFacet.balanceOf(recipient1,33)
const item34balance= await itemsFacet.balanceOf(recipient2,34)
//contract balances
const Citem33balance= await itemsFacet.balanceOf(airdropAdd,33)
const Citem34balance= await itemsFacet.balanceOf(airdropAdd,34)

  expect(item33balance.toString()).to.equal('3')
  expect(item34balance.toString()).to.equal('5')
  //make sure they are reduced
  expect(Citem33balance.toString()).to.equal('2')
  expect(Citem34balance.toString()).to.equal('0')

})


it('should revert while trying to claim more than once',async function(){
await truffleAsserts.reverts(airdropContract2.claim(0,recipient2,recipient2Object.itemId,recipient2Object.amountToClaim,recipient2Object.proof,"0x00"),'MerkleDistributor: Drop already claimed or address not included.');

})


})

})