/**
 * 自己封装的异步请求函数
 * APP中的所有请求都将汇聚于此
 * **/

import reqwest from "reqwest"; // 封装了ajax请求的库
import axios from "axios"; // 封装了fetch请求的库
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://isluo.com/graphql"
});

export default class ApiService {
  /** ajax请求(用的reqwest.js) **/
  static newPost(url, bodyObj = {}) {
    return reqwest({
      url, // URL
      method: "post", // 请求方式
      contentType: "application/json;charset=utf-8", // 消息主体数据类型 JSON
      crossOrigin: true, // 开启CORS跨域
      withCredentials: true, // 请求头中是否带cookie，有利于后端开发保持他们需要的session
      data: JSON.stringify(bodyObj), // 参数，弄成json字符串
      type: "json" // 参数类型JSON
    });
  }

  /** fetch请求(用的axios.js) **/
  static newFetch(url, bodyObj = {}) {
    return axios({
      url,
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true,
      data: JSON.stringify(bodyObj)
    });
  }

  static newGraphql(ql) {
    client
      .query({
        query: gql`
          ${ql}
        `
      })
      .then(result => console.log(result));
  }
}
