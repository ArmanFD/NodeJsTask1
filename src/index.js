import express from "express";
import { router } from "./route.js"

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/books", router);
app.listen(port, () => { console.log(`app is listening at port ${port}`)})