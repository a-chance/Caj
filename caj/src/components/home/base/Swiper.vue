<template>
    <div class="banner">
        <swiper :options="swiperOption" ref="mySwiper" v-if="isShow"><!--  为了简化操作，定义一个计算属性isShow -->
            <!-- slides 图片 -->
            <swiper-slide v-for="swiperImg in swiperList" :key="swiperImg.id">
                <img @click="gotoDetail(swiperImg.id)" class="swiper-img" :src="swiperImg.image" alt="轮播图暂时没图片">
            </swiper-slide>
            <!-- Optional controls 分页器 -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
// 引入数据接口
import { getSwiper } from '@/api'
import myMinxin from '@/components/commons/myMixin.js'

export default {
    mixins: [myMinxin],
    data(){
        return  {
            swiperList: [],
            swiperOption: {
                pagination: { 
                    el: '.swiper-pagination',
                    clickable: true 
                },   
                loop: true,  
                autoplay: {
                    delay: 2000, 
                },
            },
        }
    },
    computed: {
        isShow(){
            return this.swiperList.length > 0
        }
    },
    methods: {
        async getSwiperData(){
            try {
                let {result} = await getSwiper();
                // console.log(result)
                this.swiperList = result
            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        this.getSwiperData()
    }
}
</script>

<style lang="stylus" scoped>
    .banner
        width 100%
        height 2.8rem

    .banner >>> .swiper-container
        height 100%

        .swiper-img
            width 100%
            height 100%

    .banner >>> .swiper-pagination
        bottom 2.5%

        .swiper-pagination-bullet
            width .16rem
            height .16rem
            background: #616161;
            border none 
            outline none 
        
        .swiper-pagination-bullet-active
            background: #FFFFFF;
</style>