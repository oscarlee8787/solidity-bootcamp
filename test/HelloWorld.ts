import { expect } from "chai";
import { viem } from "hardhat";

describe('HelloWorld', function (){
  it ("Shoud give a Hello World", async function () {
    const publicClient = await viem.getPublicClient();
    const [owner, otherAccount] = await viem.getWalletClients();
    const helloWorldContract = await viem.deployContract("HelloWorld");
    const helloWorldText = await helloWorldContract.read.helloWorld();
    expect(helloWorldText).to.equal("Hello World");
  });
});
