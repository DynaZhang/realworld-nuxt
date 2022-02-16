<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">

                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item" v-if="userInfo">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{active: tab && !tag}"
                                    :to="{ name: 'home', query: { page: 1, tab: 'feed'}}">
                                    Your Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{active: !tab && !tag}"
                                    :to="{ name: 'home', query: { page: 1}}">
                                    Global Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item" v-if="tag">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{active: tag}"
                                    :to="{ name: 'home', query: { page: 1, tag: tag}}">
                                    #{{tag}}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="article in articles" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link :to="'/profile/' + article.author.username">
                                <img :src="article.author.image"/>
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link
                                    :to="'/profile/' + article.author.username"
                                    class="author">
                                    {{article.author.username}}
                                </nuxt-link>
                                <span class="date">{{article.createdAt | formatDate}}</span>
                            </div>
                            <button
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                                :class="{active: article.favorited}"
                                :disabled="!article.favoritedEnabled"
                                @click="handleSetFavoriteStatus(article)"
                            >
                                <i class="ion-heart"></i> {{article.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link :to="'/article/' + article.slug" class="preview-link">
                            <h1>{{article.title}}</h1>
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>

                    <nav>
                        <ul class="pagination">
                            <li class="page-item" :class="{ active: item === page }" v-for="item in totalPage" :key="item">
                                <nuxt-link
                                    class="page-link"
                                    :to="{ name: 'home', query: { page: item, tag: tag, tab: tab}}">
                                    {{ item }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>

                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link
                                v-for="(item, index) in tags"
                                :key="index"
                                class="tag-pill tag-default"
                                :class="{ active: item === tag }"
                                :to="{ name: 'home', query: {tag: item}}">
                                {{item}}
                            </nuxt-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getArticles, getFeedArticles, getArticleTags, setArticleUnFavorite, setArticleFavorite } from '../api/article'

export default {
    name: 'IndexPage',
    watchQuery: ['page', 'tag', 'tab'],
    async asyncData({route, store}) {
        const page = parseInt(route.query.page) || 1;
        const {tag, tab} = route.query
        const limit = 2;
        let data;
        let articles = [];
        let articlesCount = 0;
        let tags = [];
        const params = {
            limit,
            offset: (page - 1) * limit
        }
        if (tag) {
            params.tag = route.query.tag
        }

        try {
            if (tab === 'feed') {
                data = await getFeedArticles(params);
            } else {
                data = await getArticles(params);
            }
            articles = data.articles;
            articlesCount = data.articlesCount;
        } catch (e) {
        }

        try {
            data = await getArticleTags();
            tags = data.tags;
        } catch (e) {
        }

        articles.forEach(item => {
            item.favoritedEnabled = !!store.state.user.userInfo;
        })

        return {
            articles,
            tags,
            articlesCount,
            page,
            totalPage: Math.round(articlesCount / limit),
            tag,
            tab
        }
    },
    computed: {
      ...mapGetters({
          userInfo: 'user/getUserInfo'
      })
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

        }
    },
    mounted() {
        getArticleTags()
    }
}
</script>
