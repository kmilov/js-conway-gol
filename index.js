const express = require('express')
var server = express()


server.use(express.static('public'))

server.listen(3000, () => {
 console.log("listening on  http://localhost:3000")
})
