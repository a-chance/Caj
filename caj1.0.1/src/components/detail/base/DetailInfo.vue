<template>
    <div class="det_intr">
        <div class="det_info">
            <img :src="menuDto.image" alt="图片暂时没有">
            <div class="green_info">
                <div class="green_row1">
                    <div class="row1_left">
                        <p class="green_name">{{menuDto.name}}</p>
                        <ul class="labels">
                            <li v-for="(label, index) in menuTagDtos.slice(0, 3)" :key="index">
                                <p>{{label.tagName}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="row1_rig">
                        ￥{{(price / 100).toFixed(2)}}
                    </div>
                </div>
                <div class="green_row2">
                    <div class="row2_left">
                        <div class="inventory">
                            库存<span>{{menuStockDto.stock}}件</span>
                        </div>
                        <div class="sale">
                            销量{{menuDto.saleVolume}}件
                        </div>
                        <div class="kli">
                            卡路里热量：<span>{{round((menuDto.calorie / 1000), 1)}}</span>Kcal
                        </div>
                    </div>
                    <div class="row2_rig">
                        <!-- <img v-show="!menuDto.collectType" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                        <img v-show="menuDto.collectType" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt=""> -->

                        <img v-if="!menuDto.collectType" @click.stop="isLike(menuDto.collectType, menuDto.id)" class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                        <img v-if="menuDto.collectType" @click.stop="isLike(menuDto.collectType, menuDto.id)" class="like" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {addLike} from  '@/api'
import myMinxin from '@/components/commons/myMixin.js'

export default {    
    mixins: [myMinxin],  
    props: ['menuDto', 'menuTagDtos', 'menuPriceDto', 'menuStockDto'],
    data(){
        return  {
            price: ''
        }
    },
    beforeUpdate(){
        let curTime = Date.now()
        let startTime = new Date(this.menuPriceDto.startTime)
        let endTime = new Date(this.menuPriceDto.endTime)

        if( curTime > startTime.getTime() && curTime < endTime.getTime()){
            this.price = this.menuPriceDto.preferentialPrice
        }else{
            this.price = this.menuPriceDto.price
        }
    },
    methods: {
        // 是否收藏
        async isLike(collectType, menuId){
            let curDel = this.menuDto.collectType
            this.menuDto.collectType = !this.menuDto.collectType
            try {
                let {result} = await addLike(Number(curDel), menuId)
            } catch (error) {
                
            }
        },
    },
    
}
</script>

<style lang="stylus" scoped>
    .det_intr
        width 100%
        background #F6F6F6
        margin-top .266667rem

        .det_info
            width 100%
            background #ffffff

            img 
                width 100%
                height 4.426667rem
        
            .green_info
                padding .266667rem .426667rem .186667rem
                box-sizing border-box

            .green_row1
                display flex 
                height .666667rem

                .row1_left
                    flex 1
                    display flex

                    .green_name
                        height .666667rem
                        margin-right .533333rem
                        color #333
                        font-size .48rem
                        font-weight bold
                        line-height .666667rem
                        white-space nowrap

                    .labels
                        display flex
                        align-items center
                        flex-wrap wrap

                        li
                            height .48rem
                            margin-right .266667rem
                            padding 0 .186667rem
                            border-radius .026667rem
                            line-height .48rem
                            font-size: .266667rem
                            line-height 0.48rem
                            background: #ffedec;
                            color: #fb5046;
                            white-space nowrap 

                        li:last-of-type
                            margin-right 0

                .row1_rig
                    height .666667rem
                    font-size: .48rem
                    color: #FF6671;
                    letter-spacing: .007733rem
                    line-height .666667rem

            
            .green_row2
                display flex
                align-items center
                height .469333rem
                margin-top .266667rem
                font-size .32rem
                letter-spacing .005067rem

                .row2_left
                    flex 1
                    display flex
                    align-items center
                    height .453333rem
                    color #666
                    line-height .469333rem

                    .sale
                        margin 0 .533333rem 0 .56rem

                .row2_rig
                    width .501333rem
                    height .469333rem

                    img 
                        width 100%
                        height 100%

</style>