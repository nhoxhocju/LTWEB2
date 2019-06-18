var express = require('express');
var exphbs = require('express-handlebars');
var dateformat = require('helper-dateformat');
var handlebars = require('handlebars');

handlebars.registerHelper('dateformat', require('helper-dateformat'));
var hbs_sections = require('express-handlebars-sections');

handlebars.registerHelper('if_eq', function (a, b, opts) {
	if (a == b) // Or === depending on your needs
		return opts.fn(this);
	else
		return opts.inverse(this);
});

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use('/public', express.static('public'));


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

var writterPage = require('./routes/panel');
app.use('/panel', writterPage);

var EditorPage = require('./routes/editor');
app.use('/editorPage', EditorPage);

var account = require('./routes/account');
app.use('/account', account);

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

var port = 3000;

app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});