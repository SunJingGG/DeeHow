<template>
  <div class="appWrapper">
    <div class="appNav">
      <navbar-plug></navbar-plug>
    </div>
    <div class="scontent">
      <div class="smain-container">
        <transition  name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { navbarPlug } from "./compont.js";
export default {
  components: {
    navbarPlug
  },
  computed: {
  },
  data() {
    return {
      
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.appWrapper {
  position: absolute;
  width: 100%;
  height: 100%;

  .scontent {
    .smain-container {
      height: 100%;
      -webkit-transition: margin-left 0.5s;
      transition: margin-left 0.5s;
      margin-left: 10px;
      // position: absolute;
      // padding-top:16px;
      padding-right:20px;
      overflow: auto;

    }
  }
}
</style>