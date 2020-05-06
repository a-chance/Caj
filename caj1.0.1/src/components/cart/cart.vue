<template>
    <div class="cart">
        <cart-header></cart-header>
        <cart-con></cart-con>
        <Footer></Footer>
    </div>
</template>

<script>
import CartHeader from './base/CartHeader'
import CartCon from './base/CartCon'
import Footer from '../commons/Footer'

export default {
    name: 'Cart',
    data(){
        return  {
            
        }
    },
    components: {
        CartHeader,
        CartCon,
        Footer
    },
}
</script>

<style lang="stylus" scoped>
    .cart
        background #F6F6F6
</style> 