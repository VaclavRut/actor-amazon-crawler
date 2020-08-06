const Apify = require("apify");

const { log } = Apify.utils;

async function parseItemReviews($, request, requestQueue) {
    const { url, userData } = request;
    const { asin, sellerUrl, itemDetail, detailUrl } = userData;
    const reviews = itemDetail.reviews ? itemDetail.reviews : [];
    const host = userData.host ? userData.host : url.slice(0,url.indexOf("product-reviews") - 1)
    userData.host = host;
    // #cm-cr-cmps-review-list
    const reviewDiv = $('#cm_cr-review_list').length ? $('#cm_cr-review_list') : $('#cm_cr-review_list').length ? $('#cm-cr-cmps-review-list') : $('#cm-cr-dp-review-list');
    reviewDiv.children().each((i,el) => {
        const review = {
            userName: $(el).find('.a-profile-content').text().trim(),
            //ratingStars : $(el).find('.review-rating > span.a-icon-alt').text().trim(),//in case needed later
            reviewTitle: $(el).find('.review-title > span').text().trim(),
            reviewedIn: $(el).find('.review-date').text().trim(),
            reviewDescription: $(el).find('.a-row.a-spacing-small.review-data > span > span').text().trim()
        };
        if (review.userName.length) reviews.push(review);
    });
    itemDetail.NumberOfReviews = reviews.length;
    itemDetail.reviews = reviews;
    const nextReviewsPage = $('#cm_cr-pagination_bar > ul.a-pagination > .a-last > a').prop("href");
    if (nextReviewsPage) {//In case more pages are to be fetched
        if (reviews.length < userData.maxReviews) {
            await requestQueue.addRequest({
                url: host + nextReviewsPage,
                userData: userData
            }, {forefront: true});
        }
    }
    else {
        log.info(`Found ${reviews.length} reviews for ${url}`);
        await requestQueue.addRequest({ //case reviews called as a different page
            url: sellerUrl,
            userData: {
                asin,
                detailUrl,
                sellerUrl,
                itemDetail,
                label: 'seller',
            },
        }, { forefront: true });
    }
    // log.info(`Found ${reviews.length} reviews for ${url}`);
    // await requestQueue.addRequest({ //case reviews called as a different page
    //     url: sellerUrl,
    //     userData: {
    //         asin,
    //         detailUrl,
    //         sellerUrl,
    //         itemDetail,
    //         label: 'seller',
    //     },
    // }, { forefront: true });
    return reviews;
}
exports.parseItemReviews = parseItemReviews;
