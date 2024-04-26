import connection from "../config/connectDB";

let addOrderCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { customer, number_phone, product, address_delivery, method_pay, discountCode, quantity_pro, total_amount } = data;

            const [insertOrderCustomer, fieldsOrderCustomer] = await connection.query(
                `INSERT INTO orders (customer, number_phone, product, address_delivery, method_pay, discountCode, quantity_pro, total_amount)
            VALUES (?,?,?,?,?,?,?,?)`, [customer, number_phone, product, address_delivery, method_pay, discountCode, quantity_pro, total_amount]
            );
            if (!insertOrderCustomer) {
                resolve({
                    errCode: 1,
                    message: "Can't add order",
                });
            }
            else {
                resolve({
                    errCode: 0,
                    message: "Add order success"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllOrderCustomer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM orders');
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Can't get all order",
                });
            }
            else {
                resolve({
                    errCode: 0,
                    message: "Get order success",
                    data: rows
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    addOrderCustomer,
    getAllOrderCustomer
}