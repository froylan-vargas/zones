const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(routes)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`App listening on port:${PORT}`)
})