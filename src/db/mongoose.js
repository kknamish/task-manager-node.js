const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGOOSE_CONNECTION_URL)
