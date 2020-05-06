<template>
    <div class="det_tab">
        <ul class="tab_hd">
            <li @click="changeTab(index)" v-for="(tabTit, index) in tabTits" :key="index">
                <span>{{tabTit}}</span>
                <p :class="{bord: curId === index}"></p>
            </li>
        </ul>
        <div class="tab_foot">
            <div class="tab_con1" v-show="isCons[0]" ref="con" v-html="menuDto.content">
                    {{menuDto.content}}
                    <!-- <p>
                        回锅肉起源四川农村地区。古代时期称作油爆锅，四川地区大部分家庭都会制作。所谓回锅，就是再次烹调的意思。回锅肉在川菜中的地位是非常重要的，回锅肉一直被认为是川菜之首，川菜之化身，提到川菜必然想到回锅肉。回锅肉色香味俱全，是下饭菜中大部分人会选的菜。配料各有不同，除了蒜苗（青蒜）还可以用彩椒，洋葱，韭菜，锅盔等来制作回锅肉，““家常”顾名思义，“调料家家常有之意，”故每一家制作出的味道都不相同，这一特性，也是赋予了回锅肉这道菜独特的魅力。回锅肉（Twice-cooked pork slices），是一种四川传统菜式中家常（味型）菜肴的代表菜肴之一，属于川菜系列。制作原料主要有猪后臀肉、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻。
                    </p><br> -->
            </div>
            <div class="tab_con2" v-show="isCons[1]">
                <div class="mater_row"  v-if="mainIngredient.length > 0 ? true : false">
                    <p class="h2_tit">主料</p>
                    <div class="m_box">
                        <ul class="m_material">
                            <li v-for="(main, index) in mainIngredient" :key="index">
                                <img :src="main.ingredientsURL" alt="">
                                <p class="m_tit">{{main.ingredientsName}}</p>
                                <p class="m_weight"><span>{{main.weight}}g</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mater_row" v-if="minorIngredient.length > 0 ? true : false">
                    <p class="h2_tit">辅料</p>
                    <div class="m_box">
                        <ul class="m_material">
                            <li v-for="(minor, index) in minorIngredient" :key="index">
                                <img :src="minor.ingredientsURL" alt="">
                                <p class="m_tit">{{minor.ingredientsName}}</p>
                                <p class="m_weight"><span>{{minor.weight}}g</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab_con3" v-show="isCons[2]">
                <ul class="step_list">
                    <li v-for="(step, index) in stepDetailDtos" :key="index">
                        {{step.menuStepDto.content}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['menuDto', 'stepDetailDtos', 'menuIngredientsDtos'],
    data(){
        return  {
            content: '',
            curId: 0,
            tabTits: ['详情介绍', '所需食材', '烹饪步骤'],
            isCons: [true, false, false]
        }
    },
    methods: {
        changeTab(index){
            this.curId = index;
            this.isCons.forEach((item,idx)=>{
                if(index == idx){
                    this.isCons.splice(idx,1,true)
                }else{
                    this.isCons.splice(idx,1,false)
                }
            })
        }
    },
    computed: {
        // 主料
        mainIngredient(){
            let arr0_IngredientsDtos = this.menuIngredientsDtos.filter( item => item.type === 0)
            // console.log(arr0_IngredientsDtos)
            return arr0_IngredientsDtos
        },
        // 辅料
        minorIngredient(){
            let arr1_IngredientsDtos = this.menuIngredientsDtos.filter( item => item.type === 1)
            // console.log(arr1_IngredientsDtos)
            return arr1_IngredientsDtos
        }
    }
}
</script>

<style lang="stylus" scoped>
    .det_tab
        margin-top .2rem
        background #ffffff
        min-height 5rem

        .tab_hd
            display flex
            justify-content space-between
            align-items center
            height  0.96rem

            li
                position relative
                height .42rem
                color #333
                font-size .3rem
                line-height .42rem
                font-weight 550

                .bord
                    position absolute
                    width 100%
                    height 0.04rem
                    left 0
                    bottom 0
                    background #FF6671
                    border-radius 0.04rem
        .tab_foot
            .tab_con1
                font-size: .28rem;
                color: #333333;
                letter-spacing: 0.0044rem;
                text-align: justify; 

                p
                    text-indent .56rem    
                    line-height .4rem  
            .tab_con2
                .mater_row
                    width 100%
                    height 2.96rem
                    margin-bottom .24rem

                    .h2_tit
                        width 100%
                        height .4rem
                        margin-bottom .2rem
                        line-height .4rem
                        font-size: .28rem;
                        font-weight bold
                        color: #333333;
                        letter-spacing: 0.0044px;
                        text-align: justify;

                    .m_box
                        overflow-x auto
                        border: .02rem solid #ECECEC;
                        padding-right .2rem

                        .m_material 
                            display flex
                            flex-wrap nowrap
                            height 2.36rem
                            padding .2rem
                            background: #FFFFFF;
                            box-sizing border-box

                            li
                                flex-shrink 0
                                width 1.2rem
                                margin-right .2rem

                                img 
                                    width 100%
                                    height 1.2rem
                                    border-radius 50%

                                .m_tit
                                    height 0.34rem
                                    line-height 0.34rem
                                    margin-top .1rem
                                    font-size: .24rem;
                                    color: #333333;
                                    letter-spacing: 0.0038rem;
                                    text-align: justify;
                                    text-align center
                                
                                .m_weight
                                    height 0.32rem
                                    line-height 0.32rem
                                    font-size: .22rem;
                                    color: #666666;
                                    letter-spacing: 0.0036px;
                                    text-align: justify;
                                    text-align center



            .tab_con3
                width 100%
                
                .step_list
                    li
                        margin-bottom .4rem
                        font-size: .28rem;
                        color: #333333;
                        letter-spacing: 0.0044rem;
                        text-align: justify;    
                        line-height .4rem




</style>