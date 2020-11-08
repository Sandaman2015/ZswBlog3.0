<template>
    <div class="category-content">
        <cover description="{ 文章分类 }" coverHeight="320" coverWidth="100" class="content-warp" />
        <div id="content" class="site-content">
            <div class="tag-contents">
                <div id="tags" class="container chip-container" style="margin-top: 0px;">
                    <div class="card">
                        <div class="card-content">
                            <div class="tag-title center-align">
                                <i class="fa fa-bookmark"></i>&nbsp;&nbsp;所有分类
                            </div>
                            <div class="tag-chips">
                                <a :href="'/web/category-details/'+item.id" v-for="(item,index) in categoryList"
                                    :key="index" title="随笔: 1">
                                    <span class="chip center-align waves-effect waves-light chip-default">{{item.name}}
                                        <span class="tag-length">{{item.articleCount}}</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import illustration from "../../components/Illustration";
    import {
        getAllCategory
    } from "../../api/category.api";
    export default {
        components: {
            cover: illustration
        },
        data() {
            return {
                categoryList: []
            }
        },
        mounted() {
            this.loadAllCategory();
        },
        methods: {
            async loadAllCategory() {
                await getAllCategory().then(e => {
                    this.categoryList = e.result
                })
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/category/category.css";
</style>