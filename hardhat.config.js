require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts:'./src/artifacts'
  },
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/f3889558b8ac4984b44db4198c2af710',
      accounts: ['0x0fc62c076185c9c83d45213d0fd43074729e20058b548020d40b9834b862c0a6']
    }
    

  }
};
