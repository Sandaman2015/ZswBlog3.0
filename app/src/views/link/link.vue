<template>
  <div class="content">
    <cover description="{ 友情链接 }" coverHeight="280" coverWidth="100" class="content-warp" />
    <div class="content-cont">
      <div class="link-content-middle">
        <fieldset class="field field-title wow zoomIn">
          <legend>友情链接交换说明</legend>
          <blockquote class="quote">
            <p>本站欢迎交换友链，如需交换链接请在留言板留言，博主不定期对友链进行互动访问。</p>
            <h1>申请要求</h1>
            <div class="demand">
              <i class="fa fa-check" aria-hidden="true"></i>
              <span>原创优先</span>
              <i class="fa fa-check" aria-hidden="true"></i>
              <span>技术优先</span>
              <i class="fa fa-times" aria-hidden="true"></i>
              <span>经常宕机</span>
              <i class="fa fa-times" aria-hidden="true"></i>
              <span>不合法规</span>
              <i class="fa fa-times" aria-hidden="true"></i>
              <span>插边球站</span>
              <i class="fa fa-times" aria-hidden="true"></i>
              <span>红标报毒</span>
            </div>
            <p>希望您在申请本站友链之前请先做好本站链接，申请提交后若无其它额外因素将于72小时内审核，如超过时间还未通过，请私信我。</p>
            <p>注意本站会不定期清理违规友链，如果检测到该链接已无法正常访问，本站依然会为您保留30天恢复期，逾期则剔除该链接。</p>
            <p>如若发现互换友链后未经通知私自撤换友链者，本站将拉黑并永不交换，敬请见谅。</p>
          </blockquote>
        </fieldset>
        <hr class="bg-blue" />
        <div class="links">
          <ul class="link-items fontSmooth" v-if="linklist">
            <li class="link-item fontSmooth wow fadeInLeft"  v-for="(item,index) in linklist" :key="index">
              <a :href="item.src" target="_blank" class="link-item-inner effect-apollo">
                <img :src="item.portrait" alt="Image" class="lazyload" />
                <span class="sitename">{{item.title}}</span>
                <div class="linkdes">{{item.description}}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import illustration from "../../components/Illustration";
import { getAllFriendLink, applyFriendLink } from "../../api/link.api";
export default {
  components: {
    cover: illustration
  },
  data() {
    return {
      linklist: []
    };
  },
  created() {
    this.initLoad();
  },
  methods: {
    async initLoad() {
      await getAllFriendLink().then(e => {
        this.linklist = e.result;
      });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/link/link.css";
</style>