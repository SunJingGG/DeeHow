<template>
  <div>
    <div class="green-box">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="" style="margin:0">
          <el-cascader placeholder="请选择分类" :options="categoryTree" :props="{
              value:'id',
              label:'categoryName',
              children:'childrenList',
            }" filterable v-model="cateID" style="width:100%"></el-cascader>
        </el-form-item>
        <el-form-item label="" style="margin:0">
          <el-input v-model="search.partNumber" placeholder="物料编号"></el-input>
        </el-form-item>
        <el-form-item style="margin:0">
          <el-button @click="readData" icon="el-icon-search" circle></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:15px;cursor: pointer;">
      <el-table :data="listData" style="width: 100%" v-loading="fullscreenLoading" @row-click='selectRow' element-loading-text="拼命加载中">
        <el-table-column prop="manufacturer" label="制造商"></el-table-column>
        <el-table-column prop="partNumber" label="物品编号"></el-table-column>
        <el-table-column prop="partName" label="名称"></el-table-column>
        <el-table-column prop="partType" label="类型"></el-table-column>
        <el-table-column prop="productModel" label="规格"></el-table-column>
        <el-table-column prop="packageType" label="封装类型"></el-table-column>
        <el-table-column prop="preRanking" label="质量等级"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {readProductPage} from '@/api/bom'
import {readCategoryTree} from '@/api/product'
export default {
  data(){
    return {
      dialogFormVisible: false,
      fullscreenLoading: false,
      categoryTree:[],
      categoryList:[],
      search: {
        partNumber: "",
        categoryId: "",
        pageNum: 1,
        pageSize: 10
      },
      cateID:[],
      total: 0,
      listData: [],
    }
  },
  methods:{
    readData(){
      this.fullscreenLoading = true;
      if(this.cateID.length>0){
        this.search.categoryId = this.cateID[this.cateID.length-1];
      }
      readProductPage(this.search).then(res=>{
        console.log(res);
        this.listData = res.data;
        this.total = res.total; // 总条数
        this.fullscreenLoading = false;
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readData();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readData();
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
        .catch(err => {
          console.log(err);
        });
    },
    selectRow(a,b){
      console.log(a)
      console.log(b)
      this.$emit('reciveProduct',a)
    }
  },
  mounted(){
    this.getSelectOption();
    this.readData()
  }
}
</script>
