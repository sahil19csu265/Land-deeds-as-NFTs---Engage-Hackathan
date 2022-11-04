const express = require('express');
const router = express.Router();
const {REGISTER,LOGIN,ADD_TRANSFER_REQUEST,ADD_CORRECTION_REQUEST, CREATE_WILL, VIEW_WILL} = require('../../utils/config').ROUTES.USER;
const { register,login,addTransferRequest, addCorrectionRequest, createWill, viewWill} = require('../../controllers/UserController');

router.use(REGISTER,register);
router.use(LOGIN,login);
router.use(ADD_TRANSFER_REQUEST,addTransferRequest);
router.use(ADD_CORRECTION_REQUEST,addCorrectionRequest);
router.use(CREATE_WILL,createWill);
router.use(VIEW_WILL,viewWill);

module.exports = router;