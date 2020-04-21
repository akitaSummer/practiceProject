import { generateConfig, generateAnotherConfig } from "./snapshot";

// 按w后按u可以更新所有快照
test("测试generateConfig函数", () => {
  expect(generateConfig()).toMatchSnapshot({
    // 设置time属性为Date
    time: expect.any(Date)
  });
});

// 按w后按i可以逐个更新所有快照
test("测试generateAnotherConfig函数", () => {
  expect(generateAnotherConfig()).toMatchSnapshot({
    time: expect.any(Date)
  });
});

test("测试generateAnotherConfig函数", () => {
  // 安装prettier后可以使用toMatchInlineSnapshot, 使快照在test文件里出现
  expect(generateAnotherConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date)
    },
    `
    Object {
      "domain": "localhost",
      "port": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
});
