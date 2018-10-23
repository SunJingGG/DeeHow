<template>
  <div>
    <div v-show="step == 1">
      <el-tree :data="treeData" ref="tree" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }" @dblclick="confirmVersion(data,node)">
          <img v-if="node.level == 1" src="../../../../assets/product/fkp.png" style="width:12px" alt="">
          <img v-if="node.level == 2" src="../../../../assets/product/fkv.png" style="width:12px" alt="">
          <img v-if="node.level == 3" src="../../../../assets/product/diyiji.png" style="width:12px" alt="">
          <img v-if="node.level == 4" src="../../../../assets/product/fkb.png" style="width:12px" alt="">
          <span>{{ node.label }}</span>&nbsp;&nbsp;
        </span>
      </el-tree>
    </div>
    <div v-if="step == 2">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="version" :label-width="formLabelWidth='150px'">
          {{form.versionName}}
        </el-form-item>
        <el-form-item label="quantity" :label-width="formLabelWidth" prop="quantity">
          <el-input v-model="form.quantity" type="number"></el-input>
        </el-form-item>
        <el-form-item label="comment" :label-width="formLabelWidth" prop="comment">
          <el-input type="textarea" v-model="form.comment"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ProductTree } from "@/api/product";
export default {
  data() {
    return {
      treeData: [],
      step: 1,
      defaultProps: {
        children: "children",
        label: "label"
      },
      form: {
        comment: "",
        versionName: "",
        quantity: '',
        sonVersionId: '',
        versionId: ''
      },
      form: {
        comment: "",
        versionName: "",
        quantity: '',
        sonVersionId: '',
        versionId: ''
      },
      rules: {
        quantity: [{ required: true, message: "需为数字", trigger: "blur"}],
      }
    };
  },
  methods: {
    readData() {
      ProductTree({}).then(res => {
        //console.log(res);
        this.treeData = res.data;
      });
    },
    handleNodeClick(data, node) {},
    confirmVersion(data, node) {
      console.log(data, node);
      this.form.sonVersionId = data.data.id
      this.form.versionName = data.data.versionName
      this.step = 2;
    },
    onSubmit(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit('reciveVersion',this.form);
            this.step = 1;
            this.form = Object.assign({},this.formcus)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    }
  },
  mounted() {
    this.readData();
  }
};
</script>
