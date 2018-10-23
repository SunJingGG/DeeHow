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
          <el-table-column prop="email" label="邮箱" min-width="100"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookAttachment( scope.$index)" size="small">查看附件</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookDetail( scope.$index)" size="small">认领</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="部门" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="元器件名称" prop="deptName">
          <el-input v-model="form.partName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="form.parentId" style="width:100%" placeholder="选择上级部门">
            <el-option v-for="(item,index) in deptList" :key="index" :label="item.deptName" :value="item.id"></el-option>
            <el-option  label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门编号" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="部门排序" prop="sortNo">
          <el-input v-model="form.sortNo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  readOrderPage,
  reciveOrder
} from "@/api/ele";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      dialogPDFVisible: false,
      pdfSrc: '',
      listData: [],
      deptList: [],
      detailIO: false,
      imageUrl: "",
      search: {
        partName: "",
        status:'0',
      },
      rowClass: {
          background: '#F2F2F2',
          fontSize: '13px',
        },
      total: 0
    };
  },
  methods: {
    lookDetail(index){
      reciveOrder({claimant:'0',status:'1',id:this.listData[index].id}).then(res=>{
        console.log(res)
        this.$message.success('操作成功')

        this.readData();
      }).catch(err=>{
        console.log(err)
      })
    },
    lookAttachment(index){
      let newWin = window.open('http://'+ window.location.host+'/deehow-CMS-Web/public/file/view?filePath='+this.listData[index].dataSheet);
    },
    readData() {
      this.fullscreenLoading = true;
      readOrderPage(this.search)
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
      
      if(state == 0){
        return "停用"
      }else if(state == 1){
        return "启用"
      }else{
        return "--"
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
