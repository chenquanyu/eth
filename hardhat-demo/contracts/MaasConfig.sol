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
    function getBlacklist() external view returns (string memory);
    
    function enableNodeWhite(bool doEnable) external returns (bool);
    function isNodeWhiteEnabled() external view returns (bool);
    function setNodeWhite(address addr, bool isWhite) external returns (bool);
    function isInNodeWhite(address addr) external view returns (bool);
    function getNodeWhitelist() external view returns (string memory);
    
    function enableGasManage(bool doEnable) external returns (bool);
    function isGasManageEnabled() external view returns (bool);
    function setGasManager(address addr, bool isManager) external returns (bool);
    function isGasManager(address addr) external view returns (bool);
    function getGasManagerList() external view returns (string memory);
    
    event ChangeOwner(address indexed oldOwner, address indexed newOwner);
    event BlockAccount(address indexed addr, bool doBlock);
    event EnableNodeWhite(bool doEnable);
    event SetNodeWhite(address indexed addr, bool isWhite);
    event EnableGasManage(bool doEnable);
    event SetGasManager(address indexed addr, bool isManager);
}

interface INodeManager {

    function name() external view returns (string memory);
    function propose(uint64 startHeight, bytes memory peers) external returns (bool);
    function vote(uint64 epochID, bytes memory epochHash) external returns (bool);
    function epoch() external view returns (bytes memory);
    function getChangingEpoch() external view returns (bytes memory);
    function getEpochByID(uint64 epochID) external view returns (bytes memory);
    function proof(uint64 epochID) external view returns (bytes memory);

    function getEpochListJson(uint64 epochID) external view returns (string memory);
    function getCurrentEpochJson() external view returns (string memory);
    function getChangingEpochJson() external view returns (string memory);
    
    event Proposed(bytes epoch);
    event Voted(uint64 epochID, bytes epochHash, uint64 votedNumber, uint64 groupSize);
    event EpochChanged(bytes epoch, bytes nextEpoch);
    event ConsensusSigned(string method, bytes input, address signer, uint64 size);
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