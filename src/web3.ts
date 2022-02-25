import { Dispatch, SetStateAction } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { tokenABI } from "./assets/contracts/ABIs";
import { tokenAddress } from "./assets/contracts/contractAddress";

/**  Load web3 and set it up on the window object
 * */
export async function loadWeb3(
  window: any,
  setAccount: Dispatch<SetStateAction<string | null>>,
  setContract: Dispatch<SetStateAction<Contract | null>>
) {
  // todo - this could be a hook
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.web3 = web3;
    await window.ethereum.enable();

    const account = await web3.eth.getAccounts();
    setAccount(account[0]);

    const contract = new web3.eth.Contract(tokenABI as any, tokenAddress);
    setContract(contract);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;

    const account = await web3.eth.getAccounts();
    setAccount(account[0]);

    const contract = new web3.eth.Contract(tokenABI as any, tokenAddress);
    setContract(contract);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

/** Buy token using the specified account
 * */
export async function buyToken(
  web3: Web3,
  numberOfTokens: number,
  price: number,
  account: string,
  setContract: Dispatch<SetStateAction<Contract | null>>
) {
  const contract = new web3.eth.Contract(tokenABI as any, tokenAddress);
  setContract(contract);

  console.log(account);

  let cost = price * numberOfTokens * 0;

  const isMintFree = await contract.methods.isMintFree().call();

  if (isMintFree === true) cost = 0.0;

  const tokenTransaction = await contract.methods
    .mintItems(numberOfTokens)
    .send({
      from: account,
      value: web3.utils.toWei(cost.toString(), "ether"),
    });

  const tokenId: any = JSON.parse(JSON.stringify(tokenTransaction))["events"][
    "Transfer"
  ]["returnValues"];
  const tokenIdArray: any[] = [];

  console.log(tokenABI);

  // document.getElementById('mint').classList.add('active-bear');

  if (tokenId !== null) window.alert("Token ID: " + JSON.stringify(tokenId));
  else window.alert("Token IDS: " + JSON.stringify(tokenIdArray));
}
