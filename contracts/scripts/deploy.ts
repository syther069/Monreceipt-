import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TagRegistry...");

  const TagRegistry = await ethers.getContractFactory("TagRegistry");
  const registry = await TagRegistry.deploy();

  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log(`TagRegistry deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
