use super::AmioAcid // 从父模块引入
// 子模块可以通过super导入父模块的私有特征项，但是不能使用super::*;导入

pub fn synthesize(seq: &[AmioAcid]) {}