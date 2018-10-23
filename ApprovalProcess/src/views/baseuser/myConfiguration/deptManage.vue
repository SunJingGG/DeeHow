<template>
  <div>
    <div>
      <div>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="search.unitName" placeholder="单位名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="search.phone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="readData">查询</el-button>
            <el-button type="success" icon="search" @click="addData">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border>
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="deptName" label="部门名称" min-width="250"> </el-table-column>
          <el-table-column prop="remark" label="部门编号" min-width="100"></el-table-column>
          <el-table-column prop="sortNo" label="排序" min-width="150"></el-table-column>
          <el-table-column prop="enable" label="是否启用" :formatter="stateFormat" min-width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookDetail( scope.$index)" size="small">查看</el-button>
              <el-button type="text" @click="removeData( scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="部门" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName"></el-input>
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
        <!-- <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  readDeptPage,
  updateDept,
  updateUseDeptOpen,
  updateUseDeptStop,
  deleteDept,
  readDeptList
} from "@/api/base";

export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      listData: [],
      deptList: [],
      detailIO: false,
      imageUrl: "",
      search: {
        modelName: ""
      },
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        parentId: [
          { required: true, message: "请选择上级部门", trigger: "change" }
        ],
      },
      form: {
        deptName: "",
        parentId: "",
        sortNo: "",
        remark: "",
      },
      formcus: {
        deptName: "",
        parentId: "",
        sortNo: "",
        remark: "",
      },
      total: 0
    };
  },
  methods: {
    addData() {
      this.form = Object.assign({}, this.formcus);
      this.dialogFormVisible = true;
    },
    lookDetail(index){
      this.form = Object.assign({},this.listData[index]);
      this.dialogFormVisible = true;
    },
    removeData(index){
      let arr = this.listData;
      let sdeptList = this.deptList;
      let id = arr[index].id;
      deleteDept({id}).then(res=>{
        this.$message.success('操作成功');
        this.readData();
        for(var i=0;i<sdeptList.length;i++){
          if(id == sdeptList[i].id){
            sdeptList.splice(i,1)
            break;
          }
        }
      })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            updateDept(this.form)
              .then(res => {
                this.$message.success('操作成功');
                this.readData();
                this.getSelectOption();
                this.dialogFormVisible = false;
              })
              .catch(err => {});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
      
    },
    readData() {
      readDeptPage({})
        .then(res => {
          console.log(res);
          this.listData = res.data;
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
    getSelectOption(){
      readDeptList({}).then(res=>{
        this.deptList = res.data;
      })
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
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
</style>
