<template>
    <div>
        <detail-header></detail-header>
        <detail-info 
            :menuDto="menuDto" 
            :menuTagDtos="menuTagDtos" 
            :menuStockDto="menuStockDto" 
            :menuPriceDto="menuPriceDto"
        ></detail-info>
        <div class="f_wrap">
            <detail-tab                
                :menuDto="menuDto"
                :stepDetailDtos="stepDetailDtos"
                :menuIngredientsDtos="menuIngredientsDtos"
            ></detail-tab>
            <detail-footer
                :menuDto="menuDto"
            ></detail-footer>
        </div>
    </div>
</template>

<script>
import DetailHeader from './base/DetailHeader'
import DetailInfo from './base/DetailInfo'
import DetailTab from './base/DetailTab'
import DetailFooter from './base/DetailFooter'

// 引入接口
import { Detail } from '@/api'

export default {
    name: 'Detail',
    data(){
        return  {
            menuDto: {},
            menuTagDtos: [],
            menuStockDto: {},
            stepDetailDtos: [],
            menuIngredientsDtos: [],
            menuPriceDto: {}
        }
    },
    async created(){
        // // 获取数据
        let {result: {menuDto, stepDetailDtos, menuTagDtos, menuStockDto, menuPriceDto, menuIngredientsDtos }} = await Detail(this.$route.query.id)
        // console.log(menuPriceDto)
        this.menuDto = menuDto
        this.stepDetailDtos = stepDetailDtos
        this.menuTagDtos = menuTagDtos
        this.menuStockDto = menuStockDto
        this.menuIngredientsDtos = menuIngredientsDtos
        this.menuPriceDto = menuPriceDto
    },
    components: {
        DetailHeader,
        DetailInfo,
        DetailTab,
        DetailFooter
    }
}
</script>

<style lang="stylus" scoped>
    .f_wrap
        padding 0 .32rem 1.2rem
        background #ffffff
</style>