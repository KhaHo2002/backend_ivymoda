import connection from "../config/connectDB";

let getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM product');
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: rows
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name_pro, type_pro_sex, image_pro, price, sale, quantity, desprohtml, status_pro, color, size } = data
            const [rows, fields] = await connection.query(
                `INSERT INTO product (name_pro, type_pro_sex, image_pro,price,sale,quantity,desprohtml,status_pro,color,size)
                VALUES (?,?,?,?,?,?,?,?,?,?)`, [name_pro, type_pro_sex, image_pro, price, sale, quantity, desprohtml, status_pro, color, size]
            );
            if (rows) {
                resolve({
                    errCode: 0,
                    message: "ok"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Not found",

                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getProductDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query(
                `select * from product where idpro = ?`, [id]
            );
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: rows
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let { idpro, name_pro, type_pro_sex, image_pro, price, sale, quantity, desprohtml, status_pro, color, size } = data.data;
                const [rows, fields] = await connection.query(
                    `UPDATE product SET name_pro = ?, type_pro_sex = ?, image_pro = ?, price = ?, sale = ?, quantity = ?, desprohtml = ?, status_pro = ?, color = ?, size = ? WHERE idpro = ?`,
                    [name_pro, type_pro_sex, image_pro, price, sale, quantity, desprohtml, status_pro, color, size, idpro]
                );
                if (rows) {
                    console.log(rows);
                    resolve({
                        errCode: 0,
                        message: "Product updated successfully"

                    });
                } else {
                    resolve({
                        errCode: 1,
                        message: "Product not found or no changes were made",
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}


let deteleProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                const [rows, fields] = await connection.query(`delete from product where idpro = ?`, [id]);
                if (!rows) {
                    resolve({
                        errCode: 1,
                        message: "Not found",
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: "ok"
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let searchProduct = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (data) {
                let searchPattern = `%${data}%`;
                const [rows, fields] = await connection.query(`SELECT * FROM product WHERE name_pro LIKE ?`, [searchPattern]);
                if (!rows) {
                    resolve({
                        errCode: 1,
                        message: "Not found",
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: "ok",
                        data: rows
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}


let filterProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let listSize = data.size;
                let listColor = data.color;
                let type_sex = data.type_sex;
                const sizeConditions = listSize.map(size => `size LIKE '%${size}%'`);
                const sizePattern = sizeConditions.join(' OR ');

                const colorConditions = listColor.map(size => `color LIKE '%${size}%'`);
                const colorPattern = colorConditions.join(' OR ');

                const typeSex = `type_pro_sex="${type_sex}"`;

                if (listSize.length <= 0) {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${colorPattern}) and (${typeSex})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }

                else if (listColor.length <= 0) {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${sizePattern}) and (${typeSex})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }
                else if (listSize.length <= 0 && listColor.length <= 0) {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${typeSex})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }
                else {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${sizePattern}) and (${colorPattern}) and (${typeSex})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

let filterAndSearchProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let listSize = data.size;
                let listColor = data.color;
                let titleSearch = `name_pro LIKE '%${data.titleSearch}%'`;

                const sizeConditions = listSize.map(size => `size LIKE '%${size}%'`);
                const sizePattern = sizeConditions.join(' OR ');

                const colorConditions = listColor.map(size => `color LIKE '%${size}%'`);
                const colorPattern = colorConditions.join(' OR ');
                if (listSize.length <= 0) {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${colorPattern}) and (${titleSearch})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }

                else if (listColor.length <= 0) {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${sizePattern}) and (${titleSearch})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }
                else if (listSize.length <= 0 && listColor.length <= 0) {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${titleSearch})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }
                else {
                    const [rows, fields] = await connection.query(`SELECT * FROM product WHERE (${sizePattern}) and (${colorPattern}) and (${titleSearch})`);
                    if (!rows) {
                        resolve({
                            errCode: 1,
                            message: "Not found",
                        });
                    } else {
                        resolve({
                            errCode: 0,
                            message: "ok",
                            data: rows
                        });
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllProduct,
    createProduct,
    getProductDetail,
    updateProduct,
    deteleProduct,
    searchProduct,
    filterProduct,
    filterAndSearchProduct
}