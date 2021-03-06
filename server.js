const { createServer } = require('http')

const Koa = require('koa')

const { Router } = require('./index')
// const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/1', (ctx) => ctx.body = 'GET 1')
router.post('/1', (ctx) => ctx.body = 'POST 1')
router.put('/1', (ctx) => ctx.body = 'PUT 1')
router.delete('/1', (ctx) => ctx.body = 'DELETE 1')

router.get('/2', (ctx) => ctx.body = 'GET 2')

app.use(router.routes())

const server = createServer(app.callback())
server.listen(3000, () => {
  console.log('Server running on 3000 port...')
})

exports.server = server
