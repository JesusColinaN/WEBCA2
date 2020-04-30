const path = require ('path');
const express = require ('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');

const app = express();

// connecting to db
mongoose.connect('mongodb+srv://test:test@cluster0-klxv0.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});

//importing routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join (__dirname, 'views')) 
app.set ('view engine', 'ejs')

//middlewares
app.use(morgan ('dev'));
app.use(express.urlencoded({extended: false}));


//routes
app.use('/', indexRoutes);


//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

