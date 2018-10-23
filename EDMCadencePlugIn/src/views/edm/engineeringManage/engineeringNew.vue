<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="所属目录" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="文件夹名称" :label-width="formLabelWidth" prop="abbreviation">
            <el-input v-model="form.abbreviation"></el-input>
          </el-form-item>
          <el-form-item label="文件扩展名" :label-width="formLabelWidth" prop="showName">
            <!-- <el-input v-model="form.showName"></el-input> -->
            <div>
              <el-radio v-model="form.radio" label="1">允许任何扩展名</el-radio>
              
            </div>
            <div>
              <el-radio v-model="form.radio" label="2">禁止</el-radio>
            </div>
            <div>
              <el-radio v-model="form.radio" label="3">只允许</el-radio>
            </div>
            <div v-show="form.radio != '1'">
              <el-input v-model="form.abbreviation"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="团队文件夹" :label-width="formLabelWidth" prop="differentCountries">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark " type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "150px",
      fullscreenLoading: false,
      form: {
        name: "",
        abbreviation: "",
        showName: "",
        differentCountries: "",
        logo:'',
        remark: "",
        radio:'1',
      },
      formcus: {
        name: "",
        abbreviation: "",
        showName: "",
        differentCountries: "",
        logo:'',
        remark: ""
      },
      search: {
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      listData: [],
      rules: {
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入属性简称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addData() {
      this.form = Object.assign({},this.formcus);
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.dialogFormVisible = true;
    },
    onSubmit() {
      updateScmSupplier(this.form).then(res=>{
        this.$message.success('操作成功');
        this.dialogFormVisible=false;
        this.readData();
      }).catch(err=>{
        console.log(err)
      })
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
      this.form = Object.assign({},this.listData[index]);
    },
    deleteData(index) {
      deleteScmSupplier({id:this.listData[index].id}).then(res=>{
        this.$message.success('操作成功')
        this.readData();
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {

  }
};
</script>
<style  lang="scss" scoped>
</style>