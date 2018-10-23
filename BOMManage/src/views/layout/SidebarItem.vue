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
          <i :class="[item.menuIcon,'pr-5']"></i>
          <span slot="title" style="font-size:12px;">{{item.menuName}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.menuUrl"> </sidebar-item>
          <router-link v-else class="menu-indent" :to="project+'/'+item.menuUrl+'/'+child.menuUrl" :key="child.menuUrl">
            <el-menu-item :title="child.menuName" :index="item.menuUrl+'/'+child.menuUrl" :class="{active:$route.matched[0].menuUrl===child.menuUrl}">
              <span slot="title" style="font-size:12px;">{{child.menuName}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

      <!-- 
        <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
       -->
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
    },
    project:{
      type:String,
      default:"",
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

