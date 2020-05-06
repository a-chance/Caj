// 写获取数据的接口
import axios from 'axios'

// 规范化 响应 的数据
axios.interceptors.response.use(function (response) {
    return response.data;
});

// 定义公共token
const token = '1_1161ec33-e5'


/*------------- 搜索数据 ------------*/
export const sendSearch = ( name, page ) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/menu/menu/queryPageMenu',
        data: {
            page: page || 1,
            limit: 6,
            name
        },
        headers: { token }
    })
}



/*------------- 添加收藏 ------------*/
export const addLike = (isDel, menuId) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/user/usercollect/changeUsercollect',
        data: {
            isDel,
            menuId
        },
        headers: {token}
    })
}

/*------------- 首页数据 ------------*/
// 轮播图数据
export const getSwiper = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/menu/menu/bannerRecommend',
        headers: {
            token
        }
    })
}
// 限时抢购
export const flashSale = () => {
    // 发送 POST 请求
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/menu/menu/findMenuDetailByTimeLimit',
        headers: {
            'Content-Type': 'application/json',
            token
        }
    })
}
// 获取倒计时
export const getCountdown = () => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/menu/menu/timeRemaining',
        headers: {token}
    })
}

// 热门菜品
export const hotDishes = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/menu/menu/hotMenu',
        headers: {
            token
        }
    })
}

/*------------- 详情页数据 ------------*/
export const Detail = (id) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/menu/menu/findMenuDetail',
        data: {
            id
        },
        headers: {
            token
        }
    })
}

/*------------- 分类页数据 ------------*/
// 首次切换到分类页，默认显示第一份数据
export const firstSort = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/menu/menu/firstSelectByDictionary?parentId=1',
        headers: {
            token
        }
    })
}

// 切换菜谱，右侧显示对应的菜品
export const getSort = (code) => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/menu/menu/selectMenuByTypeCode?typeCode=' + code, 
        headers: {
            token
        }
    })
}

/*-------------烹饪页数据 ------------*/
// 烹饪中的数据
export const getInTheCooking = () => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/menu/menu/menuCooking',
        headers: {token}
    })
}

// 我的菜谱的数据
export const getMyMenu = () => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/user/usercollect/findUsercollects',
        headers: {
            token
        }
    })
}

// 批量删除
export const batchDel = (menuIds) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/user/usercollect/batchRemoveUsercollects',
        data: {
            menuIds
        },
        headers: {token}
    })
}


// 已购买数据 传参为1
export const getPurchased = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/order/findByState/1',
        headers: {
            token
        }
    })
}

// 已烹饪数据 传参为1
export const getCooking = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/orderdetail/findByState/1',
        headers: {
            token
        }
    })
}

/*------------- 购物车 数据 ------------*/
// 获取购物车数据
export const getCart = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/cart/findCart',
        headers: {token}
    })
}
// 加入购物车
export const addCart = (menuId) => {
    console.log('这是menuID的值：', menuId)
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/order/cart/addCart',
        data: {
            menuId,
            number: 1
        },
        headers: {token}
    })
}
// 点击结算
export const settleAccounts = (menuIdNumbers) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/order/order/saveByMenuIds',
        data: {
            menuIdNumbers,
            addressId: 1
        },
        headers: {token}
    })
}

// 页面销毁时更新购物车产品的数量
export const sendUpdateCount = (menuIdNumbers) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/order/cart/addCartByMenuIds',
        data: {
            menuIdNumbers,
        },
        headers: {token}
    })
}

// 详情页查看产品的数量
export const lookCount = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/cart/findCartNumber',
        headers: {token}
    })
}

// 立即购买
export const oncePurchase = (id) => {
    console.log(id)
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/order/saveByMenuId/' + id,
        headers: {token}
    })
}


/*------------- 我的 数据 ------------*/
// 我的信息数据
export const myInfo = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/user/user/showUser',
        headers: {
            token
        }
    })
}

// 修改我的信息
export const sendInfo = (machineMac, address, height, weight, profession) => {
    return axios({
        method: 'post',
        url: '/os_kernel_cooking/app/user/user/updateUserMessage',
        data: {
            machineMac, address, height, weight, profession
        },
        headers: {token}
    })
}

// 全部订单
export const allOrder = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/order/findOrder',
        headers: {token}
    })
}
// 待付款
export const paymentOrder = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/order/findByState/0',
        headers: { token }
    })
}
// 待收货
export const sendgoodsOrder = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/order/findByState/4',
        headers: {token}
    })
}
// 已收货
export const receivingOrder = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/order/findByState/5',
        headers: {token}
    })
}


// 猜你喜欢
export const guessLike = () => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/menu/menu/guessYouLike',
        headers: {
            token
        }
    })
}


/*------------- 物流信息 ------------*/
export const logisticsInfo = (id) => {
    return axios({
        method: 'get',
        url: '/os_kernel_cooking/app/order/orderlogistics/findOrderLogistics/' + id,
        headers: {token}
    })
}
