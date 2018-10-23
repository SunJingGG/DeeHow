<template>
  <div>
    <div v-if="detailIO == 1">
      <div class="green-box">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="" style="margin:0">
            <el-input v-model="search.suppliersNo" placeholder="供应商物料编号"></el-input>
          </el-form-item>
          <el-form-item style="margin:0">
            <el-button @click="readData" icon="el-icon-search" circle></el-button>
            <el-button @click="addData" icon="el-icon-plus" circle></el-button>
            <el-button @click="detailIO=2" icon="">批量添加</el-button>
            <el-button @click="detailIO=4" icon="">导入价格</el-button>
            <!-- <el-button @click="download" icon="el-icon-download" circle></el-button>
            <el-upload class="upload-demo" :on-success="onSuccess" :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/suppliers/import/look'" :on-change="handleChange" :file-list="fileList3">
              <el-button icon="el-icon-upload2" circle></el-button>
              <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-top:0px">只能上传xlsx文件</div>
            </el-upload> -->
          </el-form-item> 
        </el-form>
      </div>
      <div style="margin-top:20px">
        <el-table :header-cell-style="rowClass" :data="listData" style="width: 100%" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
          <el-table-column prop="manufacturersName" label="生产厂家" min-width="180"></el-table-column>
          <el-table-column prop="manufacturersNo" label="厂家物料编号" min-width="180"></el-table-column>
          <el-table-column prop="suppliersName" label="供应商" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersNo" label="供应商物料编号" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersMoq" label="最小订单量" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersStockCycle" label="供货周期" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersStock" label="库存" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersPriceA" label="1" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceB" label="10" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceC" label="50" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceD" label="100" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceE" label="1000" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceF" label="10000" min-width="140"> </el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" width="180" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="audit(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteData( scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      
    </div>
    <div v-else-if="detailIO==2">
      <div class="into">
        <h4>操作步骤：</h4>
        <p>
          1、下载《批量导入模板》<a :href="DEEHOWBASEURL + '/deehow-ELIBM-Web/suppliers/export/format'">
            <el-button type="text">立即下载《批量导入模板》</el-button></a>
        </p>
        <p>2、根据模板整理相应数据，为保障粘贴信息被有效导入，请使用纯文本或数字</p>
        <p>3、信息输入完毕，将文件拖入下方方框中，或者点击选取</p>
        <p>4、预览检查数据(如有问题则会标识出来,敬请改正)</p>
        <p>5、确认导入</p>
        <div>
          <el-upload class="upload-demo" drag  :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/suppliers/import/look'"  :on-success="onSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <div v-else-if="detailIO==4">
      <div class="into">
        <h4>操作步骤：</h4>
        <p>
          1、下载《批量导入模板》<a :href="DEEHOWBASEURL + '/deehow-ELIBM-Web/suppliers/export/format/price'">
            <el-button type="text">立即下载《批量导入模板》</el-button></a>
        </p>
        <p>2、根据模板整理相应数据，为保障粘贴信息被有效导入，请使用纯文本或数字</p>
        <p>3、信息输入完毕，将文件拖入下方方框中，或者点击选取</p>
        <p>4、预览检查数据(如有问题则会标识出来,敬请改正)</p>
        <p>5、确认导入</p>
        <div>
          <el-upload class="upload-demo" drag  :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/suppliers/import/look/price'"  :on-success="onPriceSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="detailIO == 3">
      <div class="col-md-6">
        <div class="panel">
          <div class="panel-heading">
            <el-select v-model="form.suppliersId" clearable filterable placeholder="请选择" style="width:100%" @change="getMaterial" :disabled="form.id?true:false">
              <el-option v-for="item in supplierList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="panel-body">
            <div class="list-group ">
              <a class="list-group-item" v-for="(item,index) in supplierGoodsList" :key="item.id" @click="selectGoods(index)" :class="selectIndex==index?'active':''">
                <h4 class="list-group-item-heading">{{item.manufacturersName}}</h4>
                <p class="list-group-item-text text-muted">{{item.manufacturersNo}}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel">
          <div class="panel-heading">
            <h5>信息填写
              <span class="text-primary">{{form.manufacturersNo}}</span>
            </h5>
          </div>
          <div class="panel-body">
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item label="物料编号" :label-width="formLabelWidth" prop="suppliersNo">
                <el-input v-model="form.suppliersNo" placeholder="物料编号"></el-input>
              </el-form-item>
              <el-form-item label="最小订单量" :label-width="formLabelWidth" prop="suppliersMoq">
                <el-input v-model="form.suppliersMoq" placeholder="最小订单量"></el-input>
              </el-form-item>
              <el-form-item label="备货周期" :label-width="formLabelWidth" prop="suppliersStockCycle">
                <el-input v-model="form.suppliersStockCycle" placeholder="备货周期"></el-input>
              </el-form-item>
              <el-form-item label="库存" :label-width="formLabelWidth" prop="suppliersStock">
                <el-input v-model="form.suppliersStock" placeholder="库存"></el-input>
              </el-form-item>
              <el-form-item label="1" :label-width="formLabelWidth" prop="suppliersPriceA">
                <el-input v-model="form.suppliersPriceA" placeholder="价格"></el-input>
              </el-form-item>
              <el-form-item label="10" :label-width="formLabelWidth" prop="suppliersPriceA">
                <el-input v-model="form.suppliersPriceB" placeholder="价格"></el-input>
              </el-form-item>
              <el-form-item label="50" :label-width="formLabelWidth" prop="suppliersPriceA">
                <el-input v-model="form.suppliersPriceC" placeholder="价格"></el-input>
              </el-form-item>
              <el-form-item label="100" :label-width="formLabelWidth" prop="suppliersPriceA">
                <el-input v-model="form.suppliersPriceD" placeholder="价格"></el-input>
              </el-form-item>
              <el-form-item label="1000" :label-width="formLabelWidth" prop="suppliersPriceA">
                <el-input v-model="form.suppliersPriceE" placeholder="价格"></el-input>
              </el-form-item>
              <el-form-item label="10000" :label-width="formLabelWidth" prop="suppliersPriceA">
                <el-input v-model="form.suppliersPriceF" placeholder="价格"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialog-footer">
              <el-button @click="detailIO= 1">取 消</el-button>
              <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <el-dialog title="导入" :visible.sync="dialogExcelVisible">
        <el-table :data="excelData" style="width: 100%"  :row-style="tableRowStyle">
          <el-table-column prop="manufacturersName" label="生产厂家" min-width="180"></el-table-column>
          <el-table-column prop="manufacturersNo" label="厂家物料编号" min-width="180"></el-table-column>
          <el-table-column prop="suppliersName" label="供应商" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersNo" label="供应商物料编号" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersMoq" label="最小订单量" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersStockCycle" label="供货周期" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersStock" label="库存" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersPriceA" label="1" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceB" label="10" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceC" label="50" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceD" label="100" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceE" label="1000" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceF" label="10000" min-width="140"> </el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" width="180" label="备注"></el-table-column>
        </el-table>
        <div>
          {{errormsg}}
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogExcelVisible = false">取 消</el-button>
          <el-button type="primary" @click="importSupplier">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="更新价格" :visible.sync="dialogExcelPriceVisible">
        <el-table :data="excelData2" style="width: 100%"  :row-style="tableRowStyle">
          <el-table-column prop="manufacturersName" label="生产厂家" min-width="180"></el-table-column>
          <el-table-column prop="manufacturersNo" label="厂家物料编号" min-width="180"></el-table-column>
          <el-table-column prop="suppliersName" label="供应商" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersNo" label="供应商物料编号" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersStock" label="库存" min-width="180"> </el-table-column>
          <el-table-column prop="suppliersPriceA" label="1" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceB" label="10" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceC" label="50" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceD" label="100" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceE" label="1000" min-width="140"> </el-table-column>
          <el-table-column prop="suppliersPriceF" label="10000" min-width="140"> </el-table-column>
        </el-table>
        <div>
          {{errormsg}}
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogExcelPriceVisible = false">取 消</el-button>
          <el-button type="primary" @click="importPriceSupplier">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {
  readManufacturersSuppliersList,
  readScmSupplierList,
  readSuppliersAttrPage,
  updateSuppliersAttr,
  deleteSuppliersAttr,
  importSuppliers,
  lookCheckSuppliers,
  lookCheckPriceSuppliers,
  importAllPriceSuppliers
} from "@/api/ele";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      fullscreenLoading: false,
      detailIO: 1,
      supplierList: [],
      manufacturerList: [],
      supplierGoodsList: [],
      fileList3:[],
      dialogExcelVisible:false,
      dialogExcelPriceVisible:false,
      rowClass: {
        background: "#F2F2F2",
        fontSize: "13px"
      },
      
      form: {
        suppliersId: "",
        suppliersNo: "",
        manufacturersNo: "",
        manufacturersId:'',
        suppliersMoq: "",
        suppliersPriceA: "",
        suppliersPriceB: "",
        suppliersPriceC: "",
        suppliersPriceD: "",
        suppliersPriceE: "",
        suppliersStock:'',
        remark: ""
      },
      formcus: {
        suppliersId: "",
        suppliersNo: "",
        manufacturersNo: "",
        manufacturersId:'',
        suppliersMoq: "",
        suppliersPriceA: "",
        suppliersPriceB: "",
        suppliersPriceC: "",
        suppliersPriceD: "",
        suppliersPriceE: "",
        suppliersStock:'',
        remark: ""
      },
      search: {
        name: "",
        type: "2",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      listData: [],
      rules: {
        suppliersNo: [{ required: true, message: "必填", trigger: "blur" }],
        suppliersMoq: [{ required: true, message: "必填", trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入公司简称", trigger: "blur" }
        ]
      },
      imageUrl: "",
      selectIndex: null,
      excelData:[],
      excelData2:[],
      unqualifiedList:[],
      errormsg:'',
      unqualifiedPriceList:[],
      errorPricemsg:'',
    };
  },
  methods: {
    selectGoods(index) {
      this.selectIndex = index;
      this.form.manufacturersNo = this.supplierGoodsList[index].manufacturersNo;
      this.form.manufacturersId = this.supplierGoodsList[index].manufacturersId;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      this.form.logo = res.data[0].value;
      console.log(res);
      console.log(file);
    },
    addData() {
      this.supplierGoodsList = [];
      this.form = Object.assign({}, this.formcus);
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.imageUrl = "";
      // this.dialogFormVisible = true;
      this.detailIO = 3;
    },
    download(){
      window.location.href=this.DEEHOWBASEURL+'/deehow-ELIBM-Web/suppliers/export/format'
    },
    onSuccess(res, file, fileList) {
      if(res.httpCode!=200){
        this.$message.error(res.msg)
      }else{
        this.excelData = res.data;
        this.lookUnqualified();
      }
    },
    onPriceSuccess(res, file, fileList) {
      if(res.httpCode!=200){
        this.$message.error(res.msg)
      }else{
        this.excelData2 = res.data;
        this.lookUnqualified2();
      }
      
    },
    tableRowStyle({row, rowIndex}) {
      console.log(this.unqualifiedList.indexOf(rowIndex+1))

      if(this.unqualifiedList.indexOf(rowIndex+1)!=-1){
        return {
          color:'red',
        };
      }
    },
    lookUnqualified(){
      lookCheckSuppliers(this.excelData).then(res=>{
        console.log(res)
        if(res.row){
          this.unqualifiedList = res.row;
          this.errormsg = res.msg;
        }
        this.dialogExcelVisible = true;
      }).catch(err=>{

      })
    },
    lookUnqualified2(){
      lookCheckPriceSuppliers(this.excelData2).then(res=>{
        console.log(res)
        if(res.row){
          this.unqualifiedList = res.row;
          this.errormsg = res.msg
        }
        this.dialogExcelPriceVisible = true;
      }).catch(err=>{

      })
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    importSupplier() {
      importSuppliers(this.excelData)
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

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    importPriceSupplier() {
      importAllPriceSuppliers(this.excelData2)
        .then(res => {
          this.$confirm(res.msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.readData();
              this.dialogExcelPriceVisible = false;
            })
            .catch(() => {});
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMaterial() {
      readManufacturersSuppliersList({ suppliersId: this.form.suppliersId })
        .then(res => {
          console.log(res);
          this.supplierGoodsList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateSuppliersAttr(this.form)
            .then(res => {
              this.$message.success("操作成功");
              this.readData();
              this.detailIO = 1;
              // this.dialogFormVisible = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    readData() {
      this.fullscreenLoading = true;
      readSuppliersAttrPage(this.search)
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
      this.form = Object.assign({}, this.listData[index]);
      this.supplierGoodsList = [];
      this.detailIO = 3;
    },
    deleteData(index) {
      deleteSuppliersAttr({ id: this.listData[index].id })
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
.list-group-item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 13px;
}
.into{
  width:70%;
  margin:40px auto;
  p{

    margin:10px;
  }
}
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>
