<template>
    <div class="mine_tab">
       <div class="t_t_w">
            <h4 class="tab_tit">我的订单</h4>
            <ul class="cui_cui_tablist">
                <li @click="changeTab(index)" v-for="(tabTit, index) in tabTits" :key="index">
                    <span>{{tabTit.text}}</span>
                    <p :class="{bord: curId === index}"></p>
                </li>
            </ul>
       </div>
        <div class="guess">
            <h4 class="guess_tit">猜你喜欢</h4>
            <div class="guess_t_list">
                <ul class="s_rig">
                    <li @click="gotoDetail(green.menuDto.id, green.menuPriceDto.price)" class="r_item" v-for="(green, index) in greens" :key="index">
                        <img :src="green.menuDto.image" alt="" :onerror="defaultImg">
                        <h4>{{green.menuDto.name}}</h4>
                        <div class="like_wrap">
                            <!-- <img src="@/assets/images/xxhdpi/icon-shoucang.png" alt=""> -->
                            
                            <img v-if="!green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                            <img v-if="green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt="">

                            <ul class="labels" v-for="(label, index) in green.menuTagDtos.slice(0, 3)" :key="index">
                                <li>{{label.tagName}}</li>
                            </ul>
                        </div>
                        <div class="price">
                            ￥<span>{{round((green.menuPriceDto.price / 100), 1)}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script> 
import { guessLike, addLike } from '@/api'
import myMixin from '@/components/commons/myMixin.js'

export default {
    mixins: [myMixin],
    data(){
        return  {
            curId: 0,
            tabTits: [
                {
                    name: 'allorder',
                    hash: 'allorder',
                    text: '全部'
                },
                {
                    name: 'payment',
                    hash: 'payment',
                    text: '待付款'
                },
                {
                    name: 'sendgoods',
                    hash: 'sendgoods',
                    text: '待收货'
                },
                {
                    name: 'receiving',
                    hash: 'receiving',
                    text: '已收货'
                }
            ],
            greens: [],
            defaultImg: 'this.src="'+ require('@/assets/images/xxhdpi/defaultImg.png') +'"'
        }
    },
    created(){
        this.tabTits.forEach((item, index) => {
            if(item.hash === localStorage.getItem('curHash')){
                this.curId = index
            }
        })
        this.getGuessLikeDate()
    },
    methods: {
        // 是否收藏
        async isLike(collectType, menuId, index){
            let curDel = this.greens[index].menuDto.collectType
            this.greens[index].menuDto.collectType = !this.greens[index].menuDto.collectType

            try {
                let {result} = await addLike(Number(curDel), menuId)
                // console.log(result)
            } catch (error) {
                
            }
        },
        changeTab(index){            
            this.curId = index
            // console.log(this.curId)
            this.$router.push({ name: 'Order', query: { hash: this.tabTits[index].hash } })
        },
        async getGuessLikeDate(){
            try {
                let {result} = await guessLike()
                // console.log(result)
                this.greens = result
            } catch (error) {
                console.log('收藏数据获取失败')
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
    .mine_tab
        width 100%
        height 2rem
        background #ffffff
        box-shadow: 0 0 0 0 #EEEEEE;

        .t_t_w
            padding .266667rem .426667rem 0

            .tab_tit
                height .746667rem
                font-size: .4rem
                font-weight 550
                color: #333333;
                letter-spacing: .0064rem

        .cui_cui_tablist   
            width 100%          
            height 1.173333rem     
            display flex
            justify-content space-between
            align-items center

            li
                position relative
                height .56rem
                color #333
                font-size .4rem
                line-height .56rem
                font-weight 550

                .bord
                    position absolute
                    width 100%
                    height .053333rem
                    left 0
                    bottom 0
                    background #FF6671
                    border-radius .053333rem

        .guess
            background #ffffff
            margin-top .266667rem
            padding 0 .426667rem

            .guess_tit
                height 1.28rem
                padding-top .346667rem
                font-size: .4rem
                color: #333333;
                letter-spacing: .0064rem
                font-weight 550


            .s_rig
                // overflow hidden
                flex 1
                display flex
                flex-wrap wrap
                justify-content space-between
                // padding .2rem .32rem .2rem .38rem
                padding-bottom .4rem
                background #ffffff

                .r_item
                    width 2.773333rem
                    margin-bottom .266667rem
                    overflow hidden

                    img 
                        width 100%
                        height 2.4rem
                        border-radius .133333rem
                    
                    h4
                        height .533333rem
                        margin .133333rem 0
                        color #333
                        font-size .373333rem
                        // font-weight bold

                    .like_wrap
                        display flex
                        align-items center
                        width 100%

                        img 
                            width .4rem
                            height 100%
                            margin-right .133333rem
                        
                        .labels
                            flex 1
                            display flex
                            align-items center
                            flex-wrap wrap
                            width 2.24rem

                            li
                                height .373333rem
                                line-height .4rem
                                padding 0 .04rem
                                margin-right .213333rem
                                background: #FFEDEC;
                                color #FB5046
                                border-radius .026667rem
                                font-size .266667rem
                                white-space nowrap 

                    .price
                        height .533333rem
                        margin-top .133333rem
                        font-size: .373333rem
                        color: #FF6671;


</style>