import connection from "../config/connectDB";

let getAllManager = async (req, res) => {
    try {
        const [rows, fields] = await connection.query('SELECT * FROM Ivy_moda.manager');
        if (!rows) {
            return res.status(404).json({
                message: "Not found",
            });
        } else {
            return res.status(200).json({
                message: "ok",
                data: rows
            });
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    getAllManager
}