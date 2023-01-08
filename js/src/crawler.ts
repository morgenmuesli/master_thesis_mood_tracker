import * as store from "app-store-scraper"


class Crawler {
    constructor() {

            }

    static async search_all(term: string) {
        /**
         * Search for apps using the querry and return all results
         */
        let apps = []
        let page_counter = 1
        let results: unknown = []
        do{
            results = await store.search({
                term: term,
                num: 100,
                page: page_counter
            })
            apps = apps.concat(results)
            page_counter += 1


        }while(results.length > 0)
        //console.log("Found {apps.length} apps");
        await apps;
        return apps;
    }

    static async search_reviews_for_app(appId: string) {
        /**
         * Search for reviews for a specific app
         */
        const max_page = 10 // max number of pages to search according to api specifiaction
        let reviews = []
        let page_counter = 1
        let results: unknown = []
        do{
            results = await store.reviews({
                id: appId,
                page: page_counter
            })
            reviews = reviews.concat(results)
            page_counter += 1


        }while(results.length > 0 && page_counter < max_page)
        console.log("Found {apps.length} apps");
        await reviews;
        return reviews;
    }






}

export default Crawler;
