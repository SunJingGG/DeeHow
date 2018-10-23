<template>
  <div>
    <vheader></vheader>
    <div class="clearfix">
      <router-view></router-view>
    </div>
    <!-- <vfooter></vfooter> -->
  </div>
</template>
<script>
import  vheader  from './headerOther.vue'
import  vfooter  from './footer.vue'
export default {
  components:{
    vheader,vfooter
  }
}
</script>
