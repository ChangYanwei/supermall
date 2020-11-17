import axios from "axios"

//对axios网络请求的封装

export function request(config) {
  const instance = axios.create({
    baseURL:"http://152.136.185.210:8000/api/w6",
    timeout: 100000
  });

  //请求拦截器
  instance.interceptors.request.use(config => {
    console.log("拦截请求成功：", config);
    return config;//拦截到config后还要返回出去
  }, err => {
    console.log(err);
  });

  //响应拦截
  instance.interceptors.response.use(result => {
    //result是结果,result.data是服务器最终返回的数据
    console.log("拦截响应成功：", result);
    return result.data;//此处返回的是result.data，不是result
  }, err => {
    console.log(err);
  })

  //此处返回的是一个Promise
  return instance(config)
}
