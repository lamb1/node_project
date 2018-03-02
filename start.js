/**
 * Created by xuxiaoshan on 2017/7/15.
 */
var q = require('./node_modules/q');

// var provinceData = require('./ddg/base/ProvinceData');

var bodyParser = require('./node_modules/body-parser');

var express = require('./node_modules/express');

var imgPng = require('./png');

var app = express();

app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

/**
 * 允许跨域
 * @param res
 */
function access(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
}

//获取所有省
/*app.get('/province', function (req, res) {
    access(res);
    provinceData.selectByProvince().then(function (data) {
        res.send(data);
    }, function (err) {
        res.send(err);
    });
});*/
//获取图片
app.get('/img', function (req, res) {
    access(res);
    imgPng.selectByProvince().then(function (data) {
        console.log(data);
        // res.send(data);
    }, function (err) {
        console.log(err)
        // res.send(err);
    });
});


//开始监听
var PORT = process.env.PORT || 8900;
var server = app.listen(PORT);