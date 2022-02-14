const path = require('path');

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
    title: 'realworld-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'},
      { rel: 'stylesheet', type: 'text/css', href: '//demo.productionready.io/main.css'},
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic'}
    ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    router: {
        extendRoutes(routes, resolve) {
            // 清除 Nuxt.js 基于 pages 目录生成的默认的路由表规则
            routes.splice(0)

            const defaultRoutes = [{
                // 默认子路由
                path: '',
                name: 'home',
                component: resolve(__dirname, 'pages/index.vue'),
            },
                {
                    path: '/login',
                    name: 'login',
                    component: resolve(__dirname, 'pages/login.vue'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: resolve(__dirname, 'pages/login.vue'),
                },
                {
                    path: '/profile/:username',
                    name: 'profile',
                    component: resolve(__dirname, 'pages/profile.vue'),
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: resolve(__dirname, 'pages/settings.vue'),
                },
                {
                    path: '/editor',
                    name: 'editor',
                    component: resolve(__dirname, 'pages/editor.vue'),
                },
                {
                    path: '/article/:slug',
                    name: 'article',
                    component: resolve(__dirname, 'pages/article.vue'),
                }]

            routes.push(...defaultRoutes)
        }
    }
}
