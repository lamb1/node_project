/**
 * Created by xuxiaoshan on 2017/7/25.
 */
var q = require('q');
var nodeExcel = require('excel-export');
var xlsx = require('node-xlsx');
var fs = require('fs');
var provinceData = require('./server/ddg/base/ProvinceData');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

/**
 *
 * @param _headers example  [
 {caption:'用户状态',type:'string'},
 {caption:'部门',type:'string'},
 {caption:'姓名',type:'string'},
 {caption:'邮箱',type:'string'},
 {caption:'有效期',type:'string'},
 {caption:'身份',type:'string'}];
 * @param rows example
 [['未激活','信息部','testname','123@qq.com','2019-11-09','管理员'],
 ['未激活','信息部','testname2','12345@qq.com','2019-11-09','普通成员']]
 */
exports.exportExcel = function (_headers, rows) {
    var conf = {};
    conf.name = "mysheet"; //标签名
    conf.cols = [];
    for (var i = 0; i < _headers.length; i++) {
        var col = {};
        col.caption = _headers[i].caption;
        col.type = _headers[i].type;
        conf.cols.push(col);
    }
    conf.rows = rows;
    var result = nodeExcel.execute(conf);
    return result;
};

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

/*//获取所有省
app.get('/province', function (req, res) {
    access(res);
    provinceData.selectByProvince().then(function (data) {
        res.send(data);
    }, function (err) {
        res.send(err);
    });
});*/
//获取所有省
app.get('/province', (req, res)=> {
    access(res);
    provinceData.selectByProvince().then((data)=>{
        res.send(data);
    }, (err)=>{
        res.send(err);
    });
});

app.get('/exportMember', function (req, res) {
    var _headers = [{caption: '广东', type: 1},{caption: '福建', type: 2},{caption: '海南', type: 3}];
    var rows =  [['未激活','信息部','testname','123@qq.com','2019-11-09','管理员'], ['未激活','信息部','testname2','12345@qq.com','2019-11-09','普通成员'],['未激活','信息部','testname2','12345@qq.com','2019-11-09','普通成员']];
    var result = exports.exportExcel(_headers, rows);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "test.xlsx");
    res.end(result, 'binary');
    return;
});
//开始监听
var PORT = process.env.PORT || 8900;
var server = app.listen(PORT);

var name = 'Kevin';
var welcome = `hello ${name }`;
console.log(welcome);
console.log(Math.trunc(4.11));
