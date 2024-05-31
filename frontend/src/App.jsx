/** @format */

import { useState } from "react";
import { ethers } from "ethers";
import CrossChainLiquidityABI from "./CrossChainLiquidity.json";

const CrossChainLiquidityAddress = "0xYourDeployedContractAddress";

function App() {
  const [amount, setAmount] = useState(0);

  async function addLiquidity() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CrossChainLiquidityAddress,
        CrossChainLiquidityABI,
        signer
      );
      await contract.addLiquidity(
        1,
        ethers.utils.parseEther(amount.toString())
      );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Cross-Chain DeFi App</h1>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
        <button
          onClick={addLiquidity}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Liquidity
        </button>
      </div>
    </div>
  );
}

export default App;
