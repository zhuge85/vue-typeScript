import Vue from "vue";
import router from "./router";
import axios from "axios";
import qs from "qs";
// import { Base } from "./base"; // 导入全局环境变量
// const base = new Base();
// 取消请求
const CancelToken = axios.CancelToken;
// 是否需要拦截code==-1的状态
let is_log: boolean = false;
// 设置默认请求头
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/x-www-form-urlencoded"
};
// axios.defaults.baseURL = base.url();
// 请求超时的时间限制
axios.defaults.timeout = 20000;

interface AxiosRequestConfig {
  url?: string; // 请求链接
  method?: string; // 请求方法
  baseURL?: string; // 请求的基础链接
  xsrfCookieName?: string; // CSRF 相关
  xsrfHeaderName?: string; // CSRF 相关
  headers?: any; // 请求头设置
  params?: any; // 请求参数
  data?: any; // 请求体
  timeout?: number; // 超时设置
  withCredentials?: boolean; // CSRF 相关
  responseType?: XMLHttpRequestResponseType; // 响应类型
  paramsSerializer?: (params: any) => string; // url query 参数格式化方法
  onUploadProgress?: (progressEvent: any) => void; // 上传处理函数
  onDownloadProgress?: (progressEvent: any) => void; // 下载处理函数
  validateStatus?: (status: number) => boolean;
  // adapter?: AxiosAdapter;
  // auth?: any;
  // transformRequest?: AxiosTransformer | AxiosTransformer[];
  // transformResponse?: AxiosTransformer | AxiosTransformer[];
  // cancelToken?: CancelToken;
}

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
let requestName: any;
axios.interceptors.request.use(
  (config: any) => {
    // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
    // 如果没有 requestName 就默认添加一个 不同的时间戳
    if (config.method === "post") {
      if (config.data && qs.parse(config.data).requestName) {
        requestName = qs.parse(config.data).requestName;
      } else {
        requestName = new Date().getTime();
      }
      if (config.data.indexOf("is_log") !== -1) {
        is_log = true;
      }
    } else {
      if (config.params && config.params.requestName) {
        requestName = config.params.requestName;
      } else {
        requestName = new Date().getTime();
      }
      if (config.params.is_log) {
        is_log = true;
      }
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
    if (requestName) {
      if (axios[requestName] && axios[requestName].cancel) {
        axios[requestName].cancel("取消了请求");
      }
      config.cancelToken = new CancelToken((c: any) => {
        axios[requestName] = {};
        axios[requestName].cancel = c;
      });
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 请求到结果的拦截处理
axios.interceptors.response.use(
  (config: any) => {
    // 返回请求正确的结果
    if (!is_log && config.data.code === -1) {
      router.push({ path: "/login" }); // 进入登陆页面
    }
    if (config.data.code === -2) {
      router.push({ path: "/" }); // 进入实名认证
    }
    return config.data;
  },
  (error: any) => {
    return Promise.reject(error);
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
  }
);
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res: any) => {
        resolve(res); // 返回请求成功的数据 data
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

// 调用
// this.$post("/homeapi/Api/Foreign/mark_login", this.param).then(
//   (res: any) => {
//     console.log(res);
//   }
// );
// this.$get("/homeapi/home/index/user_get_odss", {
//   csk: 3,
//   is_log: true
// }).then((res: any) => {
//   console.log(res);
// });
