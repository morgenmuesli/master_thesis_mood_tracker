import store from "app-store-scraper";
import reviews from "app-store-scraper"

class Crawler {
    constructor() {
        this.crawl = async (url) => {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const links = $('a').map((i, el) => $(el).attr('href')).get();
            return links;
        };
    }


}