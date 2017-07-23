const Koa = require('koa')
const { Router } = require('.')
// const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/1', (ctx) => {
  ctx.body = '/1' 
})

router.get('/2', (ctx) => {
  ctx.body = '/2' 
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('Server running on 3000 port...')
})