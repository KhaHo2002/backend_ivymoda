import express from "express";
import ApiControllerOrderCustomer from '../controllers/apiControllerOrderCustomer';
let router = express.Router();

const initApiOrderCustomer = (app) => {
    router.post('/add-order-customer', ApiControllerOrderCustomer.handleAddOrderCustomer);
    router.get('/get-all-order-customer', ApiControllerOrderCustomer.handleGetAllOrderCustomer);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApiOrderCustomer;