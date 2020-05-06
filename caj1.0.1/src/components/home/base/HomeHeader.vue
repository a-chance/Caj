<template>
    <div class="home-header">
        <div class="scan">
            <img src="@/assets/images/xxhdpi/icon-saoma.png" alt="">
        </div>
        <div class="search-bar">
            <img class="search-icon" src="@/assets/images/xxhdpi/icon-sousuo.png" alt="">
            <input @click="goSearch" type="text" placeholder="搜索菜品">
        </div>
        <div class="bell">
            <img src="@/assets/images/xxhdpi/icon-xiaoxi.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goSearch(){
            this.$router.push('/search')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .home-header
        display flex
        align-items  center
        width 100%
        height 1.173333rem
        padding 0 .426667rem
        background: #FFFFFF;
        box-shadow: 0 0 0 0 #EEEEEE;
        box-sizing border-box
    
        .scan
            width .453333rem
            height .426667rem
            // margin-left .32rem

            img 
                width 100%
                height 100%

        .search-bar
            flex 1
            position relative
            height .906667rem
            margin 0 .773333rem
            opacity: 0.8;
            background: #F5F5F5;
            border-radius: .48rem
            overflow hidden

            .search-icon
                position absolute
                width .293333rem
                height .32rem
                top 50%
                left .346667rem
                transform translateY(-45%)

            input 
                padding-left .746667rem
                width 100%
                height 100%
                opacity: 0.5;
                color: #1C2833;
                font-size .32rem
                font-family 'Misrosoft YaHei'
                
        .bell
            width .453333rem
            height .48rem

            img 
                width 100%
                height 100%
        
</style>