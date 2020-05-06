<template>
    <div class="myinfo">
        <div class="info_box">
            <div class="info_top">
                <img src="@/assets/images/greens/kb1.jpg" alt="">
                <div class="i_t_rig">
                    <div class="update_info">
                        <p class="myname">{{nickName}}</p>
                        <img @click="updateInfo" class="edit_info" src="@/assets/images/xxhdpi/icons/edit.png" alt="">
                    </div>
                    <div class="home_adr">
                        <p>设备绑定：<span contenteditable="true">{{machineMac}}</span></p>
                        <p>家庭住址：<span contenteditable="true">{{address}}</span></p>
                    </div>
                </div>
            </div>
            <div class="info_bot">
                <div class="i_b_row">
                    <p> 
                        健康指数:
                        <span style="padding: 0 8px;color: #fff;" :style="styObj">{{quota}}</span>
                    </p>
                    <p> 
                        每日推荐摄入量:
                        <span>{{quota}}</span>
                    </p>
                    <p>                         
                        <span>{{calorie}}</span>KCAL
                    </p>
                    <p> 
                        BMI:
                        <span>{{bmi}}</span>KG/M
                    </p>
                </div>
                <div class="i_b_row">
                    <p> 
                        身高:
                        <span>{{height}}</span>CM
                    </p>
                    <p> 
                        体重:
                        <span>{{weight}}</span>KG
                    </p>
                    <p> 
                        职业:
                        <span>{{profession}}</span>
                    </p>
                    <p> 
                        综合指标:
                        <span>{{quota}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {myInfo} from '@/api'

export default {
    data(){
        return  {
            "nickName": "",
            "machineMac": "",
            "address": "",
            "quota": '',
            "calorie": '',
            "bmi": '',
            "height": '',
            "weight": '',
            "profession": "",
            "styObj": {background: '#fff'}
        }
    },
    // created(){
    //     this.getInfoData()
    // },
    created(){
        this.getInfoData()
    },
    methods: {
        open() {
            this.$message('这是一条消息提示');
        },
        // 获取个人信息
        async getInfoData(){
            try {
                let {result} = await myInfo();
                // console.log(result)
                this.nickName = result.nickName
                this.machineMac = result.machineMac
                this.address = result.address
                this.calorie = result.calorie
                this.bmi = result.bmi
                this.height = result.height
                this.weight = result.weight
                this.profession = result.profession

                // 判断健康状态
                // 0 === 正常
                if(result.quota === 0){                    
                    this.quota = '正常'
                    this.styObj = {
                        background: '#01CBAB'
                    }
                }
                // 1 === 偏低
                if(result.quota === 1){                    
                    this.quota = '偏低'
                    this.styObj = {
                        background: '#32C5FF'
                    }
                }
                // 2 === 低
                if(result.quota === 2){                    
                    this.quota = '低'
                    this.styObj = {
                        background: '#FFAF00'
                    }
                }
                // 3 === 偏高
                if(result.quota === 3){                    
                    this.quota = '偏高'
                    this.styObj = {
                        background: '#AA92FF'
                    }
                }
                // 4 === 高
                if(result.quota === 4){                    
                    this.quota = '高'
                    this.styObj = {
                        background: '#FF7680'
                    }
                }
                

            } catch (error) {
                
            }
        },

        // 修改个人信息
        updateInfo(){
            console.log(this.machineMac)
            this.$router.push({path: '/updateInfo', query: {
                equipment: this.machineMac,
                address: this.address,
                height: this.height,
                weight: this.weight,
                job: this.profession
            }})
        }
    }
}
</script>

<style lang="stylus" scoped>
    .myinfo
        width 100%
        padding .266667rem .426667rem
        background #F4F4F4
        box-sizing border-box

        .info_box
            width 100%
            height 5.946667rem
            background #ffffff
            border-radius .213333rem
            box-shadow: 0 .133333rem .266667rem 0 rgba(0,0,0,0.08);

            .info_top
                display flex
                align-items center
                width 100%
                padding-top .586667rem
                // padding-left .38rem
                padding-bottom .346667rem
                border-bottom : .026667rem solid #F5F5F5;

                img 
                    width 2.506667rem
                    height 2.506667rem
                    margin-left .506667rem
                    border-radius 50%

                .i_t_rig
                    flex 1
                    margin-left .506667rem

                    .update_info
                        display flex
                        justify-content space-between
                        align-items center
                        height .88rem

                        .myname
                            line-height .88rem
                            letter-spacing: .006133rem
                            font-size: .64rem
                            color: #4A4A4A;

                        .edit_info
                            display block
                            width .64rem
                            height .64rem
                            margin-right .4rem
                            border-radius 0


                    .home_adr
                        margin-top .213333rem
                        height .746667rem

                        p 
                            width 100%
                            font-size: .266667rem
                            color: #9B9B9B;
                            line-height .373333rem
                            letter-spacing: -0.000267rem

                            span
                                outline none 
                                border none 
            
            .info_bot
                display flex
                justify-content space-around
                width 100%
                padding-top .24rem
                padding-bottom .373333rem

                .i_b_row
                    font-size: .32rem
                    color: #919299;
                    p
                        height .48rem
                        line-height .533333rem




</style>