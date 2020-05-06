<template>
    <div class="logistics_info">
        <!-- 内容顶部 -->
        <div class="l_i_top">
            <img class="l_i_logo" src="@/assets/images/xxhdpi/icon-wuliu.png" alt="">
            <div class="order_logistics_number">
                <p class="info order_number" style="color: #333">订单编号：{{orderCode}}</p>
                <p class="info logistics_number">物流编号：<span>{{logisticsNo}}</span></p>
            </div>
        </div>
        <!-- 内容底部 -->
        <div class="l_i_bot">
            <ul class="address_list">
                <li class="address_item">
                    <div class="a_i_left">
                        <img class="a_i_logo a_logo" src="@/assets/images/xxhdpi/icon-kuaijiandaoda.png" alt="">
                        <!-- <p class="circle"></p> -->
                    </div>
                    <div class="a_i_rig">
                        <p class="goto_address" style="color: #333">快件到达 【广州】</p>
                        <p class="goto_date">2019-11-24 16:24</p>
                    </div>
                </li>
                <li class="address_item">
                    <div class="a_i_left">
                        <!-- <img class="a_i_logo" src="@/assets/images/xxhdpi/icon-kuaijiandaoda.png" alt=""> -->
                        <p class="circle a_logo"></p>
                    </div>
                    <div class="a_i_rig">
                        <p class="goto_address">快件到达 【深圳】</p>
                        <p class="goto_date">2019-11-24 16:24</p>
                    </div>
                </li>
                <li class="address_item">
                    <div class="a_i_left">
                        <!-- <img class="a_i_logo" src="@/assets/images/xxhdpi/icon-kuaijiandaoda.png" alt=""> -->
                        <p class="circle a_logo"></p>
                    </div>
                    <div class="a_i_rig">
                        <p class="goto_address">快件到达 【厦门】</p>
                        <p class="goto_date">2019-11-24 16:24</p>
                    </div>
                </li>
                <li class="address_item" style="border: none;">
                    <div class="a_i_left">
                        <img class="a_i_logo a_logo" src="@/assets/images/xxhdpi/icon-shouqukuaidi@3x.png" alt="">
                        <!-- <p class="circle"></p> -->
                    </div>
                    <div class="a_i_rig">
                        <p class="goto_address">快件到达 【三亚】</p>
                        <p class="goto_date">2019-11-24 16:24</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { logisticsInfo } from '@/api'
export default {
    data(){
        return  {
            orderCode: '',
            logisticsNo: ''
        }
    },
    created(){
        this.getLogisticsInfoData()
    },
    methods: {
        async getLogisticsInfoData(){
            let  {result}  = await logisticsInfo(this.$route.query.id);
            console.log(result)
            // console.log(result)
            this.orderCode = result.orderCode
            this.logisticsNo = result.logisticsNo
        }
    }
}
</script>

<style lang="stylus" scoped>
    .logistics_info
        padding 0 .32rem
        background #F6F6F6

        // 内容顶部
        .l_i_top
            display flex
            align-items center
            width 100%
            height 1.6rem
            margin-top .2rem
            background #ffffff

            .l_i_logo
                width 1.2rem
                height 1.2rem
                margin 0 .37rem 0 .2rem
                border-radius 50%

            .order_logistics_number
                flex 1
                display flex
                flex-direction column
                justify-content space-between
                height 1.2rem
                padding .1rem 0
                font-size .32rem
                color #939393
                overflow hidden

                .info
                    white-space nowrap
                    overflow hidden
                    line-height .44rem

        // 内容底部
        .l_i_bot
            width 100%
            margin-top .2rem
            padding-top .4rem
            background #ffffff

            .address_list
                width 100%
                padding-left .8rem

                .address_item
                    display flex
                    width 100%
                    height 1.62rem
                    border-left 1px solid #cccccc

                    .a_i_left
                        position relative
                        width 0.54rem

                        .a_logo
                            position absolute
                            top 0
                            left 0
                            transform translateX(-50%)

                        .a_i_logo
                            width 0.54rem
                            height 0.54rem

                        .circle
                            width .18rem
                            height .18rem
                            background #CECECE
                            border-radius 50%

                    .a_i_rig
                        .goto_address
                            color  #939393
                            font-size .28rem
                            line-height 0.4rem

                        .goto_date
                            margin-top .1rem
                            color #999
                            font-size .26rem
                            line-height .36rem


</style>