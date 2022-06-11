const hre = require("hardhat");

async function main() {
  const SimpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  console.log("Deploying Simple Storage...");
  await SimpleStorage.deployed();
  console.log("SimpleStorage deployed to:", SimpleStorage.address);
  if(hre.network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await SimpleStorage.deployTransaction.wait(6); // because etherscan is slow
    await verify(SimpleStorage.address, []);
  }

  const currentValue = await SimpleStorage.retreive();
  console.log("Current value:", currentValue);

  const transactionReponse = await SimpleStorage.store(42);
  await transactionReponse.wait(1);
  const updatedValue = await SimpleStorage.retreive();
  console.log("Updated value:", updatedValue);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArgs: args,
    })
  } catch (e) {
    if(e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log("Verification failed:", e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
