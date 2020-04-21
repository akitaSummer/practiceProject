var jsdom = require('jsdom');
var $ = require('jquery')(new jsdom.JSDOM().window);

const addDivToBody = () => {
    $('body').append('<div/>')
}

module.exports = {
    addDivToBody,
    $
}