import express from "express";
import apiControllerPro from '../controllers/apiControllerProduct';
const router = express.Router();

const initApiProductClien = (app) => {
    router.get('/get-all-pro-client', apiControllerPro.handleGetAllPro);
    router.get('/get-product-detail-client', apiControllerPro.handleGetProductDetail)
    router.post('/search-product-client', apiControllerPro.handleSearchProduct);
    router.post('/filter-product-client', apiControllerPro.handleFilterProduct);
    router.post('/filter-and-search-product-client', apiControllerPro.handleFilterAndSearchProduct);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApiProductClien;