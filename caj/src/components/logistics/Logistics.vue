<template>
    <div class="logistics">
        <logistics-header></logistics-header>
        <logistics-info></logistics-info>
        <Footer></Footer>
    </div>
</template>

<script>
import LogisticsHeader from './base/LogisticsHeader'
import LogisticsInfo from './base/LogisticsInfo'
import Footer from '../commons/Footer'

export default {
    data(){
        return  {
            
        }
    },
    components: {
        LogisticsHeader,
        LogisticsInfo,
        Footer
    }
}
</script>


<style lang="stylus" scoped>
    .logistics
        background #f4f4f4
</style>