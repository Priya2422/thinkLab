const Cell= require("../models/Cell");
const fs=require("fs");
const FormData = require('form-data');
const axios=require("axios");
const generateSoh  = require("../utils/soh");
const base64ToFile  = require("../utils/base64ToFile");
const path=require("path");
const { default: mongoose } = require("mongoose");
const getData=async(req,res)=>{
    try {
        const cells = await Cell.find({});
        res.status(200).send({ message: 'Data retrieved successfully', items: cells });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error retrieving data', error: err });
    }
}
const getDataById=async(req,res)=>{
    const id=new mongoose.Types.ObjectId(req.params.id);
    try {
        const cell = await Cell.findById(id);
        res.status(200).send({ message: 'Data retrieved successfully', item: cell });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error retrieving data', error: err });
    }

}
const postData=async(req,res)=>{
    const data=req.body;
    console.log(req.files);
    const {manufacturer,model,type,cellId,formFactor, height,diameter,mass,volume}=data;
    const file = req.files;
    const cellImageUrl=file[1].path.replace("\\","/");
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file[0].path), file[0].originalname);
    try{
        const flaskResponse= await axios.post('http://127.0.0.1:5000/get_image', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });
        const filePath=`uploads/${cellId}barcode.png`;
        await base64ToFile(flaskResponse.data.image,filePath)
        const cellData={
            cellId: cellId,
            manufacturer: manufacturer,
            model: model,
            type: type,
            formFactor: formFactor,
            mass: mass,
            diameter: diameter,
            height: height,
            cellImage: cellImageUrl,
            volume: volume,
            plot: filePath,
            parameters: flaskResponse.data.text_data,
            soh: generateSoh(flaskResponse.data.text_data[0])
        }
        const response=new Cell(cellData);
        await response.save();
        res.status(200).send({ message: 'Data saved successfully'});
    }catch(error){
        console.log(error);
        res.status(500).send({ message: 'Error saving data', error: error});
    }
}
module.exports={
    getData,
    postData,
    getDataById
}