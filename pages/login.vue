<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{isLogin ? 'Sign In' : 'Sign Up'}}</h1>
                    <p class="text-xs-center" v-if="!isLogin">
                        <nuxt-link to="/login">Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(messages, field) in errorMessages">
                            <li v-for="(error, index) in messages" :key="index">{{field}}&nbsp;{{error}}</li>
                        </template>
                    </ul>

                    <form>
                        <fieldset class="form-group" v-if="!isLogin">
                            <input v-model="formMessage.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="formMessage.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="formMessage.password" class="form-control form-control-lg" type="password" placeholder="Password" required>
                        </fieldset>
                        <button type="button" class="btn btn-lg btn-primary pull-xs-right" @click="handleSubmit">{{isLogin ? 'Sign In' : 'Sign Up'}}</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import { userLogin, userRegister } from "../api/user";

export default {
    name: 'LoginRegisterPage',
    middleware: 'authenticated',
    data () {
        return {
            errorMessages: {},
            formMessage: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    computed: {
        isLogin() {
            return this.$route.name === 'login'
        }
    },
    methods: {
        async handleSubmit() {
            try {
                this.errorMessages = {};
                const params = {
                    user: Object.assign({}, this.formMessage)
                }
                if (this.isLogin) {
                    delete params.user.username;
                    const userInfo = await userLogin(params);
                    await this.$store.dispatch('user/setUserInfoAction', userInfo.user);
                    Cookies.set('user', JSON.stringify(userInfo.user));
                    await this.$router.replace('/');
                } else {
                    await userRegister(params);
                    await this.$router.replace('/login');
                }
            } catch (e) {
                this.errorMessages['email or password'] = ['is invalid'];
            }
        }
    }
}
</script>

<style scoped>

</style>
