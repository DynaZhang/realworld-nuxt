<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                            <textarea v-model="user.bio" class="form-control form-control-lg" rows="8"
                                      placeholder="Short image about you"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.passowrd" class="form-control form-control-lg" type="password" placeholder="Password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right" @click="handleUpdateUser">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { updateUser } from '../api/user'

export default {
    name: 'SettingsPage',
    middleware: 'authenticated',
    computed: {
        ...mapGetters({
            userInfo: 'user/getUserInfo'
        })
    },
    data() {
        return {
            user: {
                email: '',
                token: '',
                username: '',
                bio: '',
                image: '',
                password: ''
            }
        }
    },
    mounted() {
        this.user = Object.assign({
            password: ''
        }, this.userInfo);
    },
    methods: {
        ...mapActions({
            setUserInfo: 'user/setUserInfoAction'
        }),
        async handleUpdateUser() {
            const params = {
                user: this.user
            };
            try {
                const data = await updateUser(params);
                this.setUserInfo(data.user);
            } catch (e) {
                alert('更新失败')
            }
        }
    }
}
</script>

<style scoped>

</style>
