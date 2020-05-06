<template>
    <div class="sort_hd">
        <img src="@/assets/images/xxhdpi/icon-sousuo.png" alt="">
        <input type="text" placeholder="搜索菜品" @click="goSearch">
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
    .sort_hd
        position fixed
        top 0
        left 0
        z-index 10
        display flex
        justify-content center
        align-items center
        width 100%
        height .88rem
        padding 0 .32rem
        background #ffffff
        box-sizing border-box

        img 
            position absolute
            left .58rem
            width .24rem
            height 0.24rem

        input 
            width 100%
            height .68rem
            padding-left .56rem
            border-radius .36rem
            background: #F5F5F5;
            font-size: .24rem;
            color: #1C2833;



</style>