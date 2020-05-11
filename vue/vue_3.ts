// vue 3.0 响应式原理
// 2.0 问题：1. 2.0默认会递归 2. 数组改变length是无效的 3. 对象不存在的属性不能被拦截
// proxy兼容性差，ie11不兼容

const isObject = (val) => {
    return typeof val === 'object' && val !== null
}

const hasOwn = (target, key) => {
    return target.hasOwnProperty(key)
}
// 需要记录代理过的对象，放置重复代理
// 使用hash表记录
const toProxy = new WeakMap() // 弱引用映射表，放置原对象：代理过的对象
const toRaw = new WeakMap() // 被代理过的对象：原对象

const reactive = (target) => {
    return createReactiveObject(target)
}

const createReactiveObject = (target) => {
    if (!isObject(target)) {
        return target
    }
    const proxy = toProxy.get(target)
    if (proxy) {
        return proxy // 如果对象被代理过了，返回原代理
    }
    if (toRaw.has(target)) {
        return target // 如果为代理对象，则返回原代理，防止被代理过的对象被多次代理
    }
    // get? (target: T, p: PropertyKey, receiver: any): any;
    // set? (target: T, p: PropertyKey, value: any, receiver: any): boolean;
    // deleteProperty? (target: T, p: PropertyKey): boolean;
    const baseHandler: ProxyHandler<{}> = {
        // reflect 优点：不会报错， 有返回值，未来会替代掉Object上方法
        get (target, key, receiver) {
            // proxy + reflect
            let result = Reflect.get(target, key, receiver)
            // 收集依赖 订阅 把当前的key和这个effect对应
            track(target, key) // 如果目标上的key发生了变化，重新让数组中effect执行
            // 多层代理，通过get方法来判断
            return isObject(result) ? reactive(result) : result
        },
        set (target, key, value, receiver) {
            const hadKey = hasOwn(target, key)
            const oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (!hadKey) {
                trigger(target, 'add', key)
            } else if (oldValue !== value) { // 为了屏蔽无意义的修改
                trigger(target, 'set', key)
            }
            return result
        },
        deleteProperty(target, key) {
            let result = Reflect.deleteProperty(target, key)
            return result
        }
    }
    const observed = new Proxy(target, baseHandler)
    toProxy.set(target, observed)
    toRaw.set(target, observed)
    return observed
}

const activeEffectStacks = [] // 栈型结构
const targetsMap = new WeakMap()

const track = (target, key) => {
    const effect = activeEffectStacks[activeEffectStacks.length - 1]
    if (effect) { // 有对应关系，才关联
        let depsMap = targetsMap.get(target)
        if (!depsMap) {
            targetsMap.set(target, depsMap = new Map())
        }
        let deps = depsMap.get(key)
        if (!deps) {
            depsMap.set(key, deps = new Set())
        }
        if (!deps.has(effect)) {
            deps.add(effect)
        }
    }
}

const trigger(target, type: 'add' | 'set', key) {
    const depsMap = targetsMap.get(target)
    if (depsMap) {
        const deps = depsMap.get(key)
        if (deps) {
            deps.forEach(effect => {
                effect()
            })
        }
    }
}

const run = (effect, fn) => {
    try {
        activeEffectStacks.push(effect)
        fn() 
    } finally {
        activeEffectStacks.pop() 
    }
}

const creactReactiveEffect = (fn) => {
    const effect = () => {
        run(effect, fn) // 运行 1. 让fn执行 2. 将effect存入栈中
    }
    return effect
}

// 依赖收集， 发布订阅
const effect = (fn) => {
    // 需要将fn变为响应式函数
    const effect = creactReactiveEffect(fn)
    effect() // 默认应该先执行一次
}
