const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./router/login');
const adminRoutes = require('./router/admin');
const publicRoutes = require('./router/publicoGeneral')


const app= express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
	extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//conexión Azure
/*app.use(myconnection(mysql, {
  host: 'web-paginas.mysql.database.azure.com',
  user: 'admi',
  password: 'Colegio1901',
  port: 3306,
  database: 'polinizadores_web'
}, 'single'));*/

//conexión local
app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'brandon',
  password: 'Trujillo17.',
  port: 3306,
  database: 'polinizadores_web'
}, 'single'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.listen(app.get('port'),() => {
    console.log('Listening on port', app.get('port'));
}
);

app.use('/', loginRoutes);
app.use('/', adminRoutes);
app.use('/', publicRoutes);

app.get('/', (req,res)=>{
    if(req.session.loggedin == true){
      res.render('home',{name: "¡Bienvenido! "+req.session.name});

    } else {
      res.redirect('/login')
    }
});

app.get('/homeAdmin', (req,res)=>{
  if(req.session.loggedin == true){
    res.render('homeAdmin',{name:'Administrador: '+req.session.name});

  } else {
    res.redirect('/login')
  }
});
