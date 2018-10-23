<template>
  <div>
      <div>
        <add-apply v-show="showpart==0"></add-apply>
        <!-- <edit-apply v-show="showpart==0"></edit-apply> -->
      </div>
  </div>
</template>

<script>
import addApply from '../approval/compontend/apply'
import {
  formUrlList,
  ApplyPart
} from "@/api/flow";
export default {
  components:{
    addApply
  },
 data(){
   return{
     showpart:0,
     urllists:[],
     sDis:'1',
     search:{
       unitName: "",
       phone: "",
     },
   }
 },
 methods:{
  //  URLS(){
  //    formUrlList({}).then(res =>{
  //      console.log(res);
  //      this.urllists=res.data;
  //      for(let i;i<this.urllists.length;i++){
  //        console.log(this.urllists[i]);
  //        if(this.urllists[i].urlForm==this.URL){
            
  //        }
  //      }
  //    })
  //  }, 
 },
 mounted(){
  // this.URL=this.$route.query.url;
  // this.URLS();
 }
}
</script>

<style lang="scss" scoped>
.el-form{
  margin-top: 30px;
}
</style>

