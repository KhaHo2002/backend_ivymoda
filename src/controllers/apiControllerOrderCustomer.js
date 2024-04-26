import connection from "../config/connectDB";
import orderCustomerService from '../services/orderCustomerService'
let handleAddOrderCustomer = async (req, res) => {
    try {
        let customer = await orderCustomerService.addOrderCustomer(req.body);
        if (customer) {
            return res.status(200).json(customer);
        }

    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleGetAllOrderCustomer = async (req, res) => {
    try {
        let orderCustomert = await orderCustomerService.getAllOrderCustomer();
        if (orderCustomert) {
            return res.status(200).json(orderCustomert);
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
    handleAddOrderCustomer,
    handleGetAllOrderCustomer
}