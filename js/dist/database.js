"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const mariadb = __importStar(require("mariadb"));
class DatabaseConnector {
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
        }
        catch (err) {
            console.log(err);
        }
        finally {
            if (conn)
                return conn.end();
        }
    }
    async insert_app(apps) {
        let conn;
        try {
            conn = await this.db.getConnection();
            await apps.forEach(app => {
                const rows = conn.query("INSERT INTO apple_apps (appId, icon, screenshots, title, score, genre, price, free, currency, description, developer, installs, used, number_of_reviews, platform, reason) \
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)", [app.appId, app.icon, app.screenshots.toString(), app.title, app.score, app.primaryGenre, app.price, (+app.free), app.currency, app.description, app.developer, app.reviews, 1, app.reviews, "ios", ""]);
            });
            console.log("Inserted {apps.length} apps");
        }
        catch (err) {
            console.log(err);
        }
        finally {
            if (conn)
                return conn.end();
        }
    }
    // returns all app ids as a list
    async resolveAppIds(table = "apple_apps") {
        let conn;
        let querry = "SELECT appId FROM " + table + " WHERE used=1";
        try {
            conn = await this.db.getConnection();
            const res = await conn.query(querry);
            return res;
        }
        catch (err) {
            throw err;
        }
    }
    async insert_reviews(reviews, appId) {
        let conn;
        let querry = "INSERT INTO apple_reviews (appid, id, userName, userUrl, version, score, title, text, url) VALUES (?,?,?,?,?,?,?,?, ?)";
        try {
            conn = await this.db.getConnection();
            await reviews.forEach(review => {
                conn.query(querry, [appId, review.id, review.userName, review.userUrl, review.version, review.score, review.title, review.text, review.url]);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = DatabaseConnector;
//# sourceMappingURL=database.js.map