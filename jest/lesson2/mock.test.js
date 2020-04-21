import { fetchData } from './mock'
const { getNumber } = jest.requireActual('./mock')
    // import Axios from 'axios'

// jest.mock('axios')

// test('fetchData测试', () => {
//     Axios.get.mockResolvedValue({
//         data: "(function() { return '123' })()"
//     })
//     return fetchData().then(data => {
//         expect(eval(data)).toEqual('123')
//     })
// })

jest.mock('./mock')

test('fetchData测试', () => {
    fetchData().then(data => {
        expect(eval(data)).toEqual('123')
    })
})

test('getNumber测试', () => {
    expect(getNumber()).toEqual(123)
})