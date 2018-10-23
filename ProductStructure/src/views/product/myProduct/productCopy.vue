<template>
  <div>
    <div class="productbox">
      <h1>产品复制</h1>
      <div>
        <p>需要复制的产品和版本</p>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="产品名称：">
            <el-select v-model="form.sourceproductId" placeholder="请选择产品名称" @change="showsourceversion">
              <el-option v-for="(item,index) in productList" :key="index" :label="item.productName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品版本：">
            <el-select v-model="form.sourceVersionId" placeholder="请选择产品版本">
              <el-option v-for="(item,index) in sourceversionList" :key="index" :label="item.versionName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <p>目标产品和版本</p>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="产品名称：">
            <el-select v-model="form.targetproductId" placeholder="请选择产品名称" @change="showtargetversion">
              <el-option v-for="(item,index) in productList" :key="index" :label="item.productName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品版本：">
            <el-select v-model="form.targetVersionId" placeholder="请选择产品版本">
              <el-option v-for="(item,index) in targetversionList" :key="index" :label="item.versionName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="reset" plain>取 消</el-button>
        <el-button type="primary" @click="copyBtn">复 制</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Allproductlist, Allversionlist, productCopy } from "@/api/product";
export default {
  data() {
    return {
      productList: [],
      sourceversionList: [],
      targetversionList: [],
      form: {
        sourceproductId: "",
        targetproductId: "",
        sourceVersionId:'',
        targetVersionId:'',
      }
    };
  },
  methods: {
    readData() {
      Allproductlist({}).then(res => {
        this.productList = res.data;
      });
    },
    showsourceversion() {
      console.log(this.form.sourceproductId);
      Allversionlist({ productId: this.form.sourceproductId }).then(res => {
        this.sourceversionList = res.data;
      });
    },
      showtargetversion() {
      console.log(this.form.targetproductId);
      Allversionlist({ productId: this.form.targetproductId }).then(res => {
        this.targetversionList = res.data;
      });
    },
    copyBtn() {
      if(this.form.sourceVersionId!=this.form.targetVersionId){
        productCopy({sourceVersionId:this.form.sourceVersionId,targetVersionId:this.form.targetVersionId}).then(res =>{
            if (res.httpCode == 200) {
            this.$message.success("复制成功");
            this.form={};
          }
        })
      }else{
        this.$message.error("不能复制到相同版本下");
        this.form.targetVersionId='';
      }
    },
    reset(){
      this.form={};
    }
  },
  mounted() {
    this.readData();
  }
};
</script>

<style lang="scss" scoped>
.productbox {
  width: 100%;
  > div {
    margin-top: 30px;
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background: #f1f1f1;
    }
    .el-form {
      padding: 40px 0 0 20px;
    }
  }
  .dialog-footer {
    width: 100%;
    height: 80px;
    padding-top: 24px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    button {
      float: right;
      margin-right: 30px;
    }
  }
}
</style>