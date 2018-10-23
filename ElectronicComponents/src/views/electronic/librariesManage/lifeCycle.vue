<template>
  <div>
    <div style="width:70%;float:left;padding:10px 0 0 10px;">
      <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="form.manufacturersName" placeholder="按制造商搜索"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.manufacturersNo" placeholder="按制造商物料编码搜索"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="form.componentState" placeholder="请选择生产状态">
              <el-option label="新产品" value="1"></el-option>
              <el-option label="批量生产" value="2"></el-option>
              <el-option label="不推荐用于新设计" value="3"></el-option>
              <el-option label="停产" value="4"></el-option>
              <el-option label="老产品" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="submit">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <img style="width:30px;margin:8px 10px 0 0;float:left;" src="../../../assets/part/new1.png"> 新产品
          </template>
          <table class="table table-striped">
            <thead style="background:#f7f7f7;">
              <tr>
                <td>制造商</td>
                <td>制造商物料编码</td>
                <td>生产状态</td>
              </tr>
            </thead>
            <tr v-for="(item,index) in newproduct" :key="index">
              <td><img src="../../../assets/part/pro2.png" style="width:24px;float:left;margin:-4px 10px 0 0;">{{item.manufacturersName}}</td>
              <td>{{item.manufacturersNo}}</td>
              <td style="color:#d53a35;">{{item.componentState}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item name="2">
           <template slot="title">
            <img style="width:30px;margin:8px 10px 0 0;float:left;" src="../../../assets/part/new2.png"> 批量生产
          </template>
          <table class="table table-striped">
             <thead style="background:#f7f7f7;">
              <tr>
                <td>制造商</td>
                <td>制造商物料编码</td>
                <td>生产状态</td>
              </tr>
            </thead>
            <tr v-for="(item,index) in volume" :key="index">
              <td><img src="../../../assets/part/pro2.png" style="width:24px;float:left;margin:-4px 10px 0 0;">{{item.manufacturersName}}</td>
              <td>{{item.manufacturersNo}}</td>
              <td style="color:#2f4554;">{{item.componentState}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <img style="width:30px;margin:8px 10px 0 0;float:left;" src="../../../assets/part/new3.png"> 不推荐用于新设计
          </template>
          <table class="table table-striped">
             <thead style="background:#f7f7f7;">
              <tr>
                <td>制造商</td>
                <td>制造商物料编码</td>
                <td>生产状态</td>
              </tr>
            </thead>
            <tr v-for="(item,index) in notrecommend" :key="index">
              <td><img src="../../../assets/part/pro2.png" style="width:24px;float:left;margin:-4px 10px 0 0;">{{item.manufacturersName}}</td>
              <td>{{item.manufacturersNo}}</td>
              <td style="color:#6ab0b8;">{{item.componentState}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <img style="width:30px;margin:14px 10px 0 0;float:left;" src="../../../assets/part/new4.png"> 停产
          </template>
          <table class="table table-striped">
             <thead style="background:#f7f7f7;">
              <tr>
                <td>制造商</td>
                <td>制造商物料编码</td>
                <td>生产状态</td>
              </tr>
            </thead>
            <tr v-for="(item,index) in stopproduction" :key="index">
              <td><img src="../../../assets/part/pro2.png" style="width:24px;float:left;margin:-4px 10px 0 0;">{{item.manufacturersName}}</td>
              <td>{{item.manufacturersNo}}</td>
              <td style="color:#d48265;">{{item.componentState}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item name="5">
           <template slot="title">
            <img style="width:30px;margin:8px 10px 0 0;float:left;" src="../../../assets/part/new5.png"> 老产品
          </template>
          <table class="table table-striped">
             <thead style="background:#f7f7f7;">
              <tr>
                <td>制造商</td>
                <td>制造商物料编码</td>
                <td>生产状态</td>
              </tr>
            </thead>
            <tr v-for="(item,index) in oldproduction" :key="index">
              <td><img src="../../../assets/part/pro2.png" style="width:24px;float:left;margin:-4px 10px 0 0;">{{item.manufacturersName}}</td>
              <td>{{item.manufacturersNo}}</td>
              <td style="color:#91c7ae;">{{item.componentState}}</td>
            </tr>
          </table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div style="width:30%;float:left;padding-top:20px;">
      <chart :Pdata="Pdata"></chart>
    </div>
  </div>
</template>

<script>
import { chartproduction, chartparts } from "@/api/part";
import chart from "./compontends/chart";
export default {
  components: {
    chart
  },
  data() {
    return {
      allParts: [],
      activeNames: ["1"],
      newproduct: [],
      volume: [],
      notrecommend: [],
      stopproduction: [],
      oldproduction: [],
      Pdata: this.Pdata,
      form: {
        manufacturersName: "",
        manufacturersNo: "",
        componentState: ""
      }
    };
  },
  methods: {
    readData() {
      chartparts({}).then(res => {
        //console.log(res);
        this.allParts = res.data;
        this.allParts.forEach((v, i) => {
          if (v.componentState == "1") {
            v.componentState = "新产品";
            this.newproduct.push(v);
          } else if (v.componentState == "2") {
            v.componentState = "批量生产";
            this.volume.push(v);
          } else if (v.componentState == "3") {
            v.componentState = "不推荐用于新设计";
            this.notrecommend.push(v);
          } else if (v.componentState == "4") {
            v.componentState = "停产";
            this.stopproduction.push(v);
          } else if (v.componentState == "5") {
            v.componentState = "老产品";
            this.oldproduction.push(v);
          }
        });
      });
      // chartproduction({}).then(res => {
      //   console.log(res);
      //   this.Pdata = res.data.proData;
      // });
    },
    submit() {
      this.newproduct = [];
      (this.volume = []),
        (this.notrecommend = []),
        (this.stopproduction = []),
        (this.oldproduction = []),
        chartparts({
          manufacturersName: this.form.manufacturersName,
          manufacturersNo: this.form.manufacturersNo,
          componentState: this.form.componentState
        }).then(res => {
          this.allParts = res.data;
          this.allParts.forEach((v, i) => {
            if (v.componentState == "1") {
              this.newproduct.push(v);
            } else if (v.componentState == "2") {
              this.volume.push(v);
            } else if (v.componentState == "3") {
              this.notrecommend.push(v);
            } else if (v.componentState == "4") {
              this.stopproduction.push(v);
            } else if (v.componentState == "5") {
              this.oldproduction.push(v);
            }
          });
        });
    },
    handleChange(val) {
      console.log(val);
    }
  },
  mounted() {
    this.readData();
  }
};
</script>

<style lang="scss" scoped>
.el-collapse {
  table {
    margin-bottom: 0;
  }
}
</style>
