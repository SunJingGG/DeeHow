<template>
  <div class="appWrapper">
    <div class="appNav">
      <navbar></navbar>
    </div>
    <div class="scontent">
      <div class="sidebar-container">
        <sidebar></sidebar>
      </div>
      <div class="smain-container" :style="{'margin-left':mgLeft+'px'}">
        <transition  name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navbar, sidebar } from "./compont.js";
export default {
  components: {
    navbar,
    sidebar
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    mgLeft(){
      if(this.sidebar.opened){
        return 200
      }else{
        return 82
      }
    },
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
    // position: relative;
    .smain-container {
      height: 100%;
      -webkit-transition: margin-left 0.5s;
      transition: margin-left 0.5s;
      margin-left: 200px;
      // position: absolute;
      padding-top:60px;
      padding-right:20px;
      overflow: auto;

    }
  }
}
</style>