import Counter from './Counter'

describe('Counter的测试代码', () => {
    let counter = null


    beforeAll(() => {
        // counter = new Counter()
        console.log(1)
    })

    beforeEach(() => {
        counter = new Counter()
        console.log(3)
    })

    afterEach(() => {})

    afterAll(() => {})

    describe('测试增加相关的代码', () => { // 分组
        beforeAll(() => {
            // counter = new Counter()
            console.log(2)
        })

        beforeEach(() => {
            counter = new Counter()
            console.log(4)
        })

        test('测试Counter中addOne方法', () => {
            counter.addOne()
            expect(counter.number).toBe(1)
        })

        test('测试Counter中addTwo方法', () => {
            counter.addTwo()
            expect(counter.number).toBe(2)
        })
    });

    describe('测试减少相关的代码', () => { // 分组
        test('测试Counter中minusOne方法', () => {
            counter.minusOne()
            expect(counter.number).toBe(-1)
        })

        test('测试Counter中minusTwo方法', () => {
            counter.minusTwo()
            expect(counter.number).toBe(-2)
        })
    });
});