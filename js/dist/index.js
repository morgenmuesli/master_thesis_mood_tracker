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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const crawler_1 = __importDefault(require("./crawler"));
const mariadb = __importStar(require("mariadb"));
function filter_apps(apps, filter) {
    let filtered_apps = apps.slice();
    // filter by category
    if (filter.categories) {
        filtered_apps = filtered_apps.filter((app) => filter.categories.includes(app.primaryGenre));
    }
    // filter by reviews
    if (filter.min_reviews) {
        filtered_apps = filtered_apps.filter((app) => app.reviews >= filter.min_reviews);
    }
    return filtered_apps;
}
async function resolveAppIds(table = "apple_apps") {
    let conn;
    const pool = mariadb.createPool({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "itsonlylocal",
        database: "mood_tracker",
        connectionLimit: 10
    });
    return new Promise((resolve, reject) => {
        let app_ids = [];
        let con = pool.getConnection();
        con.then((conn) => {
            conn.query("SELECT appId FROM apple_apps WHERE used=1").then((rows) => {
                for (let row of rows) {
                    app_ids.push(row.appId);
                }
                resolve(app_ids);
            }).catch((err) => {
                reject(err);
            });
        });
    });
}
async function download_and_save_reviews() {
    const db = new database_1.default();
    let app_ids = db.resolveAppIds("apple_apps");
    app_ids.then((ids) => {
        for (let id of ids) {
            crawler_1.default.search_reviews_for_app(id).then((reviews) => {
                db.insert_reviews(reviews, id);
            });
        }
    });
}
// async function main() {
//     let apps = await search_all("mood tracker")
//     let filtered_apps = filter_apps(apps, {categories: ["Medical", "Health & Fitness", "Lifestyle"] , min_reviews: 100})
//     let genres = new Map()
//     console.log(filtered_apps.length + " apps found")
//     for (let app of filtered_apps) {
//         console.log(app.title + " | " + app.primaryGenre + " | " + app.reviews)
//         if (genres.has(app.primaryGenre)) {
//             genres.set(app.primaryGenre, genres.get(app.primaryGenre) + 1)
//         }
//         else {
//             genres.set(app.primaryGenre, 1)
//         }
//     }
//     console.log(genres)
//     return await filtered_apps;
// }
// function fetch_all_apps_from_appstore() {
//     let categories = new Map()
//     let db = new DatabaseConnector()
//     let fst_word = ["mood", "emotions", "feelings", "affective", "happines"]
//     let snd_word = ["track", "journal", "record", "diary"]
//     for (let word1 of fst_word) {
//         for (let word2 of snd_word) {
//             let search_term = word1 + " " + word2
//             let apps = Crawler.search_all(search_term)
//             apps.then((apps) => {
//                 console.log("Found " + apps.length + " apps for " + search_term)
//             })}
//     }
// }
download_and_save_reviews();
//# sourceMappingURL=index.js.map