import queryString from "query-string";
// import * as CONSTANT from "@/config/constant";

/**
 * 对象转键值对
 * @param json
 * @returns {*|number}
 */
export function jsonToQueryString(json = {}) {
  return queryString.stringify(json);
}

/**
 * @description 封装公共请求
 */
const request = async (url, options) => {
  console.log(window);
  // 等待网络响应需要await一下
  const response = await fetch(
    `${url}${url.indexOf("?") > 0 ? "&" : "?"}dev_ver=${window.SYSTEM_VERSION}`,
    {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }
  );

  let data = {};
  console.log(response);
  // 请求成功
  if (response.status >= 200 && response.status < 300) {
    try {
      // 第二个promise等到body到来。
      data = await response.json();
    } catch (e) {
      data = {
        code: 1001,
        msg: "Syntax Error in Response Data",
      };
    }
  } else {
    data = {
      code: 1000,
      msg: response.statusText,
    };
  }

  if (data.code === 999) {
    // // to authority
    // data = await authority("/api/authority");
    // if (data.code === 0) {
    //   window.sessionStorage.setItem("oper", data.data.userName);
    //   return request(url, options);
    // }
  }
  console.log(data);
  return { data };
};

/**
 * @description POST请求
 */
export const post = (url, param) => {
  request(url, {
    method: "POST",
    body: jsonToQueryString({ ...param }),
  });
};

/**
 * @description GET请求，不需要请求体
 */
export const get = (url) => {
  request(url, {
    method: "GET",
    // body: jsonToQueryString({ ...param }),
  });
};
