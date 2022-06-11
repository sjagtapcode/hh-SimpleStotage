const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  })
  it("Should start with fav number 0", async function () {
    const currentValue = await simpleStorage.retreive();
    expect(currentValue).to.equal(0);
  });
  it("Should start update the fav number to 24", async function () {
    const transactionResponse = await simpleStorage.store(24);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retreive();
    expect(currentValue).to.equal(24);
  });
  it("Should return personCount as 0", async function () {
    const currentValue = await simpleStorage.personCount();
    expect(currentValue).to.equal(0);
  });
  it("Should add a Person", async function () {
    await simpleStorage.addPerson("swapnil", 24);
    const currentValue = await simpleStorage.personCount();
    expect(currentValue).to.equal(1);
  });
});
