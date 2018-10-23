<template>
  <div>
    <div>
      <h2 class="clearfix">应用管理
        <div class="fr">
          <el-input placeholder="请输入内容" suffix-icon="el-icon-search"  @keyup.enter.native="handleIconClick"  @blur="handleIconClick" v-model="search.modelName">
          </el-input>
        </div>
      </h2>
      <hr>
      <div>
        <ul class="clearfix appList list-group">
          <li class="list-group-item" v-for="(item,index) in listData" :key="index">
            <img class="appLogo fl" :src="'/deehow-CMS-Web/public/file/view?filePath='+item.modelLogo" alt="">
            <!-- <img class="appLogo fl" src="../../../assets/Application/png4.png" alt=""> -->
            <div class="fl btjj">
              <h4>{{item.modelName}}
                <span class="yingzhang">{{item.modelLable}} </span>
                <el-tag style="margin-left:10px" v-if="item.type" type="primary" size="mini">{{item.type}}</el-tag>
              </h4>
              <p class="text-muted">{{item.modelDesc}}</p>
            </div>
            <div class="fr" style="line-height:60px">
              <el-button size="medium" type="text" @click="lookDetail(item)">配 置</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="应用管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- <el-form-item label="应用名称" :label-width="formLabelWidth = '80px'">
          <el-input v-model="form.modelName" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="功能介绍" :label-width="formLabelWidth = '80px'">
          <el-input type="textarea" v-model="form.modelDesc"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.modelLable"></el-input>
        </el-form-item>
        <el-form-item label="appLogo" :label-width="formLabelWidth">
          <!-- <el-input type="textarea" v-model="form.model_desc"></el-input> -->
          <el-upload class="avatar-uploader" action="/deehow-CMS-Web/app/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { readAppList, updateApp } from "@/api/opma";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      listData: [],
      detailIO: false,
      imageUrl: "",
      search: {
        modelName:'',
      },
      form: {},
      total: 0
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.modelLogo = res.filePath;
    },
    handleIconClick(){
      this.readData();
      console.log(1)
    },
    readData() {
      this.fullscreenLoading = true;
      readAppList(this.search)
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
    stateFormat(row, column) {
      let state = row[column.property];

      if (state == 0) {
        return "申请";
      } else if (state == 1) {
        return "通过";
      } else if (state == 2) {
        return "打回";
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
    lookDetail(item) {
      this.form = item;
      this.dialogFormVisible = true;
    },
    onSubmit(){
      updateApp(this.form).then(res=>{
        console.log(res)
        this.$message.success('修改成功')
        this.imageUrl = "";
        this.readData();
        this.dialogFormVisible = false;
      })
    }
  },
  mounted() {
    this.readData();
  }
};
</script>
<style lang="scss" scoped>
.appList {
  margin-top: 20px;
  li {
    float: left;
    width: 100%;
    .btjj {
      margin-left: 20px;
      h4 {
        line-height: 20px;
      }
    }
    .appLogo {
      width: 60px;
    }
  }
  .yingzhang {
    border: 1px solid red;
    color: red;
    padding: 2px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 2px;
  }
}
.el-dialog{
  .el-form{
    margin-top: -20px;
    padding-top:20px;
    border-top:1px solid #ccc;
  }
}
.dialog-footer{
  padding-top: 20px;
  border-top:1px solid #ccc;
}
</style>

