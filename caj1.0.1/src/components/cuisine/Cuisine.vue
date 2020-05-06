<template>
    <div class="cuisine-container">
        <div class="cui_hd">
            <ul class="cui_cui_tablist">
                <li @click="changeTab(index)" v-for="(tabTit, index) in tabTits" :key="index">
                    <span>{{tabTit}}</span>
                    <p :class="{bord: curId === index}"></p>
                </li>
            </ul>
        </div>

        <div class="cui_bd">
            <!-- 烹饪中 -->
            <div class="cui_row1">
                <div v-if="curId === 0" class="cui_row1_top">
                    <img :src="objCooking.menuDto.image" alt="">
                    <div class="top_con">
                        <h4 class="greens_name">{{objCooking.menuDto.name}}</h4>
                        <ul class="labels">
                            <li class="lab" v-for="(label, index) in objCooking.menuTagDtos" :key="index">{{label.tagName}}</li>
                        </ul>
                    </div>

                    <div class="djs_wrap" v-if="time ? true : false">
                        <img class="d_logo" src="@/assets/images/xxhdpi/icon-xianshiqianggou.png" alt="">
                        <p class="d_name">倒计时</p>
                        <p class="d_time">{{hours}}</p>
                        <span>:</span>
                        <p class="d_time">{{minutes}}</p>
                        <span>:</span>
                        <p class="d_time">{{seconds}}</p>
                    </div>

                    <div class="count_down" v-if="time ? false : true">
                        <img src="@/assets/images/xxhdpi/c_finish.png" alt="">
                        <p class="cuisine_finish">烹饪完毕~</p>
                    </div>


                </div>
            </div>

            <!-- 已购买 -->
            <div v-if="curId === 1" class="cui_row2">
                <ul class="cui_list">
                    <li v-for="(item, index) in purchased" :key="index">
                        <img :src="item.orderDetailDtos[0].menuDetailDto.menuDto.image" alt="" :onerror="defaultImg">
                        <div class="item_rig">
                            <div class="greens_left">
                                <p class="g_name">{{item.orderDetailDtos[0].menuDetailDto.menuDto.name}}</p>
                                <ul class="labels">
                                    <li v-for="(label, index1) in item.orderDetailDtos[0].menuDetailDto.menuTagDtos.slice(0, 3)" :key="index1">{{label.tagName}}</li>
                                </ul>
                                <p class="g_price">￥{{(item.orderDetailDtos[0].salePrice/100).toFixed(1)}}</p>

                            </div>

                            <div class="greens_rig">
                                <p class="se_time">购买时间</p>
                                <p class="time">{{item.createTime}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 已烹饪 -->
            <div v-if="curId === 2" class="cui_row2 cui_row3">
                <ul class="cui_list">
                    <li v-for="(item, index) in cooking" :key="index">
                        <img :src="item.image" alt="">
                        <div class="item_rig">
                            <div class="greens_left">
                                <p class="g_name">{{item.name}}</p>
                                <ul class="labels">
                                    <li v-for="(label, index1) in item.menuDetailDto.menuTagDtos.slice(0, 2)" :key="index1">{{label.tagName}}</li>
                                </ul>
                                <p class="g_price">￥{{(item.salePrice/100).toFixed(2)}}</p>

                            </div>

                            <div class="greens_rig">
                                <p class="se_time">开始时间</p>
                                <p class="time">{{item.startTime}}</p>
                                <p class="se_time">结束时间</p>
                                <p class="time">{{item.endTime}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 我的菜谱 -->
            <div v-if="curId === 3" class="cui_row4">
                <ul class="mine_green_wrap">
                    <li class="mine_green_item" v-for="(cartItem, index) in cartList" :key="index">
                        <div class="select_wrap">
                            <img @click="change(index)" class="sele" v-show="!cartItem.isOk" src="@/assets/images/xxhdpi/icon-xuanzhong1.png" alt="1">
                            <img @click="change(index)" class="sele" v-show="cartItem.isOk" src="@/assets/images/xxhdpi/icon-xuanzhong.png" alt="2">
                            
                            <!-- <img class="greens_img" :src="cartItem.menuDto.image" alt="图片暂时没有无法显示"> -->
                        </div>
                        <div class="mine_green_rig">
                            <img :src="cartItem.menuDto.image" alt="图片数据库中暂时没有">
                            <div class="mine_green_con">
                                <p class="green_tit">{{cartItem.menuDto.name}}</p>
                                <ul class="labels" style="margin-top: .2rem; margin-left: 0;">
                                    <li v-for="(label, index) in cartItem.menuTagDtos" :key="index">{{label.tagName}}</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="cui_row4_bot">
                    <div class="sele_del">
                        <img @click="changeAllSelect" class="sele all_selected" v-show="!isAllSelected" src="@/assets/images/xxhdpi/icon-xuanzhong1.png" alt="">
                        <img @click="changeAllSelect"  class="sele all_selected" v-show="isAllSelected" src="@/assets/images/xxhdpi/icon-xuanzhong.png" alt="">
                        <span @click="changeAllSelect">全选</span>
                    </div>
                    <button class="del_btn" @click="batch_del">批量删除</button>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>

// 引入组件
let Footer = () => import('../commons/Footer')

import { getMyMenu, getPurchased, getInTheCooking, batchDel, getCooking } from '@/api'

export default {
    data(){
        return  {
            curId: 0,
            tabTits: ['烹饪中', '已购买', '已烹饪', '我的菜谱'],
            isAllSelected: false,
            objCooking: {
                menuDto: {}
            }, // 烹饪中数据
            cooking: [], //已烹饪
            purchased: [],  // 已购买
            cartList: [], // 我的菜谱            
            time: 0,
            hours: null,
            minutes: null,
            seconds: null,
            timeId: null,
            defaultImg: require('@/assets/images/xxhdpi/defaultImg1.png')
        }
    },
    created(){
        this.changeTab(0)
    }, 
    destroyed(){
        clearInterval(this.timeId)
        this.timeId = null
    },
    methods: {
        // 倒计时
        getDuration(second) {
            second -= 1;
            this.time = second
            var days = Math.floor(second / 86400);
            var hours = Math.floor((second % 86400) / 3600);
            var minutes = Math.floor(((second % 86400) % 3600) / 60);
            var seconds = Math.floor(((second % 86400) % 3600) % 60);
            // var duration = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
            this.hours = hours < 10 ? '0' + hours : hours
            this.minutes = minutes < 10 ? '0' + minutes : minutes
            this.seconds = seconds < 10 ? '0' + seconds : seconds
            if(second > 0){
                // clearInterval(this.timeId)
                this.timeId = setInterval(() => {
                    if(second > 0){
                        second -= 1;
                        this.time = second
                        var days = Math.floor(second / 86400);
                        var hours = Math.floor((second % 86400) / 3600);
                        var minutes = Math.floor(((second % 86400) % 3600) / 60);
                        var seconds = Math.floor(((second % 86400) % 3600) % 60);
                        // var duration = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
                        this.hours = hours < 10 ? '0' + hours : hours
                        this.minutes = minutes < 10 ? '0' + minutes : minutes
                        this.seconds = seconds < 10 ? '0' + seconds : seconds
                    }
                    // console.log(duration)
                }, 1000)
            }
            // return duration;
        },
        // 全选控制单选
        changeAllSelect(){
            this.isAllSelected = !this.isAllSelected
            this.cartList.forEach(item => item.isOk = this.isAllSelected)
            this.count = this.isAllSelected ? this.cartList.length : 0
        },
        // 单选控制全选
        change(index){
            // this.$set(this.cartList[index], 'isOk', !this.cartList[index].isOk)
            this.cartList[index].isOk = !this.cartList[index].isOk          
            let count = 0
            this.cartList.forEach(item => {
                if(item.isOk === true && ++count === this.cartList.length){
                    this.isAllSelected = true
                }else{
                    this.isAllSelected = false
                }
            })
            this.count = count
        },

        // 批量删除
        async batch_del(){
            let data = []
            this.cartList.forEach(item => {
                if(item.isOk == true){
                    data.push(item.menuDto.id)
                }
            })

            if(data.length){
                // 给后端发送请求
                let res = await batchDel(data)
            
                this.isAllSelected = false

                let {result} = await getMyMenu()
                result.forEach((item, index) => {
                    this.$set(item, 'isOk', false)
                })
                this.cartList = result
            }else{
                // alert('请先选择菜品')
            }
        },
        
        // 切换选项卡
        async changeTab(index){    
            this.curId = index
            // 请求烹饪中的数据
            if(index === 0){
                try {
                    let {result} = await getInTheCooking()
                    if(JSON.stringify(result) !== "{}"){
                        console.log(result)
                        this.objCooking = result
                        this.time = result.surplusTime
                        this.getDuration(this.time)
                    }
                } catch (error) {
                    console.log('烹饪页数据获取失败')
                }
            }
            // 请求已购买的数据
            if(index === 1){
                try {
                    let {result} = await getPurchased()
                    // console.log(result)
                    this.purchased = result
                } catch (error) {
                    console.log('已购买的数据异常')
                }
                
            }
            // 请求已烹饪的数据
            if(index === 2){
                try {
                    let {result} = await getCooking();
                    // console.log(result)
                    this.cooking = result
                } catch (error) {
                    console.log('已烹饪的数据异常')
                }
            }
            // 请求我的菜谱 数据
            if(index === 3){
                try{    
                    let {result} = await getMyMenu()
                    result.forEach((item, index) => {
                        this.$set(item, 'isOk', false)
                    })
                    this.cartList = result

                }catch(error){
                    console.log('我的菜谱数据异常')
                }
            }
        },
    },
    components: {
        Footer,
    }
}
</script>

<style lang="stylus" scoped>
    // 公共样式
    .labels
        display flex
        align-items center
        margin-left .266667rem
        
        >li
            height .373333rem
            line-height .373333rem
            padding 0 .133333rem
            background #FFEDEC
            color #FB5046
            margin-right .133333rem
            font-size .266667rem

    .cuisine-container
        width 100%
        height 100%
        background #F6F6F6

        .cui_hd
            width 100%
            height 1.173333rem
            background #ffffff

            .cui_cui_tablist   
                position fixed
                top 0
                left 0   
                width 100%          
                height 1.173333rem                
                padding 0 .426667rem
                display flex
                justify-content space-between
                align-items center
                box-sizing border-box

                li
                    position relative
                    height .56rem
                    color #333
                    font-size .4rem
                    line-height .56rem
                    font-weight 550
                    letter-spacing .0064rem

                    .bord
                        position absolute
                        width 100%
                        height .053333rem
                        left 0
                        bottom 0
                        background #FF6671
                        border-radius .053333rem

        .cui_bd
            overflow-x hidden
            overflow-y auto
            width 100%
            margin-top .266667rem
            padding 0 .426667rem
            height calc(100vh - 2.746667rem)
            background #F6F6F6
            box-sizing border-box

            .cui_row1
                width 100%

                img 
                    width 100%
                    height 4.96rem
                    border-radius .106667rem
                    // margin-bottom .2rem
                    // margin-right .22rem
                
                .d_name
                    font-size: .666667rem
                    color: #FF6671;
                    margin-right .32rem

                .top_con
                    display flex
                    // align-items center
                    height .586667rem
                    margin-top .266667rem

                    h4
                        font-weight 550
                        font-size: .426667rem
                        color: #333333;

                .djs_wrap
                    display flex
                    align-items center
                    height 1.173333rem
                    margin 1.733333rem auto 0
                    padding-left .7rem
                    box-sizing border-box

                    > .d_logo 
                        width .666667rem
                        height  .666667rem
                        margin 0 .32rem

                    .d_time
                        width .733333rem
                        height .733333rem
                        background-image: linear-gradient(90deg, #FD6F7A 0%, #FD5965 100%);
                        border-radius: .133333rem
                        color #ffffff
                        font-size .533333rem
                        text-align center
                        line-height .733333rem
                    
                    span    
                        font-size: .746667rem
                        color: #FF6671;
                        margin 0 .266667rem

                .count_down
                    width 2.293333rem
                    margin 2.133333rem auto

                    img
                        width 100%
                        height 2.133333rem

                    .cuisine_finish
                        height .533333rem
                        margin-top .693333rem
                        font-size .373333rem
                        color #666
                        text-align center
                        


            
            .cui_row2
                width 100%

                .cui_list
                    width 100%
                    background #F6F6F6
                    box-sizing border-box

                    > li
                        display flex
                        width 100%
                        height 2.986667rem
                        padding-left .266667rem
                        padding-top .266667rem
                        padding-right .133333rem
                        margin-bottom .266667rem
                        background #ffffff
                        box-sizing border-box
                        border-radius .106667rem

                        img 
                            width 2.133333rem
                            height 2.133333rem

                        .item_rig
                            flex 1
                            display flex
                            justify-content space-between
                            height 2.133333rem
                            margin-left .266667rem

                            .greens_left
                                flex 1

                                .g_name
                                    height .56rem
                                    line-height .56rem
                                    margin-bottom .32rem
                                    color #333
                                    font-size .4rem
                                    // font-weight 550

                                .labels
                                    margin-left 0

                                .g_price
                                    margin-top .266667rem
                                    height .586667rem
                                    line-height .586667rem
                                    font-size .426667rem
                                    color #FF6671

                            .greens_rig
                                display flex
                                flex-direction column
                                justify-content center
                                // width 1.88rem
                                height 2.133333rem

                                .se_time
                                    height .453333rem
                                    line-height .453333rem
                                    font-size: .32rem
                                    color: #666666;
                                    font-family 'Microsoft YaHei'
                                    opacity: 0.79;
                                    margin .053333rem 0
                                    font-weight 550
                                    text-align: center;

                                .time
                                    margin .04rem 0
                                    font-size: .266667rem
                                    color: #999999;
                                    text-align: center;
            .cui_row4
                width 100%

                .mine_green_wrap
                    width 100%
                    height calc(100vh - 4.213333rem)
                    overflow-y auto

                    .mine_green_item
                        display flex
                        width 100%
                        height 2.986667rem
                        margin-bottom .266667rem
                        background #fff
                        border-radius .106667rem

                        .select_wrap
                            display flex
                            justify-content center
                            align-items center
                            width 1.066667rem
                            height 100%

                            img 
                                width .533333rem
                                height .533333rem

                        .mine_green_rig
                            flex 1 
                            display flex
                            padding-top .266667rem
                            box-sizing border-box
                            
                            img
                                width 2.133333rem
                                height 2.133333rem

                            .mine_green_con
                                margin-left .266667rem

                                .green_tit
                                    height .56rem
                                    line-height 0.56rem
                                    font-size: .4rem
                                    color: #333333;
                                    letter-spacing: .0064rem
                                    // font-weight 550

                                .labels
                                    display flex
                                    align-items center
                                    margin-top .32rem
                                    
                                    li
                                        height .48rem
                                        padding 0 .213333rem
                                        font-size .266667rem
                                        line-height .48rem


                .cui_row4_bot
                    position fixed
                    display flex
                    justify-content space-between
                    align-items center
                    left 0 
                    bottom 1.306667rem
                    width 100%
                    height 1.333333rem
                    padding 0 .426667rem
                    box-sizing border-box
                    background: #FFFFFF;
                    box-shadow: 0 .053333rem .213333rem 0 rgba(80,80,80,0.18);

                    .sele_del
                        display flex
                        align-items center
                        height .533333rem
                        font-size: .373333rem
                        color: #666666;
                        letter-spacing: .005867rem

                        img 
                            width .533333rem
                            height .533333rem
                            margin-right .266667rem
                            vertical-align middle

                        span
                            height .533333rem
                            display block
                            line-height .533333rem

                    .del_btn
                        width 3.146667rem
                        height 1.173333rem
                        line-height 1.173333rem
                        font-size: .373333rem
                        color: #FFFFFF;
                        background: #4CA6FF;
                        border-radius: .08rem
                        letter-spacing: .005867rem
                        text-align: center;


                        





                                



</style>