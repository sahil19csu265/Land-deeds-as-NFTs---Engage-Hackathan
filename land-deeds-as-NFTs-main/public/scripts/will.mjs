window.onload = () => {
    document.querySelector("#will-submit-btn").addEventListener('click',submitWill);
};

async function submitWill(){
    let willDetails = {
        "address" : localStorage.getItem("wallet"),
        "tokenID" : document.querySelector("#tokenID").value,
        "willText" : document.querySelector("#willText").value,
    }
    let result = await ApiClient.postRequest(`/user/create-will`,willDetails);
    let txnHash = await result.json();
    alertUser(txnHash.TransactionHash);
}

function alertUser(txnhash){
    console.log("inside this");
    let alertDiv = document.querySelector("#alert-box");
    alertDiv.style = "display: show;";
    if(txnhash){
        console.log(`https://goerli.etherscan.io/tx/${txnhash}`);
        alertDiv.className="alert alert-success m-3";
        document.querySelector("#alert-message").innerHTML = "Successfull Transaction."
        let alertLink = document.createElement('a');
        alertLink.href = `https://goerli.etherscan.io/tx/${txnhash}`;
        alertLink.innerHTML = "Click Here To Verify";
        alertDiv.appendChild(alertLink);
    }
    else{
        alertDiv.className="alert alert-danger m-3";
        document.querySelector("#alert-message").innerHTML = "Failed Transaction";
    }

    setTimeout(()=>{
        let alertDiv = document.querySelector("#alert-box");
        alertDiv.style="display:none;";
        alertDiv.removeChild(alertDiv.lastChild);
        document.querySelector("#alert-message").innerHTML = "";
    },10000)
}