// 定义全局方法
export default {
    install(Vue) {
        // 小数点的四舍五入
        Vue.prototype.round = function (number, precision){
            return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
        }
    }
}