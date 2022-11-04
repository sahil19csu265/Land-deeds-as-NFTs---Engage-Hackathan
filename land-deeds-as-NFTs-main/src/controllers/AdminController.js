const transferReq_crud = require("../db/services/transferReq_crud");
const NFTOperations = require("../services/NFTOperations");
const {SUCCESS,NOT_FOUND,SERVER_ERROR,FILE_NOT_FOUND} = require("../utils/config").STATUS_CODES;

module.exports = adminController = {

    async mintNFT(request,response){

        const mintingDetails = {
            "walletAddress" : request.body.walletAddress,
            "nftMetadataURL" : request.body.nftMetadataURL 
        }

        const txhash =  await NFTOperations.mintNFT(mintingDetails);
        
        try{
            if(txhash){
                response.status(SUCCESS).json({"TransactionHash" : txhash});
            }
            else{
                response.status(NOT_FOUND).json("Minting Failed");
            }
        }
        catch(error){
            response.status(SERVER_ERROR).json({"err" : error});
        }
    },

    async transfer(request,response){

        const transferDetails = {
            "senderAddress" : request.body.senderAddress,
            "receiverAddress" : request.body.receiverAddress,
            "tokenID" : request.body.tokenID,
            "requestID" : request.body.requestID
        }

        console.log(transferDetails);
        
        const txhash =  await NFTOperations.transferNFT(transferDetails);
        
        try{
            if(txhash){
                const doc = await transferReq_crud.delete(transferDetails.requestID);
                response.status(SUCCESS).json({"TransactionHash" : txhash});
            }
            else{
                response.status(NOT_FOUND).json("Minting Failed");
            }
        }
        catch(error){
            response.status(SERVER_ERROR).json({"err" : error});
        }
    },

    async getTransferRequests(request, response) {
        try {
          const doc = await transferReq_crud.getAll();
          if (doc) {
            response
              .status(SUCCESS)
              .json({"requests": {results : doc}});
          } else {
            response
              .status(NOT_FOUND)
              .json({ message: "No Request Found" });
          }
        } catch (err) {
          response
            .status(SERVER_ERROR)
            .json({ message: "Unable to reach server."});
        }
      },

};