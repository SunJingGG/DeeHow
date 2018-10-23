<template>
  <div class="LoginMain">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
h1,
h2 {
  padding: 0;
  margin: 0;
}
.LoginMain {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: url("../../assets/login/loginBackground.png") center center no-repeat;
  background-size: cover;
  position: relative;
}
</style>


<script>
export default {
  data() {
    return {
      value: "",
      form: {}
    };
  }
};
</script>
