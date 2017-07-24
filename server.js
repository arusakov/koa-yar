const { createServer } = require('http')

const Koa = require('koa')
const { Router } = require('.')
// const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/1', (ctx) => ctx.body = 'GET 1')
router.post('/1', (ctx) => ctx.body = 'POST 1')

router.get('/2', (ctx) => ctx.body = 'GET 2')

app.use(router.routes())

const server = createServer(app.callback())
server.listen(3000, () => {
  console.log('Server running on 3000 port...')
})

exports.server = server