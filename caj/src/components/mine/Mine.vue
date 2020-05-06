<template>
    <div class="mine">
        <mine-header></mine-header>
        <div class="mine_wrap">
            <mine-info></mine-info>
            <mine-tab></mine-tab>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
// 引入组件
import MineHeader from './base/MineHeader'
import MineInfo from './base/MineInfo'
import MineTab from './base/MineTab'
import Footer from '../commons/Footer'



export default {
    data(){
        return  {
            
        }
    },
    components: {
        MineHeader,
        MineInfo,
        MineTab,
        Footer
    },
    watch: {
        '$route': function (to,from) {
                console.log(4444)
        },
        $route(to, from){
            console.log(12312312312)
            console.log(to)
            console.log(from)
        }
    },
}
</script>

<style lang="stylus" scoped>
    .mine
        width 100%
        height 100%

        .mine_wrap
            width 100%
            height calc(100vh - 1.86rem)
            overflow-x hidden
            overflow-y auto
</style>