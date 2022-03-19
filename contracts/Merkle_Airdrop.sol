//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
contract Merkle_Airdrop  {
    // deployed address of Dynamos contract;
    address dynamoAddr = 0x0C669838b390DF27CEEdc9Af53da6371590e4Fc4;

    bytes32 root = 0x4db86a7de44b71d5e5adf5eb3f19409625315c54a7ecbefb15189afa7f196059;
    mapping(address => bool) claimedAlready;
  
    IERC20 dynamoContract = IERC20(dynamoAddr);

    event AddressClaim(address _claimer, uint id, uint _amount);


     function claimForAddress(
        bytes32[] calldata _merkleProof,
        uint _amount,
        uint _itemId
    ) external {
        // Verify the merkle proof.
        require(claimedAlready[msg.sender] == false, "cannot claim twice");
        bytes32 node = keccak256(abi.encodePacked(msg.sender, _itemId, _amount));
        bytes32 merkleRoot = root;
        require(MerkleProof.verify(_merkleProof, merkleRoot, node), "MerkleDistributor: Invalid proof.");
        dynamoContract.transfer(msg.sender,  _amount);
        claimedAlready[msg.sender] = true;
        emit AddressClaim(msg.sender, _itemId, _amount);
    }

}