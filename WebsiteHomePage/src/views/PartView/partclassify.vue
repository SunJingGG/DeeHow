<template>
  <div>
    <div class="banner">
      <h1>特色类别</h1>
      <div class="specialbox">
          <dl>
            <dd><img src="../../assets/PartView/part.png" alt=""></dd>
            <dt>AD,DA转换器</dt>
          </dl>
          <dl>
            <dd><img src="../../assets/PartView/part.png" alt=""></dd>
            <dt>AD,DA转换器</dt>
          </dl>
          <dl>
            <dd><img src="../../assets/PartView/part.png" alt=""></dd>
            <dt>AD,DA转换器</dt>
          </dl>
          <dl>
            <dd><img src="../../assets/PartView/part.png" alt=""></dd>
            <dt>AD,DA转换器</dt>
          </dl>
          <dl>
            <dd><img src="../../assets/PartView/part.png" alt=""></dd>
            <dt>AD,DA转换器</dt>
          </dl>
      </div>
    </div>
    <div class="main">
      <h1>分类</h1>
      <div class="classify">
        <ul>
          <li v-for="(item,index) in category" :key="index">
            <a>{{item.categoryName}}</a>
            <p v-for="(val,i) in item.childrenList" :key="i" class="ponter" @click="toUrl(index,i)"><span>{{val.categoryName}}</span></p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["category"])
  },
  methods: {
    toUrl(index,i){
      this.$router.push({ path: "partlists", query: { index: index , childrenIndex:i} });
    }
  },
  mounted() {
    if(this.category.length<1){
      this.$router.push('/partindex')
    }
    
  }
};
</script>

<style lang="scss" scoped>
.banner {
  // background: #ff791b;
  background: url("../../assets/PartView/banner1.png") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 350px;
  position: relative;
  .specialbox {
    width: 1000px;
    margin: 0 auto;
    padding-top: 30px;
    dl {
      color: #fff;
      width: 200px;
      text-align: center;
      float: left;
      dd {
        width: 120px;
        height: 120px;
        border: 1px solid #fff;
        border-radius: 50%;
        background: #fff;
        margin: 0 auto;
        img {
          width: 60px;
          margin-top: 30px;
        }
      }
      dt {
        margin-top: 10px;
      }
    }
  }
  h1 {
    font-size: 30px;
    text-align: center;
    padding-top: 50px;
    color: #fff;
    margin-top: 0;
  }
}
.main {
  width: 1000px;
  height: 300px;
  margin: 0 auto;
  margin-top: 40px;
  h1 {
    color: #666;
    width: 60px;
    margin: 0 auto;
  }
  .classify {
    margin-top: 30px;
    ul {
      width: 100%;
      height: 700px;
      margin: 10px auto 30px auto;
      li {
        // text-align: center;
        vertical-align:text-top;
        width: 33%;
        line-height: 18px;
        display: inline-block;
        margin: 10px 0;
        min-width: 200px;
        a {
          display: inline-block;
          font-size: 18px;
          color: #ff791b;
          margin: 14px 0;
        }
        p {
          color: #0088cc;
        }
      }
    }
  }
}
.ponter{
  cursor: pointer;
}
</style>
