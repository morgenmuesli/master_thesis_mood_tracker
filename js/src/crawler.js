var store = require('app-store-scraper');
const exp = require("constants");


const search_all = async function (term) {
    /**
     * Search for apps using the querry and return all results
     */
    let apps = []
    let page_counter = 1
    let results = []
    do {
        results = await store.search({
            term: term,
            page: page_counter
        })
        apps = apps.push(results)
        page_counter += 1


    } while (results > 0)
    //console.log("Found {apps.length} apps");
    await apps;
    return apps;
}

const search_reviews_for_app = async function (appId) {
    /**
     * Search for reviews for a specific app
     */
    let reviews = []
    let page_counter = 1
    let results = []
    const max_page = 10
    do {
        results = await store.reviews({
            appId: appId,
            page: page_counter,
            sort: store.sort.HELPFUL
        })

        reviews = reviews.concat(results)
        page_counter += 1


    } while (results.length > 0 && page_counter < max_page)
    await reviews;
    return reviews;
}


module.exports = {
    search_all,
    search_reviews_for_app
}





