<template>
  <div style="margin-top:10px">
    <div style="margin-bottom:10px">
      <el-button style="width:100%" type="primary" @click="exportBom">导出</el-button>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="panel">
          <div class="panel-heading">
            基础属性 
            <el-checkbox class="pull-right" v-model="selectAll1" label="1" @change="allSelect(1)">全选</el-checkbox>
          </div>
          <div class="panel-body">
            <div v-for="(item,index) in checkList1" :key="index" class="boxcheck">
              <el-checkbox v-model="checked1" :label="index">{{item}}</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel">
          <div class="panel-heading">
            基础属性
            <el-checkbox class="pull-right" v-model="selectAll2" label="1"  @change="allSelect(2)">全选</el-checkbox>
          </div>
          <div class="panel-body">
            <div v-for="(item,index) in checkList2" :key="index" class="boxcheck">
              <el-checkbox v-model="checked2" :label="index+17">{{item}}</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel">
          <div class="panel-heading">
            基础属性
            <el-checkbox class="pull-right" v-model="selectAll3" label="1" @change="allSelect(3)">全选</el-checkbox>
          </div>
          <div class="panel-body">
            <div v-for="(item,index) in checkList3" :key="index" class="boxcheck">
              <el-checkbox v-model="checked3" :label="index+19">{{item}}</el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectAll1:[],
      selectAll2:[],
      selectAll3:[],
      checked: [],
      checked1: [],
      checked2: [],
      checked3: [],
      vId:'',
      checkList1: [
        "Products and Assemblies",
        "Class",
        "Part Number",
        "Designators",
        "Quantity",
        "元器件名称",
        "规格型号",
        "封装形式",
        "物料类型",
        "质量等级",
        "物料描述",
        "物料描述",
        "Value",
        "Rated Value",
        "Tolerance",
        "Price",
        "Stock"
      ],
      checkList2: ["Manufacturer", "Manufacturer Part Number"],
      checkList3: ["Supplier", "Supplier Part Number", "Lead Time"]
    };
  },
  methods:{
    exportBom(){
      let str = '';
      this.checked = this.checked1.concat(this.checked2).concat(this.checked3)
      this.checked.forEach((v)=>{
        str+='&col='+v
      })
      console.log('?vId='+this.vId+str);
      window.location.href=this.DEEHOWBASEURL+'/deehow-ELIBM-Web/bomComponentManage/export/by_version?vId='+this.vId+str
    },
    allSelect(num){
      if(num == 1){
        if(this.selectAll1.length<1){
          console.log('不选')
          this.checked1 = [];
        }else{
          console.log('全选')
          for(var i = 0 ; i<17;i++){
            this.checked1.push(i)
          }
        }
      }else if(num == 2){
        if(this.selectAll2.length<1){
          console.log('不选')
          this.checked2 = [];
        }else{
          console.log('全选')
          for(var i = 17 ; i<19;i++){
            this.checked2.push(i)
          }
        }
        console.log(this.checked2)
      }else if(num == 3){
        if(this.selectAll3.length<1){
          console.log('不选')
          this.checked3 = [];
        }else{
          console.log('全选')
          for(var i = 19 ; i<22;i++){
            this.checked3.push(i)
          }
        }
      }
    }
  },
  mounted(){
    console.log($('.panel-body').eq(0).height())
    $('.panel-body').height($('.panel-body').eq(0).height()+'px');
    console.log(this.$route.params.data);
    if (!this.$route.params.data) {
      this.$router.replace({ path: "/PROSTRU/myProduct/productList" });
      return false;
    }
    this.vId = this.$route.params.data.id;
  }
};
</script>
<style lang="scss" scoped>
</style>
