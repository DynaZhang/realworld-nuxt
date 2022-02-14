<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <nuxt-link tag="a" class="navbar-brand" to="/">conduit</nuxt-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <!-- Add "active" class when you're on that page" -->
                    <nuxt-link class="nav-link" :class="{active: activeRoute === 'index'}" to="/">Home</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" :class="{active: activeRoute === 'create'}" to="/create">
                        <i class="ion-compose"></i>&nbsp;New Article
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" :class="{active: activeRoute === 'settings'}" to="/settings">
                        <i class="ion-gear-a"></i>&nbsp;Settings
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" :class="{active: activeRoute === 'login'}" to="/login">Sign in</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" :class="{active: activeRoute === 'register'}" to="/register">Sign up</nuxt-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'HeaderComponent',
    computed: {
        activeRoute() {
            return this.$route.name
        }
    },
    asyncData(context) {
        return {
            userInfo: context.store.state.user.userInfo
        }
    }
}
</script>

<style scoped>

</style>
