<template>
  <div>
    <div class="attribute">
      <el-button type="primary" @click="addData" icon="el-icon-plus">添加属性</el-button>
      <el-table :header-cell-style="rowClass" :data="tableData" border style="width: 100%" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="属性名称" width="180">
        </el-table-column>
        <el-table-column prop="number" label="属性编号" width="180">
        </el-table-column>
        <el-table-column prop="showName" label="显示名称">
        </el-table-column>
        <el-table-column prop="englishName" label="英文名称">
        </el-table-column>
        <el-table-column prop="category" label="所属类别">
        </el-table-column>
        <el-table-column prop="dataType" label="数据类型">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.category != '公共属性'">
              <el-button @click="editAttribute(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteAttribute( scope.$index)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <el-dialog title="属性" :visible.sync="dialogFormVisible">
        <el-form :model="form" :inline="true" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="属性名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="属性编号：" prop="number">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="显示名称：" prop="showName">
            <el-input v-model="form.showName"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" prop="englishName">
            <el-input v-model="form.englishName"></el-input>
          </el-form-item>
          <el-form-item label="所属类别：" prop="category">
            <el-select v-model="form.category" placeholder="请选择所属类别">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型：" prop="dataType">
            <el-select v-model="form.dataType" placeholder="请选择数据类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="form.remark "></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAttribute">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { AddAttribute, GetAttribute, DeleteAttribute } from "@/api/attribute";
export default {
  data() {
    return {
      tableData: [],
      options: [
        {
          value: "整型",
          label: "整型"
        },
        {
          value: "字符串",
          label: "字符串"
        },
        {
          value: "浮点型",
          label: "浮点型"
        },
        {
          value: "布尔型",
          label: "布尔型"
        },
        {
          value: "货币型",
          label: "货币型"
        },
        {
          value: "日期型",
          label: "日期型"
        }
      ],
      options1: [
        {
          value: "扩展属性",
          label: "扩展属性"
        }
      ],
      value: "",
      value1: "",
      dialogFormVisible: false,
      formLabelWidth: "150px",
      fullscreenLoading: false,
      total: 0,
      page: {
        enable: 1,
        pageNum: 1,
        pageSize: 10
      },
      rowClass: {
          background: '#F2F2F2',
          fontSize: '13px',
        },
      form: {
        name: "",
        number: "",
        showName: "",
        englishName: "",
        category: "",
        dataType: "",
        sortNo: 0,
        remark: "",
        delivery: false,
        type: []
      },
      formcus: {
        name: "",
        number: "",
        showName: "",
        englishName: "",
        category: "",
        dataType: "",
        sortNo: 0,
        remark: "",
        delivery: false,
        type: []
      },
      rules: {
        name: [
          { required: true, message: "请输入属性名称", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入属性编号", trigger: "blur" },
        ],
        showName: [
          { required: true, message: "请输入显示名称", trigger: "blur" },
        ],
        englishName: [
          { required: true, message: "请输入英文名称", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择所属类别", trigger: "change" }
        ],
        dataType: [
          { required: true, message: "请选择数据类型", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    addAttribute() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          AddAttribute(this.form).then(res => {
            console.log(res);
            if (res.httpCode == 200) {
              this.dialogFormVisible = false;
              this.getAttribute();
              this.form = {};
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.dialogFormVisible = false;
            } else {
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addData() {
      this.form = Object.assign({}, this.formcus);
      if(this.$refs['form'] !== undefined){
        this.$refs['form'].resetFields();
     }
      this.dialogFormVisible = true;
      // console.log(this.$refs['form'])
    },
    editAttribute(index) {
      this.form = Object.assign({}, this.tableData[index]);
      this.dialogFormVisible = true;
      // AddAttribute(attr).then(res => {
      //   console.log(res);
      //   if (res.httpCode == 200) {
      //     this.dialogFormVisible = false;
      //     this.getAttribute();
      //     this.form = {};
      //     this.$message({
      //       type: "success",
      //       message: "修改成功"
      //     });
      //   } else {
      //   }
      // });
    },
    deleteAttribute(index) {
      DeleteAttribute({ id: this.tableData[index].id }).then(res => {
        this.getAttribute();
        this.$message({
          type: "success",
          message: "删除成功"
        });
      });
    },
    getAttribute() {
      this.fullscreenLoading = true;
      GetAttribute(this.page).then(res => {
        console.log(res);
        if (res.data) {
          if (res.data && res.data.length < 1 && this.page.pageNum != 1) {
            this.page.pageNum--;
            this.getAttribute();
          }
          this.tableData = res.data;
          this.total = res.total; // 总条数
          this.fullscreenLoading = false;
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getAttribute();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getAttribute();
    }
  },
  mounted() {
    this.getAttribute();
  }
};
</script>

<style lang="scss" scoped>
.attribute {
  > .el-button {
    float: right;
    margin-bottom: 10px;
    color: #fff;
  }
  .el-input,
  .el-select {
    width: 170px;
  }
  .block {
    margin-top: 20px;
  }
}
.el-dialog{
  .el-form{
    margin-top: -20px;
    padding-top: 20px;
    border-top:1px solid #ccc; 
  }
  .dialog-footer{
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
}
</style>
