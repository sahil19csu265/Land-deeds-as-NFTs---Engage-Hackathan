module.exports = {
    ROUTES : {
        ROOT:"/",
        ADMIN:{
            MINT : "/initiate-mint",
            TRANSFER : "/transfer",
            GET_TRANSFER_REQUEST : "/get-transfer-request"
        },
        USER : {
            REGISTER : "/register",
            LOGIN : "/login",
            ADD_TRANSFER_REQUEST : "/add-transfer-request",
            ADD_CORRECTION_REQUEST : "/add-correction-request",
            CREATE_WILL : "/create-will",
            VIEW_WILL : "/view-will"
        }
    },
    STATUS_CODES: {
        NOT_FOUND: 404,
        SUCCESS: 200,
        SERVER_ERROR: 500,
        FILE_NOT_FOUND: 404,
    },
    SCHEMAS: {
        USERS: "users",
        TRANSFER_REQUEST : "transferRequests",
        CORRECTION_REQUEST : "correctionRequests"
    },
}