import connection from "../config/connectDB";
import customerService from '../services/customerService'
let handleGetAllCustomer = async (req, res) => {
    try {
        let customer = await customerService.getAllCustomer();
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


let handleCreateCustomer = async (req, res) => {
    try {
        let customer = await customerService.createCustomer(req.body);
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


let updateUser = async (req, res) => {
    let { fullname, email, address, id } = req.body;
    if (!fullname || !email || !address || !id) {
        return res.status(200).json({
            message: "Missing required params"
        })
    }
    else {
        await connection.execute(`update users set fullname = ?, email = ?, address = ? WHERE id = ?`, [fullname, email, address, id]);
        return res.status(200).json({
            message: "ok"
        })
    }

}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: "Missing required params"
        })
    }
    else {
        await connection.execute(`delete from users where id = ?`, [userId]);
        return res.status(200).json({
            message: "Delete successful"
        })
    }
}


let upload = async (req, res) => {
    try {
        console.log(req.body.data, "hu");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    handleGetAllCustomer,
    handleCreateCustomer,
    updateUser,
    deleteUser,
    upload
}