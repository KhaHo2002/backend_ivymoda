
import JWTService from '../services/JWTService';
let handleCreateJWTCustomer = async (req, res) => {
    try {
        let JWTCustomer = await JWTService.createJWTCustomer(req.body);
        if (JWTCustomer) {
            return res.status(200).json(JWTCustomer);
        }

    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

let handleCreateJWTManager = async (req, res) => {
    try {
        let JWTCustomer = await JWTService.createJWTManager(req.body);
        if (JWTCustomer) {
            return res.status(200).json(JWTCustomer);
        }

    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

module.exports = { handleCreateJWTCustomer, handleCreateJWTManager }