<template>
    <div class="det_foot">
        <ul class="f_list">
            <li class="icon">
                <img src="@/assets/images/xxhdpi/icon-kefu.png" alt="">
                <span>客服</span>
            </li>
            <li class="icon"  style="margin-right: .4rem" @click="gotoCart">
                <img src="@/assets/images/xxhdpi/icon-gouwuche1.png" alt="">
                <span class="count" @click="getCartCount">{{count}}</span>
                <span>购物车</span>
            </li>
            <!-- <li class="det_btn buy_btn" @click="handleOncePurchase">立即购买</li> -->
            <yd-button class="det_btn buy_btn" @click.native="handleOncePurchase" size="large" type="danger">立即购买</yd-button>
                
            <!-- <li class="det_btn add_btn" @click="handleAddCart">加入购物车</li> -->
            <yd-button class="det_btn add_btn" @click.native="handleAddCart" size="large" type="danger">加入购物车</yd-button>
        </ul>
    </div>
</template>

<script>
import { lookCount, addCart, oncePurchase } from '@/api'
export default {
    props: ['menuDto'],
    data(){
        return  {
            count: 0,
            timer1: null,
            timer2: null,
        }
    },
    created(){
        this.getCartCount()     
    },
    destroyed(){
        clearTimeout(this.timer1)
        this.timer1 = null
        clearTimeout(this.timer2)
        this.timer2 = null
    },
    methods: {
        // 页面刚渲染就要显示购物车中的数量
        // 请求一次数据库
        async getCartCount(){
            let {result} = await lookCount()
            // console.log('购物车中产品的数量：', result)
            this.count = result <= 99 ? result : '99'
        },

        // 点击购物车图标跳转到购物车
        gotoCart(){
            this.$router.push('/cart')
        },

        // 加入购物车弹窗
        handleAddCart() {
            this.$dialog.toast({
                mes: '加入购物车成功！',
                timeout: 900
            });
            // 添加购物车
            addCart(this.menuDto.id).then(result => {
                if(result.success){
                    this.timer1 = setTimeout(() => {
                        this.$router.push('/cart')
                    }, 50)
                    // this.getCartCount()  
                }
            })
        },
        // 立即购买
        handleOncePurchase(){
            this.$dialog.toast({
                mes: '前往付款',
                timeout: 900
            });
            oncePurchase(this.menuDto.id).then(result => {
                if(result.success){
                    this.$router.push({path: '/order', query: {hash: 'payment'}})
                }
            })
        }
    },
}
</script>

<style lang="stylus" scoped>

    .det_foot
        position fixed
        left 0
        bottom 0
        width 100%
        height 1.2rem
        padding 0 .32rem
        z-index 100
        background: #FFFFFF;
        box-shadow: 0 .04rem .16rem 0 rgba(80,80,80,0.18);
        box-sizing border-box

        .f_list
            display flex
            justify-content space-between
            align-items center
            width 100%
            height 100%

            .icon
                display flex
                position relative
                flex-direction column

                .count
                    position absolute
                    width 0.4rem
                    height 0.4rem
                    top 0
                    right -0.05rem
                    transform translate(50%, -50%)
                    background #FF6671
                    color #ffffff
                    font-size .22rem
                    line-height .4rem
                    text-align center
                    border-radius 40px

                img 
                    width 0.6rem
                    height 0.5rem
                    margin 0 auto .04rem
                span 
                    display block
                    width 100%
                    font-size: .2rem;
                    color: #B0B0B0;
                    line-height: .26rem;
                    text-align center

            .det_btn
                width 2.36rem
                height 0.88rem
                line-height .88rem
                text-align center
                border-radius .06rem
                color #ffffff
                font-size .28rem

            .buy_btn
                background #FF6671

            .add_btn
                background #4CA6FF

            .yd-btn-block
                margin-top 0

        

</style>