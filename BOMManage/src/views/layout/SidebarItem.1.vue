<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <!-- <router-link v-if="item.children.length>0" :to="item.menuUrl" :key="item.menuUrl">
        <el-menu-item :index="item.menuUrl+'/'+item.children[0].menuUrl">
          <i class="el-icon-location"></i> <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
      </router-link> -->
      <el-submenu :index="item.menuName" :key="item.menuUrl">
        <template slot="title">
          <i class="el-icon-location"></i>{{item.menuName}}
        </template>
        <template v-for="child in item.children">
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.menuUrl"> </sidebar-item>
          <router-link v-else class="menu-indent" :to="child.menuUrl" :key="child.menuUrl">
            <el-menu-item :index="item.menuUrl+'/'+child.menuUrl" :class="{active:$route.matched[0].menuUrl===child.menuUrl}">
              {{child.menuName}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { generateTitle } from "@/utils/i18n";

export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    generateTitle
  },
  mounted() {
    console.log(this.routes);
  }
};
</script>

