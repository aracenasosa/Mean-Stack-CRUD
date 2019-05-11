
// Variables
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// MongoDb Connect
const { mongoose } = require('./Database');

// Settings
app.set('port', process.env.Port || 3000);

//Middlewaves
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/employees', require('./Routes/Employee.routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});