var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();

var apiData = [1,2,3,4,5,6,7,8,9,0]
var sqlite = require('sqlite')
var Mustache = require ('mustache');

sqlite.open('./database.sqlite').then(function(db) {
    app.use(express.static(__dirname + '/Public'));
    
    app.get('/courses', function(req, res) {
        db.all("SELECT * FROM Courses").then(function(rows) {
            var file = fs.readFileSync('templates/course-page.mst', "utf8");
            var html = Mustache.to_html(file, {courses: rows});
            return res.send(html);
        
        });
    });
    app.get('/courses/search/:term?', function(req, res) {
        db.all(
            "SELECT * FROM Courses WHERE name LIKE '%'||$what_i_want||'%'",
            {$what_i_want: req.params.term||req.query.term}
        ).then(function(rows) {
            var file = fs.readFileSync('templates/course-page.mst', "utf8");
            var html = Mustache.to_html(file, {courses: rows});
            return res.send(html);
        
        });
    });
    
    app.get('/courses/:id', function(req, res) {
        db.get(
            "SELECT * FROM Courses WHERE id = $course_id",
            {$course_id: req.params.id}
        ).then(function(row) {
            var file = fs.readFileSync('templates/course-id.mst', "utf8");
            var html = Mustache.to_html(file, row);
            return res.send(html);
        
        });
    });
    
    
    var server = http.createServer(app);
    console.log("Listening on http://127.0.0.1:8080");
    server.listen('8080', '127.0.0.1');
}).catch(function(err) {
    console.error(err.stack);
});
