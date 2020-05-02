module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/tests/unit/**/*.(spec|test).[jt]s?(x)',
    '**/__tests__/**/*.[jt]s?(x)'
  ],
  collectCoverageFrom: ['**/*.{js, vue}', '!**/node_modules/**']
  // testPathIgnorePatterns: [
  //   '**/.eslintrc/.js'
  // ]
}

// module.exports = {
//   // 无后缀名时选择后缀
//   moduleFileExtensions: [
//     'js',
//     'jsx',
//     'json',
//     // tell Jest to handle *.vue files
//     'vue'
//   ],
//   // 测试时，转换文件
//   transform: {
//     // process *.vue files with vue-jest
//     '^.+\\.vue$': require.resolve('vue-jest'),
//     '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
//       require.resolve('jest-transform-stub'),
//     '^.+\\.jsx?$': require.resolve('babel-jest')
//   },
//   // 不需要转化的文件夹
//   transformIgnorePatterns: ['/node_modules/'],
//   // support the same @ -> src alias mapping in source code
//   // 模块路径映射
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1'
//   },
//   testEnvironment: 'jest-environment-jsdom-fifteen',
//   // serializer for snapshots
//   // 快照格式化
//   snapshotSerializers: [
//     'jest-serializer-vue'
//   ],
//   // 寻找测试文件的路径
//   testMatch: [
//     '**/tests/unit/**/*.spec.[jt]s?(x)',
//     '**/__tests__/*.[jt]s?(x)'
//   ],
//   // https://github.com/facebook/jest/issues/6766
//   // 测试时，模拟浏览器的地址
//   testURL: 'http://localhost/',
//   // 插件
//   watchPlugins: [
//     require.resolve('jest-watch-typeahead/filename'),
//     require.resolve('jest-watch-typeahead/testname')
//   ]
// }
