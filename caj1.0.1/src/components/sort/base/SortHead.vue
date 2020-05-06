<template>
    <div class="sort_hd_wrap">
        <div class="sort_hd">
            <img src="@/assets/images/xxhdpi/icon-sousuo.png" alt="">
            <input class="s_h_search" type="text" placeholder="搜索菜品" @click="goSearch">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return  {
            
        }
    },
    methods: {
        goSearch(){
            this.$router.push('/search')
        }
    }
}
</script>

<style lang="stylus" scoped>
.sort_hd_wrap
    width 100%
    height 1.173333rem
    
    .sort_hd
        position fixed
        top 0
        left 0
        z-index 10
        display flex
        justify-content center
        align-items center
        width 100%
        height 1.173333rem
        padding 0 .426667rem
        background #ffffff
        box-sizing border-box

        img 
            position absolute
            left .773333rem
            top 50%
            transform translateY(-45%)
            width .293333rem
            height .32rem

        .s_h_search 
            width 100%
            height .906667rem
            padding-left .746667rem
            border-radius .48rem
            background: #F5F5F5;
            font-size: .32rem
            color: #1C2833;
            font-family 'Microsoft YaHei'

            .s_h_search::-webkit-input-placeholder
                color: #1C2833;



</style>