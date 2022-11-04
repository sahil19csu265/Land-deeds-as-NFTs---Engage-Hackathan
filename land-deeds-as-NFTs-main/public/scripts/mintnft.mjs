import ApiClient from "../utils/apiclient.mjs";

window.onload = () => {
  document
    .querySelector("#submit-btn")
    .addEventListener("click", initiateMinting);
};

async function initiateMinting() {
  let requestBody = {
    walletAddress: document.querySelector("#walletAddress").value,
    nftMetadataURL: document.querySelector("#nft-url").value,
  };
  let result = await ApiClient.postRequest(`/admin/initiate-mint`, requestBody);

  let txnhash = await result.json();
  txnhash = txnhash.TransactionHash;
  alertUser(txnhash);
}

function alertUser(txnhash) {
  console.log("inside this");
  let alertDiv = document.querySelector("#alert-box");
  alertDiv.style = "display: show;";
  if (txnhash) {
    console.log(`https://goerli.etherscan.io/tx/${txnhash}`);
    alertDiv.className = "alert alert-success m-3";
    document.querySelector("#alert-message").innerHTML =
      "Successfull Transaction.";
    let alertLink = document.createElement("a");
    alertLink.href = `https://goerli.etherscan.io/tx/${txnhash}`;
    alertLink.innerHTML = "Click Here To Verify";
    alertDiv.appendChild(alertLink);
  } else {
    alertDiv.className = "alert alert-danger m-3";
    document.querySelector("#alert-message").innerHTML = "Failed Transaction";
  }

  setTimeout(() => {
    let alertDiv = document.querySelector("#alert-box");
    alertDiv.style = "display:none;";
    alertDiv.removeChild(alertDiv.lastChild);
    document.querySelector("#alert-message").innerHTML = "";
  }, 10000);
}
