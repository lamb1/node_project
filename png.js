var http = require('http');
var captchapng = require('captchapng');
//captchapng版本 0.0.1

function getImg(){
    var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    return imgbase64;
}

var start = new Date().getTime();
var i = 0;
while((new Date().getTime() - start) < 1000){
    var img = getImg();
    i++;
}
console.log("1秒钟生成：" + i);


/*http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'image/png'
    });
    var img = getImg();
    response.end(img);

}).listen(8082);*/

var selectByProvince = function () {
    http.createServer(function (request, response) {
        response.writeHead(200, {
            'Content-Type': 'image/png'
        });
        var img = getImg();
        return response.end(img);
    })
   /* var defer = q.defer();
    var connection = mysql.createConnection(mysqlOP.op);
    connection.connect();
    connection.query('SELECT id,areaName FROM t_area WHERE `level` = 0', function (err, rows, fields) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(rows);
        }
    });
    connection.end();*/
    // return defer.promise;
};

exports.selectByProvince = selectByProvince;
// console.log('Web server started.');