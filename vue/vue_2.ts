// Vue 2 实现响应式原理

function updateView() {} 

// 1. 如果属性不存在，新增属性不会是响应式
// 2. 数组上的方法需要进行重写
let oldArryPrototype = Array.prototype
let proto = Object.create(oldArryPrototype);
['push', 'shift', 'unshift'].forEach((methods: string) => {
    proto[methods] = function() {
        updateView()
        oldArryPrototype[methods].call(this, ...arguments)
    }
})

// 使用Object.defineProperty重新定义属性，给属性添加getter和setter
const observer = (target): void => {
    if (typeof target !== 'object' && target === null) {
        return target
    }
    if (Array.isArray(target)) {
        Object.setPrototypeOf(target, proto)
    }
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

const defineReactive = (target: {}, key: string, value:any) => {
    observer(value)
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                observer(newValue)
                updateView()
                value = newValue
            }
        }
    })
}
