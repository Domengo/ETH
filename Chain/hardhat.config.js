// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.8.24",
    networks: {
        hardhat: {},
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
            accounts: [`0x${YOUR_PRIVATE_KEY}`]
        },
        kovan: {
            url: `https://kovan.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
            accounts: [`0x${YOUR_PRIVATE_KEY}`]
        }
    }
};
