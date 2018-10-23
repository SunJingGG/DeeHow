<template>
  <div class="flowContainer">
    <div class="flowbox">
      <div v-show="regSteps == 0">
        <h1><img src="../../../assets/Apply/title.png" alt=""></h1>
        <p>支持Altium,KiCad,Eagle</p>
        <h3>搜索要申请的元器件</h3>
        <el-input placeholder="请输入元器件名称" v-model="form.productModel"></el-input>
        <br>
        <el-button type="warning" @click="searchresult">点击搜索</el-button>
      </div>

      <div class="apply" v-show="regSteps == 1">
        <h1><img src="../../../assets/Apply/title.png" alt=""></h1> 
        <p>支持Altium,KiCad,Eagle</p>
        <el-input placeholder="请输入元器件名称" v-model="form.productModel"></el-input>
        <br>
        <el-button type="warning" @click="searchresult">再次搜索</el-button>
        <div class="line"></div>
        <div  v-if="YorN">
          <p class="sed">请选择想要获取的元器件</p>
          <!-- <p class="sed" v-if="YorN">请选择想要获取的元器件</p> -->
          <el-select placeholder="请选择" v-model="value">
            <el-option v-for="(item,index) in selectdata" :key="index" :label="item.productModel" :value="item.id">
            </el-option>
          </el-select>
          <el-button circle class="color color1" @click="toUrl">详情</el-button>
          <div>
            <br>
            <router-link :to="{path:'/need/applypart'}">
              <el-button class="color">获取元器件</el-button>
            </router-link>
          </div>
        </div>
        <div v-else>
          <h3>系统暂无该元器件</h3>
          <br>
          <router-link :to="{path:'/need/applypart'}">
            <el-button class="color">马上申请元器件</el-button>
          </router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
import { ApplySearch } from "@/api/apply";
export default {
  data() {
    return {
      regSteps: 0,
      value: "",
      form: {
        productModel: ""
      },
      selectdata: [],
      YorN: false
    };
  },
  methods: {
    searchresult() {
      ApplySearch(this.form).then(res => {
        console.log(res);
        if (res.data.length > 0) {
          this.selectdata = res.data;
          this.YorN = true;
        }else{
          this.selectdata = [];
          this.YorN = false;
        }
        this.regSteps = 1;
      });
      
    },
    toUrl() {
      this.$router.push({ path: "/partdetail", query: { id: this.value } });
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
.flowContainer {
  .flowbox {
    width: 600px;
    height: 450px;
    margin: 0 auto;
    margin-top: 10%;
    border: 1px solid #eef2f5;
    background: #fafbfc;
    text-align: center;
    h1 {
      margin-top: 50px;
      img {
        width: 240px;
      }
    }
    p {
      color: #bbb;
    }
    h3 {
      color: #666;
      margin-top: 50px;
    }
    .el-input {
      width: 320px;
      margin-top: 10px;
    }
    .el-button {
      margin-top: 60px;
      background: #ff761a;
      border-color: #ff761a;
      box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    }
  }
  .apply {
    text-align: center;
    .line {
      border: 1px dotted #ccc;
      width: 80%;
      margin: 15px auto;
    }
    .sed {
      font-size: 16px;
      color: #333;
    }
    .el-select {
      width: 270px;
      margin-top: 30px;
    }
    .el-button {
      margin-top: 30px;
      background: #efefef;
      border-color: #dbdbdb;
      color: #666;
      box-shadow: 0 5px 30px rgba(0, 0, 0, 0);
    }
    .color {
      background: #ff761a;
      border-color: #ff761a;
      color: #fff;
      box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    }
    .color1 {
      box-shadow: 0 5px 30px rgba(0, 0, 0, 0);
    }
  }
}
</style>
