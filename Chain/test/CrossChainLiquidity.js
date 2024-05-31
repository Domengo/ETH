/** @format */

const { expect } = require("chai");

describe("CrossChainLiquidity", function () {
  let CrossChainLiquidity, crossChainLiquidity, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    CrossChainLiquidity = await ethers.getContractFactory(
      "CrossChainLiquidity"
    );
    crossChainLiquidity = await CrossChainLiquidity.deploy(
      "0xYourCCIPRouterAddress"
    );
    await crossChainLiquidity.deployed();
  });

  it("Should add liquidity", async function () {
    await crossChainLiquidity.addLiquidity(1, 100);
    expect(await crossChainLiquidity.liquidityPools(1, owner.address)).to.equal(
      100
    );
  });

  it("Should remove liquidity", async function () {
    await crossChainLiquidity.addLiquidity(1, 100);
    await crossChainLiquidity.removeLiquidity(1, 50);
    expect(await crossChainLiquidity.liquidityPools(1, owner.address)).to.equal(
      50
    );
  });
});
