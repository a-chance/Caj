<template>
    <div class="det_hd"> 
        <img class="back" @click="goback" src='@/assets/images/xxhdpi/icon-fanhui.png' alt="">
        <img class="share" src='@/assets/images/xxhdpi/icon-fenxiang.png' alt="">
    </div>
</template>

<script>
// 导入myMixin
import myMixin from '@/components/commons/myMixin.js'

export default {
    mixins: [myMixin],
    
}
</script>

<style lang="stylus" scoped>
    .det_hd
        display flex
        justify-content space-between
        align-items center
        width 100%
        height .88rem
        background: #FFFFFF;
        box-shadow: 0 0 0 0 #EEEEEE

        .back
            width .24rem
            height 0.4rem
            margin-left .32rem

        .share
            width .38rem
            height 0.38rem
            margin-right .34rem
    
</style>