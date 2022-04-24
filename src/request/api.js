import request from "@/request/request";
// 请求
import qs from 'qs'

export const login = data => {
    return request({
        url: "/login",
        method: "POST",
        data:qs.stringify(data)
    })

}
export const register = data => {
    return request({
        url: "/register",
        method: "POST",
        data:qs.stringify(data)
    })

}

// 获取用户信息
export const userinfo = ()=> {
    return request({
        url: "/userinfo"
    })

}