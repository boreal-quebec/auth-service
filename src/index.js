import {ServiceBroker} from "moleculer";
import login from "./actions/login.js";
import verify from "./actions/verify.js";
import createUser from "./actions/createUser.js";
import natsConfig from "./config/nats"
import getUser from "./actions/getUser";
import {loggerOptions} from "./logger";
import mongoose from "mongoose";
import dbConfig from "./config/db";

const broker = new ServiceBroker({
    nodeID: "auth-service",
    transporter: `nats://${natsConfig.user}:${natsConfig.password}@${natsConfig.host}:${natsConfig.port}`,
    logger: loggerOptions
});

broker.createService({
    name: "auth",
    actions: {
        "login": login,
        "verify": verify,
        "createUser": createUser,
        "getUser": getUser
    },
    logLevel: "debug"
});

mongoose
    .connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=admin`)
    .then(() => broker.start())