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
                  <i class="icon-folder-close-alt"></i> 改库
                </button>
                <button type="button" style="background:#fff;border:1px solid #409eff;color:#409eff" class="btn btn-warning btn-sm" @click="lookDetail(index)">
                  <i class="icon icon-file-text-o"></i> 审批
                </button>
                <div class="pull-right text-danger" @click="lookAttachment(index)">
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
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="modified" label="属性名称" width="150"></el-table-column>
        <el-table-column property="modifiedValue" label="原值" width="200"></el-table-column>
        <el-table-column property="originalValue" label="目标值"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesAudit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import buildLibAudit from "./compont/buildLibAudit";
import {
  readReviseApplyPage,
  updateReviseApplyStatus,
  startProcessOrder,
  readReviseApplyDetail,
  readReviseApplyMore
} from "@/api/ele";
export default {
  components: {
    buildLibAudit
  },
  data() {
    return {
      fullscreenLoading: false,
      dialogTableVisible :false,
      buildIO: false,
      pdfSrc: "",
      listData: [],
      search: {
        partName: "",
        status: "3",
        byClaimant:"me"
      },
      total: 0,
      buildObj: {},
      auditIO: null,
      gridData:[],
      auditIndex:null,
    };
  },
  methods: {
    lookDetail(index) {
      startProcessOrder({ processKey: "libraryModifyApply" }).then(res => {
        updateReviseApplyStatus({
          status: "4",
          id: this.listData[index].id,
          putStorageProcessKey: res.processInstanceId
        })
          .then(response => {
            this.readData();
          })
          .catch(err => {
            console.log(err);
          });
      }).catch(err=>{
        console.log(err)
      });
    },
    buildWarehouse(index) {
      this.auditIndex = index
      readReviseApplyMore({ id: this.listData[index].id })
        .then(res => {
          console.log(res);
          this.gridData = res.data.detailList?res.data.detailList:[];
          this.dialogTableVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    yesAudit(){
      let index = this.auditIndex ;
      readReviseApplyDetail({ id: this.listData[index].id })
        .then(res => {
          console.log(res);
          this.buildObj = this.listData[index];
          this.auditObj = res.data;
          this.dialogTableVisible = false;
          this.buildIO = true;
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
      readReviseApplyPage(this.search)
        .then(res => {
          console.log(res);
          this.listData = res.data;
          // this.listData.push({
          //   applyProcessKey: "8",
          //   claimant: "1027156532080177154",
          //   createBy: "4",
          //   createTime: "2018-08-13 15:01:48",
          //   dataSheet:
          //     "/home/data/file/2018-08-15/f8b80bce-ef27-4d67-80d9-c4bd7076b695.pdf",
          //   email: "",
          //   enable: "1",
          //   id: "1028899402487189505",
          //   keyword: "",
          //   packageType: "",
          //   partName: "测试",
          //   processStatus: "1",
          //   putStorageProcessKey: "",
          //   remark: "",
          //   status: "2",
          //   updateBy: "4",
          //   updateTime: "2018-08-13 15:01:48"
          // });
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
