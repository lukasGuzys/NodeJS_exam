import {Router} from "express";
import {getConnection} from "./mysql.js";

export default class Group {
    constructor({id, name,}) {
        this.id = id;
        this.name = name;
    }

    static async create({id, name}) {
        try {
            const connection = await getConnection();
            const query = "INSERT INTO groups (id, name) VALUES (?, ?);";

            await connection.query(query, [id, name]);

            return new Group(name);
        } catch (e) {
            console.log("Couldn't create a Groups", e);
            throw e;
        }
    }


    static async all() {
        try {
            const connection = await getConnection();
            const query = "SELECT id, name password FROM groups";
            const [data] = await connection.query(query);
            return data.map(({id, name}) => new Group(id, name));
        } catch (e) {
            console.log("Couldn't get all groups", e);
            throw e;
        }
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS groups (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    name VARCHAR(20) NOT NULL,
                    PRIMARY KEY (id),
                    FOREIGN KEY (lecturerId) REFERENCES groups (id)
                )
            `;

            await connection.query(query);

            console.log("Successfully created 'groups' table");
        } catch (e) {
            console.log("Couldn't init 'groups' db", e);
            throw e;
        }
    }
}