var mysql = require('mysql')
var db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "Choice Foundation",
    multipleStatements : true
});

db.connect((err)=>{
    if(err){
        console.log(err);
        console.log("Not Connected");
    }
    else
        console.log('MySql Database Connected...')
})

module.exports = db;