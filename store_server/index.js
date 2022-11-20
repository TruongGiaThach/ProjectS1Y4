// const Web3 = require("web3");
// import Web3  from "web3";
// import "./app.css";

import storeArtifact from "../build/contracts/Store.json" assert { type: "json" };


// import { create } from 'ipfs-http-client';

// connect to ipfs daemon API server
// const ipfs = create('http://localhost:5001')


const App = {
  web3: null,
  account: null,
  instance: null,
  reader: null,

  start: async function () {
    const { web3 } = this;
    try {
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = storeArtifact.networks[networkId];
      this.instance = new web3.eth.Contract(
        storeArtifact.abi,
        deployedNetwork.address,
      );
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
    web3.eth.net.getNetworkType()
      .then(networksName => {
        console.log(networksName),
          $("#result").text(`Network: ${networksName}`)
      }

      );
    $("#result1").text(`Contract: ${this.instance._address}`)
    $("#result2").text(`Account: ${this.account}`)

    $("#buy").click(async function (event) {

        $(this).prop("disabled",true);

      App.instance.methods.buyProduct("hello").send({ from: App.account, gas: 4700000 })
        .then(function (result) {
          
          console.log(result);
          if (result.status)
            alert("Success")
          $("#buy").prop("disabled",false);
        });

    });

  },

};


// function displayPrice(amt) {

//   return "Ξ" + App.web3.utils.fromWei(amt, 'ether');

// }





window.addEventListener("load", function () {
  let provider = "http://127.0.0.1:8545";
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      `No web3 detected. Falling back to ${provider}. You should remove this fallback when you deploy live`,
    );

    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider(provider),
    );

  }


  App.start();

});