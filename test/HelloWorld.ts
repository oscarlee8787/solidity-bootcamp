import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";


describe('HelloWorld', function (){
    async function deployContractFixture() {
      const publicClient = await viem.getPublicClient();
      const [owner, otherAccount] = await viem.getWalletClients();
      const helloWorldContract = await viem.deployContract("HelloWorld");
      return {
        publicClient,
        owner,
        otherAccount,
        helloWorldContract,
      };
    }

  it ("Shoud give a Hello World", async function () {
    const {helloWorldContract} = await loadFixture(deployContractFixture);
    const helloWorldText = await helloWorldContract.read.helloWorld();
    expect(helloWorldText).to.equal("Hello World!");
  });

  it ("Shoud change text correctly", async function () {
    const {helloWorldContract, publicClient} = await loadFixture(deployContractFixture);
    const tx = await helloWorldContract.write.setText(["Potato!"]);
    const helloWorldText2 = await helloWorldContract.read.helloWorld();
    const receipt = await publicClient.getTransactionReceipt( {hash: tx} );
    expect(helloWorldText2).to.equal("Potato!");
  });
});
