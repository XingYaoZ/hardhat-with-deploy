import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  await deploy("MyCollectibleProxyAdmin", {
    from: deployer,
    log: true,
    deterministicDeployment: false,
    waitConfirmations: 1,
  });
};
deploy.tags = ["MyCollectibleProxyAdmin"];
export default deploy;
