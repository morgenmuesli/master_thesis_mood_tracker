const dotenv = require("dotenv");
const mariadb = require("mariadb");


class DatabaseConnector {
    db;

    constructor() {
        dotenv.config();
        this.db = mariadb.createPool({
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "itsonlylocal",
            database: "mood_tracker",
            connectionLimit: 10

        });

    }

    async show_columns(table) {
        let conn;
        try {
            conn = await this.db.getConnection();
            const rows = await conn.query("SHOW COLUMNS FROM " + table);
            console.log(rows); //[ {val: 1}, meta: ... ]
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) return conn.end();
        }
    }

    async insert_app(apps) {
        let conn = await this.db.getConnection();
        await apps.forEach(app => {
            const rows = conn.query("INSERT INTO apple_apps (appId, icon, screenshots, title, score, genre, price, free, currency, description, developer, installs, used, number_of_reviews, platform, reason) \
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)", [app.appId, app.icon, app.screenshots.toString(), app.title, app.score, app.primaryGenre, app.price, (+app.free), app.currency, app.description, app.developer, app.reviews, 1, app.reviews, "ios", ""]);

        });
        console.log("Inserted {apps.length} apps");


    }


    // returns all app ids as a list
    async resolveAppIds(table = "apple_apps") {
        let conn;
        let querry = "SELECT id, appId FROM " + table + " WHERE used=1";
        try {
            conn = await this.db.getConnection();
            const res = await conn.query(querry);
            conn.end()
            return res;
        } catch (err) {
            throw err;
        }
    }

    async insert_reviews(reviews, appId) {

        let querry = "INSERT INTO apple_reviews (appid, id, userName, userUrl, version, score, title, text, url) VALUES (?,?,?,?,?,?,?,?, ?)";
        try {
            let conn = await this.db.getConnection();
            await reviews.forEach(review => {
                conn.query(querry, [appId, review.id, review.userName, review.userUrl, review.version, review.score, review.title, review.text, review.url]);
            });
            conn.end();
        } catch (err) {
            console.log(err);
        }

    }


}

module.exports = DatabaseConnector;
