import axios from 'axios'
//axios请求封装
const service = axios.create();
const apiHost = 'http://192.168.31.123:96'
// const apiHost = 'http://192.168.31.108:71';
// const apiHost = 'http://b.69vedio.com'
// const apiHost = 'http://b.aff69.cc'
// const apiHost = 'http://192.168.1.102:96' 
service.interceptors.request.use(function (config) {

    /*let networkState = navigator.connection.type;
    //console.log(networkState);
    if (networkState === Connection.NONE||networkState===Connection.UNKNOWN) {
        throw '网络异常，不能连接到服务器！'
    }*/
    //console.log(config.url);
    if(config.url.indexOf(apiHost) == -1&&!config.url.startsWith("http")){
      config.url = apiHost.concat(config.url);
    }
    if(!config.headers.accessToken&&localStorage.getItem('token')){
        config.headers.accessToken = localStorage.getItem('token');
    }
    //console.log(config);
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service
