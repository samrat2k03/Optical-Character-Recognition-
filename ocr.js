import express from "express";
import Tesseract from "tesseract.js";

const ocr = express.Router();

ocr.post('/', async(req,res) => {
    
    const { file } = req;
    // console.log('Received file:', file)

    if (!file) {
        return res.status(400).send('Source image not provided.');
    }

    const source = file.path;

    Tesseract.recognize(source, "eng")
    .then(({ data: { text } }) => { 
        res.status(200).send(text);
        // console.log(text)
     }
        )
    .catch((err) => {
        res.status(500).send('Error performing OCR.')}
        );

});

export default ocr;