// 待收货组件
<template>
    <div class="order">
        <order-header></order-header>
        <div class="order_wrap">
            <div class="default_wrap" v-if="orderList.length === 0 ? true : false">
                <img class="default_img" src="@/assets/images/xxhdpi/nothing.png" alt="">
                <p style="font-size: 14px; color: #666; text-align: center">您还没有订单哦~</p>
            </div>
            <ul class="order_list" v-if="orderList.length !== 0 ? true : false">
                <li class="order_item" 
                    v-for="(orderItem, index) in orderList" 
                    :key="index"
                >
                    <!-- 订单状态模块 -->
                    <div class="order_status_wrap">
                        <img src="@/assets/images/xxhdpi/shopping.png" alt="" style="width: .426667rem; height: .373333rem; margin-right: .133333rem;">
                        <div class="order_number">订单号：<span>{{orderItem.orderCode}}</span></div>
                    </div>
                    <!-- 订单信息模块 -->
                    <div class="order_info_wrap" v-for="(orderInfo, index1) in orderItem.orderDetailDtos" :key="index1">
                        <img class="o_i_left" 
                            :src="orderInfo.menuDetailDto.menuDto.image" 
                             @click="gotoDetail(orderInfo.menuDetailDto.menuDto.id)"
                            alt="">
                        <div class="o_i_rig">
                            <p class="greens_name">{{orderInfo.menuDetailDto.menuDto.name}}</p>
                            <p class="greens_price">￥<span>{{(orderInfo.salePrice/100).toFixed(2)}}</span></p>
                            <p class="greens_count">x <span>{{orderInfo.number}}</span></p>
                        </div>
                    </div>
                    <!-- 商品小计 -->
                    <div class="greens_subtotal_wrap">
                        <p class="g_s_left">
                            共<span class="count">1</span>件商品
                        </p>
                        <p class="g_s_rig">
                            合计：￥<span class="total" style="font-weight: 550;">{{(orderItem.totalMoney/100).toFixed(1)}}</span>
                        </p>
                    </div>

                    <!-- 查看物流 -->
                    <div class="look_logistics_wrap">
                        <button v-if="active" class="look_btn" @click="look_logistics(orderItem.id)">查看物流</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import OrderHeader from './base/OrderHeader'
import myMixin from '@/components/commons/myMixin.js'
import { allOrder, sendgoodsOrder, receivingOrder, paymentOrder } from '@/api'

export default {
    mixins: [myMixin],
    data(){
        return  {
            active: false,
            orderList: [],
        }
    },
    created(){
        this.getOrderData()
    },
    methods: {
        // 查看物流
        look_logistics(id){
            this.$router.push({ name: 'Logistics', query: { id } })
        },
        // 获取数据
        async getOrderData(){
            let hash = this.$route.query.hash
            this.active = false
            if(hash === 'allorder'){
                let { result } = await allOrder()
                // console.log(result)
                this.orderList = result
            }
            if(hash === 'payment'){
                let {result} = await paymentOrder()
                this.orderList = result
            }
            if(hash === 'sendgoods'){
                this.active = true
                let { result } = await sendgoodsOrder()
                this.orderList = result
            }
            if(hash === 'receiving'){
                let { result } = await receivingOrder()
                this.orderList = result
            }
        }
    },
    components: {
        OrderHeader
    }
}
</script>

<style lang="stylus" scoped>

.order
    background #F6F6F6

    .order_wrap
        position relative
        width 100%
        height  calc(100vh - 1.44rem)
        padding 0 .426667rem
        overflow-y auto
        margin-top .266667rem
        background #F6F6F6
        box-sizing border-box

        .default_wrap
            position absolute
            top 30%
            left 50%
            transform translate(-50%, -50%)
            img 
                width 7.946667rem
                height 4.506667rem

        .order_list
            width 100%

            .order_item
                background #ffffff
                padding 0 .426667rem
                margin-bottom .266667rem
                border-radius .106667rem

                .order_status_wrap
                    display flex
                    justify-content space-between
                    align-items center
                    width 100%
                    height 1.093333rem
                    border-bottom .026667rem solid #F5F5F5
                    font-size .373333rem
                    // font-weight 550
                    letter-spacing: .005867rem
                    line-height 1.093333rem
                    white-space nowrap
                    overflow hidden

                    .order_number
                        color #333
                    
            // 订单信息模块
            .order_info_wrap
                display flex
                justify-content space-between
                width 100%
                padding .266667rem 0 0

                .o_i_left
                    width 2.133333rem
                    height 2.133333rem
                    border-radius .08rem

                .o_i_rig
                    flex 1

                    .greens_name
                        margin-bottom .106667rem
                        font-size .4rem
                        font-weight 550
                        color #333
                        text-align right
                        line-height .586667rem
                        letter-spacing .0064rem

                    .greens_price
                        font-size .373333rem
                        color #FA6400
                        font-weight 550
                        text-align right
                        line-height .586667rem

                    .greens_count
                        font-size .373333rem
                        color #cccccc
                        text-align right
                        line-height .533333rem
                        letter-spacing .005867rem

            .greens_subtotal_wrap
                display flex
                justify-content flex-end
                align-items center
                width 100%
                height .933333rem
                color #333
                font-size .373333rem
                letter-spacing .0056rem

                .g_s_left
                    margin-right .533333rem 
                    

            // 查看物流信息模块
            .look_logistics_wrap
                display flex
                justify-content flex-end
                align-items center
                width 100%
                padding .266667rem 0
                // height 1rem

                .look_btn
                    padding .133333rem .32rem
                    background #ffffff
                    font-size .346667rem
                    color: #4CA6FF
                    border: .026667rem solid #4CA6FF;
                    border-radius: .8rem
                    letter-spacing .0056rem
                    box-sizing border-box


</style>