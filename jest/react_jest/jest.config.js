module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  // 代码测试覆盖率测试的文件
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  // 运行jest测试之前需要运行
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  // 测试环境建立好后运行的文件
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js",
    "<rootDir>/node_modules/jest-enzyme/lib/index.js"
  ],
  // 运行的测试文件
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  // 测试运行的环境
  "testEnvironment": "jest-environment-jsdom-fourteen",
  // 测试文件引入的模块的文件进行转义
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  // 测试文件引入的模块的文件忽略转义
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  // 自动化测试时，默认优先查找目录
  "modulePaths": [],
  // 转化引入的文件（如css），优化测试
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  // 自动查找的后缀类型
  "moduleFileExtensions": [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  // jest在模式中的插件
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}
