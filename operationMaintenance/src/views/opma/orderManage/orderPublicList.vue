<template>
  <div class="OrderListsBox">
    <div class="searchBox">
      <el-input v-model="search.unitName" placeholder="请输入企业名"></el-input>
      <el-button icon="el-icon-search" type="primary" @click="readData">搜索</el-button>
    </div>
    <div>

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
        <el-table-column label="认领订单">
          <template slot-scope="scope">
            <!-- <router-link :to="{path:'/OPMA/orderManage/myOrder',query:scope.row.id}"> -->
              <el-button round type="primary" size="mini" @click="clickClaim(scope.row.id)">认领订单</el-button>
            <!-- </router-link> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
.searchBox {
  padding-bottom: 20px;
  float:left;
  .el-input {
    width: 160px;
    float: left;
    margin-right: 10px;
  }
}
.OrderListsBox {
  .el-pagination {
    margin-top: 20px;
  }
}
</style>


<script>
import { getOrderLists, claimOrder } from "@/api/order";
export default {
  data() {
    return {
      fullscreenLoading: false,
      detailIO: false,
      listData: [],
      search: {
        unitName: "",
        operatingPersonnel:"0",
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  methods: {
    readData() {
      getOrderLists(this.search)
        .then(res => {
          this.listData = res.data;
          this.total = res.total; // 总条数
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickClaim(id) {
      let object = new Object();
      object.id = id;
      claimOrder(object).then(res => {
        console.log(res);
        this.readData();
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readData();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readData();
    }
  },
  mounted() {
    this.readData();
  }
};
</script>
