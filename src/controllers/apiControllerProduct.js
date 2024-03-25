
import productService from '../services/productService'
import customerService from '../services/customerService';
let handleGetAllPro = async (req, res) => {
    try {
        let product = await productService.getAllProduct();
        if (product) {
            return res.status(200).json(product);
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleCreateProduct = async (req, res) => {
    try {
        let product = await productService.createProduct(req.body.data);
        if (product) {
            return res.status(200).json(product);
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleGetProductDetail = async (req, res) => {
    let id = req.query.id;
    console.log(req.query, "??");
    try {
        let product = await productService.getProductDetail(id);
        if (product) {
            return res.status(200).json(product)
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleUpdateProduct = async (req, res) => {
    let data = req.body;
    try {
        let product = await productService.updateProduct(data);
        if (product) {
            return res.status(200).json(product)
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleDeleteProduct = async (req, res) => {
    console.log(req, ">>");
    let id = req.query.id;
    try {
        let product = await productService.deteleProduct(id);
        if (product) {
            return res.status(200).json(product)
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleSearchProduct = async (req, res) => {
    let data = req.body.data;
    try {
        let product = await productService.searchProduct(data);
        if (product) {
            return res.status(200).json(product);
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleFilterProduct = async (req, res) => {
    let data = req.body.data;
    // console.log(data);
    // return;
    try {
        let product = await productService.filterProduct(data);
        if (product) {
            return res.status(200).json(product);
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleFilterAndSearchProduct = async (req, res) => {
    let data = req.body.data;
    try {
        let product = await productService.filterAndSearchProduct(data);
        if (product) {
            return res.status(200).json(product);
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleCountCustomer = async (req, res) => {
    try {
        let product = await customerService.countCustomer();
        if (product) {
            return res.status(200).json(product);
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    handleGetAllPro, handleCreateProduct, handleGetProductDetail, handleUpdateProduct, handleDeleteProduct,
    handleSearchProduct, handleFilterProduct, handleFilterAndSearchProduct, handleCountCustomer
}