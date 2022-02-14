<template>
    <div>
        <header-component />
        <nuxt />
        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'
export default {
    components: { FooterComponent, HeaderComponent }
}
</script>

<style>

</style>
