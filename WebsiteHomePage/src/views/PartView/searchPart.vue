<template>
  <div style="padding:20px">
    <div style="padding-top:10px">
      <el-tabs type="card">
        <el-tab-pane label="全局搜索">
          <div class="row">
            <div class="col-md-8">
              <div>
                <el-input style="width:80%" placeholder="请输入内容" v-model="search.productModel" @keyup.enter.native='readData' clearable></el-input>
                <el-button type="warning" @click="readData">搜索</el-button>
              </div>
              <div style="padding:10px">
                条件 :
                <el-checkbox v-model="search.isFree" label="1" @change="look">有现货</el-checkbox>
                <!-- <el-checkbox v-model="search.isFree" label="1">无铅</el-checkbox> -->
                <!-- <el-checkbox v-model="search.isFree" label="1">符合RoHS标准</el-checkbox> -->
              </div>
            </div>
            <div class="col-md-4">
              <div style="text-align:right">
                <p class="search-number">{{total}}</p>
                <p class="text-muted">找到的产品</p>
              </div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="电阻器">
          <div class="row">
            <div class="col-md-6">
              <table class="stable">
                <tr>
                  <td>抵抗性</td>
                  <td>公差</td>
                  <td>生产厂家</td>
                  <td>案例/封装/足迹</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <el-input></el-input>
                  </td>
                  <td>
                    <el-input></el-input>
                  </td>
                  <td>
                    <el-input></el-input>
                  </td>
                  <td>
                    <el-input></el-input>
                  </td>
                  <td>
                    <el-button type="warning">搜索</el-button>
                  </td>
                </tr>
              </table>
            </div>
            <div class="rol-md-4"></div>

          </div>
        </el-tab-pane>
        <el-tab-pane label="连接器">
          <div class="kfz">
            此功能正在加紧开发中.....
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <div class="row">
        <div class="col-md-6 sborder">
          <div class="col-md-3">
            <img style="margin-top: 18px;" :src="DEEHOWBASEURL+'/getView/'+'/home/data/file/mas/Logo/201809/3b142830-0c4a-460c-92ce-9f0bab5674c3.png'" alt="" srcset="">
          </div>
          <div class="col-md-6">
            <p style="font-size: 20px;">从Digi-Key购买此部件</p>
            <p style="margin-top:10px">$1445 UDS 可用</p>
            <p style="margin-bottom:10px">数量:5086</p>
            <el-button round>立即查看价格</el-button>
          </div>
        </div>
        <div class="col-md-6 sborder">
          <div class="col-md-3">
            <img style="margin-top: 18px;" :src="DEEHOWBASEURL+'/getView/'+'/home/data/file/mas/Logo/201809/3b142830-0c4a-460c-92ce-9f0bab5674c3.png'" alt="" srcset="">
          </div>
          <div class="col-md-6">
            <p style="font-size: 20px;">从Digi-Key购买此部件</p>
            <p style="margin-top:10px">$1445 UDS 可用</p>
            <p style="margin-bottom:10px">数量:5086</p>
            <el-button round>立即查看价格</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px">
      <el-table :data="goodsList" style="width: 100%" @cell-click="scellClick" v-loading="fullscreenLoading" border>
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
        <el-table-column prop="number" label="物品编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
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
      <div class="block" style="margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { readCategoryGoodsPage } from "@/api/ele";
export default {
  data() {
    return {
      fullscreenLoading: "",
      goodsList: [],
      search: {
        productModel:'',
        isFree1: false,
        isFree:1,
        pageNum: 1,
        pageSize: 20
      },
      total: 0
    };
  },
  methods: {
    look(){
      console.log(this.search)
    },
    scellClick(row, column) {
      // if (column.property == "diagram") {
      //   this.$router.push("/partdetail");
      // }
      this.$router.push({ path: "/NoNeed/partdetail", query: { id: row.id } });
    },
    readData() {
      this.fullscreenLoading = true;
      if(this.search.isFree){
        this.search.isFree =1;
      }else{
        this.search.isFree =null;
      }
      readCategoryGoodsPage(this.search)
        .then(res => {
          console.log(res);
          this.total = res.total;
          this.goodsList = res.data;
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
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
    console.log(this.$route.query);
    this.search = $.extend(true, this.search, this.$route.query);
    this.readData();
    this.$root.eventHub.$on("RootSearchPart", yourData => {
      console.log(yourData);
      this.search = $.extend(true, this.search, yourData);
      this.readData();
    });
  },
  computed: {
    querySearch() {
      console.log(this.$route.query.productModel);
      return this.$route.query.productModel;
    }
  }
};
</script>

<style lang="scss" scoped>
.simg {
  img {
    width: 24px;
    height: 24px;
  }
}
.stable {
  width: 100%;
  tr {
    td {
      padding: 5px;
    }
  }
}
.kfz {
  width: 100%;
  line-height: 86px;
  font-size: 21px;
  color: #888;
}
.search-number {
  font-size: 35px;
  font-weight: 300;
  font-family: "Open Sans", Sans-serif;
  color: #555;
  line-height: 42px;
}
.sborder{
  border:1px solid #eee;
  background:#f7f7f7;
  padding:20px 10px;
}
</style>
