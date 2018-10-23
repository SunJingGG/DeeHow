<template>
  <div>
    <div v-if="!detailIO">
      <div>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="search.unitName" placeholder="单位名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="search.phone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="readData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border>
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="unitName" label="单位名称" min-width="250"> </el-table-column>
          <el-table-column prop="phone" label="联系电话" min-width="100"></el-table-column>
          <el-table-column prop="principal" label="负责人" min-width="150"></el-table-column>
          <el-table-column prop="sysUnitDTO.userName" label="用户名" min-width="150"></el-table-column>
          <el-table-column prop="sysUnitDTO.auditTime" label="审核时间" min-width="180"></el-table-column>
          <el-table-column prop="sysUnitDTO.auditPerson" label="审核人" min-width="180"></el-table-column>
          <el-table-column prop="sysUnitDTO.auditOpinion" label="审核意见" min-width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookDetail( scope.$index)" size="small">查 看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div title="模块状态" v-if="detailIO">
      <div>
        <ul class="clearfix appList list-group">
          <li class="list-group-item" v-for="(item,index) in modelList" :key="index">
            <img class="appLogo fl" :src="'/deehow-CMS-Web/deehow-CMS-Web/public/file/view?filePath='+item.icon" alt="">
            <!-- <img class="appLogo fl" src="../../../assets/Application/png4.png" alt=""> -->
            <div class="fl btjj">
              <h4>{{item.modelName}}
                <span class="yingzhang">{{item.modelLable}}</span>
                <el-tag v-if="item.type" style="margin-left:10px" type="primary" size="mini">{{item.type}}</el-tag>
              </h4>
              <p class="text-muted">{{item.modelDesc}}</p>
            </div>
            <div class="fr" style="line-height:60px">
              <el-button size="medium" type="text" @click="configuration(item)" v-if="item.enabled == 'Y'">停 用</el-button>
              <el-button size="medium" type="text" @click="configuration(item)">配 置</el-button>
            </div>
          </li>
        </ul>
      </div>
      <div style="text-align:center" class="dialog-footer">
        <el-button @click="detailIO = false">取 消</el-button>
        <!-- <el-button type="primary" @click="onSubmit">添 加</el-button> -->
      </div>
    </div>
    <el-dialog title="使用到期日" :visible.sync="dialogFormVisible" width="30%">
      <div class="todate">
        <el-date-picker v-model="form.modelValidate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss" format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  readSelectTenantUnitPage,
  readSelectTenantModelListStatus,
  updateSelectTenantModelListStatus
} from "@/api/opma";
export default {
  data() {
    return {
      fullscreenLoading: false,
      listData: [],
      modelList: [],
      detailIO: false,
      dialogFormVisible: false,

      search: {
        userName: "",
        phone: "",
        status: "1",
        pageNum: 1,
        pageSize: 10
      },
      
      form: {
        modelValidate: "",
        tenantId: "",
        modelId: ""
      },
      formcus: {
        modelValidate: "",
        tenantId: "",
        modelId: ""
      },
      total: 0
    };
  },
  methods: {
    readData() {
      this.fullscreenLoading = true;
      readSelectTenantUnitPage(this.search)
        .then(response => {
          this.listData = response.data;
          console.log(response.data);
          this.total = response.total; // 总条数
          this.fullscreenLoading = false;
        })
        .catch(error => {
          this.fullscreenLoading = false;
        });
    },
    stateFormat(row, column) {
      let state = row[column.property];
      if (state == 0) {
        return "申请";
      } else if (state == 1) {
        return "通过";
      } else if (state == 2) {
        return "打回";
      }
    },

    lookDetail(index) {
      console.log(this.listData[index]);
      this.form.tenantId = this.listData[index].id;
      readSelectTenantModelListStatus({ tenantId: this.form.tenantId })
        .then(res => {
          console.log(res);
          this.modelList = res.data;
          this.detailIO = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    configuration(item) {
      this.form.modelId = item.modelId;
      this.dialogFormVisible = true;
    },
    onSubmit() {
      updateSelectTenantModelListStatus(this.form).then(res => {
        console.log(res);
        this.$message.success("设置成功");
        // this.imageUrl = "";
        this.readData();
        this.dialogFormVisible = false;
        this.form = Object.assign({}, this.formcus);
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
<style lang="scss" scoped>
.appList {
  margin-top: 20px;
  li {
    float: left;
    width: 100%;
    .btjj {
      margin-left: 20px;
      h4 {
        line-height: 20px;
      }
    }
    .appLogo {
      width: 60px;
    }
  }
  .yingzhang {
    border: 1px solid red;
    color: red;
    padding: 2px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 2px;
  }
}
.el-dialog{
  .todate{
    margin-top: -20px;
    padding-top:20px;
    border-top:1px solid #ccc;
  }
}
</style>

