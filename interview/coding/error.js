const { isFunction } = require("util");

// 全局捕获
window.onerror = (msg, url, lineNo, columnNo, e) => {
    if (msg === 'Script error.' || !url || e.type === '__skynet_wrapper__') {
        return;
    }
    error(e)
}

// Promise被reject而未被处理时
window.addEventListener('unhandledrejection', (e) => {
    if (isObject(e.reason)) {
        error('未处理的unhandlerejection事件：Promise reject抛出了普通对象，请在附加信息中查看', e.reason)
    } else {
        error(e.reason)
    }
})

// Script error.
const orginAddEventListener = EventTarget.prototype.addEventListener
EventTarget.prototype.addEventListener = (type, listener, options) => {
    const wrapperListener = (...args) => {
        try {
            return listener.apply(this, args)
        } catch (err) {
            throw err
        }
    }
    return orginAddEventListener.call(this, type, wrapperListener, options)
}

// 用户行为搜集
const _breadcrumbEventHandler = (evtName) => {
        let self = this
        return function(evt) {
            if (self._lastCaptured == evt) {
                return
            }

            self._lastCaptured = evt
            let target
            try {
                target = htmlTreeAsString(evt.target)
            } catch (e) {
                target = '<unknown>'
            }

            self.captureBreadcrumb({
                category: `ui.${evtName}`,
                message: target
            })
        }
    },
    function captureBreadcrumb(msg) {
        console.log(msg)
    }

window.addEventListener('click', self._breadcrumbEventHandler('click'), false)

// 发送请求
const onreadystatechangeHandler = () => {
    if (xhr.status === 200 && xhr.readyState === 4 && xhr.__skynet_xhr) {
        try {
            xhr.__skynet_xhr.status_code = xhr.status
        } catch (e) {}

        self.captureBreadcrumb({
            type: 'http',
            category: 'xhr',
            data: xhr.__skynet_xhr
        })
    }
}

if ('onreadystatechange' in xhr && isFunction(xhr.onreadystatechange)) {
    fill(
        xhr,
        'onreadystatechange',
        function(orig) {
            return self.wrap(orig, undefined, onreadystatechangeHandler)
        }
    )
} else {
    xhr.onreadystatechange = onreadystatechangeHandler
}

// 页面跳转
const oldOnPopState = window.onpopstate
window.onpopstate = function(...args) {
    const currentHref = location.href
    self._captureUrlChange(self._lastHref, currentHref)

    if (oldOnPopState) {
        return oldOnPopState.apply(this.args)
    }
    return null
}

// 控制台打印
const wrapConsoleMethod = (console, level, callback) => {
    console[level] = (...args) => {
        callback && callback(msg, data)
    }
}

const consoleMethodCallback = function(msg, data) {
    self.captureBreadcrumb({
        message: msg,
        level: data.level,
        category: 'console'
    })
}

each(['info', 'warn', 'error'], (_, level) => {
    wrapConsoleMethod(console, level, consoleMethodCallback)
})

// 数据清洗
// 获取数据 设置阀值，每分钟上限10000条，超过就采样 同类型数目大于200，只统计数量
const getDataFromElasticSearch = async(type, lastTimestamp) => {
    const searchData = {
        index: elasticConfig.indexes.monitor.index(),
        type: elasticConfig.indexes.monitor.type,
        body: {
            query: {
                bool: {
                    must: [{
                        wildcard: {
                            'eventEs.tag': `*${type}*` // 类型
                        }
                    }],
                    filter: {
                        range: {
                            'eventEs.timestamp': {
                                gt: lastTimestamp // 选择时间戳范围
                            }
                        }
                    },
                    must_not: [{
                        wildcard: {
                            'eventEs.tag': '*develop*' // 排除开发环境
                        }
                    }]
                }
            }
        }
    }
    let body
    body = await this.elasticClient.search(searchData)
    return body
}

// 数据预处理 去除无用信息，减少储存体积

// 数据聚合 提升储存性能，查询快
// 业务名 + 错误类型 + 错误信息 ----md5----> 加密信息