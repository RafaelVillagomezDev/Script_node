const fs = require('fs')

const readStream = fs.createReadStream('./countries.txt', {
  encoding: 'utf8',
})

readStream
  .on('data', function (texto) {
    const linea = texto.split('\n')
    //Metodo para obtener ObjCountry Data
    var objCountry = linea.map((line) => {
      const [country, population, area] = line.split(' ')

      const obj = {
        country: country,
        population: population,
        area: area,
      }
      return obj
    })

    console.log(objCountry)

    let writer = fs.createWriteStream('datos.txt')

    writer.write(JSON.stringify(objCountry))
  })
  .on('end', function () {
    console.log('>> The stream is finished')
  })
