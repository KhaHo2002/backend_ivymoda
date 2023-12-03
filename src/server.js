import express from "express";
import configViewEngine from "./config/viewengine";
import initRoute from "./router/web";
import bodyParser from "body-parser";
// import connection from "./config/connectdb";
import cors from 'cors';
import initApi from './router/apiManager';
import initApiCustomer from './router/apiCustomer';
import initApiSizeColor from './router/apiSizeAndColor';
import initApiProduct from './router/apiProduct';
import initApiImageCloud from './router/apiImageCloud';
import initApiJWT from "./router/apiJWT";
var morgan = require('morgan');

require('dotenv').config();

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}))
const port = process.env.PORT || 8080;
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
//write middleware
app.use((req, res, next) => {
  next();
})


app.use(morgan('combined'));

//cần có để có thể tạo request và lấy data để lưu database
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init router
initRoute(app);

//init api
initApi(app);
initApiCustomer(app);
initApiSizeColor(app);
initApiProduct(app);
initApiImageCloud(app);
initApiJWT(app);

//handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs')
})

try {
  app.listen(port, () => {
    console.log("Server started");
  });
} catch (error) {
  console.error("Error starting the server:", error);
}