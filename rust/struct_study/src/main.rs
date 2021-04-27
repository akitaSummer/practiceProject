struct Queue<T> {
    older: Vec<T>,
    younger: Vec<T>,
}

impl<T> Queue<T> {
    pub fn push(&mut self, c: T) {
        self.younger.push(c);
    }

    pub fn pop(&mut self) -> Option<T> {
        if self.older.is_empty() {
            if self.younger.is_empty() {
                return None;
            }

            use std::mem::swap;
            swap(&mut self.older, &mut self.younger);
            self.older.reverse();
        }
        self.older.pop()
    }

    pub fn is_empty(&self) -> bool {
        self.older.is_empty() && self.younger.is_empty()
    }

    // 取得所有权
    pub fn split(self) -> (Vec<T>, Vec<T>) {
        (self.older, self.younger)
    }

    // 没有self作为静态方法
    pub fn new() -> Self {
        Queue {
            older: Vec::new(),
            younger: Vec::new(),
        }
    }
}

struct Extrema<'elt> {
    greatest: &'elt i32,
    least: &'elt i32,
}

// fn find_extrema(slice: [i32]) -> Extrema
fn find_extrema<'s>(slice: &'s [i32]) -> Extrema<'s> {
    let mut greatest = &slice[0];
    let mut least = &slice[0];

    for i in 1..slice.len() {
        if slice[i] < *least {
            least = &slice[i];
        }
        if slice[i] > *greatest {
            greatest = &slice[i];
        }
    }
    Extrema { greatest, least }
}

#[derive(Copy, Clone, Debug, PartialEq)]
struct Point {
    x: f64,
    y: f64,
}

use std::cell::Cell;
use std::cell::RefCell;
pub struct SpiderRobot {
    hardware_error_count: Cell<u32>,
    log_file: RefCell<str>,
}

impl SpiderRobot {
    pub fn add_handware_error(&self) {
        let n = self.hardware_error_count.get();
        self.hardware_error_count.set(n + 1);
    }

    pub fn has_hardware_error(&self) -> bool {
        self.hardware_error_count.get() > 0
    }

    pub fn log(&self, message: &str) {
        let mut file = self.log_file.borrow_mut();
        write!(file, "{}", message).unwrap();
    }
}

fn main() {
    // let mut q = Queue {
    //     older: Vec::new(),
    //     younger: Vec::new(),
    // };
    // let mut q = Queue::new();
    let mut q = Queue::<char>::new();

    q.push('0');
    q.push('1');
    assert_eq!(q.pop(), Some('0'));
    assert_eq!(q.pop(), Some('1'));
    assert_eq!(q.pop(), None);
    assert!(q.is_empty());
    println!("Hello, world!");
}
