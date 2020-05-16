# Redux-Saga常见API

## Middleware API

```createSagaMiddleware(options)```
创建一个Redux middleware，并将Saga连接到Redux Store，通过CreateStore第三个参数传入
option是传递给middleware的选项列表，默认可以不用传递

```middleware.run(saga, ...args)```
动态地运行saga，只能用于在appleMiddleware阶段之后执行Saga

## Saga辅助函数
```takeEvery(patten, saga, ...args)```
在发起(dispatch)到Store并匹配pattern的每一个action上派生一个saga

```takeLast(patten, saga, ...args)```
在发起(dispatch)到Store并匹配pattern的每一个action上派生一个saga，并自动取消之前所有已经一定但仍在执行中的saga任务

```throttle(mc, patten, saga, ...args)```
在发起(dispatch)到Store并匹配pattern的每一个action上派生一个saga，它在派生一次任务后，仍然会将新的action接收到底层的buffer中，至多保留(最近的)一个，但与此同时，他在ms毫秒内将暂停派生新的任务，这也是他被命名为节流阀(throttle)的原因

## Effect创建器
```select(selector, ...args)```
获取redux中的state，如果调用select的参数为空(yield select())，那么effect会获得完整的state

```call(fn, ...args)```
创建一个Effect描述信息，用来命令middleware以参数args调用函数fn

```take(pattern)```
阻塞的方法，用来匹配发出的action

```put(action)```
用来命令middleware向Store发起一个action。这个effect是非阻塞型的

