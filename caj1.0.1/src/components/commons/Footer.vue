<template>
    <div class="footer">
        <ul class="footer-list">
            <li class="footer-item" @click="goto(index)" v-for="(item, index) in menus" :key="index">
                <div class="item_img">
                    <img v-show="item.path !== curPath" :src="item.img1" alt="">
                    <img v-show="item.path == curPath" :src="item.img2" alt="">
                </div>
                <p :class="{footer_tit: true, active: item.path === curPath}">{{item.text}}</p>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">
export default {
    data(){
        return  {
            curPath: this.$route.path,
            menus: [        
                    {
                        name: "Home",
                        path: "/home",
                        text: "首页",
                        img1: require('@/assets/images/xxhdpi/icon-shouye1.png'),
                        img2: require('@/assets/images/xxhdpi/icon-shouye.png'),
                    },
                    {
                        name: "Sort",
                        path: "/sort",
                        text: "分类",
                        img1: require('@/assets/images/xxhdpi/icon-fenlei1.png'),
                        img2: require('@/assets/images/xxhdpi/icon-fenlei.png'),
                    },
                    {
                        name: "Cuisine",
                        path: "/cuisine",
                        text: "烹饪",
                        img1: require('@/assets/images/xxhdpi/icon-pengren1.png'),
                        img2: require('@/assets/images/xxhdpi/icon-pengren.png'),
                    },
                    {
                        name: "Cart",
                        path: "/cart",
                        text: "购物车",
                        img1: require('@/assets/images/xxhdpi/icon-gouwuche1.png'),
                        img2: require('@/assets/images/xxhdpi/icon-gouwuche.png'),
                    },
                    {
                        name: "Mine",
                        path: "/mine",
                        text: "我的",
                        img1: require('@/assets/images/xxhdpi/icon-gerenzhongxin1.png'),
                        img2: require('@/assets/images/xxhdpi/icon-gerenzhongxin.png'),
                    }
            ],
        }
    },
    beforeRouteUpdate (to,from,next){
        console.log('be',to,from)
        next()
    },
    methods: {
        goto(index){
            this.$router.push(this.menus[index].path)
            // this.curPath = this.$route.path
        }
    }
}
</script>

<style lang="stylus" scoped>
    .footer
        position : fixed
        left : 0
        bottom : 0
        width : 100%
        height 1.306667rem
        max-width 27.306667rem
        background : #ffffff
        z-index 20
        box-shadow: 0 .053333rem .213333rem 0 rgba(80,80,80,0.18);

        .footer-list
            display flex
            justify-content space-around
            align-content space-around

            .footer-item
                display flex
                flex-direction column
                justify-content space-around
                color: #B0B0B0;

                .item_img
                    width .586667rem
                    height .586667rem
                    margin .186667rem auto .133333rem

                    img
                        width 100%
                        height 100%

                .footer_tit                    
                    font-size: .293333rem
                    letter-spacing: .0048rem;
                    line-height: .346667rem
                    text-align center

                .active
                    color: #FF6671;
                


</style>