import * as store from "app-store-scraper";
import DatabaseConnector from "./database";
import Crawler from "./crawler";
import * as fs from "fs";

function filter_apps(apps: any, filter: any) {
    let filtered_apps = apps.slice()
    // filter by category
    if (filter.categories) {
        filtered_apps = filtered_apps.filter((app: any) => filter.categories.includes(app.primaryGenre))
    }
    // filter by reviews
    if (filter.min_reviews) {
        filtered_apps = filtered_apps.filter((app: any) => app.reviews >= filter.min_reviews)
    }

    return filtered_apps;
}

function download_and_save_reviews() {
    let db = new DatabaseConnector()
    let apps = db.get_apps()
    for (let app of apps) {
        let reviews = Crawler.search_reviews_for_app(app.appId)
        db.insert_reviews(reviews)
    }

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


function fetch_all_apps_from_appstore() {
    let categories = new Map()
    let db = new DatabaseConnector()
    let fst_word = ["mood", "emotions", "feelings", "affective", "happines"]
    let snd_word = ["track", "journal", "record", "diary"]

    for (let word1 of fst_word) {
        for (let word2 of snd_word) {
            let search_term = word1 + " " + word2
            let apps = Crawler.search_all(search_term).then((apps) => {
                console.log(apps.length + " apps found")
                for (let app of apps) {
                    if (categories.has(app.primaryGenre)) {
                        categories.set(app.primaryGenre, categories.get(app.primaryGenre) + 1)
                    }
                    else {
                        categories.set(app.primaryGenre, 1)
                    }
                }
                db.insert_app(apps)

            })
        }
    }
}


download_and_save_reviews()
