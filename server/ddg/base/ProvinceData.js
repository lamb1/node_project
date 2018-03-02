/**
 * Created by xuxiaoshan on 2017/7/15.
 */

var mysqlOP = require('./../../MysqlOp');

var q = require('./../../../node_modules/q');

var mysql = require('./../../../node_modules/mysql');

var selectByProvince = function () {
    var defer = q.defer();
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
    connection.end();
    return defer.promise;
};

exports.selectByProvince = selectByProvince;