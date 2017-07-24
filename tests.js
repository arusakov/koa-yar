const supertest = require('supertest')

const {server} = require('./server')

describe('koa-yar', () => {

  it('GET /1', async () => {
    await supertest(server).get('/1').expect(200, 'GET 1')
  })
  it('POST /1', async () => {
    await supertest(server).post('/1').expect(200, 'POST 1')
  })
  it('PUT /1', async () => {
    await supertest(server).put('/1').expect(200, 'PUT 1')
  })
  it('DELETE /1', async () => {
    await supertest(server).delete('/1').expect(200, 'DELETE 1')
  })

  it('GET /2', async () => {
    await supertest(server).get('/2').expect(200, 'GET 2')
  })
  it('POST /2', async () => {
    await supertest(server).post('/2').expect(404)
  })

  it('GET /xxx', async () => {
    await supertest(server).get('/xxx').expect(404)
  })

})
