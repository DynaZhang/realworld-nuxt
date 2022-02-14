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
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{disabled: !userInfo, active: tab === 'feed'}"
                                    :to="{ name: 'home', query: { page: 1, tag: tag, tab: 'feed'}}">
                                    Your Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{active: tab !== 'feed'}"
                                    :to="{ name: 'home', query: { page: 1, tag: tag, tab: ''}}">
                                    Global Feed
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
                                <span class="date">{{article.createdAt}}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
                            <a href="" class="tag-pill tag-default">programming</a>
                            <a href="" class="tag-pill tag-default">javascript</a>
                            <a href="" class="tag-pill tag-default">emberjs</a>
                            <a href="" class="tag-pill tag-default">angularjs</a>
                            <a href="" class="tag-pill tag-default">react</a>
                            <a href="" class="tag-pill tag-default">mean</a>
                            <a href="" class="tag-pill tag-default">node</a>
                            <a href="" class="tag-pill tag-default">rails</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getArticles, getFeedArticles } from '../api/article';

export default {
    name: 'IndexPage',
    computed: {
      ...mapGetters({
          userInfo: 'user/getUserInfo'
      })
    },
    watchQuery: true,
    async asyncData({route}) {
        const page = parseInt(route.query.page) || 1;
        const {tag, tab} = route.query
        const limit = 2;
        let data;
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
            const articles = data.articles;
            const articlesCount = data.articlesCount;
            return {
                articles,
                articlesCount,
                page,
                totalPage: Math.round(articlesCount / limit),
                tag,
                tab
            }
        } catch (e) {
            return {
                articles: [],
                articlesCount: 0,
                page: 1,
                totalPage: 0,
                tag: '',
                tab: ''
            }
        }
    }
}
</script>
