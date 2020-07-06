import Cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,  //是否收缩侧边栏
        menu:[],  //返回的角色路由列表
        currentMenu:null,  //当前菜单
        tabsList:[  //不能重复添加的路由
            {
                path:'/',
                name:'home',
                label:'首页',
                icon: 'home'
            },
        ]
    },
    mutations:{
        //将返回的列表存入缓存
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        //获取返回的角色列表
        getMenu(state){
            state.menu = JSON.parse(Cookie.get('menu'))
        },
        //清除返回的列表
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        //添加返回的角色路由
        addMenu(state,router){ 
            if(!Cookie.get('menu')){  //如果在cookie中没有存储的路由信息 则直接return
                return 
            }
            let menu = JSON.parse(Cookie.get('menu'))  //如果有的话 则对获取的路由信息进行json序列化
            state.menu = menu  //存入state
            let currentMenu = [  //设置当前的主路由界面 也就是首页
                {
                    path:'/',
                    component:() => import(`@/views/Main`),
                    children:[]
                }
            ]
            menu.forEach(item =>{  //循环当前的路由信息 是否拥有子节点
                if(item.children){  //如果有 就将带有子节点的路由也引入进来
                    item.children = item.children.map(item =>{  
                        item.component = () => import (`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                }else{  //然后再将没有的引入进来
                    item.component = () => import (`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            router.addRoutes(currentMenu)  //使用addRoutes动态添加路由
        },
        //是否添加该页面在tab列表中
        selectMenu(state,val){
            //判断当前是否为首页 主要是防止首页重复添加到header列表中
            if(val.name !== 'home'){   //不是首页 则判断当前要跳转的是不是不可以再次赋值的页面
                state.currentMenu = val;  
                let result  = state.tabsList.findIndex(item => item.name === val.name);  //判断当前tablist列表中有没有该页面
                result == -1 ? state.tabsList.push(val) : '';  //返回-1 说明不存在 则将其添加到tablist 在header中进行渲染
            }else{
                state.currentMenu = null;  //如果是首页 则赋值为空不进行跳转
            }
        },
        //循环遍历当前点击的列表中是否存在需要关闭的页面 如果有则删除
        closeTab(state,val){
            let result = state.tabsList.findIndex(item => item.name === val.name);
            state.tabsList.splice(result,1);
        },
        //收缩侧边栏
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
    },
    actions:{}
}