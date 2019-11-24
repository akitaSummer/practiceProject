function bindEvent(ele, type, selector, fn) {
    if (fn === null) {
        // 非事件代理
        fn = selector
        selector = null
    }

    ele.addEventLister(type, (e) => {
        if (selector) {
            // 事件代理
            // 触发事件的元素是否是指定元素
            if (e.target.matches(selector)) {
                // 修改this指向
                fn.call(e.target, e)
            } else {
                fn(e)
            }
        }
    })
}

bindEvent(document.getElementById('div4'), 'click', 'p', function(e) {
    console.log(this.innerHTML + 'hahaah')
})