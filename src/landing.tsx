import React, { useState } from "react";
import "./assets/landing.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { buyToken, loadWeb3 } from "./web3";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";

declare let window: any;

export default function Landing() {
  // state vars
  const [value, setValue] = useState(0);
  const [account, setAccount] = useState<string | null>(null);
  const [, setContract] = useState<Contract | null>(null);

  const price = 0.02;

  // handler for connect button click
  const handleConnectClick = () => {
    loadWeb3(window, setAccount, setContract);
  };

  // handler for mint button click
  const handleMintClick = () => {
    if (account && window.web3)
      buyToken(window.web3 as Web3, value, price, account, setContract);
  };

  // decrease value by one
  const handleMinus = () => {
    setValue(value > 0 ? value - 1 : 0);
  };

  // increase value by one
  const handlePlus = () => {
    setValue(value + 1);
  };

  // handler for value change
  const handleChange = (event: any) => {
    event.target.value !== "" && setValue(parseInt(event.target.value));
    event.target.value === "" && setValue(0);
  };

  return (
    <div className="landing">
      <div className="logo">
        <h2>
          CRIP<span className="yellow">.</span>
        </h2>
      </div>
      <div className="Title">
        <h1>
          Crip-To Ape Club<span className="yellow">.</span>
        </h1>
      </div>
      <div className="mint-section">
        <div className="wrapper">
          <div className="address p-4"> Your Address: </div>
          <button className="connect-btn" onClick={handleConnectClick}>
            Connect Your Wallet
          </button>

          <div className="slider">
            <i
              className="bi bi-dash-circle-fill minus-btn"
              onClick={handleMinus}
            ></i>
            <div className="input-wrapper">
              <label htmlFor="numberNfts">Number</label>
              <input
                className="input"
                id="numberNfts"
                type="numeric"
                value={value}
                onChange={handleChange}
              />
            </div>
            <i
              className="bi bi-plus-circle-fill plus-btn"
              onClick={handlePlus}
            ></i>
          </div>
          <button className="mint-btn" onClick={handleMintClick}>
            Submit Your Mint
          </button>
        </div>
      </div>
      <div className="price">
        <h3>
          Price <br />
          {price}
        </h3>
      </div>
    </div>
  );
}
