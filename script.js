const fs = require('fs')

const readStream = fs.createReadStream('./countries.txt', {
  encoding: 'utf8',
})

readStream
  .on('data', function (texto) {
    const linea = texto.split('\n')
    //Metodo para obtener ObjCountry Data con puntos
    const textoReturn = linea.map((line) => {
      const newLine = line.replace(/,/g, '')
      const lineDot = newLine.split(' ')

      const population = lineDot[lineDot.length - 2]
      const area = lineDot[lineDot.length - 1]
      const country = newLine.substring(0, newLine.indexOf(population))
      if (!isNaN(parseInt(population)) && !isNaN(parseInt(area))) {
        var density = Number(
          (parseInt(population) / parseInt(area)).toFixed(4).trim(),
        )
      }

      var obj = {
        country: country.trim(),
        density: density || 'Density',
      }

      return obj
    })

    let csv = ''

    // console.log(Array.isArray(textoReturn))

    textoReturn.sort((a, b) => {
      return a.density > b.density ? -1 : a.density < b.density ? 1 : 0
    })

    //Pinto meto datos
    for (var i = 0; i < textoReturn.length; i++) {
      csv += textoReturn[i].country + ';' + textoReturn[i].density + '\n'
    }

    let writer = fs.createWriteStream('datos1.csv')

    writer.write(csv)
  })
  .on('end', function () {
    console.log('>> The stream is finished')
  })
