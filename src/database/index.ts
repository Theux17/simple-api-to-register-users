import mongoose from 'mongoose'

import 'dotenv/config'

const uri = process.env.MONGO_URI as string
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.Promise = global.Promise

export default mongoose