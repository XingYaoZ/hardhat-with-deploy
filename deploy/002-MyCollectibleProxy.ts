import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const [deployerSigner] = await ethers.getSigners();
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const MyCollectibleDep = await deployments.get("MyCollectible");
  const MyCollectibleProxyAdminDep = await deployments.get(
    "MyCollectibleProxyAdmin"
  );
  const result = await deploy("MyCollectibleProxy", {
    from: deployer,
    log: true,
    args: [MyCollectibleDep.address, MyCollectibleProxyAdminDep.address, []],
    deterministicDeployment: false,
    waitConfirmations: 1,
  });

  const MyCollectibleProxyContract = await ethers.getContractAt(
    MyCollectibleDep.abi,
    result.address,
    deployerSigner
  );

  let tx = await MyCollectibleProxyContract.initialize();
  await tx.wait();

  console.log("done!!!");
};
deploy.tags = ["MyCollectibleProxy"];
export default deploy;
