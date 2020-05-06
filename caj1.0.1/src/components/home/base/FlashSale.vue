<template>
    <div class="flash_sale" v-show="hotgreensList.length">
        <div class="hotgreens_title">
            <img src="@/assets/images/xxhdpi/icon-xianshiqianggou.png" alt="">
            <span class="limit_text">限时抢购</span>
            <div class="count-down">
                <div class="time">{{isNaN(hours) ? "00" : hours}}</div>
                <span class="semicolon">:</span>
                <div class="time">{{isNaN(minutes) ? "00" : minutes}}</div>
                <span class="semicolon">:</span>
                <div class="time">{{isNaN(seconds) ? "00" : seconds}}</div>
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
        padding .4rem 0 .266667rem 0

        img 
            width .533333rem
            height .533333rem

        .limit_text
            // width 1.28rem
            height .586667rem
            margin-left .133333rem
            margin-right .186667rem
            line-height .586667rem
            font-size .426667rem
            color: #FF6671
        
        .count-down
            display flex
            align-items center

            .time
                width .533333rem
                height .533333rem
                background: #333333
                background-image: linear-gradient(90deg, #FD6F7A 0%, #FD5965 100%)
                background-image: -webkit-gradient(linear, left top, right top, from(#fd6f7a), to(#fd5965));
                color #ffffff
                font-size .426667rem
                border-radius: .053333rem
                text-align center
                line-height .533333rem
                overflow hidden
                
            .semicolon
                display block
                width .106667rem
                height .533333rem
                margin 0 .133333rem
                color #FF6671
                font-size .373333rem
                font-weight 550
                line-height .533333rem
                border-radius 50%

    .hotgreens_list_wrap
        width 100%
        margin-bottom .426667rem
        overflow-y hidden

        .hotgreens_list
            display flex
            width 100%
            
            .hotgreens_item
                flex-shrink 0
                width 2.773333rem
                margin-right .426667rem

                .greens_img
                    width 100%
                    height 2.4rem
                    border-radius .106667rem
            
                .hotgreens_name
                    width 100%
                    height .533333rem
                    margin .133333rem 0
                    font-family: 'Microsoft YaHei';
                    font-size: .373333rem
                    color: #333333;
                    letter-spacing: .005867rem;
                    line-height .533333rem

                .hot_row1
                    display flex
                    height auto

                    .like
                        width .426667rem
                        height .4rem
                        margin-right .106667rem

                    .labels
                        flex 1
                        display flex
                        flex-wrap wrap

                        li
                            height .373333rem
                            line-height .4rem
                            border-radius: .026667rem
                            letter-spacing: .004267rem
                            box-sizing border-box
                            background #FFEDEC
                            color #FB5046
                            // font-size .266667rem
                            font-size .266667rem/.373333rem
                            padding 0 .133333rem
                            margin-bottom .133333rem
                            margin-right .133333rem
                        
                        li:nth-child(3n + 3)
                            margin-right 0

                .hot_row2
                    display flex
                    justify-content space-between
                    align-items center
                    height .533333rem
                    line-height .533333rem

                    .price_wrap
                        font-size: .373333rem
                        color: #FF6671;
                        letter-spacing: 0.0044rem;
                        line-height .533333rem

                    .residue_wrap
                        font-size: .293333rem
                        color: #999999;
                        letter-spacing: .0048rem

                    
                        


                            

                    





</style>