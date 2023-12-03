import express from "express";
import ApiControllerCustomer from '../controllers/apiControllerCustomer';
let router = express.Router();

const initApiCustomer = (app) => {
    router.get('/get-all-customer', ApiControllerCustomer.handleGetAllCustomer);
    router.post('/create-customer', ApiControllerCustomer.handleCreateCustomer);
    router.put('/update', ApiControllerCustomer.updateUser);
    router.delete('/delete/:id', ApiControllerCustomer.deleteUser);
    router.post('api/upload', ApiControllerCustomer.upload);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApiCustomer;