import Cookie from 'js-cookie'
export default{
    state:{
        token: ''
    },
    mutations:{
        //将返回的token存入cookie中
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)  
        },
        //清除cookie中的token信息
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        //获取cookie中的token
        getToken(state){
            state.token = Cookie.get('token')
        }
    },
    actions:{}
}