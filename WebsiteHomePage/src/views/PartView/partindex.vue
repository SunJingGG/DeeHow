<template>
  <div class="clearfix">
    <div>
      <com-header></com-header>
    </div>
    <div class="banner">
      <div class="search">
        <div style="text-align:center">
          <img src="../../assets/PartView/searchlogo3.png" style="width:260px" alt="" srcset="">
        </div>
        <!-- <h1>搜索优选库元器件</h1> -->
        
        <div class="inputbox">
          <input placeholder="请输入元器件型号" v-model="productModel" @keyup.enter.native="queryPart">
          <a @mouseenter="seen=true" @mouseleave="seen=false"><img src="../../assets/PartView/search.png"  @click="queryPart" v-show="this.seen==false" alt=""><img  @click="queryPart" v-show="this.seen==true" src="../../assets/PartView/soso.png" alt=""></a>
        </div>
        <p>例如：SFH6319T</p>
      </div>
    </div>
    <div class="classification">
      <div class="parts">
        <!-- <h2>按分类搜索</h2> -->
        <div class="hvr-grow-shadow" style="cursor: pointer;" v-for="(item,index) in treeList" :key="item.id" v-if="index<5" @click="toUrl(index)">
          <img v-if="item.categoryLogo" :src="DEEHOWBASEURL+'/getView/'+item.categoryLogo" alt="" style="width:50px;height:50px">
          <p>{{item.categoryName}}</p>
        </div>
        <router-link to="/NoNeed/partclassify">
          <div class="hvr-grow-shadow" style="cursor: pointer;">
            <p style="line-height:60px">更多分类</p>
          </div>
        </router-link>

      </div>
      <div style="clear:both;"></div>
      <!-- <div class="download">
        <h2>下载TOP榜</h2>
        <div>
          <p><img src="../../assets/PartView/top.png" alt="">
            <b>能源管理</b>
          </p>
          <p><img src="../../assets/PartView/part3.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
          <p><img src="../../assets/PartView/part4.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
          <p><img src="../../assets/PartView/part5.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
        </div>
        <div>
          <p><img src="../../assets/PartView/top.png" alt="">
            <b>连接器</b>
          </p>
          <p><img src="../../assets/PartView/part3.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
          <p><img src="../../assets/PartView/part4.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
          <p><img src="../../assets/PartView/part5.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
        </div>
        <div>
          <p><img src="../../assets/PartView/top.png" alt="">
            <b>离散组件</b>
          </p>
          <p><img src="../../assets/PartView/part3.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
          <p><img src="../../assets/PartView/part4.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
          <p><img src="../../assets/PartView/part5.png" alt="">
            <span>STMicroelectronics</span>
            <b>L298N</b>
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import comHeader from "./compontends/partheader";
import { readCategoryTree } from "@/api/ele.js";
export default {
  components:{
    comHeader
  },
  data() {
    return {
      treeList: [],
      seen:false,
      productModel:'',
    };
  },
  methods: {
    readData() {
      readCategoryTree({ leave: 1 })
        .then(res => {
          console.log(res);
          if(res.data){
            if(res.data[0]){
              this.treeList =  res.data[0].childrenList;
              console.log(this.$store);
              this.$store.commit("SET_category", res.data[0].childrenList);
            }
          }
          
        })
        .catch(err => {
          cosnole.log(err);
        });
    },
    toUrl(index) {
      let obj = { params: { index: index, id: this.treeList[index].id } };
      console.log(obj);
      this.$router.push({ path: "/NoNeed/partlists", query: { index: index } });
    },
    queryPart(){
      this.$router.push({ path: "/NoNeed/searchPart", query: { productModel: this.productModel } });
    }
  },
  mounted() {
    this.readData();
  }
};
</script>

<style lang="scss" scoped>
.banner {
  // background: #ff791b;
  // background: url("../../assets/PartView/banner1.png") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 220px;
  margin-top:2%;
  position: relative;
  .search {
    position: absolute;
    top:48%;
    left: 50%;
    margin-top: -70px;
    margin-left: -400px;
    padding: 0 50px;
    width: 800px;
    height: 240px;
    color: #fff;
    .inputbox {
      position: relative;
      input {
        width: 100%;
        height: 50px;
        margin-top: 30px;
        outline: none;
        padding: 0 60px 0 15px;
        border: 0px;
        border-radius: 10px;
        border:2px solid #f17133;
      }
      a {
        position: absolute;
        top: 38px;
        right: 14px;
        width:40px;
        height:40px;
      }
    }
    h1 {
      font-size: 30px;
      text-align: center;
    }
    p {
      margin-top: 10px;
      padding-left: 10px;
    }
  }
}
.classification {
  position: absolute;
  width: 100%;
  // background: #f1f1f1;
  padding: 10px 100px;
  color: #666;
  .parts {
    width: 880px;
    margin: 0 auto;
    h2 {
      margin-bottom: 20px;
    }
    div {
      width: 120px;
      height: 120px;
      background: #fff;
      margin: 12px;
      padding-top: 30px;
      float: left;
      text-align: center;
      box-shadow: 6px 8px 13px 0 rgba(46, 61, 73, 0.15);
      img {
        width: 50px;
        height: 50px;
      }
      span {
        display: inline-block;
        line-height: 80px;
      }
    }
    div:hover {
      box-shadow: 10px 0 10px rgba(46, 61, 73, 0);
    }
  }
}
@media screen and (min-width:1800px){
.banner {margin-top:6%;}
}
@media screen and (min-width:2200px){
.banner {margin-top:9%;}
}
.download {
  width: 1122px;
  height: 500px;
  margin: 0 auto;
  margin-top: 50px;
  div {
    width: 310px;
    height: 350px;
    background: #fff;
    float: left;
    margin: 20px 40px 0 24px;
    box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.15);
    p {
      width: 100%;
      height: 90px;
      padding: 15px;
      img {
        width: 60px;
        float: left;
        margin-right: 10px;
      }
      b {
        font-size: 18px;
      }
      span {
        display: block;
        margin-top: 10px;
      }
    }
    p:nth-child(1) {
      background: #f7f7f7;
      height: 70px;
      img {
        width: 40px;
      }
      b {
        line-height: 42px;
        color: #7d97ad;
      }
    }
  }
}
</style>