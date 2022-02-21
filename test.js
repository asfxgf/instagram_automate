const axios = require('axios').default
const fs = require('fs')


/*
function streamWriter(stream, filename) {
  return new Promise((resolve) => {
    const write = fs.createWriteStream(filename)
    write.on('finish', () => {
      resolve()
    })
    stream.data.pipe(write)
  })
}

async function download(uri, filename) {
  const imageStream = await axios.get(uri, { responseType: 'stream' })
  await streamWriter(imageStream, filename)
}

async function rundl() {
  image_url = 'https://media.istockphoto.com/photos/recreational-vehicle-driving-on-autumn-highway-in-beautiful-mountains-picture-id1253960547'
  await download(image_url, './images.jpg')
}

console.log('debut')
rundl().then(() => {
    console.log('fin')
})
*/
