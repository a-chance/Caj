<template>
    <div class="detail_wrap">
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
    // .detail_wrap
        
        .f_wrap
            min-height calc(100vh - 9.546667rem)
            padding 0 .426667rem 1.6rem
            background #ffffff
</style>