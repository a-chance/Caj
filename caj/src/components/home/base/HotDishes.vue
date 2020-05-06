<template>
    <div class="hot_dishes">
        <div class="hd_header">
            <img class="hd_logo" src="@/assets/images/xxhdpi/icon-remen.png" alt="">
            <h2 class="hd_tit">热门菜品</h2>
        </div>
        <div class="hotgreens_list_wrap">
            <ul class="hotgreens_list">
                <li @click="gotoDetail(green.menuDto.id)" class="hotgreens_item" v-for="(green, index) in hotgreens" :key="index">
                    <img class="greens_img" :src="green.menuDto.image" alt="" :onerror="defaultImg">
                    <div class="item-con">
                        <p class="hotgreens_name">{{green.menuDto.name}}</p>
                        <div class="hot_row1">
                            <img v-if="!green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                            <img v-if="green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt="">
                            <ul class="labels">
                                <li v-for="(label, index) in green.menuTagDtos" :key="index">{{label.tagName}}</li>
                            </ul>
                        </div>
                        <div class="hot_row2">
                            <p class="price_wrap">￥<span class="price">{{round((green.menuPriceDto.price / 100), 1)}}</span></p>
                        </div>
                    </div>
                </li>                  
            </ul>
        </div>
    </div>
</template>

<script>
import {hotDishes, addLike} from  '@/api'
import myMixin from '@/components/commons/myMixin.js'


export default {    
    mixins: [myMixin],
    data(){
        return  {
            hotgreens: [],
            defaultImg: 'this.src="'+ require('@/assets/images/xxhdpi/defaultImg.png') +'"'
        }
    },
    methods: {
        // 是否收藏
        async isLike(collectType, menuId, index){
            let curDel = this.hotgreens[index].menuDto.collectType
            this.hotgreens[index].menuDto.collectType = !this.hotgreens[index].menuDto.collectType
            try {
                let {result} = await addLike(Number(curDel), menuId)
                // console.log(result)
            } catch (error) {
                
            }
        },
        // 获取数据
        async getHotDishes(){
            try {
                let {result} = await hotDishes()
                // console.log(result)
                this.hotgreens = result
                
            } catch (error) {
                
            }
        }
    },
    created(){
        this.getHotDishes()
    }
}
</script>

<style lang="stylus" scoped>
    .hot_dishes
        width 100%

        .hd_header
            display flex
            align-items center
            margin-bottom .2rem
            
            .hd_logo
                width .36rem
                height .4rem
                margin-right .14rem
            
            .hd_tit
                font-size: .32rem;
                color: #333333;
                line-height .32rem
                font-family 'PingFangSC-Medium'
                font-weight bold

        .hotgreens_list_wrap
            width 100%
            overflow-y hidden

            .hotgreens_list
                display flex
                justify-content space-between
                flex-wrap wrap
                width 100%

                
                .hotgreens_item
                    width 3.2rem
                    height 4rem
                    margin-bottom .2rem
                    background: #FFFFFF;
                    border-radius: .06rem;

                    .greens_img
                        width 100%
                        height 2.4rem
                        border-radius .06rem

                    .item-con
                        padding-left .2rem
                    
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

                            .like
                                width 0.32rem
                                height 0.3rem
                                margin-right .08rem

                            .labels
                                display flex
                                flex-wrap wrap

                                li
                                    height .28rem
                                    line-height .28rem
                                    padding 0 .1rem
                                    margin-right .1rem
                                    margin-bottom .1rem
                                    font-size .2rem
                                    background #FFEDEC
                                    color #FB5046
                                    border-radius: .02rem;
                                    letter-spacing: 0.16px;
                                    white-space nowrap  
                                    box-sizing border-box
                                

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