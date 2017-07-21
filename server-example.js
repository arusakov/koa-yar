const Koa = require('koa')
const { Router } = require('.')

const app = new Koa()
const router = new Router()

app.use(router.routes())
app.use(async ctx => {
  ctx.body = await Promise.resolve('Hello Koa')
})

app.listen(3000, () => {
  console.log('Server running on 3000 port...')
})