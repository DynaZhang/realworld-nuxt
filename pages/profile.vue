<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img"/>
                        <h4>{{profile.username}}</h4>
                        <p>
                            Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the
                            Hunger Games
                        </p>
                        <button
                            v-if="userInfo.username !== profile.username"
                            class="btn btn-sm btn-outline-secondary"
                            :class="{active: profile.following}"
                            @click="handleSetFollowStatus">
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            Follow {{article.author.username}}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { followUser, getProfileDetail, unFollowUser } from '../api/profile'

export default {
    name: 'ProfilePage',
    async asyncData({route}) {
        let data;
        let profile = {};
        const {username} = route.params;
        try {
            data = await getProfileDetail(username);
            profile = data.profile;
        } catch (e) {

        }
        return {
            profile
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'user/getUserInfo'
        })
    },
    methods: {
        async handleSetFollowStatus() {
            if (!this.profile.following) {
                await followUser(this.profile.author.username);
            } else {
                await unFollowUser(this.profile.author.username);
            }
            this.profile.following = !this.profile.following;
        }
    }
}
</script>

<style scoped>

</style>
