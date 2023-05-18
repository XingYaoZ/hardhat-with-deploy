import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  await deploy("MyCollectible", {
    from: deployer,
    log: true,
    deterministicDeployment: false,
    waitConfirmations: 1,
  });
};
deploy.tags = ["MyCollectible"];
export default deploy;
