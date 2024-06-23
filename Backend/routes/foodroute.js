import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import {addFood , listFood , removeFood} from '../controllers/foodcontrollers.js'

// Convert __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

// middlewares
foodRouter.use(bodyParser.json());
foodRouter.use(bodyParser.urlencoded({ extended: true }));
foodRouter.use(express.static('public'));

// image storage using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'), function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
});

const upload = multer({ storage: storage });


// routes
foodRouter.post("/add-food",upload.single('image') , addFood);

foodRouter.get('/list' , listFood)

foodRouter.post('/delete' , removeFood)


export default foodRouter;
