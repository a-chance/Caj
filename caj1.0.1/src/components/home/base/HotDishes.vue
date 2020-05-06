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
            margin-top .4rem
            margin-bottom .266667rem
            
            .hd_logo
                width .48rem
                height .533333rem
                margin-right .186667rem
            
            .hd_tit
                font-size: .426667rem
                color: #333333;
                line-height .533333rem
                font-family 'Microsoft YaHei'
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
                    width 4.266667rem
                    margin-bottom .266667rem
                    padding-bottom .16rem
                    background: #FFFFFF;
                    border-radius: .106667rem

                    .greens_img
                        width 100%
                        height 3.2rem
                        border-radius 0.10667rem

                    .item-con
                        padding-left .266667rem
                    
                        .hotgreens_name
                            width 100%
                            height .533333rem
                            margin .266667rem 0 .133333rem
                            font-size: .4rem
                            font-family: 'Microsoft YaHei';
                            // font-weight 550
                            color: #333333;
                            letter-spacing: .005867rem
                            line-height .533333rem

                        .hot_row1
                            display flex
                            height .533333rem
                            align-items center

                            .like
                                width .4rem
                                height .376rem
                                margin-right .24rem

                            .labels
                                display flex
                                flex-wrap wrap

                                li
                                    height .373333rem
                                    line-height .373333rem
                                    padding 0 .133333rem 0 .16rem
                                    margin-right .133333rem
                                    // margin-bottom .133333rem
                                    font-size .266667rem
                                    background #FFEDEC
                                    color #FB5046
                                    border-radius: .026667rem
                                    letter-spacing: .004267rem
                                    white-space nowrap  
                                    box-sizing border-box
                                
                                li:last-of-type 
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
                                letter-spacing: .005867rem;
                                line-height .533333rem
                            
                            .residue_wrap
                                font-size: .293333rem
                                color: #999999;
                                letter-spacing: .0048rem
        
                .hotgreens_item:last-child,.hotgreens_item:nth-last-child(2)
                    margin-bottom 0
                    

</style>