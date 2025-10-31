import express from 'express';
const app = express();
import  { PORT } from './config/index.js';
import apiRouter from './routes/index.js';
import bodyParser from 'body-parser';

app.use(bodyParser.json());

// function m1(req, res, next) {
//     console.log("This is middleware 1");
//     next();
// }

// function m2(req, res, next) {
//     console.log("This is middleware 2");
//     next();
// }

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})