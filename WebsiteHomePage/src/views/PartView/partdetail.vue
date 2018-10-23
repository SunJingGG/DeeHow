<template>
  <div>
    <div class="daohang">
      <ul>
        <i class="hidden-xs hidden-sm hidden-md hidden-lg fa fa-angle-left"></i>
        <li>
          <a>分类</a>
        </li>
        <i class="fa fa-chevron-left" aria-hidden="true">></i>
        <li>
          <a>详情</a>
        </li>
      </ul>
    </div>
    <div class="title">
      <div>
        <div class="img">
          <template v-if="result.public.image&&result.public.image.value">
            <img :src="DEEHOWBASEURL+'/getView/'+result.public.image.value" style="width:90px;margin-top:18px;" alt="">
          </template>
        </div>
      </div>
      <div class="words">
        <div>
        <h1 style="float:left">{{result.public.productModel.value}}</h1>
        <div class="img" style="float:left;margin-left:15px;">
          <template v-if="result.public.manufacturerLogo&&result.public.manufacturerLogo.value">
            <img :src="DEEHOWBASEURL+'/getView/'+result.public.manufacturerLogo.value" style="width:60px;margin-top:15px" alt="">
          </template>
        </div>
        </div>
        <div style="clear:both;"></div>
        <h5>
          <span>封装类型：</span> {{result.public.packageType.value}}</h5>
        <h5>
          <span>原理图符号:</span> {{result.public.symCds.value}}</h5>
      </div>
      <div style="float:right;line-height:150px;margin-right:50px;">
        <div>
          <el-button icon="el-icon-view" @click="lookAttachment">查看Datasheet</el-button>
        </div>
      </div>
    </div>
    <div class="mainbox">
      <div class="main clearfix">
        <div class="leftside">
          <div class="tabbox">
            <a @click="tabClick1()" v-bind:class="{change:changecolor}">2D模型</a>
            <a @click="tabClick2()" v-bind:class="{change:!changecolor}">3D模型</a>
          </div>
          <div class="symble2d" v-if="regSteps==true">
            <div>
              <h2>原理图符号
                <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left" title="这是原理图的web预览，如果有多个原理图的话，仅显示第一个。"></i>
              </h2>
              <div class="svgmodel">
                <template v-if="result.public.symCdsSvg.value">
                  <object id="sembed" :data="DEEHOWBASEURL+'/getView/'+result.public.symCdsSvg.value" @load="initSvg('sembed')" width="100%" height="100%"></object>
                </template>
              </div>
              <div class="forms">
                <div>
                  <el-button icon="el-icon-download" @click="payment()">
                    <b>下载原理图</b>
                  </el-button>
                  <div class="Payment" v-bind:class="{hide:show}">
                    <router-link :to="{path:'/partpayment',query:{id:0}}">
                      <el-button>付费</el-button>
                    </router-link>
                    <router-link :to="{path:'/partpayment',query:{id:1}}">
                      <el-button>免费</el-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>封装
                <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left" title="这是原理图的web预览，如果有多个原理图的话，仅显示第一个。"></i>
              </h2>
              <div class="svgmodel" style="">
                <template v-if="result.public.footPrintCdsSvg.value">
                  <object id="sembed1" :data="DEEHOWBASEURL+'/getView/'+result.public.footPrintCdsSvg.value" @load="initSvg('sembed1')" width="100%" height="100%"></object>
                </template>
              </div>
              <div class="forms">
                <div>
                  <el-button icon="el-icon-download" @click="payment1()">
                    <b>下载封装</b>
                  </el-button>
                  <div class="Payment" v-bind:class="{hide:show1}">
                    <router-link :to="{path:'/partpayment',query:{id:0}}">
                      <el-button>付费</el-button>
                    </router-link>
                    <router-link :to="{path:'/partpayment',query:{id:1}}">
                      <el-button>免费</el-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="symble3d" v-else>3D模型展示</div>
          <div style="clear:both;"></div>
          <div class="detaildata">
            <p>详细参数
              <span class="pull-right" style="margin-right:20px">
                <i v-if="upicon" @click="upicon=!upicon" class="icon icon-chevron-down" data-toggle="collapse" data-target="#collapseExample"></i>
                <i v-else @click="upicon=!upicon" class="icon icon-chevron-up" data-toggle="collapse" data-target="#collapseExample"></i>
              </span>
            </p>
            <div class="collapse" id="collapseExample">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <td>名称</td>
                    <td>参数</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in result.special" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.value}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="life">
          <div>
            <h3>生命周期</h3>
            <chart v-if="getdata" :child-com="content"></chart>
          </div>
          <div style="margin-top:-16px;">
            <h3>认证</h3>
            <p style="margin-left:10px;">RoHS:
              <b style="color:#006400;">Not Compliant</b>
            </p>
          </div>
          <div>
            <h3>可替代物料</h3>
            <div>
              <div class="relace">
                <p>瓷介电容器</p>
                <span>Black Box</span>
                <span>LIC022A-R2</span>
              </div>
              <div class="relace">
                <p>瓷介电容器</p>
                <span>Black Box</span>
                <span>LIC022A-R2</span>
              </div>
              <div class="relace">
                <p>瓷介电容器</p>
                <span>Black Box</span>
                <span>LIC022A-R2</span>
              </div>
            </div>
            <div style="clear:both;"></div>
            <p style="margin-top:10px;color:#6e8ed6;cursor:pointer;">
              <i class="el-icon-plus"></i>&nbsp;更多可替代物料</p>
          </div>
        </div>
        <div style="clear:both;"></div>
        <div style="margin-top:20px">
          <h3>授权分销商</h3>
          <table-chart v-if="getdata" :child-com1="mainNum"></table-chart>
        </div>
      </div>
    </div>
    <div class="container">

    </div>
  </div>
</template>


<script>
import { readCategoryGoodsDetail,readCategoryGoodsDetaillife } from "@/api/ele.js";
import chart from "./compontends/chart";
import tableChart from "./compontends/tableChart";
export default {
  components: {
    chart,
    tableChart
  },
  data() {
    return {
      regSteps: true,
      changecolor: true,
      changepdf: false,
      show: true,
      show1: true,
      upicon: true,
      getdata:false,
      content:{},
      mainNum:{},
      id: "",
      result: {
        special: [],
        public: {
          productModel: {
            name: "规格型号",
            specialPropertyId: null,
            value: "ISL1208IB8"
          },
          symCds: {
            name: "原理图符合",
            specialPropertyId: null,
            value: "CLOCK_ICS.OLB||ISL1208IB8"
          },
          footPrintCds: {
            name: "Cadence封装符号",
            specialPropertyId: null,
            value: ""
          },
          preRanking: {
            name: "优选等级/质量等级",
            specialPropertyId: null,
            value: "C"
          },
          model3d: {
            name: "三维模型",
            specialPropertyId: null,
            value: ""
          },
          manual: {
            name: "手册",
            specialPropertyId: null,
            value: ""
          },
          value: {
            name: "value",
            specialPropertyId: null,
            value: ""
          },
          packageType: {
            name: "封装类型",
            specialPropertyId: null,
            value: "SO-8"
          },
          partType: {
            name: "器件类型",
            specialPropertyId: null,
            value: "实时时钟"
          },
          manufacturer: {
            name: "生产厂家",
            specialPropertyId: null,
            value: "Intersil"
          },
          symCdsSvg: {
            name: "",
            specialPropertyId: null,
            value: ""
          },
          footPrintCdsSvg: {
            name: "",
            specialPropertyId: null,
            value: ""
          }
        }
      }
    };
  },
  methods: {
    tabClick1() {
      this.regSteps = true;
      this.changecolor = true;
    },
    tabClick2() {
      this.regSteps = false;
      this.changecolor = false;
    },
    payment() {
      // this.show = false;
      window.location.href =
        this.DEEHOWBASEURL +
        "/deehow-CMS-Web/public/file/download?filePath=" +
        this.result.public.symCdsSvg.value;
      console.log(
        this.DEEHOWBASEURL +
          "/deehow-CMS-Web/public/file/download?filePath=" +
          this.result.public.symCdsSvg.value
      );
    },
    payment1() {
      window.location.href =
        this.DEEHOWBASEURL +
        "/deehow-CMS-Web/public/file/download?filePath=" +
        this.result.public.footPrintCdsSvg.value;
      // this.show1 = false;
    },
    initSvg(sid) {
      let sembed = $("#" + sid);
      let obj = svgPanZoom("#" + sid, {
        zoomEnabled: true
      });
      obj.setZoomScaleSensitivity(0.5);
    },
    readData(obj) {
      readCategoryGoodsDetail(obj)
        .then(res => {
          //console.log(res);
          this.result = res.data;
          console.log(this.result);
          let manufacturersName=res.data.public.manufacturer.value;
          let manufacturerPartNumber=res.data.public.manufacturerPartNumber.value;
          // console.log(manufacturersName);
          // console.log(manufacturerPartNumber);
          let obj=new Object();
            obj.manufacturersName=res.data.public.manufacturer.value;
            obj.manufacturersNo=res.data.public.manufacturerPartNumber.value; 
          this.mainNum=obj;
          console.log(this.mainNum);
          readCategoryGoodsDetaillife(this.mainNum).then(res =>{
             //console.log(res);
             this.content=res.data;
             console.log(this.content);
             this.getdata=true;
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    initModel() {
      console.log(this.$route);
      this.id = this.$route.query.id;
      let obj = { id: this.id };
      this.readData(obj);
    },
    lookAttachment(index) {
      let newWin = window.open(
        "http://" +
          window.location.host +
          "/deehow-CMS-Web/public/file/view?filePath=" +
          this.result.public.manual.value
      );
    }
  },
  mounted() {
    //console.log(echarts);
    this.initModel();
  }
};
</script>

<style lang="scss" scoped>
.svgmodel {
  width: 100%;
  height: 300px;
  padding-right: 42px;
}
.daohang {
  width: 1300px;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  padding-left: 50px;
  li {
    display: inline-block;
  }
  i {
    padding: 0 5px;
  }
}
.title {
  padding-top: 1px;
  width: 1350px;
  height: 130px;
  margin: 0 auto;
  background: #f7f7f7;
  padding-left: 80px;
  > div {
    float: left;
  }
  .el-button {
    background: #ff791b;
    border: 1px solid #ff791b;
    color: #fff;
  }
  .el-button:hover {
    background: #ee690a;
  }
  .words {
    padding: 0 40px;
    h1 {
      color: #333;
    }
    h5 {
      color: #ff791b;
      span {
        color: #aaa;
      }
    }
  }
  .img {
    text-align: center;
    margin: 5px 0;
  }
}
.mainbox {
  width: 100%;
  position: absolute;
  background: #fff;
  .detaildata {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #fff;
    p {
      background: #f7f7f7;
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      color: #ff791b;
      font-size: 16px;
    }
    p:hover {
      background: #eee;
    }
    div {
      margin: 20px;
    }
  }
  .main {
    width: 1350px;
    margin: 0 auto;
    padding-top: 20px;
    h3 {
      b {
        display: inline-block;
        width: 50px;
        text-align: center;
        cursor: pointer;
      }
      span {
        color: #ff791b;
        cursor: pointer;
      }
      font {
        cursor: pointer;
      }
    }

    .leftside {
      float: left;
      width: 800px;
      .tabbox {
        width: 100%;
        height: 50px;
        background: #f7f7f7;
        a {
          display: inline-block;
          width: 90px;
          height: 50px;
          line-height: 50px;
          border-right: 1px solid #ddd;
          text-align: center;
          font-weight: bold;
        }
        .change {
          background: #fff;
          border-bottom: 2px solid #ff791b;
          color: #ff791b;
        }
      }
      .symble2d {
        > div {
          width: 390px;
          float: left;
          margin-top: 20px;
          background: #fff;
          border: 1px solid #ccc;
          img {
            width: 330px;
            margin-left: 20px;
          }
          h2 {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            margin-top: 0;
            margin-left:1px;
            background: #f7f7f7;
            font-size: 18px;
            i {
              width: 16px;
              color: #ccc;
            }
          }
          .forms {
            border-top: 1px solid #ccc;
            padding: 20px 40px;
            .el-select {
              width: 235px;
            }
            .el-button {
              background: #c3c3c3;
              color: #fff;
            }
            div {
              text-align: center;
              .el-button {
                width: 300px;
                background: #ff791b;
                color: #fff;
                height: 35px;
              }
              .Payment {
                .el-button {
                  margin-top: 10px;
                  width: 80px;
                  height: 30px;
                  background: #c3c3c3;
                }
              }
              .hide {
                display: none;
              }
            }
          }
        }
        div:nth-child(2) {
          margin-left: 20px;
        }
      }
      .symble3d {
        margin-top: 20px;
        width: 100%;
        height: 500px;
        line-height: 500px;
        text-align: center;
        background: #fff;
      }
    }
  }
  .life {
    float: left;
    width: 530px;
    margin-left: 20px;
  }
  .relace {
    width: 30%;
    text-align: center;
    float: left;
    margin-left: 10px;
    p {
      color: #6e8ed6;
    }
    span {
      display: block;
    }
  }
}
</style>
