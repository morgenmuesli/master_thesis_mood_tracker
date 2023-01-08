import store from "app-store-scraper"
import * as dotenv from "dotenv";
import { LibManifestPlugin } from "webpack";
import * as mariadb from "mariadb";
import { ListFormat } from "typescript";

class DatabaseConnector {
    private db: any;

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

    async connect() {
        let conn;
        try {
            conn = await this.db.getConnection();
            const rows = await conn.query("SELECT * FROM Application");
            console.log(rows); //[ {val: 1}, meta: ... ]
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) return conn.end();
        }
    }

    async show_columns(table: string) {
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

    async insert_app(apps: Array<any>) {
        let conn;
        try {
            conn = await this.db.getConnection();
            await apps.forEach(app => {
                const rows = conn.query("INSERT INTO apple_apps (appId, icon, screenshots, title, score, genre, price, free, currency, description, developer, installs, used, number_of_reviews, platform, reason) \
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)", [app.appId, app.icon, app.screenshots.toString(), app.title, app.score, app.primaryGenre, app.price, (+app.free), app.currency, app.description, app.developer, app.reviews, 1, app.reviews, "ios", ""]);

            });
            console.log("Inserted {apps.length} apps");


        } catch (err) {
            console.log(err);
        } finally {
            if (conn) return conn.end();
        }
    }

    async delete_apps_that_are_not_in_list(app_ids: Array<String>) {
        let conn;
        try {
            conn = await this.db.getConnection();

            const rows = await conn.query("UPDATE application SET used = 0, reason_not_used = 'not in list' WHERE appId NOT IN (?)", [app_ids]);

        } catch (err) {
            console.log(err);
        } finally {
            if (conn) return conn.end();
        }
    }

    async get_appIds_from_db(used = true, table = "apple_apps") {
        let conn;
        try {
            conn = await this.db.getConnection();
            const rows = await conn.query("SELECT appId FROM " + table + " WHERE used = " + used);
            console.log(rows); //[ {val: 1}, meta: ... ]
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) return conn.end();
        }
    }


    /**
     *
     * @param reviews list of reviews
     * @param app_id foreign key to apple_apps
     * @param table table to upload to
     */

    async upload_reviews(reviews: Array<any>, app_id: int, table = "apple_reviews",) {
        let conn;
        try {
            conn = await this.db.getConnection();
            await reviews.forEach(review => {
                const rows = await conn.query("INSERT INTO " + table + " (id, userName, userUrl, version, score, title, text, url, appid) \
                \ VALUES (?,?,?,?,?,?,?,?,?)", [review.id, review.userName, review.userUrl, review.version, review.score, review.title, review.text, review.url, app_id]);

            });
            console.log("Inserted {reviews.length} reviews");
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) return conn.end();
        }
    }
}

export default DatabaseConnector;
