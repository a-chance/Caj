<template>
    <div>
        <div class="search_head_wrap">
            <div class="s_h_box">
                <img class="s_icon" src="@/assets/images/xxhdpi/icon-fanhui.png" alt="" @click="goback">
                <div class="s_inp_wrap">
                    <img src="@/assets/images/xxhdpi/icon-sousuo.png" alt="">
                    <input class="s_inp" v-model.trim="searchTips" @keyup.enter="handle_search" type="text" placeholder="搜索菜品">
                </div>
                <button class="s_btn" @click="handle_search">搜索</button>
            </div>
        </div>
        <div class="search_body">
            <!-- 搜索结果 -->
            <div class="search_result_wrap" v-if="isShowList">
                <p class="no_result_hint" v-show="isShowHint">亲，没有你想要的结果~</p>
                <ul class="search_result_list" v-show="!isShowHint">
                    <li @click="gotoDetail(green.menuDto.id)" class="search_result_item" v-for="(green, index) in hotgreens" :key="index">
                        <img class="greens_img" :src="green.menuDto.image" alt="">
                        <div class="item-con">
                            <p class="hotgreens_name">{{green.menuDto.name}}</p>
                            <div class="hot_row1">
                                <img v-if="!green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang.png" alt="">
                                <img v-if="green.menuDto.collectType" @click.stop="isLike(green.menuDto.collectType, green.menuDto.id, index)" class="like" src="@/assets/images/xxhdpi/icon-shoucang2.png" alt="">
                                <ul class="labels">
                                    <li v-for="(label, index) in green.menuTagDtos" :key="index">{{label.tagName}}</li>
                                </ul>
                            </div>
                            <div class="hot_row2">
                                <p class="price_wrap">￥<span class="price">{{round((green.menuPriceDto.price / 100), 1)}}</span></p>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 滚动到页面底部时显示 -->
                <!-- <div class="load_more_wrap">正在加载更多...</div> -->
            </div>

            <!-- 历史搜索 -->
            <div class="search_history_wrap" v-if="!isShowList">
                <div class="s_h_tit_wrap" v-if="show_search_history_tit">
                    <span class="s_h_tit">历史搜索</span>
                    <img @click="cleanHistories" class="clear_history" src="@/assets/images/xxhdpi/qingkong.png" alt="" :onerrror="defaultImg">
                </div>
                <div class="s_h_list_wrap">
                    <ul class="s_h_list">
                        <li @click="search_again" class="s_h_item" v-for="(item, index) in histories" :key="index">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myMixin from '@/components/commons/myMixin.js'
import { sendSearch, addLike } from  '@/api'

export default {
    name: 'Search',
    mixins: [myMixin],
    data(){
        return  {
            searchTips: '',
            histories: JSON.parse(localStorage.getItem('histories')) || [],
            hotgreens: [],
            isShowList: false,
            isShowHint: false,
            defaultImg: 'this.src="'+ require('@/assets/images/xxhdpi/defaultImg.png') +'"',
            curPage: 1,
            totalPage: null
        }
    },
    watch: {
        searchTips(){
            this.isShowList = this.searchTips ? true : false
            this.isShowHint = false
            this.hotgreens = []
        }        
    },
    updated(){
        // 加载更多
        // 如果搜索有结果 就获取节点 
        // 如果有这个属性就说明有数据
        if(this.hotgreens){                    
            let search_body = document.getElementsByClassName('search_body')[0]
            
            // console.log('可视区', search_body.clientHeight)
            // console.log('实际高度', search_body.scrollHeight)

            let clientHeight = search_body.clientHeight
            let scrollHeight = search_body.scrollHeight
            
            search_body.onscroll = () => {
                // console.log('滚动距离', search_body.scrollTop)
                let scrollTop = search_body.scrollTop
                if(scrollTop + clientHeight >= scrollHeight){
                    // console.log(this.searchTips)
                    this.loadmore(this.searchTips, ++this.curPage)
                }
            }
        }
    },
    methods: {
        // 默认获取搜索结果: 第一页数据
        async getSearch(){
            try{
                let {result} = await sendSearch(this.searchTips)
                // console.log(result)
                this.hotgreens = 'menuDetailDtos' in result ? result.menuDetailDtos : []
                this.isShowHint = 'menuDetailDtos' in result ? false : true 
                this.totalPage = result.totalPage
            }catch(error){
                console.log('搜索数据获取失败')
            }
        },
        // 点击加载更多
        async loadmore(keyword, page){
            try {
                if(page === this.totalPage){
                    let { result: {menuDetailDtos} } = await sendSearch(keyword, page)
                    // console.log(menuDetailDtos)
                    menuDetailDtos.forEach(item => {
                        this.hotgreens.push(item)
                    })
                }
            } catch (error) {
                console.log(`加载更多页${this.page}数据失败`)
            }
        },
        
        // 点击搜索
        // 1.获取搜索数据
        // 2.保存历史纪录，存到缓存
        handle_search(){
            if(this.searchTips){
                this.getSearch()
                if(this.histories){
                    let flag = this.histories.every(item => item != this.searchTips)          
                    if(flag){
                        this.histories.splice(0, 0, this.searchTips)
                    }  
                }else{
                    this.histories.splice(0, 0, this.searchTips)
                }   
            }
            localStorage.setItem('histories', JSON.stringify(this.histories))
        },

        // 是否收藏
        async isLike(collectType, menuId, index){
            let curDel = this.hotgreens[index].menuDto.collectType
            this.hotgreens[index].menuDto.collectType = !this.hotgreens[index].menuDto.collectType
            try {
                let {result} = await addLike(Number(curDel), menuId)
                // console.log(result)
            } catch (error) {
                console.log('收藏请求发送失败')
            }
        },
        // 清空历史
        cleanHistories(){
            this.histories = [],
            localStorage.removeItem('histories')
        },

        // 点击历史搜索，可以直接搜索
        search_again(e){
            let val = e.target.innerText
            this.searchTips = val
            this.getSearch()
        }
    },
    computed: {
        show_search_history_tit(){
            if(this.histories.length){
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

    .search_head_wrap
        position relative
        width 100%
        height 0.88rem
        background: #FFFFFF
        box-shadow: 0 0.01rem 0 0 #eee
        font-family '微软雅黑'

        .s_h_box
            position absolute
            top 0
            left 0
            display flex
            align-items center
            width 100%
            height 100%
            padding 0 .32rem

            .s_icon
                width 0.24rem
                height 0.4rem
                margin-right .68rem
            
            .s_btn
                width .7rem
                height .42rem
                margin-left .3rem
                color #333333
                font-family 'Microsoft YaHei'
                font-size .3rem
                // font-weight bold
                letter-spacing 0.24px

            .s_inp_wrap
                overflow hidden
                flex 1
                position relative
                height .68rem
                border-radius .36rem
                background #F7F7F7

                img 
                    position absolute
                    top 50%;
                    left .26rem
                    transform translateY(-50%)
                    width .22rem
                    height 0.24rem

                .s_inp
                    width 100%
                    height 100%
                    padding-left .62rem
                    padding-top .14rem
                    padding-bottom .16rem
                    color #333
                    font-size .28rem
                    box-sizing border-box
                
                .s_inp::-webkit-input-placeholder
                    color #999999
                    font-family 'Microsoft YaHei'

    .search_body
        width 100%
        height calc(100vh - 0.88rem)
        overflow-y auto

        .search_result_wrap
            width 100%
            padding .32rem .32rem 0
            box-sizing border-box

            .no_result_hint
                margin-top 1.2rem
                color #999
                font-size .3rem
                text-align center

            .search_result_list
                display flex
                flex-wrap wrap
                justify-content space-between

                .search_result_item
                    width 3.2rem
                    height 4rem
                    margin-bottom .2rem
                    background #fff
                    border-radius 3px

                    .greens_img
                        width 100%
                        height 2.4rem
                        border-radius .06rem

                    .item-con
                        padding-left .2rem
                    
                        .hotgreens_name
                            width 100%
                            height .4rem
                            margin .1rem 0
                            font-family: 'Microsoft YaHei';
                            font-size: .28rem;
                            color: #333333;
                            letter-spacing: 0.0044rem;
                            line-height .4rem

                        .hot_row1
                            display flex

                            .like
                                width 0.32rem
                                height 0.3rem
                                margin-right .08rem

                            .labels
                                display flex
                                flex-wrap wrap

                                li
                                    height .28rem
                                    line-height .28rem
                                    padding 0 .1rem
                                    margin-right .1rem
                                    margin-bottom .1rem
                                    font-size .2rem
                                    background #FFEDEC
                                    color #FB5046
                                    border-radius: .02rem;
                                    letter-spacing: 0.16px;
                                    white-space nowrap  
                                    box-sizing border-box
                                

                        .hot_row2
                            display flex
                            justify-content space-between
                            align-items center
                            height .5rem
                            line-height .5rem

                            .price_wrap
                                width 0.64rem
                                height .4rem
                                font-size: .28rem;
                                color: #FF6671;
                                letter-spacing: 0.0044rem;
                                line-height .4rem
                            
                            .residue_wrap
                                font-size: .22rem;
                                color: #999999;
                                letter-spacing: 0.18px;

            .load_more_wrap
                position absolute
                left 0 
                bottom 0
                width 100%
                height .88rem
                box-shadow 0 -1px 0 0 #eee
                background #ffffff
                text-align center
                line-height 0.88rem


        .search_history_wrap
            width 100%
            height calc(100vh - .88rem)
            padding .34rem .32rem
            background #fff
            box-sizing border-box

            .s_h_tit_wrap
                display flex
                align-items center
                justify-content space-between
                width 100%
                height .36rem
                margin-bottom .2rem

                .s_h_tit
                    color #999
                    font-size 0.26rem
                    line-height .36rem

                .clear_history
                    width 0.26rem
                    height 0.28rem

            .s_h_list_wrap
                width 100%
                background #ffffff
                
                .s_h_list
                    display flex
                    flex-wrap wrap

                    .s_h_item
                        height .64rem
                        padding 0 0.7rem
                        background #F2F1F0
                        color #212121
                        border-radius .08rem
                        line-height .64rem
                        margin-right .16rem
                        margin-bottom .16rem
</style>