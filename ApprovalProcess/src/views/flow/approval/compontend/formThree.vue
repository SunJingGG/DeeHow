<template>
  <div>

    <div>
      <table class="table table-bordered">
        <tr>
          <td rowspan="4" style="width:30px;padding-top:66px;">
            <span>编号</span>
          </td>
          <td style="width:120px;">
            <span class="text-muted">构件类别 :</span>
          </td>
          <td colspan="5">
            <el-radio-group disabled v-model="mainInfo.partType">
              <el-radio label="1">新增</el-radio>
              <el-radio label="2">变更</el-radio>
              <el-radio label="3">删除</el-radio>
              <el-radio label="4">其它</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">物料属性 :</span>
          </td>
          <td colspan="5">
            <el-radio-group disabled v-model="mainInfo.materialProperty">
              <el-radio label="1">原料</el-radio>
              <el-radio label="2">半成品</el-radio>
              <el-radio label="3">成品</el-radio>
              <el-radio label="4">工具</el-radio>
              <el-radio label="5">广宣品</el-radio>
              <el-radio label="6">非生产物料</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">生产属性 :</span>
          </td>
          <td colspan="5">
            <el-radio-group disabled v-model="mainInfo.productProperty">
              <el-radio label="1">外购</el-radio>
              <el-radio label="2">自制</el-radio>
              <el-radio label="3">外协</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td style="width:230px;">
            <span class="text-muted">品名/型号/规格/材质("/"代表空格)</span>
          </td>
          <td>
            <span class="text-muted">扩展属性</span>
          </td>
          <td>
            <span class="text-muted">单位</span>
          </td>
          <td>
            <span class="text-muted">重量</span>
          </td>
          <td>
            <span class="text-muted">重量单位</span>
          </td>
          <td>
            <span class="text-muted">代号(图号)</span>
          </td>
        </tr>
        <tr v-for="(item,index) in this.mainInfo.detailList" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.productName}}</td>
          <td>{{item.unit}}</td>
          <td>{{item.attribute}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.weightUnit}}</td>
          <td>{{item.productNo}}</td>
        </tr>
      </table>
    </div>
    <!-- <div>
      <span class="text-muted">器件手册</span> :
      <button @click="lookAttachment" class="btn btn-info btn-mini">预览</button>
    </div> -->
  </div>
</template>
<script>
import { ApplyNewNumDetail } from "@/api/flow";
export default {
  props: ["sparams"],
  data() {
    return {
      queryData: {},
      applyData: {},
      mainInfo: {
        partType: "",
        materialProperty: "",
        productProperty: "",
        applyTime: "",
        detailList: []
      }
    };
  },
  methods: {
    readData() {
      ApplyNewNumDetail({ mainId: this.sparams.businessId })
        .then(res => {
          console.log(res);
          this.mainInfo = res.data;
          this.$emit("childByValue", res.data.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    lookAttachment() {
      window.open(
        "http://" +
          window.location.host +
          "/deehow-CMS-Web/public/file/view?filePath=" +
          this.applyData.dataSheet,
        "_blank",
        "PDF"
      );
    }
  },
  mounted() {
    console.log(this.sparams);
    this.queryData = this.sparams;
    this.readData();
  }
};
</script>
<style lang="scss" scoped>
</style>
