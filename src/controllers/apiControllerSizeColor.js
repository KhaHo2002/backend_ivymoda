import connection from "../config/connectDB";
import colorsizeService from '../services/colorsizeService'
let handleGetAllColor = async (req, res) => {
    try {
        let customer= await colorsizeService.getAllColor();
        // console.log(customer);
        if(customer){
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

let handleGetAllSize= async(req,res)=>{
    try {
        let allsize= await colorsizeService.getAllSize();
        // console.log(customer);
        if(allsize){
            return res.status(200).json(allsize);
        }
        
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Internal Server Error",
        });
    }
}

module.exports={
    handleGetAllColor,handleGetAllSize
}