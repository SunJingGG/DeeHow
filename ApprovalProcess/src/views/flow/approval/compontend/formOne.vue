<template>
  <div>
    
    <div>
      <table class="table table-bordered">
        <tr>
          <td style="width:50%">
            <div class="paragraph alert alert-danger" style="margin-bottom:0">
              <p>
                <span style="font-size:22px">&nbsp;器件信息</span>
              </p>
            </div>
          </td>
          <td>
            <div class="paragraph alert alert-success"  style="margin-bottom:0">
              <p>
                <span style="font-size:22px">客户信息</span>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">器件名称</span> : {{applyData.partName}}
          </td>
          <td>
            <span class="text-muted">客户名称</span> : {{applyData.userName}}
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">封装形式</span> : {{applyData.packageType}}
          </td>
          <td>
            <span class="text-muted">电话</span> : {{applyData.phone}}
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">器件描述</span> : {{applyData.remark}}
          </td>
          <td>
            <span class="text-muted">邮箱</span> : {{applyData.email}}
          </td>
        </tr>
      </table>
    </div>
    <div>
      <span class="text-muted">器件手册</span> : <button @click="lookAttachment" class="btn btn-info btn-mini">预览</button>
    </div>
  </div>
</template>
<script>
import {ApplyDetail} from "@/api/flow"
export default {
  props:['sparams'],
  data(){
    return {
      queryData:{},
      applyData:{},
    }
  },
  methods:{
    readData(){
      ApplyDetail({applyProcessKey:this.sparams.ProcInstId}).then(res=>{
        console.log(res)
        this.applyData = res.data;
        this.$emit('childByValue',res.data.id);
      }).catch(err=>{
        console.log(err)
      })
    },
    lookAttachment(){
      window.open("http://"+window.location.host+'/deehow-CMS-Web/public/file/view?filePath='+this.applyData.dataSheet,"_blank",'PDF');
    },
  },
  mounted(){
    console.log(this.sparams);
    this.queryData = this.sparams;
    this.readData()
  }
}
</script>
<style lang="scss" scoped>

</style>
