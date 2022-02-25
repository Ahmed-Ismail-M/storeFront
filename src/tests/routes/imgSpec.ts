// import Express from 'express'
// const request = require('supertest')
// const app: Express.Application = require('../../index')
// describe('Test Server', () => {
//   describe('test /api', () => {
//     it('shout return main response', (done) => {
//       request(app)
//         .get('/api')
//         .expect(200)
//         .expect('Hi from main')
//         .expect('Content-Type', 'text/html; charset=utf-8')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//   })
//   describe('test /api/resize', () => {
//     it('shoud return 500 with message " post parameters"', (done) => {
//       request(app)
//         .get('/api/resize')
//         .expect(500)
//         .expect('Post image info with parameters filename,height,width')
//         .expect('Content-Type', 'text/html; charset=utf-8')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//     it('shoud accept paramters and return image', (done) => {
//       request(app)
//         .get('/api/resize?filename=encenadaport.jpg&height=200&width=200')
//         .expect(200)
//         .expect('Content-Type', 'image/jpeg')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//   })
//   describe('test /api/resize with wrong parameters', () => {
//     it('shoud refuse paramters because one is missing', (done) => {
//       request(app)
//         .get('/api/resize?filename=encenadaport.jpg&height=200')
//         .expect(500)
//         .expect('Post image info with parameters filename,height,width')
//         .expect('Content-Type', 'text/html; charset=utf-8')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//     it('shoud return error width should be a number', (done) => {
//       request(app)
//         .get('/api/resize?filename=encenadaport.jpg&height=200&width=string')
//         .expect(500)
//         .expect(
//           'Error: Expected positive integer for width but received NaN of type number'
//         )
//         .expect('Content-Type', 'text/html; charset=utf-8')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//     it('shoud return error height should be a number', (done) => {
//       request(app)
//         .get('/api/resize?filename=encenadaport.jpg&height=string&width=200')
//         .expect(500)
//         .expect(
//           'Error: Expected positive integer for height but received NaN of type number'
//         )
//         .expect('Content-Type', 'text/html; charset=utf-8')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//     it('shoud return error invalid input', (done) => {
//       request(app)
//         .get('/api/resize?filename=wornginput&height=200&width=200')
//         .expect(500)
//         .expect('Error: Input file is missing')
//         .expect('Content-Type', 'text/html; charset=utf-8')
//         .end((error: Error) => (error ? done.fail(error) : done()))
//     })
//   })
// })
