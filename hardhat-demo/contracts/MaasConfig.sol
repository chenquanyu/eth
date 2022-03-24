// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IMaasConfig {

    function name() external view returns (string memory);
    function changeOwner(address addr) external returns (bool);
    function getOwner() external view returns (address);
    function blockAccount(address addr, bool doBlock) external returns (bool);
    function isBlocked(address addr) external view returns (bool);
    
    event BlockAccount(address addr, bool doBlock);
    event ChangeOwner(address oldOwner, address newOwner);
}

// contract MaasConfig is IMaasConfig {
//     mapping(address => bool) private _blacklist;

//     event TestFail(int256 indexed num, uint indexed result);

//     function name() override external view returns (string memory){
//         return "MaasConfig";
//     }

//     function blockAccount(address addr, bool doBlock) override external returns (bool){
//         if(doBlock){
//             _blacklist[addr] = true;
//         }else{
//             delete( _blacklist[addr]);
//         }
//         emit BlockAccount(addr, doBlock);
//         return true;
//     }

//     function isBlocked(address addr) override external view returns (bool){
//         return _blacklist[addr];
//     }
// }