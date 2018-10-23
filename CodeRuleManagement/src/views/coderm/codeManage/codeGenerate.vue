<template>
  <div>
    <el-row style="padding-top: 20px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" class="demo-form-inline" style="width:600px;margin : 0 auto">
          <el-form-item>
            <el-select v-model="form.codeCategoryId" placeholder="请选择分类">
              <el-option-group v-for="group in treeList" :key="group.id" :label="group.title">
                <el-option v-for="item in group.children" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.num" type="number" placeholder="请输入生成数量"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="generateCode">生成</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <div>
        <table class="table" style="text-align:center">
          <thead>
          <tr>
            <th style="text-align:center">编码</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in listData ">
            <td style="text-align:center">{{item.code}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { getBarcode , readCodingClassTree } from "@/api/codeRule"
  export default {
    data(){
      return {
        treeList:[],
        form:{
          codeCategoryId:"",
          num:null,
        },
        defaultProps:{
          children: "children",
          label: "title",
          value:"id"
        },
        listData:[],
      }
    },
    methods:{
      // 生成编码
      generateCode(){
        if(this.form.codeCategoryId.length == 0){
          this.$message('请选择分类');
          return;
        }
        if(this.form.num <= 0){
          this.$message('请输入正确的数量');
          return;
        }
        getBarcode(this.form).then(res=>{
          if (res.httpCode == 200) {
            let arr = new Array();
            res.data.forEach((v,i)=>{
              let obj = {code : v , snum : 1};
              arr.push(obj);
            })
            this.listData = arr;
          } else {
            this.$message(res.msg);
          }
        }).catch(err=>{
        })
      },
      // 读取分类树
      readTreeList() {
        readCodingClassTree({})
          .then(response => {
            response.data.forEach((v,i) => {
              if(v.children.length>0){
                v.children.forEach((val,ind)=>{
                  delete val.children;
                })
              }
            });
            this.treeList = response.data;
          })
          .catch(error => {
            this.$message.error("数据加载失败！！！");
          });
      },
    },
    mounted(){
      this.readTreeList();
    }
  }
</script>

<style  lang="scss" scoped>
</style>

