const Contract = artifacts.require("Store");

module.exports = function(deployer) {
  deployer.deploy(Contract, "0x6dDbdfd13ad498Aafe815Da07e289C4ba9f52bca");
};