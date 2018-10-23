<template>
  <div class="OrderListsContainer">
    <div class="OrderListsBox" v-if="detailIO">
      <div class="searchBox">
        <el-input v-model="search.unitName" placeholder="请输入企业名"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="readData">搜索</el-button>
      </div>
      <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border>
        <el-table-column prop="orderNo" label="订单编号">
        </el-table-column>
        <el-table-column prop="unitId" label="企业ID">
        </el-table-column>
        <el-table-column prop="unitName" label="企业名称">
        </el-table-column>
        <el-table-column prop="unitCode" label="单位编号">
        </el-table-column>
        <el-table-column prop="sum" label="总价">
        </el-table-column>
        <el-table-column prop="personNum" label="使用人数">
        </el-table-column>
        <el-table-column prop="validityTime" label="有效期（年）">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-star-off" circle @click="OrderDetail(scope.row.id)"></el-button>
              <el-button type="primary" icon="el-icon-delete" circle @click="DeleteOrder(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
     <div class="orderDetailBox" v-else>
       <p><b>订单信息</b><el-button type="primary" @click="detailIO=true">返回</el-button></p>
          <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="订单编号">
                  <span>{{message.orderNo}}</span>
                </el-form-item>
                <el-form-item label="订单金额">
                 <span>{{message.sum}}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{message.createTime}}</span>
                </el-form-item>
                 <el-form-item label="创建人">
                  <span>{{message.createBy}}</span>
                </el-form-item>
          </el-form>
        <p><b>模块信息</b></p>
         <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="modelName"
              label="模块名称">
            </el-table-column>
            <el-table-column
              prop="modelId"
              label="模块id">
            </el-table-column>
            <el-table-column
              prop="expiryTime"
              label="到期时间">
            </el-table-column>
         </el-table>
      </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
.OrderListsContainer {
  .searchBox {
    float: left;
    margin-bottom: 20px;
    .el-input {
      width: 150px;
      float: left;
      margin-right: 10px;
    }
  }
  .OrderListsBox {
    .el-pagination {
      margin-top: 20px;
    }
    .addbtn{
      float:right;
      margin-right: 50px;
    }
  }
  .orderDetailBox{
    p{
      height:30px;
      line-height: 30px;
      font-size: 16px;
      border-bottom: 1px solid #ccc;
      .el-button{
        float:right;
        height:24px;
        line-height: 8px;
        margin-right: 30px;
      }
    }
    .el-form{
      width:950px;
      margin-top: 20px;
      span{
        display: inline-block;
        width:150px;
        border:1px solid #ccc;
        border-radius: 5px;
        padding-left: 10px;
      }
    }
     .el-table{
        margin-top: 20px;
      }
  }
}
</style>

<script>
import { getOrderLists,deleteorder,orderdetail } from "@/api/order";
export default {
  data() {
    return {
      fullscreenLoading: false,
      detailIO:true,
      listData: [],
      search: {
        unitName: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      message:{},
      tableData:[],
    };
  },
  methods: {
    readData() {
      this.fullscreenLoading = true;
      getOrderLists(this.search).then(res => {
        this.listData = res.data;
        this.total = res.total; // 总条数
        this.fullscreenLoading = false;
      }).catch(err=>{
        console.log(err)
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readData();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readData();
    },
    DeleteOrder(id){
      let object=new Object();
      let array=new Array();
      array.push(id);
      object.ids=array;
      deleteorder(object).then(res => {
        this.readData();
        this.$message({
                type: "success",
                message: "删除成功"
              });  
      })
    },
    OrderDetail(id){
      this.detailIO = false;
      let object=new Object();
      object.id=id;
       orderdetail(object).then(res => {
         console.log(res);
          if(res.data){
                this.message=res.data;  
                this.tableData=this.message.orderSonList;
           }else{
              
           }
       })
    },
  },
  mounted() {
    console.log(this.$route)
    this.readData();
  }
};
</script>
