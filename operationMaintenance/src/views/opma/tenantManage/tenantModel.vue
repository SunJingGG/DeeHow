<template>
  <div>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <!-- <el-form-item>
          <el-select v-model="search.factory" filterable clearable placeholder="请选择厂别" @change="getDevice">
            <el-option label="一厂" value="一厂"> </el-option>
            <el-option label="二厂" value="二厂"> </el-option>
            <el-option label="三厂" value="三厂"> </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-select v-model="search.userName" placeholder="请选择设备" filterable clearable @change="getType">
            <el-option v-for="(item,index) in deviceList" :key="item.id" :label="item.deviceName" :value="item.deviceName"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="search.deviceType" placeholder="规格型号" filterable clearable style="width:100%">
            <el-option v-for="(item,index) in deviceTypeList" :key="item.id" :label="item.deviceType" :value="item.deviceType"> </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="">
          <el-input v-model="search.unitName" placeholder="单位名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search.phone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search.deviceAppearance" placeholder="添加人"></el-input>
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
        <el-table-column prop="tenantId" label="租户ID" min-width="180"></el-table-column>
        <el-table-column prop="modelName" label="模块名称" min-width="150"></el-table-column>
        <el-table-column prop="payment" label="支付方式" min-width="150"></el-table-column>
        <el-table-column prop="createTime" label="开始时间" min-width="180"></el-table-column>
        <el-table-column prop="modelValidate" label="结束时间" min-width="180"></el-table-column>
        <el-table-column prop="createBy" label="添加人" min-width="180"></el-table-column>
        <!-- <el-table-column prop="status" label="状态" min-width="130" :formatter="stateFormat"></el-table-column> -->
        <!-- <el-table-column prop="faultGongshi" label="标准工时" min-width="300"></el-table-column> -->
        <!-- <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="audit( scope.$index,1)" size="small">通过</el-button>
            <el-button type="text" @click.native.prevent="audit( scope.$index,2)" size="small">打回</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block" style="margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="原因" :visible.sync="detailIO">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="记录原因">
          <el-input type="textarea" v-model="form.remark" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailIO = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { readRegisterPage, updateRegister , readSelectTenantModelList} from "@/api/opma";
export default {
  data() {
    return {
      fullscreenLoading: false,
      listData: [],
      detailIO:false,
      search: {
        unitName: "",
        phone: "",
        status:"1",
        pageNum: 1,
        pageSize: 10
      },
      form: {},
      total: 0,
    };
  },
  methods: {
    readData() {
      this.fullscreenLoading = true;
      readSelectTenantModelList(this.search)
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
    audit(index, status) {
      this.form.id = this.listData[index].id;
      this.form.status = status;
      this.detailIO = true;
    },
    onSubmit(){
      updateRegister(this.form)
        .then(res => {
          
          if(res.httpCode == 200){
            this.form.id = "";
            this.form.remark = "";
            this.detailIO = false;
            this.$message.success('操作成功');
            this.readData();
          }
        })
        .catch(err => {});
    },
    stateFormat(row, column) {
      let state = row[column.property];
      
      if(state == 0){
        return "申请"
      }else if(state == 1){
        return "通过"
      }else if(state == 2){
        return "打回"
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
  }
};
</script>
<style lang="scss" scoped>
</style>

