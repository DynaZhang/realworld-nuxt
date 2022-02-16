<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

                <h1>{{article.title}}</h1>

                <article-meta :article="article" />

            </div>
        </div>

        <div class="container page">

            <div class="row article-content" v-html="article.body"></div>

            <hr/>

            <div class="article-actions">
                <article-meta :article="article" />
            </div>

            <div class="row">

                <div class="col-xs-12 col-md-8 offset-md-2">

                    <form class="card comment-form" v-if="userInfo">
                        <div class="card-block">
                            <textarea v-model="commentBody" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                        </div>
                        <div class="card-footer">
                            <img :src="userInfo.image" class="comment-author-img"/>
                            <button class="btn btn-sm btn-primary" @click="handleAddComment">Post Comment</button>
                        </div>
                    </form>

                    <div class="card" v-if="(comment, index) in comments" :key="comment.id">
                        <div class="card-block">
                            <p class="card-text">{{comment.body}}</p>
                        </div>
                        <div class="card-footer">
                            <nuxt-link :to="`/profile/${comment.author.username}`" class="comment-author">
                                <img :src="comment.author.image" class="comment-author-img"/>
                            </nuxt-link>
                            &nbsp;
                            <a href="" class="comment-author">{{comment.author.username}}</a>
                            <span class="date-posted">{{comment.createdAt | formatDate}}</span>
                            <span class="mod-options" v-if="comment.author.username === userInfo.username">
                                <i class="ion-edit"></i>
                                <i class="ion-trash-a" @click="handleDelComment(comment, index)"></i>
                            </span>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import ArticleMeta from '../components/ArticleMeta';
import MarkdownIt from 'markdown-it';
import { getArticle } from '../api/article';
import { addComment, delComment, getComments } from '../api/comments';

export default {
    name: 'ArticlesPage',
    components: { ArticleMeta },
    async asyncData({route, store}) {
        let data;
        let article = {};
        let comments = [];
        const {slug} = route.params;
        const md = new MarkdownIt();
        try {
            data = await getArticle(slug);
            article = data.article;
            article.favoritedEnabled = store.state.user.userInfo;
            article.followEnabled = store.state.user.userInfo;
            article.body = md.render(article.body);
            data = await getComments(slug);
            comments = data.comments;
        } catch (e) {
            article = {};
            comments = [];
        }
        return {
            article,
            comments
        }
    },
    head() {
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                { hid: 'description', name: 'description', content: this.article.description}
            ]
        }
    },
    data() {
        return {
            commentBody: ''
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'user/getUserInfo'
        })
    },
    methods: {
        async handleAddComment() {
            const params = {
                body: this.commentBody
            };
            try {
                const data = await addComment(params, this.article.slug);
                this.comments.push(data.comment);
            } catch (e) {
                alert('评论失败');
            }
        },
        async handleDelComment(comment, index) {
            try {
                await delComment(this.article.slug, comment.id);
                this.comments.splice(index, 1);
            } catch (e) {
                alert('删除评论失败');
            }
        }
    }
}
</script>

<style scoped>

</style>
