import connection from "../config/connectDB";
import multer from "multer";

let getHomePage = async (req, res) => {
  const [rows, fields] = await connection.execute('SELECT * FROM users ');
  return res.render('index.ejs', { dataUser: rows });
}


let getDetail = async (req, res) => {
  let id = req.params.id;
  let [user, fields] = await connection.execute(`SELECT * FROM users where id = ?`, [id]);
  return res.render('detail.ejs', { dataDetail: user });
}
let linkCreateUser = (req, res) => {
  return res.render('create.ejs');
}
let createUser = async (req, res) => {
  let { fullname, email, address } = req.body;
  await connection.execute(`INSERT INTO users (fullname, email, address)
  VALUES (?,?,?)`, [fullname, email, address]);
  return res.redirect('/');
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await connection.execute(`delete from users where id = ?`, [userId]);
  return res.redirect('/');
}

let getEditUser = async (req, res) => {
  let id = req.params.id;
  let [user, fields] = await connection.execute(`SELECT * FROM users where id = ?`, [id]);
  let [data] = user;
  return res.render('update.ejs', { dataUser: data });
}

let updateUser = async (req, res) => {
  let { fullname, email, address, id } = req.body;
  await connection.execute(`update users set fullname = ?, email = ?, address = ? WHERE id = ?`, [fullname, email, address, id]);
  return res.redirect('/');
}

let uploadFile = async (req, res) => {
  return res.render('upload.ejs');
}



const upload = multer().single('image');


let handleUpload = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(`${err}`);
    }
    // else if (err) {
    //   return res.send(`${err}`);
    // }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  });
}



module.exports = {
  getHomePage,
  getDetail,
  createUser,
  deleteUser,
  getEditUser,
  updateUser,
  linkCreateUser,
  uploadFile,
  handleUpload
}