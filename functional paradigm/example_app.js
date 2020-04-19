const _ = require('ramda')
const $ = require('jQuery')

const trace = _.curry(function(tag, x) {
    console.log(tag, x)
    return x
})

const Impure = {
    getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback)
    }),
    setHTML: _.curry(function(sel, html) {
        $(sel).html(html)
    })
}

const url = (term) => {
    return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
}

const img = (url) => {
    return $('<img/>', { src: url })
}

// const app = _.compose(Impure.getJson(trace('getJson')), url)

// const _.prop = _.curry(function(property, obj) {
//     return obj[property]
// })

const mediaUrl = _.compose(_.prop('m'), _.prop('media'))

const srcs = _.compose(_.map(mediaUrl), _.prop('items'))

const images = _.compose(_.map(img), srcs)

const renderImage = _.compose(Impure.setHTML('body'), images)

const app = _.compose(Impure.getJSON(renderImage), url)