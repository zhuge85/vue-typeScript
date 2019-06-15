import Vue from "vue";
import router from "./router";
import axios from "axios";
import Qs from "qs";
/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f("取消重复请求"); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl);
    }
  }
};
interface ICodeApi {
  [propName: string]: any;
}
const codeMessage: ICodeApi = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "请求资源不存在，服务器没有进行操作。",
  406: "请求的格式不正确。",
  410: "请求的资源被永久删除，且不会再得到的。",
  416: "未找到路由匹配。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};
// interface AxiosRequestConfig {
//   url?: string; // 请求链接
//   method?: string; // 请求方法
//   baseURL?: string; // 请求的基础链接
//   xsrfCookieName?: string; // CSRF 相关
//   xsrfHeaderName?: string; // CSRF 相关
//   headers?: any; // 请求头设置
//   params?: any; // 请求参数
//   data?: any; // 请求体
//   timeout?: number; // 超时设置
//   withCredentials?: boolean; // CSRF 相关
//   responseType?: XMLHttpRequestResponseType; // 响应类型
//   paramsSerializer?: (params: any) => string; // url query 参数格式化方法
//   onUploadProgress?: (progressEvent: any) => void; // 上传处理函数
//   onDownloadProgress?: (progressEvent: any) => void; // 下载处理函数
//   validateStatus?: (status: number) => boolean;
//   adapter?: AxiosAdapter;
//   auth?: any;
//   transformRequest?: AxiosTransformer | AxiosTransformer[];
//   transformResponse?: AxiosTransformer | AxiosTransformer[];
//   cancelToken?: CancelToken;
// }

/* 创建axios实例 */
const service = axios.create({
  // baseURL: process.env.BASE_URL, // 基础地址
  timeout: 8000, // 请求超时时间
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  transformRequest: [
    function(data: any) {
      return Qs.stringify(data); //利用对应方法转换格式
    }
  ]
});

/* request拦截器 */
service.interceptors.request.use(
  (config: any) => {
    // neverCancel 配置项，允许多个请求
    if (!config.neverCancel) {
      // 生成cancelToken
      config.cancelToken = new CancelToken((c: any) => {
        removePending(config, c);
      });
    }

    // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
    if (sessionStorage.token) {
      config.headers.common["Authorization"] = sessionStorage.token;
      // // 让每个请求携带token--['X-Token']为自定义key
      // config.headers["xsrfCookieName"] = "33333333";
      // config.headers["xsrfHeaderName"] = "22222222";
      // config.headers["X-SessionId"] = "11111111";
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

/* respone拦截器 */
service.interceptors.response.use(
  (response: any) => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        if (location.hash === "#/") {
          return res;
        } else {
          location.href = "/#/";
        }
      }
      return Promise.reject("error");
    } else {
      return response;
    }
  },
  (error: any) => {
    // 异常处理
    // console.log(error);
    pending = [];
    if (error.message === "取消重复请求") {
      return Promise.reject(error);
    }
    const { status } = error.response;
    // console.log(codeMessage[status]);
    return Promise.reject(error);
  }
);

export default service;
