const express = require('express')
const app = express()
const cors = require('cors');


const connectDB = require('./config/db')
connectDB();

app.use(cors());
// Available routes
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/site', require('./routes/viewCountRoute'))

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
