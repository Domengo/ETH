/** @format */

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CrossChainLiquidity = await ethers.getContractFactory(
    "CrossChainLiquidity"
  );
  const crossChainLiquidity = await CrossChainLiquidity.deploy(
    "0xYourCCIPRouterAddress"
  );

  console.log("CrossChainLiquidity deployed to:", crossChainLiquidity.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
