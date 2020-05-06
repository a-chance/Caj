<template>
	<div id="app">
			<keep-alive :include="['Cart', 'Mine']">
				<router-view/>
			</keep-alive>
	</div>
</template>

<script>
export default {
	name: 'App',
	data(){
		return {
			animationName: ''
		}
	},
	 watch: {
        $route(to, from){
			if(to.path === '/order'){
				localStorage.setItem('curHash', this.$route.query.hash)
			}
        }
    },
}
</script>

<style lang="stylus">
.yd-dialog-white-mask
	top 55%
	bottom 0
</style>
