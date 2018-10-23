<template>
  <div>
    <div class="partContainer">
      <div class="partbox">

        <h1><img src="../../../assets/Apply/applypart.png" alt=""></h1>
        <h2>元器件申请表</h2>
        <div v-if="show">
          <p>填写此表单用来申请CMS数据库中没有的元器件</p>
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="元器件名称（例如：ATMEGA328P-AU）" prop="partName">
              <el-input v-model="form.partName"></el-input>
            </el-form-item>
            <el-form-item label="数据表（可选，但首选）">
              <div style="width:100%" class="clearfix">
                <div class="upload">
                  <el-upload class="upload-demo" action="123" :before-remove="beforeRemove" :on-change="handleChange" :auto-upload="false" accept=".pdf" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button>选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
                  </el-upload>
                </div>
                <div style="clear:both"></div>
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
          <el-button @click="applypart" class="submit">提交申请表</el-button>
          <div style="height:40px"></div>
        </div>
        <div v-else>
          <p class="success">感谢您填写表格。您的回复已被记录，您将在24小时内收到回复。
            <br>
            <br>
            <br>
            <br>
            <router-link to="/">
              <el-button type="text">返回首页</el-button>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #ccc;
$light_gray: #eee;
.partContainer {
  background: #ccc;
  overflow: auto;
  .partbox {
    text-align: center;
    width: 840px;
    margin: 80px auto;
    background: #fff;
  }
  h1 {
    margin-top: 0;
    padding-top: 30px;
    img {
      width: 200px;
    }
  }
  .el-form {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
    .upload {
      > p {
        text-align: left;
        color: #606266;
        font-weight: bold;
      }
      float: left;
    }
  }
  .el-button {
    width: 200px;
    margin-top: 10px;
    color: #fff;
    background: #ff761a;
    border-color: #ff761a;
  }
  .submit {
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  }
  .success {
    // line-height: 200px;
    margin-top: 100px;
    padding-bottom: 100px;
    font-size: 18px;
  }
}
</style>


<script>
import { ApplyPart } from "@/api/apply";
export default {
  data() {
    return {
      show: true,
      form: {
        partName: "",
        email: "",
        packageType: "",
        remark: "",
        isOrder:'1',
      },
      fileList: [],
      count: 0,
      dataFile: null,
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
    handleChange(file, fileList) {
      this.dataFile = file.raw;
    },
    applypart() {
      this.$refs["ruleForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          let param = new FormData();
          let file = "";
          for (let x in this.form) {
            param.append(x, this.form[x]);
          }
          param.append("file", this.dataFile);
          ApplyPart(param).then(res => {
            console.log(res);
            if (res.httpCode == 200) {
              this.show = false;
              this.param = {};
              this.$message({
                type: "success",
                message: "申请成功",
                duration:2000,
              });
            } else {
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      this.dataFile = null;
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
    }
  },
  mounted() {}
};
</script>
