/**
 * Created by Administrator on 2017/8/1.
 */
// const { PI } = Math;
//
// exports.area = (r) => PI * Math.pow(r, 2);
//
// exports.circumference = (r) => 2 * PI * r;

module.exports = (width) => {
    return {
        area: () => width * 2
    }
};