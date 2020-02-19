enum Days {
    Sun = 7,
    Mon = 1,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}

// true
console.log(Days['Sun'] === 7)
console.log(Days['Mon'] === 1)
console.log(Days['Tue'] === 2)
console.log(Days['Sat'] === 6)
console.log(Days[3] === "Wed")
console.log(Days[7] === "Sun")

// 常数枚举不能包含计算成员
// const enum Color {
//     Red,
//     Green,
//     Blue = 'blue'.length // 错误
// }