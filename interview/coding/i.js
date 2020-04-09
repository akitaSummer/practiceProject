// function DistanceToHigher(height) {
//     let count = 0
//     const result = [0]
//     for (let i = 1; i < height.length; i++) {
//         for (let j = i - 1; j >= 0; j--) {
//             if (height[j] > height[i]) {
//                 result.push(i - j)
//                 break
//             }
//             if (j === 0) {
//                 result.push(0)
//             }
//         }
//     }
//     return result
// }

// console.log(DistanceToHigher([175, 179, 174, 163, 176, 177]))

function gcd(a, b) {
    let temp
    while (b !== 0) {
        temp = a % b
        a = b
        b = temp
    }
    return a
}

function test(str) {
    const content = str.split('\n')
    const nums = content[0].split('').map(item => Number(item))
    const numArray = []
    for (let i = 1; i <= nums[0]; i++) {
        numArray.push(i)
    }

    sort(nums[0])

    function sort(n) {
        let ary = []
        let num = 1
        let ary1 = []
        let ary2 = []
        for (let i = 1; i <= n; i++) {
            ary.push(i)
            num *= i
        }
        for (let m = 0; m < num; m++) {
            for (let j = 0; j < ary.length; j++) {
                var num1 = Math.ceil(Math.random() * n)
                if (ary1.indexOf(num1) === -1) {
                    ary1.push(num1)
                } else {
                    j--
                }
            }
            ary1 = ary1.toString()
            ary2.push(ary1)
            if (ary2.length > 1) {
                for (let z = 0; z < ary2.length; z++) {
                    if (ary2[z] === ary1) {
                        ary2.pop()
                        m--
                    }
                }
            }
            ary1 = []
        }
        ary2.sort((a, b) => a.localeCompare(b))
        console.log(ary2)
    }
}

console.log(test('3 0\n'))

let input = ''

while (line = readline()) {
    input += line + '\n'
}
print(test(input))

// while (line = readline()) {
//     var lines = line.split(" ");
//     var a = parseInt(lines[0]);
//     var b = parseInt(lines[1]);
//     print(a + b);
// }

// var n = parseInt(readline());
// var ans = 0;
// for(var i = 0;i < n; i++){
//     lines = readline().split(" ")
//     for(var j = 0;j < lines.length; j++){
//         ans += parseInt(lines[j]);
//     }
// }
// print(ans);