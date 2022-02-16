<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                            <textarea class="form-control" rows="8" v-model="article.body"
                                      placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="tag" class="form-control" placeholder="Enter tags" @keyup.enter="handleAddTag">
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="handleAddArticle">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { addArticle } from '../api/article'

export default {
    name: 'CreatePage',
    middleware: 'authenticated',
    data() {
        return {
            article: {
                title: '',
                description: '',
                body: '',
                tagList: []
            },
            tag: ''
        }
    },
    methods: {
        handleAddTag() {
            if (!this.tag.trim()) {
                return;
            }
            this.article.tagList.push(this.tag.trim());
            this.tag = '';
        },
        async handleAddArticle() {
            const params = {
                article: this.article
            }
            try {
                await addArticle(params);
                alert('发布成功');
                await this.$router.replace('/')
            } catch (e) {
                alert('发布失败');
            }
        }
    }
}
</script>

<style scoped>

</style>
