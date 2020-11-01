<template>
    <div class="category-content">
        <h1 class="title">文章分类</h1>
        <div id="content" class="site-content">
            <div class="tag-contents">
                <div id="tags" class="container chip-container" style="margin-top: 0px;">
                    <div class="card">
                        <div class="card-content">
                            <div class="tag-title center-align">
                                <i class="fa fa-bookmark"></i>&nbsp;&nbsp;文章分类
                            </div>
                            <div class="tag-chips">
                                <a :href="'/category-details/'+item.id" v-for="(item,index) in categoryList" :key="index" title="随笔: 1">
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
    import {
        getAllCategory
    } from "../../api/category.api";
    export default {
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