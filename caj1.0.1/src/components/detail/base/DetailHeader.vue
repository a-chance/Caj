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
        height 1.173333rem
        background: #FFFFFF;
        box-shadow: 0 0 0 0 #EEEEEE

        .back
            width .32rem
            height .533333rem
            margin-left .426667rem

        .share
            width .506667rem
            height .506667rem
            margin-right .453333rem
    
</style>