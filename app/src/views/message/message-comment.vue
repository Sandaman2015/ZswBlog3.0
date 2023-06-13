<template>
    <div>
        <div class="cont wow fadeInRight">
            <ul v-if="messageList" >
                <li v-for="(item,index) in messageList" :key="index">
                    <div class="main-reply">
                        <div class="user-info">
                            <!-- 图片的路径 -->
                            <img :src="item.userPortrait" alt="头像" class="userImage" />
                            <p class="info">
                                <!-- 用户名 -->
                                <a href="javascript:void(0)" class="name white">{{item.userName}}</a>
                            </p>
                            <div class="comment" v-html="item.content"></div>
                            <div class="more">
                                <p class="date">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                    {{item.createDate|subTDate}}
                                </p>
                                <p class="location">
                                    <i class="fa fa-location-arrow" aria-hidden="true"></i>
                                    {{item.location}}
                                </p>
                                <p class="browser">
                                    <i class="fa fa-chrome" aria-hidden="true"></i>
                                    {{item.browser}}
                                </p>
                                <p class="submit">
                                    <span type="text" class="reply fir-reply shiny"
                                        @click="showEditor($event)">回复</span>
                                </p>
                            </div>
                        </div>
                        <div v-bind:class="{'editor-reply':true,'hide':true }">
                            <form class="form">
                                <div class="reply-box">
                                    <editor class="box" ref="textArea" />
                                </div>
                                <div class="submit">
                                    <el-button @click="mainSubmit(index,$event)" class="right" size="small">提交回复
                                    </el-button>
                                    <span hidden>{{item.userId}}</span>
                                    <span hidden>{{item.id}}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="all-reply">
                        <div class="reply-list" v-for="(replyEntry,replyIndex) in item.children" :key="replyIndex">
                            <div class="user-info">
                                <img :src="replyEntry.userPortrait" alt="头像" class="userImage" />
                                <p class="info">
                                    <span class="ct">
                                        <a href="javascript:void(0)" class="name">{{replyEntry.userName}}</a>
                                        回复
                                        <a href="javascript:void(0)">@{{replyEntry.targetUserName}}</a>
                                    </span>
                                </p>
                                <div class="comment sec-coment" v-html="replyEntry.content"></div>
                                <div class="more">
                                    <p class="date">
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        {{replyEntry.createDate|subTDate}}
                                    </p>
                                    <p class="location">
                                        <i class="fa fa-location-arrow" aria-hidden="true"></i>
                                        {{replyEntry.location}}
                                    </p>
                                    <p class="browser">
                                        <i class="fa fa-chrome" aria-hidden="true"></i>
                                        {{replyEntry.browser}}
                                    </p>
                                    <p class="submit">
                                        <span type="text" class="reply fir-reply shiny"
                                            @click="showEditor($event)">回复</span>
                                    </p>
                                </div>
                            </div>
                            <div v-bind:class="{'editor-reply':true,'hide':isShow}">
                                <form class="form">
                                    <div class="reply-box">
                                        <editor class="box" :ref="'replytextArea'+index" />
                                    </div>
                                    <div class="submit">
                                        <el-button @click="replySubmit(index,replyIndex,$event)" class="right"
                                            size="small">提交回复</el-button>
                                        <span hidden>{{replyEntry.userId}}</span>
                                        <span hidden>{{replyEntry.id}}</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import editorBar from "../../components/wang-editor";
    import {
        addMessage
    } from "../../api/message.api";
    import {
        get,
        set
    } from "../../utils/storage";
    export default {
        components: {
            editor: editorBar
        },
        props: {
            messageList: {
                type: Array
            }
        },
        data() {
            return {
                isShow: true,
                replyText: ""
            };
        },
        filters: {
            // 过滤日期
            subTDate(data) {
                return data.toString().replace("T", " ");
            }
        },
        methods: {
            // 显示文本编辑器
            showEditor(e) {
                let currentClassName = e.currentTarget.parentElement.parentElement.parentElement.parentElement
                    .lastElementChild
                    .className;
                if (
                    currentClassName == "editor-reply hide"
                ) {
                    e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].className =
                        "editor-reply";
                    e.currentTarget.innerText = "收起";
                } else {
                    e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].className =
                        "editor-reply hide";
                    e.currentTarget.innerText = "回复";
                }
            },
            // 第一个回复
            async mainSubmit(index, target) {
                const mainText = this.$refs.textArea[index].getContent();
                if (mainText !== "" && mainText !== "<p><br></p>") {
                    let userId = get("userId");
                    if (userId !== null) {
                        if (get("userEmail") !== null) {
                            let tUserId = parseInt(
                                target.currentTarget.parentElement.children[1].innerText);
                            let tId = parseInt(
                                target.currentTarget.parentElement.children[2].innerText
                            );
                            // 主回复
                            let param = {
                                browser: this.getBrowser(),
                                userId: parseInt(userId),
                                content: mainText,
                                targetId: tId,
                                targetUserId: tUserId,
                                ip: returnCitySN["cip"]
                            };
                            await addMessage(param).then(e => {
                                if (e.result) {
                                    this.$message({
                                        message: "添加成功",
                                        type: "success"
                                    });
                                    this.changeMessageList();
                                } else if (!e.success) {
                                    this.$message({
                                        message: e.msg,
                                        type: "error"
                                    });
                                }
                            });
                        } else {
                            this.$message({
                                message: "请注册邮箱后再填写哦!",
                                type: "warning"
                            });
                        }
                    } else {
                        this.$message({
                            message: "请先登录哦！",
                            type: "warning"
                        });
                    }
                } else {
                    this.$message({
                        message: "再多写点字吧,我相信你的文笔！",
                        type: "warning"
                    });
                }
            },
            // 获取浏览器
            getBrowser() {
                let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
                let broswer = "";
                let isOpera = userAgent.indexOf("Opera") > -1;
                if (isOpera) {
                    broswer = "Opera";
                } else if (userAgent.indexOf("Firefox") > -1) {
                    broswer = userAgent.substring(66, 78);
                } else if (userAgent.indexOf("Chrome") > -1) {
                    broswer = userAgent.substring(81, 92);
                } else if (userAgent.indexOf("Safari") > -1) {
                    broswer = "Safari";
                } else if (
                    userAgent.indexOf("compatible") > -1 &&
                    userAgent.indexOf("MSIE") > -1 &&
                    !isOpera
                ) {
                    broswer = "IE";
                } else if (userAgent.indexOf("Trident") > -1) {
                    broswer = "Edge";
                } else {}
                return broswer;
            },
            // 第二个回复
            async replySubmit(index, replyIndex, target) {
                //分五次判断
                switch (index) {
                    case 0:
                        this.replyText = this.$refs.replytextArea0[replyIndex].getContent();
                        break;
                    case 1:
                        this.replyText = this.$refs.replytextArea1[replyIndex].getContent();
                        break;
                    case 2:
                        this.replyText = this.$refs.replytextArea2[replyIndex].getContent();
                        break;
                    case 3:
                        this.replyText = this.$refs.replytextArea3[replyIndex].getContent();
                        break;
                    case 4:
                        this.replyText = this.$refs.replytextArea4[replyIndex].getContent();
                        break;
                }
                if (this.replyText !== "" && this.replyText !== "<p><br></p>") {
                    let userId = get("userId");
                    if (userId !== null) {
                        if (get("userEmail") !== null) {
                            let tUserId = parseInt(
                                target.currentTarget.parentElement.children[1].innerText);
                            let tId = parseInt(
                                target.currentTarget.parentElement.children[2].innerText
                            );
                            // 主回复
                            let param = {
                                browser: this.getBrowser(),
                                userId: parseInt(userId),
                                content: this.replyText,
                                targetId: tId,
                                targetUserId: tUserId,
                                ip: returnCitySN["cip"]
                            };
                            await addMessage(param).then(e => {
                                if (e.result) {
                                    this.$message({
                                        message: "添加成功",
                                        type: "success"
                                    });
                                    this.changeMessageList();
                                } else if (!e.success) {
                                    this.$message({
                                        message: e.msg,
                                        type: "error"
                                    });
                                }
                            });
                        } else {
                            this.$message({
                                message: "请注册邮箱后再填写哦!",
                                type: "warning"
                            });
                        }
                    } else {
                        this.$message({
                            message: "请先登录哦！",
                            type: "warning"
                        });
                    }
                } else {
                    this.$message({
                        message: "再多写点字吧,我相信你的文笔！",
                        type: "warning"
                    });
                }
            },
            changeMessageList() {
                this.$emit("changeList");
            }
        }
    };
</script>

<style scoped>
    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    ul:after {
        content: "";
        display: table;
        clear: both;
    }

    li {
        width: 100%;
        min-height: 100px;
        text-align: left;
        margin-top: 10px;
        border-bottom: 1px dashed #f5f5f5;
        list-style: none;
    }

    li:after {
        content: "";
        display: table;
        clear: both;
    }

    .hide {
        display: none;
    }

    .reply-box {
        position: relative;
        width: 100%;
    }

    .main-reply {
        float: left;
        width: 100%;
    }

    .comment {
        width: 100%;
    }

    .all-reply {
        width: 100%;
        box-sizing: border-box;
        margin-left: 50px;
        float: left;
    }

    .editor-reply {
        margin-top: 10px;
    }

    .user-info .userImage {
        float: left;
        margin: 10px 10px;
        border-radius: 20px;
    }

    .user-info .info {
        margin-top: 15px;
        margin-bottom: 10px;
        height: 20px;
    }

    .name {
        float: left;
        font-size: 16px;
    }

    .date {
        float: left;
    }

    .comment {
        max-width: 100%;
        margin-left: 65px;
    }

    .comment p {
        font-size: 16px;
    }

    .info .ct {
        float: left;
    }

    .more {
        line-height: 25px;
        margin-left: 65px;
        margin-top: 10px;
        font-size: 13px;
        color: #555;
    }

    .more:after {
        content: "";
        display: table;
        clear: both;
    }

    .location {
        float: left;
        margin-left: 20px;
    }

    .browser {
        float: left;
        margin-left: 20px;
    }

    a {
        color: #66b1ff;
        text-decoration: none;
    }

    .shiny {
        cursor: pointer;
        display: block;
        position: relative;
        left: 15px;
        font-size: 14px;
        color: #66b1ff;
        border: none;
        background-color: #fff;
    }

    .box,
    .submit {
        width: 70% !important;
    }
</style>