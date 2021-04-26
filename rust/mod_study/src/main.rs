// mod spores {
//     // pub 用于标记公有或公开的特征项，没有pub则是私有的
//     pub struct Spore {}

//     pub fn produce_spore() {}

//     fn recombine(parent: &str) {}

//     // 模块可以嵌套
//     pub mod roots {}
// }
pub mod plant_structures;
// 单独文件的模块,会检查spores.rs和spores/mod.rs
mod spores;

use spores::produce_spore;

use std::collections::{HashMap, HashSet};

use std::io::prelude::*;

fn main() {
    produce_spore();
    println!("Hello, world!");
}
