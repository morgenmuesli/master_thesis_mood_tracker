var store = require('app-store-scraper');

async function search_all(term: string) {
    let apps = []
    let page_counter = 1
    let results = []
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


async function main() {
    let apps = await search_all("mood tracker")
    let filtered_apps = filter_apps(apps, {categories: ["Medical", "Health & Fitness", "Lifestyle"] , min_reviews: 100})
    let genres = new Map()
    console.log(filtered_apps.length + " apps found")
    for (let app of filtered_apps) {
        console.log(app.title + " " + app.primaryGenre + " " + app.reviews)
        if (genres.has(app.primaryGenre)) {
            genres.set(app.primaryGenre, genres.get(app.primaryGenre) + 1)
        }
        else {
            genres.set(app.primaryGenre, 1)
        }
    }
    console.log(genres)
    return await filtered_apps;

}


const apps = main()

apps.then((apps) => {
    console.log(apps.length + " apps found")
})
