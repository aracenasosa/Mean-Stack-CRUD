const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mean-crud';

mongoose.connect(URI)
.then(db => console.log('Database Connected'))
.catch(err => console.log(err));

module.exports = mongoose;