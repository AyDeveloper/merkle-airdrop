//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//0x1added9915368268e3bdc71b9a2ae9f7a24da3557de3597195728924af896bd4;
contract Dynamo is ERC20 {
    constructor(string memory _name, string memory _symbol, uint _totalSupply) ERC20(_name, _symbol) {
        _mint(address(this), _totalSupply);
    }
}