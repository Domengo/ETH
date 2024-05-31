// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@chainlink/contracts/src/v0.8/CCIPReceiver.sol";
import "@chainlink/contracts/src/v0.8/CCIPSender.sol";

contract CrossChainLiquidity is CCIPReceiver, CCIPSender {
    mapping(uint256 => mapping(address => uint256)) public liquidityPools;

    event LiquidityAdded(address indexed user, uint256 amount, uint256 chainId);
    event LiquidityRemoved(address indexed user, uint256 amount, uint256 chainId);
    event CrossChainMessageSent(uint256 destChainId, bytes data);
    event CrossChainMessageReceived(uint256 srcChainId, bytes data);

    constructor(address _ccipRouter) CCIPReceiver(_ccipRouter) CCIPSender(_ccipRouter) {}

    function addLiquidity(uint256 chainId, uint256 amount) external {
        liquidityPools[chainId][msg.sender] += amount;
        emit LiquidityAdded(msg.sender, amount, chainId);
    }

    function removeLiquidity(uint256 chainId, uint256 amount) external {
        require(liquidityPools[chainId][msg.sender] >= amount, "Insufficient liquidity");
        liquidityPools[chainId][msg.sender] -= amount;
        emit LiquidityRemoved(msg.sender, amount, chainId);
    }

    function sendCrossChainMessage(uint256 destChainId, bytes memory data) external {
        _ccipSend(destChainId, data);
        emit CrossChainMessageSent(destChainId, data);
    }

    function _ccipReceive(uint256 srcChainId, bytes memory data) internal override {
        // Handle incoming cross-chain message
        emit CrossChainMessageReceived(srcChainId, data);
    }
}
