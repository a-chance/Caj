<template>
    <div class="update_info_wrap">
        <!-- 头部 -->
        <div class="fixhd">
            <div class="cart_hd">
                <img class="c_l_logo" src="@/assets/images/xxhdpi/icon-fanhui.png" alt="" @click="goback">
                <h2 class="c_title">个人信息修改</h2>
            </div>
        </div>
        <!-- 主体 -->
        <div class="update_info_con">
            <ul class="update_list">
                <li class="update_item">
                    <p class="equipment ">设备绑定：</p>
                    <input class="inp" type="text" v-model="equipment" placeholder="暂无资料" v-focus>
                    <!-- <span class="tips">* 设备信息不能为空</span> -->
                </li>
                <li class="update_item">
                    <p class="equipment ">家庭地址：</p>
                    <input class="inp" type="text" v-model="address" placeholder="暂无资料" v-focus>                    
                    <!-- <span class="tips">* 家庭地址不能为空</span> -->
                </li>
                <li class="update_item">
                    <p class="equipment ">身高：</p>
                    <input class="inp" type="text" v-model="height" placeholder="暂无资料" v-focus>                   
                    <!-- <span class="tips">* 身高不能为空</span> -->
                </li>
                <li class="update_item">
                    <p class="equipment ">体重：</p>
                    <input class="inp" type="text" v-model="weight" placeholder="暂无资料" v-focus>                   
                    <!-- <span class="tips">* 体重不能为空</span> -->
                </li>
                <li class="update_item">
                    <p class="equipment ">职业：</p>
                    <input class="inp" type="text" v-model="job" placeholder="暂无资料" v-focus>                   
                    <!-- <span class="tips">* 职业不能为空</span> -->
                </li>
            </ul>
            <div class="btn_wrap">
                <button @click="goback" class="btn reset_btn">取消</button>
                <button @click="updateInfo" class="btn confirm_btn" style="background: #4CA6FF; border: none; color: #fff">修改</button>
            </div>
        </div>
    </div>
</template>

<script>
import MineHeader from './base/MineHeader'
import myMixin from '../commons/myMixin'

import {sendInfo} from '@/api'
import Axios from 'axios'
export default {
    mixins: [myMixin],
    data(){
        return  {
            equipment: this.$route.query.equipment,
            address: this.$route.query.address,
            height: this.$route.query.height,
            weight: this.$route.query.weight,
            job: this.$route.query.job

        }
    },
    created(){
        console.log(this.$route)
    },
    methods: {
        async updateInfo(){
            let result = await sendInfo(this.equipment, this.address, this.height, this.weight, this.job)
            this.$router.push('/mine')
        }
    },
    directives: {
        focus(e){
            e.onfocus =  () => {
                e.style.borderColor = '#4CA6FF'
            }
            e.onblur = () => {
                e.style.borderColor = '#E5E8EF'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.update_info_wrap
    width 100%
    background #F4F4F4

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

    .update_info_con
        margin-top .2rem
        background #ffffff
        padding .2rem .32rem
        box-sizing border-box

        .update_list
            width 100%

            .update_item
                width 100%
                margin-bottom .2rem

                .equipment
                    height .44rem
                    line-height .44rem
                    font-size .32rem
                    color #4A4A4A

                .inp
                    width 100%
                    height .7rem
                    margin-top .1rem
                    padding 0 .3rem
                    border 0.02rem solid #E5E8EF
                    // border 0.02rem solid #409eff 
                    // color #333
                    border-radius .08rem
                    box-sizing border-box
                    caret-color #4CA6FF

                .inp::-webkit-input-placeholder
                    color #A1A6BB
                    font-size .28rem
                    line-height .44rem

                .tips
                    color #f00
                    line-height .6rem

        .btn_wrap
            display flex
            align-items center
            width 4.6rem
            height 1rem
            margin 0 auto
            margin-top 1.4rem

            .btn
                width 2rem
                height 0.8rem
                font-size: 14px;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                color: #4A4A4A;
                background #ffffff
                box-sizing border-box
            
            .btn:first-of-type
                margin-right 30px



                

</style>