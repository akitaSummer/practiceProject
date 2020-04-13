import { fetchData, fetchData2, fetchData3 } from './fetchData'

test('fetchData 返回结果为{ success: true }', (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            success: true
        })
        done() // 回调函数中必须调用done()才会测试回调用例
    })
})

test('fetchData2 返回结果为Promise对象', () => {
    // 需要在开头调用return返回
    return fetchData2().then((response) => {
        expect(response.data).toEqual({
            success: true
        })
    })
})

test('fetchData2 返回结果为Promise对象', () => {
    return expect(fetchData2()).resolves.toMatchObject({ // 匹配器,匹配只包含某些内容
        data: {
            success: true
        }
    })
})

test('fetchData2 返回结果为Promise对象', async() => {
    await expect(fetchData2()).resolves.toMatchObject({ // 匹配器,匹配只包含某些内容
        data: {
            success: true
        }
    })
})

test('fetchData2 返回结果为Promise对象', async() => {
    const response = await fetchData2()
    expect(response.data).toEqual({
        success: true
    })
})

test('fetchData3 返回结果为404', () => {
    expect.assertions(1) // 至少执行一次expect语法
    return fetchData3().catch(e => {
        expect(e.toString().indexOf('404') > -1).toBe(true)
    })
})

test('fetchData3 返回结果为404', () => {
    return expect(fetchData3()).rejects.toThrow()
})

test('fetchData3 返回结果为404', async() => {
    await expect(fetchData3()).rejects.toThrow()
})

test('fetchData3 返回结果为404', async() => {
    expect.assertions(1)
    try {
        await fetchData3()
    } catch (e) {
        expect(e.toString().indexOf('404') > -1).toBe(true)
    }
})