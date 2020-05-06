<template>
    <div class="cart_con">
        <div class="default_wrap" v-if="cartList.length === 0 ? true : false">
            <img class="default_img" src="@/assets/images/xxhdpi/nothing.png" alt="">
            <p style="font-size: 14px; color: #666; text-align: center">您还没有商品哦~</p>
        </div>
        <ul v-if="cartList.length !== 0 ? true : false" class="cart_list">
            <li class="cart_item" v-for="(cartItem, index) in cartList" :key="index">
                <img @click="change(index)" class="sele" v-show="!cartItem.isOk" src="@/assets/images/xxhdpi/icon-xuanzhong1.png" alt="1">
                <img @click="change(index)" class="sele" v-show="cartItem.isOk" src="@/assets/images/xxhdpi/icon-xuanzhong.png" alt="2">
                
                <img @click="gotoDetail(cartItem.menuDetailDto.menuDto.id)" class="greens_img" :src="cartItem.menuDetailDto.menuDto.image" alt="">
                <div class="c_i_con">
                    <p class="green_name">{{cartItem.menuDetailDto.menuDto.name}}</p>
                    <ul class="labels">
                        <li v-for="(label, index1) in cartItem.menuDetailDto.menuTagDtos.slice(0, 2)" :key="index1">{{label.tagName}}</li>
                    </ul>
                    <div class="c_i_wrap">
                        <div class="price">￥{{round((cartItem.menuDetailDto.menuPriceDto.price / 100), 1)}}</div>
                        <div class="counter">
                            <p @click="reduceCount(cartItem.number, index)" class="mul btn">-</p>
                            <!-- <p @keydown="updata_num(cartItem.number, index, $el)" ref="count" contenteditable="true" class="count">{{cartItem.number}}</p> -->
                            <p ref="count" contenteditable="true" class="count" @blur="reset_num(index, $event)" @keydown="edit_num(index, $event)">{{cartItem.number}}</p>
                            <p @click="addCount(cartItem.number, index)" class="add btn">+</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="cart_sum">
            <img @click="changeAllSelect" class="sele all_selected" v-show="!isAllSelected" src="@/assets/images/xxhdpi/icon-xuanzhong1.png" alt="">
            <img @click="changeAllSelect"  class="sele all_selected" v-show="isAllSelected" src="@/assets/images/xxhdpi/icon-xuanzhong.png" alt="">
            <p class="selected">
                已选(<span>{{count}}</span>)
            </p>
            <div class="sum_rig">
                <p class="sub_price">合计:
                    <span>￥{{round(total, 1)}}</span>
                </p>
                <yd-button class="sum_btn" @click.native="settlement" size="large" type="danger" :style="total ? {background: '#ff6671'} : {background: '#939393'}">结算</yd-button>
            </div>
        </div>
    </div>
</template>

<script>
import {getCart, sendUpdateCount, settleAccounts} from '@/api'
import myMixin from '@/components/commons/myMixin.js'

export default {
    mixins: [myMixin],
    data(){
        return  {
            cartList: [],
            isAllSelected: false,
            count: 0,
        }
    },
    created(){
        this.getCartData()
    },
    computed: {
        total(){
            let sum = 0
            this.cartList.forEach(item => {
                if(item.isOk){
                    sum += item.number * this.round(item.menuDetailDto.menuPriceDto.price / 100, 1)
                }
            })
            return sum
        }
    },
    beforeDestroy(){
        // 循环遍历没有结算的
        this.cartList.forEach(item => {
            if(!item.isOk){
                // console.log(item)
            }
        })
    },
    methods: {
        // 结算
        async settlement(){
            let menuIdNumbers = []
            if(this.count){
                this.cartList.forEach(item => {
                    if(item.isOk == true){
                        menuIdNumbers.push({
                            "menuId": item.menuId,
                            "number": item.number
                        })
                    }
                })
                this.$router.push({path: '/order', query: {hash: 'payment'}})
            }else{
                this.$dialog.toast({
                    mes: '请选择要购买的商品！',
                    timeout: 900
                });
            }
            let {success} = await settleAccounts(menuIdNumbers)
        },
        // 单选控制全选
        change(index){
            // this.$set(this.cartList[index], 'isOk', !this.cartList[index].isOk)
            this.cartList[index].isOk = !this.cartList[index].isOk          
            let count = 0
            this.cartList.forEach(item => {
                if(item.isOk === true){
                    if(++count === this.cartList.length){
                        this.isAllSelected = true
                    }else{
                        this.isAllSelected = false
                    }
                }else{
                    this.isAllSelected = false
                }
            })
            this.count = count
        },
        // 全选控制单选
        changeAllSelect(){
            this.isAllSelected = !this.isAllSelected
            this.cartList.forEach(item => item.isOk = this.isAllSelected)
            this.count = this.isAllSelected ? this.cartList.length : 0
        },
        // 添加数量
        addCount(count, index){
            if(count >= this.cartList[index].menuDetailDto.menuStockDto.stock){
                // alert('库存不足！')
            }else{
                this.cartList[index].number = ++count
            }
        },
        // 减少数量
        reduceCount(count, index){
            if(count == 1){
                // alert('购物车中最少为1')
            }else{
                this.cartList[index].number = --count
            }
        },
        // 更新数量 限制只能输入数字
        edit_num(index, event){
            event = event || window.event;
            console.log(event.keyCode)
            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 110) || (event.keyCode == 190))){
                this.cancelEvent(event);
            }            
        },
        //跨浏览器的阻止事件进行
        cancelEvent(event)        {
            if (event.preventDefault) {
                event.preventDefault();//阻止默认的行为发生
            }
            else {
                event.returnValue = false;
            }
        },
        // 重置数量
        reset_num(index, event){
            if(event.target.innerHTML){
                this.cartList[index].number = event.target.innerHTML
            }else{
                event.target.innerHTML = 1
                this.cartList[index].number = event.target.innerHTML
            }
        },
        // 获取购物车数据
        async getCartData(){
            let {result} = await getCart();
            // console.log(result)
            result.forEach((item, index) => {
                this.$set(item, 'isOk', false)
            })            
            this.cartList = result
        }
    }
}
</script>

<style lang="stylus" scoped>
    .cart_con
        position relative
        width 100%
        height calc(100vh - 4.08rem)
        padding 0 .426667rem 
        margin-top .266667rem
        background #F6F6F6
        box-sizing border-box

        .default_wrap
            position absolute
            top 40%
            left 50%
            transform translate(-50%, -50%)

            .default_img
                width 7.946667rem
                height 4.506667rem

        .cart_list
            overflow-y auto
            width 100%
            height 100%

            .cart_item
                position relative
                display flex
                width 100%;
                height 2.986667rem
                margin-bottom .266667rem
                padding 10px .266667rem 0
                background #ffffff
                border-radius .08rem
                box-sizing border-box

                .sele
                    position absolute
                    top 50%
                    left .266667rem
                    transform translateY(-50%)
                    width .533333rem
                    height .533333rem
                    border-radius 50%
                    box-sizing border-box

                .active
                    background #FF6671
                    color #ffffff
                    font-weight 550
                    border-color #FF6671

                .greens_img
                    width 2.133333rem
                    height 2.133333rem
                    margin 0 .266667rem 0 .8rem

                .c_i_con
                    flex 1

                    .green_name
                        height .56rem
                        color: #333333;
                        font-size: .4rem
                        letter-spacing: .0064rem
                        font-weight 550
                        line-height .56rem
                    .labels
                        display flex
                        height .48rem
                        margin .266667rem 0

                        li
                            padding 0 .133333rem
                            line-height .533333rem
                            color #FB5046
                            background #FFEDEC
                            margin-right .266667rem
                    
                    .c_i_wrap
                        display flex
                        justify-content space-between

                        .price
                            height .586667rem
                            line-height .586667rem
                            font-size: .426667rem
                            color: #FF6671;
                            letter-spacing: .006933rem

                        .counter
                            display flex
                            width 2.986667rem
                            height .853333rem
                            margin-right .293333rem

                            .btn
                                width .96rem
                                height .853333rem
                                border .026667rem solid #ECECEC
                                line-height .8rem
                                text-align center
                                font-size: .48rem
                                color: #999999;
                                letter-spacing: .007733rem
                                box-sizing border-box                                

                            .mul, .add
                                border-radius .08rem 0 0 .08rem                            

                            .count
                                width 1.333333rem
                                height .853333rem
                                border-top .026667rem solid #ECECEC
                                border-bottom .026667rem solid #ECECEC
                                font-size: .48rem
                                color: #666666;
                                letter-spacing: .007733rem
                                line-height .8rem
                                text-align center
                                box-sizing border-box
                                outline none 

        .cart_sum   
            position relative
            display flex
            align-items center
            position fixed
            left 0
            bottom 1.306667rem
            width 100%
            height 1.333333rem
            padding 0 .426667rem
            background #fff
            box-shadow: 0 .053333rem .213333rem 0 rgba(80,80,80,0.18);
            box-sizing border-box

            .sele
                position absolute
                top 50%
                left .426667rem
                transform translateY(-50%)
                width .533333rem
                height .533333rem
                border-radius 50%
                box-sizing border-box
                text-align center

            .selected
                height .533333rem
                font-size: .373333rem
                color: #666666;
                letter-spacing: .005867rem
                line-height .533333rem
                margin-left .8rem
                margin-right .266667rem

            .sum_rig
                flex 1
                display flex
                justify-content space-between
                align-items center

                .sub_price
                    font-size: .373333rem
                    color: #333333;
                    letter-spacing: .005867rem
                    line-height: .533333rem

                    span
                        font-size: .373333rem
                        color: #FF6671;
                        letter-spacing: .005867rem
                        line-height .533333rem

                .sum_btn
                    width 2.666667rem
                    height 1.173333rem
                    margin-top 0
                    line-height 1.173333rem
                    text-align center
                    color #ffffff
                    font-size .373333rem
                    letter-spacing: .005867rem
                    background #FF6671
                    border-radius .08rem
        
</style>