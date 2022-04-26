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
export const userinfo = (data)=> {
    return request({
        url: "/userinfo",
        params:data
    })

}

export const deleteUser = data => {
    return request({
        url: "/deleteUser",
        method: "POST",
        data:qs.stringify(data)
    })

}
export const updateUserinfo = data => {
    return request({
        url: "/update-userinfo",
        method: "POST",
        data:qs.stringify(data)
    })

}
export const adduser = data => {
    return request({
        url: "/addUserInfo",
        method: "POST",
        data:qs.stringify(data)
    })

}