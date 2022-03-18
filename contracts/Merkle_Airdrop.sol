//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
contract Merkle_Airdrop  {
    // 0x2A156a47A89dfdc68f24E2292D54e9d1F7e7C5b6
    address dynamoAddr;

    bytes32 root = 0x1added9915368268e3bdc71b9a2ae9f7a24da3557de3597195728924af896bd4;
    
    constructor(address _addr) {
        dynamoAddr = _addr;
    }

    IERC20 dynamoContract = IERC20(dynamoAddr);

    event AddressClaim(address _claimer, uint id, uint _amount);


     function claimForAddress(
        bytes32[] calldata _merkleProof,
        uint _amount,
        uint _itemId
    ) external {
        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(msg.sender, _itemId, _amount));
        bytes32 merkleRoot = root;
        require(MerkleProof.verify(_merkleProof, merkleRoot, node), "MerkleDistributor: Invalid proof.");

        dynamoContract.transferFrom(address(this), msg.sender,  _amount);
    
        emit AddressClaim(msg.sender, _itemId, _amount);
    }

}