<template>
    <div class="flash_sale">
        <div class="hotgreens_title">
            <img src="@/assets/images/xxhdpi/icon-xianshiqianggou.png" alt="">
            <span class="limit_text">限时抢购</span>
            <div class="count-down">
                <div class="time">{{hours}}</div>
                <span class="semicolon">:</span>
                <div class="time">{{minutes}}</div>
                <span class="semicolon">:</span>
                <div class="time">{{seconds}}</div>
            </div>
        </div>
        <div class="hotgreens_list_wrap">
            <ul class="hotgreens_list">
                <li @click="gotoDetail(item.menuDto.id)" class="hotgreens_item" v-for="(item, index) in hotgreensList" :key="index">
                    <img class="greens_img" :src="item.menuDto.image" alt="">
                    <p class="hotgreens_name">{{item.menuDto.name}}</p>
                    <div class="hot_row1">
                        <!-- <img class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt=""> -->
                            <img v-if="!item.menuDto.collectType" @click.stop="isLike(item.menuDto.collectType, item.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                            <img v-if="item.menuDto.collectType" @click.stop="isLike(item.menuDto.collectType, item.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt="">
                        <ul class="labels">
                            <li v-for="(label, index) in item.menuTagDtos.slice(0, 3)" :key="index">{{label.tagName}}</li>
                        </ul>
                    </div>
                    <div class="hot_row2">
                        <p class="price_wrap">￥<span class="price">{{(item.menuPriceDto.preferentialPrice / 100).toFixed(1)}}</span></p>
                        <p class="residue_wrap">剩<span>{{item.menuStockDto.stock}}</span></p>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
</template>

<script>
import { flashSale, addLike, getCountdown } from '@/api'
import myMixin from '@/components/commons/myMixin.js'

export default {
    mixins: [myMixin],
    data(){
        return  {
            hotgreensList: [],
            time: 0,
            hours: '',
            minutes: '',
            seconds: ''
        }
    },
    methods: {
        getDuration(second) {
            var days = Math.floor(second / 86400);
            var hours = Math.floor((second % 86400) / 3600);
            var minutes = Math.floor(((second % 86400) % 3600) / 60);
            var seconds = Math.floor(((second % 86400) % 3600) % 60);
            this.hours = hours < 10 ? '0' + hours : hours
            this.minutes = minutes < 10 ? '0' + minutes : minutes
            this.seconds = seconds < 10 ? '0' + seconds : seconds

            setInterval(() => {
                if(second > 0){
                    second -= 1;
                    var days = Math.floor(second / 86400);
                    var hours = Math.floor((second % 86400) / 3600);
                    var minutes = Math.floor(((second % 86400) % 3600) / 60);
                    var seconds = Math.floor(((second % 86400) % 3600) % 60);
                    // var duration = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
                    this.hours = hours < 10 ? '0' + hours : hours
                    this.minutes = minutes < 10 ? '0' + minutes : minutes
                    this.seconds = seconds < 10 ? '0' + seconds : seconds
                }
            }, 1000)
        },
        // 是否收藏
        async isLike(collectType, menuId, index){
            let curDel = this.hotgreensList[index].menuDto.collectType
            this.hotgreensList[index].menuDto.collectType = !this.hotgreensList[index].menuDto.collectType
            try {
                let {result} = await addLike(Number(curDel), menuId)
                // console.log(result)
            } catch (error) {
                console.log('首页收藏数据获取失败！')
            }
        },
        // 获取限时抢购的数据
        async getFlashSale(){
            try {   
                let {result} = await flashSale();   
                // console.log(result)
                this.hotgreensList = result 
            } catch (error) {
                console.log('限时抢购数据获取失败')
            }
        },
        // 获取倒计时数据
        async getCountdownData(){
            let {result} = await getCountdown()
            this.time = result
            this.getDuration(this.time)
        }
    },
    created(){
        this.getCountdownData()
        this.getFlashSale()
    }
}
</script>

<style lang="stylus" scoped>
    .hotgreens_title
        display flex
        padding .3rem 0 .2rem 0

        img 
            width 0.4rem
            height 0.4rem

        .limit_text
            width 1.28rem
            height 0.44rem
            margin-left .1rem
            margin-right .14rem
            line-height .44rem
            font-size .32rem
            color: #FF6671
        
        .count-down
            display flex
            align-items center

            .time
                width .4rem
                height .4rem
                background: #333333
                background-image: linear-gradient(90deg, #FD6F7A 0%, #FD5965 100%)
                color #ffffff
                font-size .32rem
                border-radius: .04rem
                text-align center
                line-height .4rem
                
            .semicolon
                width 0.08rem
                height 0.4rem
                margin 0 .1rem
                color #FF6671
                font-size .28rem
                line-height .4rem

    .hotgreens_list_wrap
        width 100%
        margin-bottom .3rem
        overflow-y hidden

        .hotgreens_list
            display flex
            width 100%
            // height 4.04rem

            
            .hotgreens_item
                flex-shrink 0
                width 2.08rem
                margin-right .32rem

                .greens_img
                    width 100%
                    height 1.8rem
                    border-radius .06rem
            
                .hotgreens_name
                    width 100%
                    height .4rem
                    margin .1rem 0
                    font-family: PingFangSC-Regular;
                    font-size: .28rem;
                    color: #333333;
                    letter-spacing: 0.0044rem;
                    line-height .4rem

                .hot_row1
                    display flex
                    height auto

                    .like
                        width 0.32rem
                        height 0.3rem
                        margin-right .08rem

                    .labels
                        flex 1
                        display flex
                        flex-wrap wrap

                        li
                            height .28rem
                            line-height .3rem
                            border-radius: .02rem;
                            letter-spacing: 0.16px;
                            box-sizing border-box
                            background #FFEDEC
                            color #FB5046
                            font-size .2rem
                            padding 0 .07rem
                            margin-bottom .1rem
                            margin-right .1rem
                        
                        li:nth-child(3n + 3)
                            margin-right 0

                .hot_row2
                    display flex
                    justify-content space-between
                    align-items center
                    height .5rem
                    line-height .5rem

                    .price_wrap
                        width 0.64rem
                        height .4rem
                        font-size: .28rem;
                        color: #FF6671;
                        letter-spacing: 0.0044rem;
                        line-height .4rem

                    .residue_wrap
                        font-size: .22rem;
                        color: #999999;
                        letter-spacing: 0.18px;

                    
                        


                            

                    





</style>