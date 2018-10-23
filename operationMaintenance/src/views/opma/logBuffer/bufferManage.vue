<template>
  <div>
    <div class="alert alert-info with-icon">
      <i class="icon-info-sign"></i>
      <div class="content">
        1、清除用户：com.deehow.service.SysUserService 
        2、清楚表: SysModelMenu 
        3、清楚shiro: Permission
        4、啥也不添，清除所有
      </div>
    </div>
    <div class="alert alert-warning with-icon">
      <i class="icon-info-sign"></i>
      <div class="content">
        如果数据量过大 , 请谨慎清除缓存 , 尽量不要全清 , 输入key来清对应的缓存
      </div>
    </div>
    <div>
      <el-input v-model="key" placeholder="key"  @keyup.enter.native="onSubmit"></el-input>
    </div>
    <div style="margin-top:20px">
      <el-button style="width:100%" type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
import { clearCache } from "@/api/opma";
export default {
  data(){
    return {
      key:'',
    }
  },
  methods:{
    onSubmit(){
      clearCache({key:this.key}).then(res=>{
        this.$message.success('ok')
      }).catch(err=>{
        console.log(err)
        // this.$message.success('ok')
      })
    }
  }
}
</script>
