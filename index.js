import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {createConnection} from "mysql2/promise";
import User from "./models/user.js";
import Account from "./models/account.js";
import Group from "./models/group.js";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config(); 

const main = async () => {
    const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PW, MYSQL_DB} = process.env;

    const connection = await createConnection({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PW,
        database: MYSQL_DB,
    });

    await User.init();
    await Account.init();
    await Group.init();

    const app = express();

    app.use(express.json());

    app.sql = connection;

    app.use("/users", usersRouter);

    app.use("/accounts", accountsRouter);

    app.use("/groups", groupsRouter);

    app.listen(8080, () => {
        console.log("http://localhost:8080");
    });
};

main();

