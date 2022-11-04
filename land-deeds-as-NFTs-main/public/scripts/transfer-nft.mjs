import ApiClient from '../utils/apiclient.mjs';

window.onload = () => {
    getTransferRequests();
};

async function getTransferRequests(){
    let result = await ApiClient.postRequest(`/admin/get-transfer-request`);
    let doc = await result.json();
    printRequests(doc.requests.results)
}

function printRequests(result){
    let resultBodyDiv = document.querySelector("#result-body");
    for(let i in result){
        let row = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = result[i].createdAt.split("T")[0];
        let td2 = document.createElement("td");
        td2.innerHTML = result[i].senderAddress;
        let td3 = document.createElement("td");
        td3.innerHTML = result[i].receiverAddress;
        let td4 = document.createElement("td");
        td4.innerHTML = result[i].tokenID;

        let btn = document.createElement('button');
        btn.style = "color:green";
        btn.addEventListener('click',approve,false);
        btn.className = "btn btn-md btn-dark";
        btn.receiver = td3.innerHTML;
        btn.sender = td2.innerHTML;
        btn.token = td4.innerHTML;
        btn.requestid = result[i]._id;

        btn.innerHTML = "Approve".toUpperCase();

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(btn);
        resultBodyDiv.appendChild(row);
    }
}

async function approve(evt){
    let transferDetails = {
        "senderAddress" : evt.currentTarget.sender,
        "receiverAddress" : evt.currentTarget.receiver,
        "tokenID" : parseInt(evt.currentTarget.token),
        "requestID" : evt.currentTarget.requestid
    }
    let result = await ApiClient.postRequest(`/admin/transfer`,transferDetails);
    let txnHash = await result.json();
    alert(`https://goerli.etherscan.io/tx/${txnHash.TransactionHash}`);
    window.location.reload();
}