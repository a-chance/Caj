<template>
    <div class="fixhd">
        <div class="cart_hd">
            <img class="c_l_logo" src="@/assets/images/xxhdpi/icon-fanhui.png" alt="" @click="goback">
            <h2 class="c_title">物流信息</h2>
        </div>
    </div>


</template>

<script>
import myMixin from '../../commons/myMixin'

export default {
    mixins: [myMixin],
    data(){
        return  {
            
        }
    }
}
</script>

<style lang="stylus" scoped>

    .fixhd
        width 100%
        height 0.88rem

        .cart_hd
            position fixed
            top 0
            left 0
            display flex
            justify-content space-between
            align-items center
            width 100%
            height 0.88rem
            padding 0 .32rem
            background #ffffff
            z-index 10

            .c_title
                flex 1
                color #333333
                font-size .36rem
                font-weight 550
                text-align center
                letter-spacing: 0.29px;

            .c_l_logo
                width .23rem
                height .398rem
        
</style>