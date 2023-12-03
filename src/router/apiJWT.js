import express from "express";
import ApiControllerJWT from '../controllers/apiControllerJWT';
let router = express.Router();

const initApiCustomer = (app) => {
    router.post('/customer-jwt', ApiControllerJWT.handleCreateJWTCustomer);
    router.post('/manager-jwt', ApiControllerJWT.handleCreateJWTManager);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApiCustomer;