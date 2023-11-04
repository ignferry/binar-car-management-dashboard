import multer from "multer";
import { join, extname } from "path";
import { randomUUID } from "crypto";

export const carImageUpload = multer(
    {
        storage: multer.diskStorage(
            {
                destination: (req, file, cb) => {
                    cb(null, join(__dirname, "..", "..", "storage", "cars"));
                },
                filename: (req, file, cb) => {
                    cb(null, randomUUID() + extname(file.originalname));
                }
            }
        ),
        fileFilter: (req, file, cb) => {
            let ext = extname(file.originalname);
            if (ext !== ".png" && ext != ".jpg" && ext != ".jpeg") {
                return cb(new Error("Only images are allowed!"));
            }
            cb(null, true);
        }
    }
)