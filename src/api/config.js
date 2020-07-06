import axios from 'axios'

//创建一个axios实例
const service = axios.create({
    //设置超时时间
    timeout:3000
})

//添加请求拦截器
service.interceptors.request.use(
    config =>{
        return config
    },
    err =>{
        console.log(err)
    }
)

service.interceptors.response.use(
    //可以在这里添加判断 判断返回的状态码是否正确
    response =>{
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    },
    err => console.log(err)
)

export default service