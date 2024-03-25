import express from "express";
import apiControllerPro from '../controllers/apiControllerProduct';
import { checkUserJWT } from '../middleware/checkJWT';
const router = express.Router();

const initApiProductAdmin = (app) => {
    router.all('*', checkUserJWT);
    router.get('/get-all-pro', apiControllerPro.handleGetAllPro);
    router.get('/count-customer', apiControllerPro.handleCountCustomer);
    router.post('/create-pro', apiControllerPro.handleCreateProduct);
    router.get('/get-product-detail', apiControllerPro.handleGetProductDetail)
    router.put('/update-product', apiControllerPro.handleUpdateProduct);
    router.delete('/delete-product', apiControllerPro.handleDeleteProduct);
    router.post('/search-product', apiControllerPro.handleSearchProduct);
    router.post('/filter-product', apiControllerPro.handleFilterProduct);
    router.post('/filter-and-search-product', apiControllerPro.handleFilterAndSearchProduct);
    // router.post('api/upload',ApiController.upload);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApiProductAdmin;