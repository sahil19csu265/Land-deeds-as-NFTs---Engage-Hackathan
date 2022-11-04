import ApiClient from '../utils/apiclient.mjs';

window.onload = () => {
    getNFTs();
};

async function getNFTs(){
  clearResult();
  let walletAddress = localStorage.getItem("wallet");
  console.log(walletAddress);
  const results = await fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}`);
  const nfts = await results.json();

  (nfts.assets.length === 0 ) ? printMessage() : printNFts(nfts.assets);
}

function printNFts(assets){
    var resultDiv = document.querySelector('#results');
    let rowDiv = document.createElement('div');
    rowDiv.className = "row justify-content-around";
    
    for(let i in assets){
        if(i != 0 && i % 3 == 0){
            resultDiv.appendChild(document.createElement('br'));
            resultDiv.appendChild(document.createElement('br'));
        }

        let cardDiv = document.createElement('div');
        cardDiv.className = "card p-1 m-2";
        cardDiv.style = "width: 20rem;";
        let imgTag = document.createElement('img');
        imgTag.src = assets[i].image_thumbnail_url;
        imgTag.style = "height : 200px; width : 80%; margin: 0px auto";

        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = "card-body";

        let cardHeading = document.createElement('h5');
        cardHeading.className = "card-title text-center";
        cardHeading.innerHTML = assets[i].name;

        let descriptionTag = document.createElement('p');
        descriptionTag.className = "card-text";
        descriptionTag.innerHTML = assets[i].description;

        let dpTag = document.createElement('div');
        let profileImage = document.createElement('img');
        profileImage.src = assets[i].creator.profile_img_url;
        profileImage.style = "border-radius : 50%; height:50px; display : inline;";
        dpTag.appendChild(profileImage);

        let createrTag = document.createElement('p');
        createrTag.innerHTML = `Created By <b> ${assets[i].creator.user.username} </b>`;
        
        let dpRow = document.createElement('div');
        dpRow.className = "d-flex justify-content-start";
        
        let column1 = document.createElement('div');
        column1.className = "col";
        column1.appendChild(dpTag);
        let column2 = document.createElement('div');
        column2.className = "col";
        column2.appendChild(createrTag);
        dpRow.appendChild(column1);
        dpRow.appendChild(column2);

        let openSeaBtn = document.createElement('a');
        openSeaBtn.href = assets[i].permalink;
        openSeaBtn.style = "margin : 0px 80px";
        openSeaBtn.className = "btn btn-success";
        openSeaBtn.innerHTML = "View Details";

        cardBodyDiv.appendChild(cardHeading);
        cardBodyDiv.appendChild(descriptionTag);
        cardBodyDiv.appendChild(dpRow);
        cardBodyDiv.appendChild(openSeaBtn);
        cardDiv.appendChild(imgTag);
        cardDiv.appendChild(cardBodyDiv);
        rowDiv.appendChild(cardDiv);
    }
    resultDiv.appendChild(rowDiv);
}

function clearResult(){
    var resultDiv = document.querySelector('#results');
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.lastChild);
    }
}

function printMessage(){
    var resultDiv = document.querySelector('#results');
    var h2 = document.createElement('h2');
    h2.innerHTML = "No Collections Available for this wallet Address";
    h2.className = "text-center mt-3";
    h2.style = "color:red";
    resultDiv.appendChild(h2);
}
