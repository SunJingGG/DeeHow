<template>
  <div>
    <div v-if="detailIO==1">
      <div class="green-box">
        <el-input v-model="search.name" placeholder="名称" style="width:240px;"></el-input>
        <el-button @click="readData" icon="el-icon-search" type="primary">搜索</el-button>
        <el-button @click="addData" icon="el-icon-plus" type="primary" style="float:right;margin-right:50px;">添加</el-button>
        <el-button @click="detailIO=2" icon="" style="float:right;margin-right:10px;">批量添加</el-button>
      </div>
      <div style="margin-top:20px">
        <el-table :header-cell-style="rowClass" :data="listData" show-overflow-tooltip style="width: 100%" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
          <el-table-column prop="name" label="公司名称" width="180"></el-table-column>
          <el-table-column prop="abbreviation" label="公司简称" width="180"></el-table-column>
          <el-table-column prop="differentCountries" label="地址" width="180"></el-table-column>
          <el-table-column prop="website" label="网址" width="180"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
          <el-table-column prop="fax" label="传真" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" label="备注"></el-table-column>
          <el-table-column label="Logo" width="120">
            <template slot-scope="scope">
              <img :src="DEEHOWBASEURL +'/deehow-CMS-Web/public/file/view?filePath=' +scope.row.logo" style="width:170px;height:35px" alt="" srcset="">
            </template>
          </el-table-column>
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
          1、下载《批量导入模板》<a >
            <el-button type="text" @click="download">立即下载《批量导入模板》</el-button></a>
        </p>
        <p>2、根据模板整理相应数据，为保障粘贴信息被有效导入，请使用纯文本或数字</p>
        <p>3、信息输入完毕，将文件拖入下方方框中，或者点击选取</p>
        <p>4、预览检查数据(如有问题则会标识出来,敬请改正)</p>
        <p>5、确认导入</p>
        <div>
          <el-upload class="upload-demo" drag  :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/manufacturersAndSuppliers/import/look/suppliers'"  :on-success="onSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>

    <el-dialog :title="search.type=='1'?'生产厂家':'客户'" :visible.sync="dialogFormVisible" width="55%">
      <el-form :inline="true" :model="form" ref="form" :rules="rules">
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="公司简称" :label-width="formLabelWidth" prop="abbreviation">
          <el-input v-model="form.abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="differentCountries">
          <el-input v-model="form.differentCountries"></el-input>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth" prop="website">
          <el-input v-model="form.website"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="传真" :label-width="formLabelWidth" prop="fax">
          <el-input v-model="form.fax"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark " type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Logo" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/manufacturersAndSuppliers/logo/upload'" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="border-top:1px solid #ccc;padding-top:20px;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="dialogExcelVisible">
        <el-table :data="excelData" style="width: 100%"  :row-style="tableRowStyle">
          <el-table-column prop="name" label="公司名称" width="180"></el-table-column>
          <el-table-column prop="abbreviation" label="公司简称" width="180"></el-table-column>
          <el-table-column prop="differentCountries" label="地址" width="180"></el-table-column>
          <el-table-column prop="website" label="网址" width="180"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
          <el-table-column prop="fax" label="传真" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" label="备注"></el-table-column>
          <el-table-column label="Logo" width="120">
            <template slot-scope="scope">
              <img :src="DEEHOWBASEURL +'/deehow-CMS-Web/public/file/view?filePath=' +scope.row.logo" style="width:170px;height:35px" alt="" srcset="">
            </template>
          </el-table-column>
        </el-table>
        <p>{{errormsg}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogExcelVisible = false">取 消</el-button>
          <el-button type="primary" @click="importExcel">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {
  readScmSupplierPage,
  deleteScmSupplier,
  updateScmSupplier,
  updateAllScmSupplier,
  lookCheckScmSupplier,
} from "@/api/ele";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      console.log(rule);
      console.log(value);
      console.log(callback);
      if (!value) {
        return callback(new Error("请填写公司名称"));
      }
      if (this.form.id) {
        callback();
        return true;
      }
      readScmSupplierPage({ name: this.form.name ,type:'2'})
        .then(res => {
          if (res.data.length > 0) {
            callback(new Error("名称重复"));
          } else {
            callback();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      fullscreenLoading: false,
      dialogExcelVisible: false,
      rowClass: {
        background: "#F2F2F2",
        fontSize: "13px"
      },
      form: {
        name: "",
        abbreviation: "",
        showName: "",
        differentCountries: "",
        website:'',
        phone:'',
        fax:'',
        email:'',
        logo: "",
        type: "2",
        remark: ""
      },
      formcus: {
        name: "",
        abbreviation: "",
        showName: "",
        differentCountries: "",
        website:'',
        phone:'',
        fax:'',
        email:'',
        logo: "",
        type: "2",
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
        // name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        name: [{ validator: validatePass, trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入公司简称", trigger: "blur" }
        ]
      },
      imageUrl: "",
      detailIO: 1,
      excelData:[],
      unqualifiedList: [],
      errormsg: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      this.form.logo = res.data[0].value;
      console.log(res);
      console.log(file);
    },
    addData() {
      this.form = Object.assign({}, this.formcus);
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.imageUrl = "";
      this.dialogFormVisible = true;
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateScmSupplier(this.form)
            .then(res => {
              this.$message.success("操作成功");
              this.readData();
              this.dialogFormVisible = false;
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
    chachong() {
      readScmSupplierPage({ name: this.form.name })
        .then(res => {
          // console.log(this.$refs["form"])
          this.$refs["form"].validateField("name", callback => {
            console.log(callback);
            return new Error("年龄不能为空");
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    readData() {
      this.fullscreenLoading = true;
      readScmSupplierPage(this.search)
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
      this.dialogFormVisible = true;
      this.form = Object.assign({}, this.listData[index]);
      this.imageUrl =
        this.DEEHOWBASEURL +
        "/deehow-CMS-Web/public/file/view?filePath=" +
        this.listData[index].logo;
    },
    deleteData(index) {
      deleteScmSupplier({ id: this.listData[index].id })
        .then(res => {
          this.$message.success("操作成功");
          this.readData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    download() {
      let str = this.DEEHOWBASEURL + "/deehow-ELIBM-Web/manufacturersAndSuppliers/export/format/suppliers";
      window.location.href = str;
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    onSuccess(res, file, fileList) {
      console.log(res)
      this.excelData = res.data;
      this.lookUnqualified();
      
      console.log()
    },
    lookUnqualified(){
      console.log(this.excelData)
      lookCheckScmSupplier(this.excelData).then(res=>{
        console.log(!res.data)
        if(!res.data){

        }else{
          if(res.data.state == 0){
            
          }else{
            let arr = [];
            let msg = ""
            res.data.forEach((v,i)=>{
              arr.push(v[0])
              msg+= `第[${v[0]}]行${v[1]} , `
            })
            this.errormsg = msg;
            this.unqualifiedList = arr;
            console.log(msg)
            console.log(this.unqualifiedList)
          }
        }
        this.dialogExcelVisible = true;
      }).catch(err=>{
        console.log(err)
      })
    },
    tableRowStyle({row, rowIndex}) {
      if(this.unqualifiedList.indexOf(rowIndex.toString())!=-1){
        return {
          color:'red',
        };
      }
    },
    submitData(){
      updateAllScmSupplier(this.excelData).then(res=>{
            console.log(res)
            this.dialogExcelVisible = false;
            this.detailIO = 1;
            this.readData();
          }).catch(err=>{
            console.log(err)
          })
    },
    importExcel(){
      if(this.unqualifiedList.length>0){
        this.$confirm(this.errormsg, '导入数据有误', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitData()
        }).catch(() => {       
        });
      }else{
        this.submitData();
      }
    }
  },
  mounted() {
    this.readData();
  }
};
</script>
<style  lang="scss" scoped>
.el-dialog {
  .el-form {
    margin-top: -20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
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
