const router = require('koa-router')
const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' }) // 上传目录地址为根目录下uploads目录
    // upload上有函数array, singgle, fields等，用于处理文件上传

router.prefix('/upload')

router.post('/', upload.any(), (ctx) => {
    ctx.body = {
        status: {
            code: 0,
            msg: 'upload success'
        },
        data: {
            body: ctx.req.files
        }
    }
})

module.exports = router