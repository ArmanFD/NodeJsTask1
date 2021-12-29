import express from "express";
import { getAllBooks, getBooksById, addBooks, updateBooks, deleteBooks } from "./controllers.js";

export const router = express.Router();

router.route("/").get(getAllBooks).post(addBooks);
router.route("/:id").get(getBooksById).put(updateBooks).delete(deleteBooks);