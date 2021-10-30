// const mdx = require("@mdx-js/mdx");
const { createCompiler } = require("@mdx-js/mdx");

// console.log(
//     mdx.sync(`
// import Button from 'Button'

// # Hello

// > will this

// - first
// - second

// <Button>Click me</Button>

// export const a = 1
// `)
// );

const mdx = createCompiler();

console.log(
    mdx.processSync(`
import Button from 'Button'

# Hello

> will this

- first
- second

<Button>Click me</Button>

export const a = 1
`).contents
);