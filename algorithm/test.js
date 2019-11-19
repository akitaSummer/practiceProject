function solution(beans) {

    // TODO Write your code here

    let test = beans.split(' ')
    let number = 0

    while (test.length > 0) {
        let result = computed(test)
        test = result.test
        number += result.index
    }

    return number


    function computed(test) {
        const num = [{ num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }, { num: 0, index: 0 }]
        let count = 0
        let index = 0

        for (let i = 0; i < test.length; i++) {
            for (let j = i; j < test.length; j++) {
                if (test[i] === test[j]) {
                    count++
                } else {
                    if (num[test[i]].num < count) {
                        num[test[i]].num = count
                        num[test[i]].index = i
                    }
                    count = 0
                    break
                }
            }
            if (count != 0 || num[test[i]].num < count) {
                num[test[i]].num = count
                num[test[i]].index = i
            }
        }


        for (let i = 0; i < num.length; i++) {
            if (num[i].num > num[index].num) {
                index = i
            }
        }

        let number = num[index].num * num[index].num

        test.splice(num[index].index, num[index].num)

        index = number

        return { test, index }
    }


}

const result = solution('1 4 2 2 3 3 2 4 1')
console.log(result)