import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;
    const time =
    await deploy('MyToken', {
        from: deployer,
        log: true,
        deterministicDeployment: false,
    });
};
deploy.tags = ['demo']
export default deploy;

