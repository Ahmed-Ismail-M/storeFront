// import { resizeImage, createDir } from '../../utilities/resize'
// import { imagePorp } from '../../interfaces/image'
// const path = require('path')

// const imgprop: imagePorp = {
//   input: path.resolve('assets/encenadaport.jpg'),
//   height: 200,
//   width: 300,
//   output: path.resolve('thumb/encenadaport-200x300.jpg'),
// }
// const imgwronginp: imagePorp = {
//   input: path.resolve('encenadaport.jpg'),
//   height: 200,
//   width: 300,
//   output: path.resolve('thumb/encenadaport-200x300.jpg'),
// }
// const imgwrongout: imagePorp = {
//   input: path.resolve('assets/encenadaport.jpg'),
//   height: 200,
//   width: 300,
//   output: path.resolve('thum/encenadaport-200x300.jpg'),
// }
// const imgwrongh: imagePorp = {
//   input: path.resolve('assets/encenadaport.jpg'),
//   height: -1,
//   width: 300,
//   output: path.resolve('thumb/encenadaport-200x300.jpg'),
// }
// const imgwrongw: imagePorp = {
//   input: path.resolve('assets/encenadaport.jpg'),
//   height: 200,
//   width: -1,
//   output: path.resolve('thumb/encenadaport-200x300.jpg'),
// }
// describe('Test resize image', () => {
//   beforeAll(() => createDir(path.join(process.cwd(), 'thumb')))
//   it('should resize image without error', async function () {
//     await expectAsync(resizeImage(imgprop)).toBeResolvedTo(imgprop.output)
//   })
//   it('should raise error input is invalid', async function () {
//     await expectAsync(resizeImage(imgwronginp)).toBeRejectedWithError()
//   })
//   it('should raise error output is invalid', async function () {
//     await expectAsync(resizeImage(imgwrongout)).toBeRejectedWithError()
//   })
//   it('should raise error height is invalid', async function () {
//     await expectAsync(resizeImage(imgwrongh)).toBeRejectedWithError()
//   })
//   it('should raise error width is invalid', async function () {
//     await expectAsync(resizeImage(imgwrongw)).toBeRejectedWithError()
//   })
// })
