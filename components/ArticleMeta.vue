<template>
    <div class="article-meta">
        <nuxt-link :to="`/profile/${article.author.username}`">
            <img :src="article.author.image"/>
        </nuxt-link>
        <div class="info">
            <nuxt-link :to="`/profile/${article.author.username}`" class="author">
                {{article.author.username}}
            </nuxt-link>
            <span class="date">{{article.createAt | formatDate}}</span>
        </div>
        <button
            class="btn btn-sm btn-outline-secondary"
            :disabled="!article.followEnabled"
            :class="{active: article.author.following}"
            @click="handleSetFollowStatus(article)">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
        </button>
        &nbsp;&nbsp;
        <button
            class="btn btn-outline-primary btn-sm"
            :class="{active: article.favorited}"
            :disabled="!article.favoritedEnabled"
            @click="handleSetFavoriteStatus(article)"
        >
            <i class="ion-heart"></i>&nbsp;
            Favorite Post <span class="counter">{{article.favoritesCount}}</span>
        </button>
    </div>
</template>

<script>
import { setArticleFavorite, setArticleUnFavorite } from '../api/article'
import { followUser, unFollowUser } from '../api/profile'

export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        async handleSetFavoriteStatus(article) {
            if (article.favorited) {
                await setArticleUnFavorite(article.slug);
                article.favoritesCount -= 1;
            } else {
                await setArticleFavorite(article.slug);
                article.favoritesCount += 1;
            }
            article.favorited = !article.favorited;

        },
        async handleSetFollowStatus(article) {
            if (article.following) {
                await followUser(article.author.username);
            } else {
                await unFollowUser(article.author.username);
            }
            article.following = !article.following;
        }
    }
}
</script>

<style scoped>

</style>
