import "reflect-metadata";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import {AppRoutes} from "./routes";
import CurrencyService from "./service/CurrencyService";
const cors = require('koa-cors');
const mongoose = require('mongoose');

// create koa app
const app = new Koa();
const router = new Router();

// register all application routes
AppRoutes.forEach(route => router[route.method](route.path, route.action));

// CORS
const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

// Options to use with mongoose (mainly to avoid deprecacy warnings)
const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
};

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/donations', mongooseOptions)
    .then(async mongoose => {

        await CurrencyService.initDemoData();

        // run app
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());
        app.listen(3000);

        console.log("Koa application is up and running on port 3000");

    })
    .catch(error => {
        console.log("MongoDB connection error: ", error)
    });
