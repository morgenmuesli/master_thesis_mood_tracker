import store from "app-store-scraper"
import mysql from "mysql2";
import * as dotenv from "dotenv";
import { LibManifestPlugin } from "webpack";


class DatabaseConnector {
    private db: mysql.Connection;

    constructor() {
        this.db = "blubber";
    }
    connect() {
        console.log("Connecting to database...");
        this.db.connect((err) => {
            if (err) {
                console.log("Error connecting to database.");
                throw err;
            }
            console.log("Connected to database.");
        });

    }
}

function main() {
    const db = new DatabaseConnector();
    mysql.createConnection({
        host: "mariadb",
        user: "root",
        password: "itsonlylocal",
        database: "mood_tracker"
})};



main();