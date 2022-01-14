// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    event TestFail(int256 indexed num, uint indexed result);

    constructor(uint256 initialSupply) ERC20("KC", "KC") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
    
    function testFail(int256 num) public {
        require(num > -2, "num is less than -1");
        // endless loop
        while(num == -1){
            _mint(msg.sender, 1);
        }
        uint result = 0;
        for(uint i =0; i < uint256(num); i++){
            result += i;
        }
        emit TestFail(num, result);
    }
}