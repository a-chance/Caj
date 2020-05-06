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
                        <img src="@/assets/images/xxhdpi/shopping.png" alt="" style="width: .32rem; height: 0.28rem; margin-right: .1rem;">
                        <div class="order_number">订单号：<span>{{orderItem.orderCode}}</span></div>
                        <!-- <div class="order_status">交易成功</div> -->
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
                            合计：￥<span class="total" style="font-size: .28rem; font-weight: 550;">{{(orderItem.totalMoney/100).toFixed(2)}}</span>
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
        height  calc(100vh - 1.08rem)
        padding 0 .32rem
        overflow-y auto
        margin-top .2rem
        background #F6F6F6
        box-sizing border-box

        .default_wrap
            position absolute
            top 30%
            left 50%
            transform translate(-50%, -50%)
            img 
                width 5.96rem
                height 3.38rem

        .order_list
            width 100%

            .order_item
                background #ffffff
                padding 0 .32rem
                margin-bottom .2rem
                border-radius .06rem

                .order_status_wrap
                    display flex
                    justify-content space-between
                    align-items center
                    width 100%
                    height .82rem
                    border-bottom 1px solid #F5F5F5
                    font-size .28rem
                    font-weight 550
                    letter-spacing: 0.22px;
                    line-height .82rem
                    white-space nowrap
                    overflow hidden

                    .order_number
                        color #333
                    
                    .order_status
                        color red
            // 订单信息模块
            .order_info_wrap
                display flex
                justify-content space-between
                width 100%
                padding .2rem 0 .1rem
                // border-bottom 1px solid #eee

                .o_i_left
                    width 1.6rem
                    height 1.6rem

                .o_i_rig
                    flex 1

                    .greens_name
                        font-size .30rem
                        font-weight 550
                        color #333
                        text-align right
                        line-height .6rem
                        letter-spacing 0.24px

                    .greens_price
                        font-size .24rem
                        color #FA6400
                        font-weight 550
                        text-align right
                        line-height .6rem

                    .greens_count
                        font-size .24rem
                        color #cccccc
                        text-align right

            .greens_subtotal_wrap
                display flex
                justify-content flex-end
                align-items center
                width 100%
                height 0.7rem

                .g_s_left
                    margin-right .4rem

            // 查看物流信息模块
            .look_logistics_wrap
                display flex
                justify-content flex-end
                align-items center
                width 100%
                padding .2rem 0
                // height 1rem

                .look_btn
                    // width 1.8rem
                    // height 0.6rem
                    padding .1rem 0.24rem
                    background #ffffff
                    font-size .32rem
                    color: #4CA6FF
                    border: 1px solid #4CA6FF;
                    border-radius: .5rem;
                    letter-spacing .21px
                    box-sizing border-box


</style>