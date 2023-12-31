import express from "express";
import multer from "multer";
import ocr from "./ocr.js";

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

app.use('/ocr', upload.single('image'), ocr);

const Port = 5001; 
app.listen(Port, () => console.log("Server running at port : ", Port));