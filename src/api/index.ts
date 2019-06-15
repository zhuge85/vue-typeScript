import request from "../axios";
// import qs from "qs";

// get
export function getSomeThings(url: any, params?: any) {
  return new Promise((resolve, reject) => {
    request
      .get(url, { params: params })
      .then((res: any) => {
        resolve(res); // 返回请求成功的数据 data
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

// post
export function postSomeThings(url: any, params: any) {
  return new Promise((resolve, reject) => {
    request
      .post(url, params) // qs.stringify(params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
