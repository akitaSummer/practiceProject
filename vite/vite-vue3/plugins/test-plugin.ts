export default (enforce?: 'pre' | 'post') => {
  return {
    name: 'test',

    enforce,

    // buildStart() {
    //   console.log('bulidStart', enforce)
    // },

    // resolveId() { // 一旦返回true，则后续的plugin不会执行
    //   console.log('resolveId', enforce)
    // },

    // load() {
    //   console.log('load', enforce)
    // },

    config(userConfig) {
      //   return {
      //     resolve: {
      //       alias: {
      //         '@aa': '/src/styles',
      //       },
      //     },
      //   }
      return new Promise((resolve) => {
        resolve({
          resolve: {
            alias: {
              '@aa': '/src/styles',
            },
          },
        })
      })
    },

    configResolved(config) {
      console.log(config.resolve)
    },

    configureServer(server) {
      console.log(server)
      // server.middlewares.use((req, res, next) => { // 位于所有vite中间件之前执行
      //     if (req.url === '/test') {
      //         res.end('hello vite plugin')
      //     } else {
      //         next()
      //     }
      // })
      return () => {
        // 位于所有vite中间件之后执行
        server.middlewares.use((req, res, next) => {
          if (req.url === '/test') {
            res.end('hello vite plugin')
          } else {
            next()
          }
        })
      }
    },

    transformIndexHtml(html) {
      console.log(html)
    },

    handleHotUpdate(ctx) {
      console.log(ctx)

      ctx.server.ws.send({
        type: 'custom',
        event: 'test',
        data: {
          hello: 'world',
        },
      })
    },
  }
}
