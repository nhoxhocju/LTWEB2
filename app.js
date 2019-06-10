var express = require('express');
var exphbs = require('express-handlebars');
var dateformat = require('helper-dateformat');
var handlebars = require('handlebars');
handlebars.registerHelper('dateformat', require('helper-dateformat'))
var hbs_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

require('./middlewares/session')(app);
require('./middlewares/passport')(app);
app.use(require('./middlewares/auth.mdw'));
app.use(require('./middlewares/category.mdw'));

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
		section: hbs_sections()
	}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');

var singlePostRoutes = require('./routes/single_post');
app.use('/single_post', singlePostRoutes);

var indexPage = require('./routes/index');
app.use('/', indexPage);

var categoryPage = require('./routes/category');
app.use('/category', categoryPage);

var panelPage = require('./routes/panel');
app.use('/panel', panelPage);

var account = require('./routes/account');
app.use('/account', account);

var port = 3000;

// app.get('/', function(req, res){
// 	res.render('home');
// })
app.use(function (req, res, next) {
	res.status(404);
	if (req.accepts('html')) {
		res.render('404', { url: req.url });
		return;
	}
})

app.get('/error', function (req, res) {
	res.render('404', {
		layout: false
	});
})


app.use('/user/:id', function (req, res, next) {
	res.send('USER')
})
app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});