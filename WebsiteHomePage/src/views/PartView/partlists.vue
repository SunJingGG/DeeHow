<template>
  <div class="partcontainer">
    <p class="daohang">
      <font>元器件库</font>
      <span v-for="(item,index) in numIndex" :key="index" @click="toIndex(index)">
        <b>/</b>
        <span>{{item.categoryName}}</span>
      </span>
    </p>
    <div class="row">
      <div class="col-md-2">
        <div class="left-list">
          <ul>
            <li class="ellipsis" v-for="(item,index) in auditList" :key="index" @click="pushList(index)" :title="item.categoryName">{{item.categoryName}}</li>
          </ul>
        </div>
      </div>
      <div class="col-md-10">
        <el-table :data="goodsList" :header-cell-style="{background:'#f7f7f7'}" style="width: 100%"  v-loading="fullscreenLoading" @cell-click="scellClick" border>
          <el-table-column label="制造商">
            <template slot-scope="scope">
              <template v-if="scope.row.manufacturerLogo">
                <img :src="DEEHOWBASEURL +'/getView/' +scope.row.manufacturerLogo" style="height:45px" :alt="scope.row.manufacturer" :title="scope.row.manufacturer" srcset="">
              </template>
              <template v-else>
                <span>{{scope.row.manufacturer}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="image">
            <template slot-scope="scope">
              <template v-if="scope.row.image">
                <img :src="DEEHOWBASEURL +'/getView/' +scope.row.image" style="height:45px" :alt="scope.row.name" :title="scope.row.name" srcset="">
              </template>
              <template v-else>
                <span>{{scope.row.name}}</span>
              </template>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="number" label="物品编号"></el-table-column> -->
          <el-table-column prop="partName" label="名称"></el-table-column>
          <el-table-column prop="partType" label="类型"></el-table-column>
          <el-table-column prop="productModel" label="规格"></el-table-column>
          <el-table-column prop="packageType" label="封装类型"></el-table-column>
          <el-table-column prop="preRanking" label="质量等级"></el-table-column>
          <el-table-column label="可用数据">
            <template slot-scope="scope">
              <div class="simg">
                <img v-if="scope.row.manual" src="../../assets/PartView/icon1.png" data-toggle="tooltip" data-tip-class="tooltip-warning" data-placement="left" title="有数据表" alt="" srcset="">
                <img v-if="!scope.row.manual" src="../../assets/PartView/icon1-1.png" data-toggle="tooltip" data-tip-class="tooltip-danger" data-placement="left" title="暂无数据表" alt="" srcset="">
                <img v-if="scope.row.footPrintCdsSvg" src="../../assets/PartView/icon2.png" data-toggle="tooltip" data-tip-class="tooltip-warning" data-placement="left" title="封装可用" alt="" srcset="">
                <img v-if="!scope.row.footPrintCdsSvg" src="../../assets/PartView/icon2-2.png" data-toggle="tooltip" data-tip-class="tooltip-danger" data-placement="left" title="封装不可用" alt="" srcset="">
                <img v-if="scope.row.symCdsSvg" src="../../assets/PartView/icon3.png" data-toggle="tooltip" data-tip-class="tooltip-warning" data-placement="left" title="原理图可用" alt="" srcset="">
                <img v-if="!scope.row.symCdsSvg" src="../../assets/PartView/icon3.png" data-toggle="tooltip" data-tip-class="tooltip-danger" data-placement="left" title="原理图不可用" alt="" srcset="">
                <img v-if="!scope.row.model3dPath" src="../../assets/PartView/icon4.png" data-toggle="tooltip" data-tip-class="tooltip-danger" data-placement="left" title="3D不可用" alt="" srcset="">
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// readCategoryGoods
import { readCategoryGoods } from "@/api/ele.js";
export default {
  data() {
    return {
      numIndex: [], //顶部的数组
      auditList: [], //侧边栏的数组
      goodsList: [], //物品
      fullscreenLoading:false,
    };
  },
  computed: {
    ...mapGetters(["category"])
  },
  methods: {
    scellClick(row, column) {
      // if (column.property == "diagram") {
      //   this.$router.push("/partdetail");
      // }
      this.$router.push({ path: "/NoNeed/partdetail", query: { id: row.id } });
    },
    toIndex(index) {
      console.log(this.numIndex);
      this.auditList = Object.assign({}, this.numIndex[index].childrenList);
      this.numIndex = this.numIndex.slice(0, index + 1);
    },
    pushList(index) {
      console.log(index);
      console.log(this.auditList[index]);
      if (this.auditList[index].length > 0) {
        this.numIndex.push(Object.assign(this.auditList[index]));
        this.auditList = this.auditList[index].childrenList;
      }
      let obj = { id: this.auditList[index].id };
      this.readData(obj);
    },
    readData(obj) {
      this.fullscreenLoading = true;
      readCategoryGoods(obj)
        .then(res => {
          // console.log(res)
          this.fullscreenLoading = false;
          this.goodsList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initCat() {
      this.numIndex = [];
      console.log(this.category);
      if (this.category.length < 1) {
        this.$router.push("/");
      }
      let slidt = this.category[this.$route.query.index].childrenList;
      this.numIndex.push(this.category[this.$route.query.index]);
      this.auditList = slidt;
      if (
        this.$route.query.childrenIndex ||
        this.$route.query.childrenIndex == 0
      ) {
        console.log("点击子节点进来");
        this.pushList(this.$route.query.childrenIndex);
        return false;
      }
      console.log(this.$route.query);
      let obj = { id: this.category[this.$route.query.index].id };
      this.readData(obj);
      console.log(this.numIndex);
    }
  },
  mounted() {
    this.initCat();
  },
  updated() {
    $('[data-toggle="tooltip"]').tooltip();
  }
};
</script>

<style lang="scss" scoped>
.partcontainer {
  width: 100%;
  padding: 20px 50px;
  .daohang {
    padding-left: 20px;
    // border-bottom: 1px solid #ccc;
    height: 40px;
    b {
      display: inline-block;
      width: 50px;
      text-align: center;
      cursor: pointer;
    }
    span {
      color: #ff791b;
      cursor: pointer;
    }
    font {
      cursor: pointer;
    }
  }
  .left-list {
    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 1px solid #ddd;
      border-bottom: 0;
      text-align: center;
      color: #08c;
      cursor: pointer;
    }
    li:hover {
      background: #f1f1f1;
      color: #666;
    }
    li:first-child {
      border-radius: 5px 5px 0 0;
    }
    li:last-child {
      border-bottom: 1px solid #ddd;
      border-radius: 0 0 5px 5px;
    }
  }
  .box {
    margin-top: 40px;

    .right {
      width: 76%;
      float: left;
      margin-left: 30px;
    }
    .el-table .cell {
      text-align: center;
    }
  }
  .simg {
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>