
var express = require('express');
var app = express();
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
var mongourl = 'mongodb://testuser:testing123@ds151814.mlab.com:51814/fyp_data';

app.use('/', express.static('public/public'));

app.get('/getgps', function (req, res) {
	MongoClient.connect(mongourl, function (err, db) {
        if (err) throw err;
		db.collection("newgpsdata").find().toArray(function (err, docs) {
			assert.equal(err, null);
			db.close()
			if (docs != null) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				docs.forEach(function (doc) {
					res.write(JSON.stringify(doc, null, '\t'));
					res.write('\r\n');
				})
				res.end();
			} else {
				res.sendStatus(404);
			}
		})
	})
})


app.get('/', function (req, res) {
		res.redirect('/getgps')

})

app.listen(process.env.PORT || 8099);