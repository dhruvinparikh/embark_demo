/*global contract, config, it, assert*/

const Purchase = artifacts.require('Purchase');

let accounts;
let buyerAddress;
let sellerAddress;
let price = 100000;
let state = {
  "CREATED": 0,
  "LOCKED": 1,
  "INACTIVE": 2
}

config({
  deployment: {
    accounts: [{
      "mnemonic": "your mnemonic here",
      "numAddresses": 10
    }]
  },
  contracts: {
    "Purchase": {
      args: [price],
      fromIndex: 0
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
  buyerAddress = accounts[1];
  sellerAddress = accounts[0];
});

contract("Purchase", function () {
  this.timeout(0);

  it("Should deploy Purchase", async function () {
    let result = await Purchase.options.address;
    let contractState = await Purchase.state();
    assert.ok(result.length > 0);
    assert.ok(contractState == state["CREATED"])
  });


  it("should get the accounts", async function () {
    assert.ok(accounts.length > 0);
  });

  it("signing transaction", async function () {
    var message = await web3.eth.accounts.signTransaction({
      to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
      value: '1000000000',
      gas: 2000000
    }, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
    console.log(message);
  });

  it("creating accounts", async function () {
    var newAccount = web3.eth.accounts.create();
    console.log(newAccount);
  });


});