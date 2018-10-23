<template>
  <div class="siderbar">

    <el-menu background-color="#32323a" :default-active="$route.path" text-color="#fff" active-text-color="#f85258" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

      <!-- <el-submenu v-for="item in userRuls" :index="item.menuName" :key="item.menuUrl">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.menuName}}</span>
          </template>
            <el-menu-item v-for="v in item.children" :key="v.menuUrl" :index="item.menuUrl+'/'+v.menuUrl">
              <router-link :to="$store.getters.userRuls[0].menuUrl+'/'+item.menuUrl+'/'+v.menuUrl">
                
              {{v.menuName}}
              </router-link>
            </el-menu-item>
        </el-submenu> -->
      <sidebar-item :routes="userRuls" :project="project"></sidebar-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: { SidebarItem },
  data() {
    return {
      bool: false,
      userRuls: [],
      project: ""
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar", "addRouters"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  mounted() {
    this.userRuls = this.$store.getters.userRuls[0].children;
    console.log(this.$store.getters.userRuls[0].menuUrl);
    this.project = this.$store.getters.userRuls[0].menuUrl;
    console.log(this.userRuls[0].children);
  }
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.siderbar {
  position: fixed;
  height: 100%;
  background: #32323a;
  top: 44px;
  overflow: auto;
  padding-bottom: 60px;
}
</style>
