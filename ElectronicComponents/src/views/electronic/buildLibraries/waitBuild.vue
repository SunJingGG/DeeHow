<template>
  <div>
    <div v-if="!buildIO">
      <!-- <embed :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath=/home/www/apps/file/2018-08-20/8c02590e-161d-4529-a07c-493189864954.svg'" type=""> -->
      <div>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="search.partName" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="readData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="clearfix">
          <div class="scard" v-for="(item,index) in listData" :key="index">
            <a class="card">
              <div class="card-heading">
                <h4>
                  物料名称:
                  <strong>{{item.partName}}</strong>
                </h4>
              </div>
              <div class="card-content"> 申请日期 : {{item.processStartTime}}</div>
              <div class="card-actions">
                <button type="button" style="background:#409eff;border:1px solid #409eff;" class="btn btn-danger btn-sm" @click="buildWarehouse(index)">
                  <i class="icon-folder-close-alt"></i> 建库
                </button>
                <button type="button" class="btn btn-warning btn-sm" style="background:#fff;border:1px solid #409eff;color:#409eff" @click="lookDetail(index)">
                  <i class="icon icon-file-text-o"></i> 审批
                </button>
                <div class="pull-right" style="color:#409eff" @click="lookAttachment(index)">
                  <i class="icon-search"></i> 查看附件
                </div>
                <!-- <div style="padding:20px 0">
                  <button type="button" class="btn btn-primary" @click="buildWarehouse(index)">
                    <i class="icon-folder-close-alt"></i> 提交审批
                  </button>
                </div> -->
              </div>
              
            </a>
          </div>
        </div>

        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <el-button type="text" @click="buildIO = false">
          <i class="el-icon-d-arrow-left"></i>
        </el-button>
      </div>
      <build-lib-audit :sdata='buildObj' :auditObj="auditObj"></build-lib-audit>
      <!-- <build-lib :sdata='buildObj' :auditObj="auditObj" v-if="!auditObj.type"></build-lib> -->
    </div>
  </div>
</template>

<script>
import buildLib from "./compont/buildLib";
import buildLibAudit from "./compont/buildLibAudit";
import {
  readOrderPage,
  buildLibApply,
  startProcessOrder,
  readAddApplyDetail,
  addWarehousingProcess
} from "@/api/ele";
export default {
  components: {
    buildLib,
    buildLibAudit
  },
  data() {
    return {
      fullscreenLoading: false,
      buildIO: false,
      pdfSrc: "",
      listData: [],
      search: {
        partName: "",
        status: "3"
      },
      total: 0,
      buildObj: {},
      auditIO: null
    };
  },
  methods: {
    lookDetail(index) {
      // startProcessOrder({ processKey: "libraryApply" }).then(res => {
      //   buildLibApply({
      //     status: "5",
      //     id: this.listData[index].id,
      //     putStorageProcessKey: res.processInstanceId
      //   })
      //     .then(response => {
      //       this.readData();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }).catch(err=>{
      //   console.log(err)
      // });
      let obj = {
        id:this.listData[index].id,
        status:'0'
      }
      // if(this.listData[index].status == 4){
      //   obj.status = '1';
      // }
      addWarehousingProcess(obj).then(res=>{
        console.log(res)
        this.readData();
      }).catch(err=>{
        cosnole.log(err)
      })
    },
    buildWarehouse(index) {
      readAddApplyDetail({ id: this.listData[index].id })
        .then(res => {
          console.log(res);
          // if(res.data.type){
          this.buildObj = this.listData[index];
          this.auditObj = res.data;
          this.buildIO = true;
          /** */
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    lookAttachment(index) {
      let newWin = window.open(
        "http://" +
          window.location.host +
          "/deehow-CMS-Web/public/file/view?filePath=" +
          this.listData[index].dataSheet
      );
    },
    readData() {
      this.fullscreenLoading = true;
      readOrderPage(this.search)
        .then(res => {
          console.log(res);
          this.listData = res.data;
          this.listData.push();
          this.total = res.total;
          this.fullscreenLoading = false;
        })
        .catch(err => {});
    },
    stateFormat(row, column) {
      let state = row[column.property];

      if (state == 0) {
        return "停用";
      } else if (state == 1) {
        return "启用";
      } else {
        return "--";
      }
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
    // this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
.scard {
  width: 350px;
  float: left;
  margin-right: 30px;
}
</style>
