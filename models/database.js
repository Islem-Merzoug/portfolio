const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfolio', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('connection seccessful')
}).catch((error) => {
    console.log('somthing went wrong', error)
});

module.exports = mongoose;

