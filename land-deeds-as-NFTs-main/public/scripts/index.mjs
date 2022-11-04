import ApiClient from '../utils/apiclient.mjs';

window.onload = () => {
    document.querySelector("#login-btn").addEventListener('click',login);
};

async function login(){
  let requestBody = {
    "email" : document.querySelector("#emailID").value,
    "pwd" : document.querySelector("#password").value
  }
  let result = await ApiClient.postRequest(`/user/login`,requestBody);
  let doc = await result.json();
  localStorage.setItem("wallet", doc.walletAddress);
  if(doc.role == 'ADMIN'){
    window.location.href = "./views/admin/dashboard.html";
  }
  else if(doc.role == 'USER'){
    window.location.href = "./views/users/homepage.html";
  }
  else{
    alert('Wrong ID or Password');
  }
}