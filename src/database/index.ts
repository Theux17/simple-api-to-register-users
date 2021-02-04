import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://api-users:yY1d6nKY9Erqdarx@cluster0.wrcvg.mongodb.net/data-users?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.Promise = global.Promise

export default mongoose