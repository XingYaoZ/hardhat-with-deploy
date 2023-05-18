import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";
import { HttpNetworkUserConfig } from "hardhat/types";

dotenv.config();

const PK = process.env.PK;
const DEFAULT_MNEMONIC = "";
const userNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  // @ts-ignore
  userNetworkConfig.accounts = PK;
} else {
  userNetworkConfig.accounts = {
    mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
  };
}
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
  },
  networks: {
    bsctest: {
      ...userNetworkConfig,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      verify: {
        etherscan: {
          apiKey: process.env.BSC_SCAN_API_KEY,
        },
      },
    },
  },
};

export default config;
