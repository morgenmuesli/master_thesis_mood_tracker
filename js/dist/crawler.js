"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('app-store-scraper');
class Crawler {
    constructor() {
    }
    static async search_all(term) {
        /**
         * Search for apps using the querry and return all results
         */
        let apps = [];
        let page_counter = 1;
        let results = [];
        do {
            results = await store.search({
                term: term,
                page: page_counter
            });
            apps = apps.concat(results);
            page_counter += 1;
        } while (results > 0);
        //console.log("Found {apps.length} apps");
        await apps;
        return apps;
    }
    static async search_reviews_for_app(appId) {
        /**
         * Search for reviews for a specific app
         */
        let reviews = [];
        let page_counter = 1;
        let results = [];
        do {
            results = await store.reviews({
                appId: appId.appId,
                page: page_counter,
                sort: store.sort.HELPFUL
            });
            reviews.concat(results);
            page_counter += 1;
        } while (results > 0);
        await reviews;
        return reviews;
    }
}
exports.default = Crawler;
//# sourceMappingURL=crawler.js.map