require("dotenv").config();
const { Web3 } = require("web3");
const apiKey = process.env["API_KEY"];
const network = "sepolia";

const node = `https://eth.getblock.io/${apiKey}/${network}/`;
const web3 = new Web3(node);

//console.log(web3);

// create account and get address

const accountTo = web3.eth.accounts.create();
// console.log(accountTo);
console.log("created account :" + accountTo.address);

// get your account (you are transferring assests from your to upper new account)
const privateKey = process.env["PRIVATE_KEY"];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
//console.log(accountFrom);
console.log("My Metamask account :" + accountFrom.address);

//sign transction
const createSignedTx = async (rawTx) => {
  rawTx.from = accountFrom.address;
  rawTx.gas = await web3.eth.estimateGas(rawTx);

  // Set default values for gasPrice, maxPriorityFeePerGas, and maxFeePerGas
  rawTx.gasPrice = await web3.eth.getGasPrice();

  return await accountFrom.signTransaction(rawTx);
};

// send signed transaction to validator
// const sendSignedTx = async (signedTx) => {
//   web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
// };

const sendSignedTx = async (signedTx) => {
  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error(
      "Transaction failed with the following reason:",
      error.message
    );
  }
};

const amountTo = "0.01"; //ether

const rawTx = {
  from: accountFrom.address, // Add the 'from' field to the rawTx object
  to: accountTo.address,
  value: web3.utils.toWei(amountTo, "ether"),
};

createSignedTx(rawTx).then(sendSignedTx);

/**
 * 
 * require("dotenv").config();
const { Web3 } = require("web3");
const apiKey = process.env["API_KEY"];
 //Connect to the network
const web3 = new Web3(apiKey);
// console.log(web3);
 */
