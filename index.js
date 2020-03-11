const app = require('./app')
const port = process.env.PORT || 3000



app.listen(port, function listen () {
    console.log(`http://localhost:${port}`)
})