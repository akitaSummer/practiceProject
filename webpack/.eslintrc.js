module.exports = {
  "extends": 'airbnb',
  "parser": "babel-eslint",
  "rules": { // 配置自己的规范
    "react/jsx-filename-extension": 0
  },
  globals: { // 设置可用全局变量
    document: false,
  }
}
