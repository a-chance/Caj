<template>
    <div>
        <home-header></home-header>
        <div class="home-con">
            <Swiper></Swiper>
            <FlashSale></FlashSale>
            <HotDishes></HotDishes>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
// 引入局部组件
import HomeHeader from './base/HomeHeader'
import Swiper from './base/Swiper'
import FlashSale from './base/FlashSale'
import HotDishes from './base/HotDishes'
import Footer from '../commons/Footer'

export default {
    data(){
        return  {
            
        }
    },
    components: {
        HomeHeader,
        Swiper,
        FlashSale,
        HotDishes,
        Footer,
    },
}
</script>

<style lang="stylus" scoped>
    .home-con
        width 100%
        height calc(100vh - 2.48rem)
        overflow-y auto
        overflow-x hidden
        padding .266667rem .426667rem 
        background #F6F6F6
        box-sizing border-box
</style>