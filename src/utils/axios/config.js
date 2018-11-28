/**
 * axios interceptor 拦截器配置
 */
import axios from 'axios';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
class Interceptor {
    constructor (timeout=10000) {
        this.req = {
            timeout: timeout
        };// 防止同个链接连续请求
        this.request();
        this.response();
    }

    requestTimeout (name) {
        setTimeout(() => {
            if (this.req[name]) {
                delete this.req[name];
            }
        }, this.req.timeout);
    }

    getParams (obj) {
        var result = [],
            keys = Object.keys(obj);
        keys && keys.forEach(function (val) {
            var str = val + '=' + (typeof obj[val] === 'string' ? obj[val].toString() : JSON.stringify(obj[val]));
            result.push(str);
        });
        return result.join('&');
    }

    // 对请求数据做些什么
    request () {
        if (!String.prototype.trim) {
            String.prototype.trim = function () { // eslint-disable-line no-extend-native
                return this.replace(/^\s+|\s+$/g, '');
            };
        }
        axios.interceptors.request.use((request) => {
            request.urlGuid = request.url + '?' + this.getParams(request.data); // 防止同个链接连续请求
            // 本地
            if (~request.url.indexOf('.json')) {
                request.method = 'GET';
                request.url = '/static/data/' + request.url + (~request.url.indexOf('.json') ? '?' : '.json?') + this.getParams(request.data || {});
                // 线上
            } else if (request.headers.ignoreRepeat || !this.req[request.urlGuid]) {
                request.url = '/gateway/' + (request.url.split('.').length === 1 ? request.url : 'call');
                this.req[request.urlGuid] = true;
                this.requestTimeout(request.urlGuid);
            } else if (this.req[request.urlGuid]) {
                return Promise.reject('重复请求');
            }
            NProgress.start();
            return request;
        }, (error) => Promise.reject(error));
    }

    // 对响应数据做点什么
    response () {
        axios.interceptors.response.use((response) => {
            NProgress.done();
            delete this.req[response.config.urlGuid]; // 防止同个链接连续请求
            if (response.data) {
                if (response.data.code === 'SUCCESS' || response.data.code === '0') {
                    return response.data;
                } else if (response.data.code === 'SESSION_EXPIRED' || response.data.code === '5000') {
                    // Message.error({
                    //     showClose: true,
                    //     message: '登陆过期'
                    // });
                    window.location.href = '/login';
                    return Promise.reject(response.data);
                } else if (response.data.code === 'FAILURE') {  // excel导入检验失败code
                    return Promise.reject(response.data);
                } else {
                    // Message.error({
                    //     showClose: true,
                    //     message: `${response.data.message}`
                    // });
                    return Promise.reject(response.data);
                }
            }
            return response;
        }, (error) => {
            NProgress.done();
            return Promise.reject(error);
        });
    }
}
export default Interceptor;
