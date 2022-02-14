<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <nuxt-link tag="a" class="navbar-brand" to="/">conduit</nuxt-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <!-- Add "active" class when you're on that page" -->
                    <nuxt-link class="nav-link" :class="{active: activeRoute === 'home'}" to="/">Home</nuxt-link>
                </li>
                <template v-if="userInfo">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :class="{active: activeRoute === 'editor'}" to="/editor">
                            <i class="ion-compose"></i>&nbsp;New Article
                        </nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :class="{active: activeRoute === 'settings'}" to="/settings">
                            <i class="ion-gear-a"></i>&nbsp;Settings
                        </nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :to="'/profile/' + userInfo.username">
                            <img class="user-pic" :src="userInfo.image">
                            {{ userInfo.username }}
                        </nuxt-link>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :class="{active: activeRoute === 'login'}" to="/login">Sign in</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :class="{active: activeRoute === 'register'}" to="/register">Sign up</nuxt-link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'HeaderComponent',
    computed: {
        ...mapGetters({
           userInfo: 'user/getUserInfo'
        }),
        activeRoute() {
            return this.$route.name
        }
    }
}
</script>

<style scoped>

</style>
