<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <router-link to="/EDM/engineeringManage/engineeringNew">
            <el-button type="primary">添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <table class="table table-bordered">
        <tr>
          <th>Name</th>
          <th></th>
          <th>State</th>
          <th>Project Type</th>
          <th>User May Add Folder</th>
          <th>Project Leaders</th>
          <th>Assigned Users</th>
          <th>Status</th>
          <th>Revision</th>
          <th>dataLine</th>
          <th>Vault</th>
          <th>Project Group</th>
        </tr>
        <tr>
          <td>STEM32</td>
          <td>
            <button class="btn btn-mini "><i class="icon icon-edit"></i></button>
            <button class="btn btn-mini "><i class="icon icon-copy"></i></button>
            <button class="btn btn-mini "><i class="icon icon-trash"></i></button>
          </td>
          <td>Active</td>
          <td>General</td>
          <td>
            <el-checkbox></el-checkbox>
          </td>
          <td>Admin</td>
          <td>Admin,U1,U2</td>
          <td>NEW</td>
          <td>reVa</td>
          <td>20181020</td>
          <td>All_serv</td>
          <td>STM-32</td>
        </tr>
      </table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      formInline:{

      },
      dialogFormVisible: false,
      formLabelWidth: "150px",
      fullscreenLoading: false,
      form: {
        name: "",
        abbreviation: "",
        showName: "",
        differentCountries: "",
        logo:'',
        remark: ""
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
    }
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
}
</script>
<style lang="scss" scoped>
table.treetable span.indenter {
  display: inline-block;
  margin: 0;
  padding: 0;
  text-align: right;

  /* Disable text selection of nodes (for better D&D UX) */
  user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;

  /* Force content-box box model for indenter (Bootstrap compatibility) */
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;

  width: 19px;
}

table.treetable span.indenter a {
  background-position: left center;
  background-repeat: no-repeat;
  display: inline-block;
  text-decoration: none;
  width: 19px;
}

</style>
