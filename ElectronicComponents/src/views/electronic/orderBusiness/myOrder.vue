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
              <el-button type="text" v-if="scope.row.status == 1" @click="lookDetail( scope.$index)" size="small">提审</el-button>
              <span v-if="scope.row.status == 2">审批中</span>
              <span v-if="scope.row.status == 3">申请通过</span>
              <span v-if="scope.row.status == 5">入库审批中</span>
              <span v-if="scope.row.status == 6">入库审批通过</span>
              <span v-if="scope.row.status == 7">入库审批打回</span>
              <span v-if="scope.row.status == 8">入库完成</span>
              <el-button type="text" v-if="scope.row.status == 4" @click="audit( scope.$index)" size="small">更改</el-button>
              <el-button type="text" v-if="scope.row.status == 4" @click="lookDetail( scope.$index)" size="small">再提审</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="元器件名称（例如：ATMEGA328P-AU）" prop="partName">
              <el-input v-model="form.partName"></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item label="数据表">
              
              <div class="upload">
                  <el-upload class="upload-demo" action="123" :before-remove="beforeRemove" :on-change="handleChange" :auto-upload="false" accept=".pdf" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button @click="lookAttachment(sindex)" v-if="form.dataSheet">预览文件</el-button>
                    <el-button>上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
                  </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="form.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="封装形式" prop="packageType">
              <el-input v-model="form.packageType"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" prop="partName">></el-input>
            </el-form-item>
          </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="applypart">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  readOrderPage,
  reciveOrder,
  startProcessOrder,
  updateProcessMonitor,
  addApplyStart,
  updateApplyPart
} from "@/api/ele";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogPDFVisible: false,
      dialogFormVisible:false,
      pdfSrc: '',
      listData: [],
      search: {
        partName: "",
        status:"1",
      },
      rowClass: {
          background: '#F2F2F2',
          fontSize: '13px',
        },
      total: 0,
      form: {
        partName: "",
        email: "",
        packageType: "",
        remark: ""
      },
      fileList: [],
      dataFile: null,
      sindex:null,
      rules: {
        partName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        email: [{ required: true, message: "请出入邮件地址", trigger: "blur" },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        packageType: [
          { required: true, message: "请输入封装形式", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    audit(index){
      this.sindex = index;
      this.form = Object.assign({},this.listData[index])
      this.dialogFormVisible = true;
    },
    lookDetail(index){
      // startProcessOrder({processKey:'partApply'}).then(res=>{
      //   reciveOrder({status:'2',id:this.listData[index].id,applyProcessKey:res.processInstanceId}).then(response=>{
      //     // this.readData();
      //     updateProcessMonitor({procFormKey:'partApply',procFormName:'新元器件申请',businessId:this.listData[index].id,procInstId:res.processInstanceId,summitType:'0'}).then(res=>{
      //       console.log(res)
      //     }).catch(err=>{

      //     })
      //   }).catch(err=>{
      //     console.log(err)
      //   })
      // })
      let obj = {
        id:this.listData[index].id,
        status:'0'
      }
      if(this.listData[index].status == 4){
        obj.status = '1';
      }
      addApplyStart(obj).then(res=>{
        console.log(res)
        this.readData();
      }).catch(err=>{
        cosnole.log(err)
      })
    },
    applypart() {
      this.$refs["ruleForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          let param = new FormData();
          let file = "";
          if(this.dataFile.uid){
            param.append("file", this.dataFile);
            this.form.dataSheet="";
          }
          for (let x in this.form) {
            param.append(x, this.form[x]);
          }
          updateApplyPart(param).then(res => {
            console.log(res);
            if (res.httpCode == 200) {
              this.show = false;
              this.param = {};
              this.$message({
                type: "success",
                message: "操作成功",
                duration:2000,
              });
              this.dialogFormVisible=false;
              this.readData();
            } else {
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    },
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.dataFile = null;
      console.log(this.dataFile)
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      this.dataFile = file.raw;
      console.log(this.dataFile)
    },
  },
  mounted() {
    this.readData();
    // this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
</style>
