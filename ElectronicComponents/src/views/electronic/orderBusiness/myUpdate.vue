<template>
  <div>
    <div>
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
        <el-table :header-cell-style="rowClass" :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border>
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="partName" label="名称" min-width="250"> </el-table-column>
          <el-table-column prop="createTime" label="提交时间" min-width="250"> </el-table-column>
          <!-- <el-table-column prop="status" label="状态" min-width="250"> </el-table-column> -->
          <el-table-column prop="email" label="邮箱" min-width="100"></el-table-column>
          <el-table-column label="附件" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookAttachment( scope.$index)" size="small">查看附件</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookDetail( scope.$index)" size="small">提审</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { readReviseApplyPage, reciveOrder, startProcessOrder } from "@/api/ele";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogPDFVisible: false,
      pdfSrc: "",
      listData: [],
      search: {
        status: "3",
        byClaimant: "me",
        partName:'',
      },
      rowClass: {
          background: '#F2F2F2',
          fontSize: '13px',
        },
      total: 0
    };
  },
  methods: {
    lookDetail(index) {
      startProcessOrder({ processKey: "libraryModifyApply" }).then(res => {
        reciveOrder({
          status: "2",
          id: this.listData[index].id,
          applyProcessKey: res.processInstanceId
        })
          .then(response => {
            this.readData();
          })
          .catch(err => {
            console.log(err);
          });
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
</style>
