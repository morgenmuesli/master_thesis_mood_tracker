

const crawler = require('./crawler')


function testCrawler() {
    crawler.search_reviews_for_app("net.daylio.Daylio").then((reviews) => {
        console.log(reviews.length)
    }).catch((err) => {
        console.log(err)
    })
}


testCrawler()
