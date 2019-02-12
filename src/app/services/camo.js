let connect = require('camo').connect;

let database;
let uri = 'nedb:///home/ubuntu/Documents/books/program/lesson3/db/users.db';
connect(uri).then(function(db) {
    database = db;
    console.log(database);
});