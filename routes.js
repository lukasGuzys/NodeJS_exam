import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import joi from "joi";
import bill from "./db.js"

dotenv.config();

const router = Router();

router.post("/register", async (req, res) => {
    const { register } = req.app;

    try {
        const { username, password } = await userInfoSchema.validateAsync(req.body);
        const hashed = await bcrypt.hash(password, 10);
        const query = "INSERT INTO Users (username, password) VALUES (?, ?);";

        await register.query(query, [username, hashed]);

        res.send({
            registered: username,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});


router.post("/accounts", async (req, res) => {
    const { username, password } = req.body;
    const { mysql } = req.app;

    try {
        const query = "SELECT * FROM Users WHERE username = ?";
        const [result] = await mysql.query(query, [username]);
        const [user] = result;

        if (!user) {
            return res.status(404).send({
                error: "Incorrect username or password",
            });
        }

        const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_SECRET);

        res.send({
            token,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});




router.get("/accounts", async (req, res) => {
    const { mysql } = req.app;

    try {
        const query = `
            SELECT name, lastname, email, password
            FROM users c
                INNER JOIN Groups b ON c.group_id = b.id
        `;
        const [cars] = await mysql.query(query);

        res.send(cars);
    } catch (error) {
        sendError(error, res);
    }
});




router.get("/bills/:id", async (req, res) => {
    try {
        const bills = await bill.all();
        res.send(users);
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

router.post("/bills", async (req, res) => {
    const {name, lastname, email, password} = req.body;

    try {
        const bill = await bill.create({group_id, amount, description});

        res.status(201).send({
            user,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;