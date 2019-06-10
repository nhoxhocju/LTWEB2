var express = require('express');

var exphbs = require('express-handlebars');

var handlebars = require('handlebars');

handlebars.registerHelper('dateformat', require('helper-dateformat'));

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

var indexPage = require('./routes/index');
app.use('/', indexPage);

var singlePostRoutes = require('./routes/single_post');
app.use('/single_post', singlePostRoutes);


var port = 3000;

app.get('/error', function(req, res){
	res.render('404',{
		layout:false
	});
})

app.listen(port, function(){
	console.log(`Server started on port ${port}`);
});