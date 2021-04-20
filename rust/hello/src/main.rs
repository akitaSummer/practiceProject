use std::io::Write;
use std::str::FromStr;

fn main() {
    println!("Hello, world!");
    let mut numbers = Vec::new(); // numbers 是Vec<u64>
                                  // 由于std::env::args() 迭代器第一个参数是程序名称，调用skip过滤第一个参数
    for arg in std::env::args().skip(1) {
        // u64::from_str 是u64的静态方法
        numbers.push(u64::from_str(&arg).expect("error parsing argument"));
    }

    if numbers.len() == 0 {
        writeln!(std::io::stderr(), "Usage: gdc NUMBER ...").unwrap(); // unwrap 用于检查错误输出流是否失败
        std::process::exit(1);
    }

    let mut d = numbers[0];
    // &number[1..] & 表示借用每个元素的引用
    for m in &numbers[1..] {
        // * 表示解引用
        d = gcd(d, *m);
    }

    println!("The greatest common divisor of {:?} is {}", numbers, d)
}

fn gcd(mut n: u64, mut m: u64) -> u64 {
    // u64 i32 u8 f32 f64 mut 提示可以赋值， -> 表示返回
    assert!(n != 0 && m != 0); // !表示宏调用，会检查参数是否为true
    while m != 0 {
        if m < n {
            let t = m; // let 声明变量，可不声明类型，会自动推断 let t: u64 = m;
            m = n;
            n = t;
        }
        m = m % n;
    }
    n // 花括号中最后一行是表达式，且没有分号，则认为是返回值，return一般用于函数中间提前返回
}

// 测试函数
#[test]
fn test_gcd() {
    assert_eq!(gcd(14, 15), 1);

    assert_eq!(gcd(2 * 3 * 5 * 11 * 17, 3 * 7 * 11 * 13 * 19), 3 * 11)
}
