const express = require('express');
const router = express.Router();
const {MINT,TRANSFER,GET_TRANSFER_REQUEST} = require('../../utils/config').ROUTES.ADMIN;
const { mintNFT,transfer, getTransferRequests} = require('../../controllers/AdminController');

router.use(MINT,mintNFT);
router.use(TRANSFER,transfer);
router.use(GET_TRANSFER_REQUEST,getTransferRequests);

module.exports = router;