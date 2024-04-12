import connection from "../config/connectDB";

let addOrderCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { customer, product, address_delivery, method_pay, discountCode, quantity_pro, total_amount } = data;
            product = JSON.stringify(product);
            address_delivery = JSON.stringify(address_delivery);
            const [insertOrderCustomer, fieldsOrderCustomer] = await connection.query(
                `INSERT INTO orders (customer, product, address_delivery, method_pay, discountCode, quantity_pro, total_amount)
            VALUES (?,?,?,?,?,?,?)`, [customer, product, address_delivery, method_pay, discountCode, quantity_pro, total_amount]
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

module.exports = {
    addOrderCustomer
}