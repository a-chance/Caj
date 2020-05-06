let myMixin = {
    methods: {
        // 跳转到 ---> 上一页
        goback(){
            window.history.back()
        },

        // 跳转到详情页
        gotoDetail(id){
            this.$router.push({name: 'Detail', query: {id}})
        },         
    },
}

export default myMixin