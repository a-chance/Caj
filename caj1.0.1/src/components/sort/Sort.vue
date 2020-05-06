<template>
    <div class="sort">
        <sort-header></sort-header>
        <div class="foot">
            <div class="s_left_box">
                <ul class="s_left">
                    <li 
                        :class="{active: index === curId}" 
                        v-for="(titItem, index) in titList"                 
                        :key="index"
                        @click="changeMenu(index, titItem.code)"
                    >
                        {{titItem.name}}
                    </li>
                </ul>
            </div>
            
            <!-- <div class="wrap"> -->
                <ul class="s_rig">
                    <li @click="gotoDetail(green.menuDto.id, green.menuPriceDto.price)" class="r_item" v-for="(green, index) in greens" :key="index">
                        <img :src="green.menuDto.image" :onerror="defaultImg">
                        <h4>{{green.menuDto.name}}</h4>
                        <div class="like_wrap">
                            <img v-if="!green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                            <img v-if="green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt="">
                            <ul class="labels">
                                <li v-for="(label, index) in green.menuTagDtos.slice(0, 3)" :key="index">{{label.tagName}}</li>
                            </ul>
                        </div>
                        <div class="price">
                            ￥<span>{{round((green.menuPriceDto.price / 100), 1)}}</span>
                        </div>
                    </li>
                </ul>
            <!-- </div> -->
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import axios from 'axios'
import { firstSort, getSort, addLike } from '@/api'
import myMixin from '@/components/commons/myMixin.js'
 
import SortHeader from './base/SortHead'
import Footer from '../commons/Footer'

export default {
    mixins: [myMixin],
    data(){
        return  {
            defaultImg: 'this.src="'+ require('@/assets/images/xxhdpi/defaultImg.png') +'"',
            curId: 0,
            curCode: '7ee18c4b-fccf-4bf2-9',
            titList: [],
            greens: []
        }
    },
    methods: {
        // 第一次请求数据
        async getFirstSortData(){
            try {
                let { result: {dictionaryDtos, menuDetailDtos} } = await firstSort();
                // console.log(menuDetailDtos)
                this.titList = dictionaryDtos
                this.greens = menuDetailDtos

            } catch (error) {
                
            }
        },

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

        // 切换菜谱
        async changeMenu(index, code){
            // 对应的菜系高亮显示
            this.curId = index

            try {
                let { result } = await getSort(code)
                // console.log(result)
                this.greens = result
            } catch (error) {
                console.log('分类页数据获取失败！')
            }
        },

    },
    created(){
        this.getFirstSortData()
    },
    components: {
        SortHeader,
        Footer
    }
}
</script>

<style lang="stylus" scoped>
    .sort
        width 100%
        background #F6F6F6

        .foot        
            position relative
            display flex
            width 100%
            display flex
            margin-top .266667rem
            background  #F6F6F6
            height calc(100vh - 2.746667rem)
            overflow hidden

        .s_left_box
            width 2.133333rem
            height 100%
            background #F6F6F6

            .s_left
                position fixed
                top 1.44rem
                left 0
                width 2.133333rem
                height calc(100vh - 2.613333rem)
                

                li
                    position relative
                    width 100%
                    height 1.333333rem
                    line-height 1.333333rem
                    font-size: .4rem
                    color: #666666;
                    text-align center

                .active
                    background #fff
                    color #FF6671

                .active::after
                    position absolute
                    content ''
                    width .106667rem
                    height 100%
                    top 0
                    left 0
                    background #FF6671

        .s_rig
            height calc(100vh - 2.746667rem)
            overflow-x hidden
            overflow-y auto
            flex 1
            display flex
            flex-wrap wrap
            justify-content space-between
            align-content flex-start
            padding .266667rem .426667rem 0 .506667rem
            background #ffffff
            box-sizing border-box

            .r_item
                width 3.253333rem
                // height 3.2rem
                height auto
                margin-bottom .266667rem
                overflow hidden

                img 
                    width 100%
                    height 2.4rem
                    border-radius .106667rem
                
                h4
                    height .533333rem
                    margin .133333rem 0
                    color #333
                    font-size .373333rem
                    font-family 'Microsoft YaHei'
                    line-height .533333rem

                .like_wrap
                    display flex
                    align-items center
                    width 100%
                    // height .282rem

                    img 
                        width .4rem
                        height 100%
                        margin-right .133333rem
                    
                    .labels
                        display flex
                        flex-wrap wrap
                        // align-items center

                        li
                            height .373333rem
                            line-height .373333rem
                            padding 0 .16rem
                            margin-right .213333rem
                            // margin-bottom .133333rem
                            color #FB5046
                            background: #FFEDEC
                            border-radius .026667rem
                            font-size .266667rem
                            white-space nowrap
                        
                        li:nth-child(3n + 3)
                            margin-right 0

                .price
                    height .533333rem
                    margin-top .133333rem
                    font-size: .373333rem
                    line-height .533333rem
                    color: #FF6671;
                    letter-spacing: .005867rem
                    

</style>