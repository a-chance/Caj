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
        height .88rem
        padding 0 .32rem
        background: #FFFFFF;
        box-shadow: 0 0 0 0 #EEEEEE;
        box-sizing border-box
    
        .scan
            width .34rem
            height .32rem
            margin-left .32rem

            img 
                width 100%
                height 100%

        .search-bar
            flex 1
            position relative
            width 5.02rem
            height .68rem
            margin 0 .58rem
            opacity: 0.8;
            background: #F5F5F5;
            border-radius: .36rem;
            overflow hidden

            .search-icon
                position absolute
                width .22rem 
                height .24rem
                top 50%
                left .26rem
                transform translateY(-50%)

            input 
                padding-left .56rem
                width 100%
                height 100%
                opacity: 0.5;
                // font-family: PingFangSC-Regular;
                font-size: .24rem;
                color: #1C2833;
                
        .bell
            width .34rem
            height .36rem

            img 
                width 100%
                height 100%
        
</style>