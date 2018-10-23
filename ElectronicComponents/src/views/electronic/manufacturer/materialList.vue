<template>
  <div>
    <div v-if="detailIO==1">
      <div class="green-box">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="" style="margin:0">
            <el-input v-model="search.componentName" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item style="margin:0">
            <el-button @click="readData" icon="el-icon-search" circle></el-button>
            <el-button @click="addData" icon="el-icon-plus" circle></el-button>
            <el-button @click="detailIO=2" icon="">批量添加</el-button>
            <el-button @click="detailIO=4" icon="">批量更新</el-button>
            <!-- <el-button @click="download" icon="el-icon-download" circle></el-button>
            <el-upload class="upload-demo" :on-success="onSuccess" :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/manufacturers/import/look'" :on-change="handleChange" :file-list="fileList3">
              <el-button icon="el-icon-upload2" circle></el-button>
              <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-top:0px">只能上传xlsx文件</div>
            </el-upload> -->
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top:15px">
        <el-table :data="listData" style="width: 100%" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
          <el-table-column prop="componentName" label="名称" width="280"></el-table-column>
          <el-table-column prop="manufacturersName" label="生产厂家" width="280"></el-table-column>
          <el-table-column prop="manufacturersNo" label="编号" width="150"></el-table-column>
          <el-table-column prop="componentState" label="生产状态" width="150" :formatter="stateFormat"></el-table-column>
          <el-table-column prop="suppliersName" :show-overflow-tooltip="true" label="代理商"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="audit(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteData( scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="物料" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="生产厂家" :label-width="formLabelWidth" prop="manufacturersId">
            <el-select v-model="form.manufacturersId" clearable filterable placeholder="请选择" style="width:90%" :disabled="isUse">
              <el-option v-for="item in manufacturerList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <router-link to="/ELECTRONIC/manufacturer/manufacturerList">
              <el-button icon="el-icon-plus"></el-button>
            </router-link>
          </el-form-item>
          <el-form-item label="物料名称" :label-width="formLabelWidth" prop="componentName">
            <el-input v-model="form.componentName" placeholder="物料名称" :disabled="isUse"></el-input>
          </el-form-item>
          <el-form-item label="物料编号" :label-width="formLabelWidth" prop="manufacturersNo">
            <el-input v-model="form.manufacturersNo" placeholder="物料编号" :disabled="isUse"></el-input>
          </el-form-item>
          <el-form-item label="生产状态" :label-width="formLabelWidth" prop="componentState">
            <el-select v-model="form.componentState" clearable filterable placeholder="请选择" style="width:100%">
              <el-option label="新产品" value="1"></el-option>
              <el-option label="批量生产" value="2"></el-option>
              <el-option label="不推荐用于新设计" value="3"></el-option>
              <el-option label="停产" value="4"></el-option>
              <el-option label="老产品" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商" :label-width="formLabelWidth" prop="suppliers">
            <el-button icon="el-icon-news" @click="dialogSelectVisible=true">选择代理商</el-button>
            <span v-if="supplirChecked.length>0">已选择{{supplirChecked.length}}家代理商</span>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="代理商" :visible.sync="dialogSelectVisible">
        <div>
          <el-checkbox-group v-model="supplirChecked">
            <el-checkbox v-for="item in supplierList" :key="item.id" :label="item.id" :disabled="isUse">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSelectVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectSupplier">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-if="detailIO==2">
      <div class="into">
        <h4>操作步骤：</h4>
        <p>
          1、下载《用户批量导入模板》
          <a :href="DEEHOWBASEURL + '/deehow-ELIBM-Web/manufacturers/export/format'">
            <el-button type="text">立即下载《批量导入模板》</el-button>
          </a>
        </p>
        <p>2、根据模板整理相应数据，为保障粘贴信息被有效导入，请使用纯文本或数字</p>
        <p>3、信息输入完毕，将文件拖入下方方框中，或者点击选取</p>
        <p>4、预览检查数据(如有问题则会标识出来,敬请改正)</p>
        <p>5、确认导入</p>
        <div>
          <el-upload class="upload-demo" drag :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/manufacturers/import/look'" :on-success="onSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <div v-if="detailIO==4">
      <div class="into">
        <h4>操作步骤：</h4>
        <p>
          1、下载《用户批量导入模板》
          <a :href="DEEHOWBASEURL + '/deehow-ELIBM-Web/manufacturers/export/status/format'">
            <el-button type="text">立即下载《批量导入模板》</el-button>
          </a>
        </p>
        <p>2、根据模板整理相应数据，为保障粘贴信息被有效导入，请使用纯文本或数字</p>
        <p>3、信息输入完毕，将文件拖入下方方框中，或者点击选取</p>
        <p>4、预览检查数据(如有问题则会标识出来,敬请改正)</p>
        <p>5、确认导入</p>
        <div>
          <el-upload class="upload-demo" drag :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/manufacturers/import/status/look'" :on-success="onStatusSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <el-dialog title="导入" :visible.sync="dialogExcelVisible" width='80%'>
      <el-table :data="excelData" style="width: 100%" :row-style="tableRowStyle">
        <el-table-column prop="componentName" label="名称" width="180"></el-table-column>
        <el-table-column prop="manufacturersNo" label="编号" width="180"></el-table-column>
        <el-table-column prop="componentState" label="生产状态"></el-table-column>
        <el-table-column prop="suppliersName" :show-overflow-tooltip="true" label="代理商"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteData( scope.$index)">删除</el-button>
            </template>
          </el-table-column> -->
      </el-table>
      <p>{{errormsg}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExcelVisible = false">取 消</el-button>
        <el-button type="primary" @click="importSupplier">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="dialogExcelStatusVisible" width='80%'>
      <el-table :data="excelData2" style="width: 100%" :row-style="tableRowStyle">
        <el-table-column prop="manufacturersName" label="制造商" width="180"></el-table-column>
        <el-table-column prop="manufacturersNo" label="编号" width="180"></el-table-column>
        <el-table-column prop="componentState" label="生产状态"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteData( scope.$index)">删除</el-button>
            </template>
          </el-table-column> -->
      </el-table>
      <p>{{errormsg}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExcelStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="importStatusSupplier">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  readManufacturersPage,
  updateManufacturers,
  auditManufacturers,
  deleteManufacturers,
  readScmSupplierList,
  importManufacturers,
  lookCheckManufacturers,
  importStatusManufacturers,
  lookCheckStatusManufacturers,
  lookManufacturersPartIsUse
} from "@/api/ele";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogSelectVisible: false,
      dialogExcelVisible: false,
      dialogExportVisible: false,
      dialogExcelStatusVisible: false,
      detailIO: "1",
      formLabelWidth: "80px",
      fullscreenLoading: false,
      supplierList: [],
      manufacturerList: [],
      fileList3: [],
      excelData: [],
      excelData2: [],
      form: {
        componentName: "",
        componentState: "",
        manufacturersId: "",
        manufacturersNo: "",
        remark: "",
        suppliers: "",
        updateBy: "",
        updateTime: ""
      },
      formcus: {
        componentName: "",
        componentState: "",
        manufacturersId: "",
        manufacturersNo: "",
        remark: "",
        suppliers: "",
        updateBy: "",
        updateTime: ""
      },
      search: {
        componentName: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      listData: [],
      rules: {
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        // name: [{ validator: validatePass, trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入属性简称", trigger: "blur" }
        ]
      },
      supplirChecked: [],
      unqualifiedList: [],
      errormsg: "",
      isUse: true
    };
  },
  methods: {
    addData() {
      this.form = Object.assign({}, this.formcus);
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.isUse = false;
      this.supplirChecked = [];
      this.dialogFormVisible = true;
    },
    download() {
      window.location.href =
        this.DEEHOWBASEURL + "/deehow-ELIBM-Web/manufacturers/export/format";
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    onSuccess(res, file, fileList) {
      console.log(res);
      if (res.httpCode != 200) {
        this.$message.error(res.msg);
      } else {
        this.excelData = res.data;
        this.lookUnqualified();
      }
    },
    onStatusSuccess(res, file, fileList) {
      if (res.httpCode != 200) {
        this.$message.error(res.msg);
      } else {
        this.excelData2 = res.data;
        this.lookUnqualified2();
      }
    },
    lookUnqualified() {
      lookCheckManufacturers(this.excelData)
        .then(res => {
          if (res.row) {
            this.unqualifiedList = res.row;
            this.errormsg = res.msg;
          }
          this.dialogExcelVisible = true;
        })
        .catch(err => {});
    },
    lookUnqualified2() {
      lookCheckStatusManufacturers(this.excelData2)
        .then(res => {
          if (res.row) {
            this.unqualifiedList = res.row;
            this.errormsg = res.msg;
          }
          this.dialogExcelStatusVisible = true;
        })
        .catch(err => {});
    },
    tableRowStyle({ row, rowIndex }) {
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      // return '';

      // if(this.unqualifiedList.indexOf('1')){
      //   return 'warning-row';
      // }else{
      //   return ''
      // }
      if (this.unqualifiedList.indexOf((rowIndex + 1).toString()) != -1) {
        return {
          color: "red"
        };
      }
    },
    onSubmit() {
      this.form.suppliersId = this.supplirChecked.join(",");
      if (this.form.id) {
        auditManufacturers(this.form)
          .then(res => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.readData();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        updateManufacturers(this.form)
          .then(res => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.readData();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    selectSupplier() {
      this.dialogSelectVisible = false;
    },
    importSupplier() {
      importManufacturers(this.excelData)
        .then(res => {
          this.$confirm(res.msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.readData();
              this.dialogExcelVisible = false;
            })
            .catch(() => {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    importStatusSupplier() {
      importStatusManufacturers(this.excelData2)
        .then(res => {
          this.$confirm(res.msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.readData();
              this.dialogExcelStatusVisible = false;
            })
            .catch(() => {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    readData() {
      this.fullscreenLoading = true;
      readManufacturersPage(this.search)
        .then(res => {
          // this.listData=res.data;
          // console.log(res)
          if (res.data) {
            if (res.data && res.data.length < 1 && this.search.pageNum != 1) {
              this.page.pageNum--;
              this.readData();
            }
            this.listData = res.data;
            this.total = res.total; // 总条数
            this.fullscreenLoading = false;
          }
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
    },
    audit(index) {
      lookManufacturersPartIsUse({
        manufacturersId: this.listData[index].manufacturersId,
        manufacturersNo: this.listData[index].manufacturersNo
      })
        .then(res => {
          console.log(res);
          this.isUse = res.isUse;
          this.dialogFormVisible = true;
          this.supplirChecked = this.listData[index].suppliersId.split(",");
          this.form = Object.assign({}, this.listData[index]);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteData(index) {
      deleteManufacturers({
        manufacturersId: this.listData[index].manufacturersId,
        manufacturersNo: this.listData[index].manufacturersNo
      })
        .then(res => {
          this.$message.success("操作成功");
          this.readData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSelectOption() {
      readScmSupplierList({ type: "2" })
        .then(res => {
          this.supplierList = res.data;
        })
        .catch(err => {});
      readScmSupplierList({ type: "1" })
        .then(res => {
          this.manufacturerList = res.data;
        })
        .catch(err => {});
    },
    stateFormat(row, column) {
      let state = row[column.property];
      if (state == 1) {
        return "新产品";
      } else if (state == 2) {
        return "批量生产";
      } else if (state == 3) {
        return "不推荐用于新设计";
      } else if (state == 4) {
        return "停产";
      } else if (state == 5) {
        return "老产品";
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.readData();
    this.getSelectOption();
  }
};
</script>
<style  lang="scss" scoped>
.green-box {
  color: #38b03f;
  background-color: #ddf4df;
  border: 1px solid #bae8b6;
  padding: 10px;
}
.into {
  width: 70%;
  margin: 40px auto;
  p {
    margin: 10px;
  }
}
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>
