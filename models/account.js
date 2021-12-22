import {Router} from "express";
import {getConnection} from "./mysql.js";

export default class Account {
    constructor({id, group_id, user_id}) {
        this.id = id;
        this.group_id = group_id;
        this.user_id = user_id;
    }

    static async create({id, group_id, user_id}) {
        try {
            const connection = await getConnection();
            const query = "INSERT INTO accounts (id, group_id, user_id) VALUES (?, ?);";

            await connection.query(query, [id, group_id, user_id]);

            return new Account(title);
        } catch (e) {
            console.log("Couldn't create a account", e);
            throw e;
        }
    }

    static async all() {
        try {
            const connection = await getConnection();
            const query = "SELECT id, group_id, user_id email FROM accounts";
            const [data] = await connection.query(query);
            return data.map(({id, group_id, user_id}) => new User(id, group_id, user_id));
        } catch (e) {
            console.log("Couldn't get all accounts", e);
            throw e;
        }
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS accounts (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    title VARCHAR(20) NOT NULL,
                    lecturerId INTEGER NOT NULL,
                    PRIMARY KEY (id),
                    FOREIGN KEY (lecturerId) REFERENCES users (id)
                )
            `;

            await connection.query(query);

            console.log("Successfully created 'lectures' table");
        } catch (e) {
            console.log("Couldn't init 'lectures' db", e);
            throw e;
        }
    }
}
