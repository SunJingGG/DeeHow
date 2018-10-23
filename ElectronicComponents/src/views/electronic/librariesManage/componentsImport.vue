<template>
  <div>
    <div class="into">
      <h4>操作步骤：</h4>
      
      <transition name="el-zoom-in-top">
        
        <div v-show="show2" class="transition-box">
          <p>1、选择导入的分类</p>
          <el-cascader placeholder="请选择分类" :options="categoryTree" :props="{
              value:'id',
              label:'categoryName',
              children:'childrenList',
            }" filterable v-model="cateIds" style="width:100%"></el-cascader>
        </div>
      </transition>
      <p>
        2、下载对应的《批量导入模板》
        <a>
          <el-button type="text" @click="download">立即下载《批量导入模板》</el-button>
        </a>
      </p>
      <p>3、根据模板整理相应数据，为保障粘贴信息被有效导入，请使用纯文本或数字</p>
      <p>4、信息输入完毕，将文件拖入下方方框中，或者点击选取</p>
      <p>5、预览检查数据(如有问题则会标识出来,敬请改正)</p>
      <p>6、确认导入</p>
      <p>7、物料编码重复的情况下是否更新数据
        <el-radio v-model="isUpdate" label="1">是</el-radio>
        <el-radio v-model="isUpdate" label="0">否</el-radio>
      </p>
      <div>
        <el-upload class="upload-demo" drag :action="DEEHOWBASEURL+'/deehow-CMS-Web/public/excel/analysis'" :on-success="onSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <el-dialog title="导入" :visible.sync="dialogExcelVisible">
        <!-- <el-table :data="excelData" style="width: 100%"  :row-style="tableRowStyle">
          <el-table-column prop="" label="公司名称" width="180"></el-table-column>
          <el-table-column prop="abbreviation" label="公司简称" width="180"></el-table-column>
          <el-table-column prop="differentCountries" label="国别" width="100"></el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" label="备注"></el-table-column>
        </el-table> -->
        <div style="padding-bottom:10px"> 
          <el-cascader placeholder="请选择分类" :options="categoryTree" :props="{
                value:'id',
                label:'categoryName',
                children:'childrenList',
              }" filterable v-model="cateIds" style="width:100%"></el-cascader>
        </div>
        <div style="padding-bottom:10px"> 
          <el-button type="primary" @click="importExcel" style="width:100%">确 定</el-button>
        </div>
        <div style="width:100%;overflow:auto">
          <table class="table table-bordered" style="table-layout:fixed;">
            <tr v-for="(item,index) in excelData" :key="index" :style="tableRowStyle(index)">
              <td v-for="(v,i) in item" :key="i" width='180'>{{v}}</td>
            </tr>
          </table>
        </div>
        <p>{{errormsg}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogExcelVisible = false">取 消</el-button>
          <el-button type="primary" @click="importExcel">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {
  readCategoryTree,
  lookProductCheckData,
  updataProductByList
} from "@/api/ele";
export default {
  data() {
    return {
      dialogExcelVisible:false,
      show2:true,
      cateIds:[],
      categoryList:[],
      categoryTree:[],
      excelData:[],
      unqualifiedList: [],
      errormsg:'',
      isUpdate:'0',
    };
  },
  methods: {
    download() {
      console.log(this.cateIds);
      if(this.cateIds.length<1){
        return false;
      }
      let str =
        this.DEEHOWBASEURL + "/deehow-ELIBM-Web/elib/anon/product/get/templet?categoryId=" + this.cateIds[this.cateIds.length-1];
      window.location.href = str;
    },
    tableRowStyle(rowIndex) {
      if(this.unqualifiedList.indexOf(rowIndex)!=-1){
        return {
          color:'red',
        };
      }
    },
    getSelectOption(){
      readCategoryTree({})
        .then(res => {
          //对数组进行一些操作o
          function removeTreeChildren(arr) {
            arr.forEach((v, i) => {
              if (v.childrenList && v.childrenList.length > 0) {
                removeTreeChildren(v.childrenList);
              } else {
                delete v.childrenList;
              }
            });
            return arr;
          }
          
          function treeToArr(obj,menuArr){
            obj.forEach((val,key)=>{
              menuArr.push(val)
              if(val.childrenList&&val.childrenList.length>0){
                treeToArr(val.childrenList,menuArr)
              }
            });
            return menuArr
          }
          let sarr = removeTreeChildren(res.data);
          let aarr =treeToArr(res.data,[]);
          this.categoryList = aarr;
          this.categoryTree = sarr;
        })
    },
    onSuccess(res, file, fileList) {
      console.log(res)
      // let arr = [];
      // res.data.forEach((v,i)=>{
      //   if(i>0){
      //     let obj = {
      //       type:this.search.type,
      //       name:v[0],
      //       abbreviation:v[1],
      //       differentCountries:v[2],
      //       remark:v[3],
      //     }
      //     arr.push(obj)
      //   }
      // })
      this.excelData = res.data;
      this.lookUnqualified();
      console.log()
    },
    lookUnqualified(){
      console.log(this.excelData)
      let obj = {
        isUpdate:this.isUpdate,
        dataList:this.excelData,
      }
      lookProductCheckData(obj).then(res=>{
        console.log(res.data)
        // if(!res.data){
        // }else if(res.data.state==3){
        //   let arr = [];
        //   let msg = ""
        //   res.data.dataRepeatList.forEach((v,i)=>{
        //     arr.push(v.indexs)
        //     msg+= `第[${Number(v.indexs)+1}]行${v.name}已存在 , `
        //   })
        //   this.errormsg = msg;
        //   this.unqualifiedList = arr;
        // }else if(res.data.state==2){
        //   let arr = [];
        //   let msg = ""
        //   res.data.excelRepeatList.forEach((v,i)=>{
        //     arr=arr.concat(v.indexs)
        //     msg+= `名称为[${v.name}]在${v.indexs.join(',')}重复 , `
        //   })
        //   this.errormsg = msg;
        //   this.unqualifiedList = arr;
        // }else{
        // }
        let msg = res.data.join(',');
        this.unqualifiedList = res.data;
        this.errormsg = '第'+msg+'行物料编码重复'
        this.dialogExcelVisible = true;
      }).catch(err=>{
        console.log(err)
      })
    },
    importExcel(){
      if(this.cateIds.length<1){
        this.$message.error('请选择分类')
        return false
      }
      let obj = {
        isUpdate:this.isUpdate,
        dataList:this.excelData,
        categoryId:this.cateIds[this.cateIds.length-1],
      }
      updataProductByList(obj).then(res=>{
        console.log(res)
        this.dialogExcelVisible = false;
        this.$message.success('操作成功')
        this.readData();
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
.into {
  width: 70%;
  margin: 40px auto;
  p {
    margin: 10px;
  }
}
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>

