<template>
  <div>
    <!-- <div class="container"></div> -->
    <div class="banner">
      <img src="../../../assets/home/indexbanner.png" alt="">
      <div class="title">
        <span>CMS一体化协同设计平台</span>
        <p>Integrated collaborative design platform</p>
      </div>
      <div class="searchBox">
      <h2>将意图转化为可实现的设计</h2>
      <p>你的梦想从来都不是管理部件，智能部件可以自我管理，所以你不必这样做</p>
      <el-input placeholder="根据partNum或者关键字检索" prefix-icon="el-icon-search"></el-input>
      <p>Or see example:USB type A</p>
      </div>
    </div>
    <div style="background:#f7f7f8;padding-bottom:30px">
      <div class="container clearfix">
        <div class="taocan">
          <div class="tc-header">
            <p class="fangan">CMS 入门解决方案</p>
            <p class="tc-detail">搜索下面的CMS解决方案,找到最适合您的电子设计需求的解决方案</p>
          </div>
        </div>
        <div class="row" style="margin-top:-50px;text-align:center">
          <div class="col-md-3">
            <div class="banben hvr-float-shadow ">
              <div class="sbb">免费版</div>
              <hr>
              <div class="price  hvr-overline-from-left">
                <span class="fh">￥</span>
                <span style="color:#3db9d7">{{price0}}/</span>
                <span style="color:#3db9d7">人/月</span>
                <div class="sbt">
                  <button class="btn btn-danger" @click="byProduct(0)">立即使用</button>
                </div>
              </div>
              <hr>
              <div class="desc ">
                <p>用户 : 10人以下</p>
                <p>任务</p>
                <p>消息</p>
                <p>日历</p>
                <p>网盘</p>
                <p>服务集成</p>
                <p>基本任务统计</p>
                <p>自定义权限及角色管理</p>
              </div>
            </div>

          </div>
          <div class="col-md-3">
            <div class="banben  hvr-float-shadow ">
              <div class="sbb">专业版</div>
              <hr>
              <div class="price hvr-overline-from-left">
                <span class="fh">￥</span>
                <span style="color:#16d4b8">{{price1}}/</span>
                <span style="color:#16d4b8">人/月</span>
                <div class="sbt">
                  <button class="btn btn-danger"  @click="byProduct(1)">立即使用</button>
                </div>
              </div>
              <hr>
              <div class="desc">
                <p>用户 : 10人以上</p>
                <p>免费版全部功能</p>
                <p>简报</p>
                <p>审批</p>
                <p>甘特图</p>
                <p>短信提醒</p>
                <p>自定义项目字段</p>
                <p>支持日历排期视图</p>
                <p>完善的安全日志</p>
                <p>自定义任务统计</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="banben hvr-float-shadow ">
              <div class="sbb">企业版</div>
              <hr>
              <div class="price hvr-overline-from-left">
                <span class="fh">￥</span>
                <span style="color:#d7384e">{{price2}}/</span>
                <span style="color:#d7384e">人/月</span>
                <div class="sbt">
                  <button class="btn btn-danger "  @click="byProduct(2)">立即使用</button>
                </div>
              </div>
              <hr>
              <div class="desc">
                <p>用户 : 10人以上</p>
                <p>专业版全部功能</p>
                <p>考勤</p>
                <p>门户</p>
                <p>公告</p>
                <p>目标</p>
                <p>任务工时及统计</p>
                <p>企业自定义</p>
                <p>数据导出备份</p>
                <p>基于SAML的单点登录</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="banben hvr-float-shadow ">
              <div class="sbb">旗舰版</div>
              <hr>
              <div class="price hvr-overline-from-left">
                <span class="fh">￥</span>
                <span style="color:#316fa3">{{price3}}/</span>
                <span style="color:#316fa3">人/月</span>
                <div class="sbt">
                  <button class="btn btn-danger "  @click="byProduct(3)">立即使用</button>
                </div>
              </div>
              <hr>
              <div class="desc">
                <p>用户 : 10人以上</p>
                <p>企业版全部功能</p>
                <p>销售</p>
                <p>考核</p>
                <p>支持ACTIVE DIRECTORY</p>
                <p>支持基于OPEN API二次开发</p>
                <p>支持绑定企业域名</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;padding:30px 0px">
      <div class="container">
        <h2>EDA协同设计平台</h2>
        <div style="padding-top:30px">
          <img class="hvr-grow" src="../../../assets/home/edalc.png" style="width:800px" alt="">
        </div>
      </div>
    </div>
    <div style="background:#f7f7f8;padding:30px 0px">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img class="hvr-grow" src="../../../assets/home/tjbb1.png" alt="" srcset="">
          </div>
          <div class="col-md-6">
            <div class="jieshao hvr-grow">
              <h3 style="font-size:25px;">优选元器件库管理平台</h3>
              <p>
                优选元器件库管理平台可根据企业需求制定器件管理规 范，通过数据库动态管理企业器件，指定设计流程中器 件使用范围，强大的物料统计和评价机制，控制生产成 本，保证产品质量。与Cadence等软件提供可定制接口， 评审元器件模型规范。打通设计与制造、采购等环节的 通道，解放设计师在元器件选型和BOM设计的繁琐工作 ，减少人为出错，极大地提高工作效率。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="background:#fff;padding:30px 0px 0px">
      <div class="container">
        <div class="row" style="min-height:400px">

          <div class="col-md-6">
            <div class="jieshao hvr-grow">
              <h3 style="font-size:25px;">规则库管理</h3>
              <p>
                定制企业对设计的规则要求，规范设计方案。规则自动下载， 与云端同步，设置权限和版本管理，可动态修改规则，记录 更改日志。与Cadence等EDA软件实现无缝对接，自动对原 理图、PCB等电路设计应用规则审查，提供分析报告。并可 针对特殊电路量身定做设计要求。方便设计师、工艺师、审 查人员等沟通，保障产品可靠性，并缩短开发周期，提高工 作效率。
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <img class="hvr-grow" src="../../../assets/home/tjbb2.png" alt="" style="margin-top:30px" srcset="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderMessage } from "@/api/order";
export default {
  data() {
    return {
      list: [],
      price:[],
      name: "",
      code: "",
      price0:0,
      price1:0,
      price2:0,
      price3:0,
    };
  },
  methods: {
    OrderMessage() {
      getOrderMessage({}).then(res => {
        if (res.data.length > 0) {
          this.list = res.data;
            this.list.forEach((v,i)=>{
              //console.log(v.price)
            this.price.push(v.price);
            this.price0=this.price[0];
            this.price1=this.price[1];
            this.price2=this.price[2];
            this.price3=this.price[3];
            })
          this.name = res.unitName;
          this.code = res.unitCode;
        } else {
        }
      });
    },
    byProduct(num){
      console.log(this.list[num])
      let obj = this.list[num];
      if(this.code){

        this.$router.push({
          path:'/need/subOrder',
          query:{
            id:obj.id,
            price:obj.price,
            preferentialTitle:obj.preferentialTitle,
            name:this.name,
            code:this.code
          }
        })
      }else{
          this.$router.push({
            path:'/need/subOrder',
          })
      }
    }
  },
  mounted() {
    this.OrderMessage();
    console.log(this.$store)
  }
};
</script>


<style lang="scss" scoped>
.banner {
  background: -ms-linear-gradient(to right, #1e1e1e,  #050505);        /* IE 10 */
  background:-moz-linear-gradient(to right,#1e1e1e,#050505);/*火狐*/ 
  background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#1e1e1e), to(#050505));/*谷歌*/ 
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#1e1e1e), to(#050505));      /* Safari 4-5, Chrome 1-9*/
  background: -webkit-linear-gradient(top, #1e1e1e, #050505);   /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #1e1e1e, #050505);  /*Opera 11.10+*/
  position: relative;
  .searchBox{
    color:#fff;
    position: absolute;
    top:47%;
    left:20%;
    z-index: 10;
    p{
       margin: 10px 0;
    }
    .el-input{
      width:290px;
    }
  }
  .title{
    width:580px;
    color:#fff;
    position: absolute;
    top:15%;
    left:50%;
    margin-left: -290px;
    text-align: center;
    z-index: 10;
    span{
      display: block;
      font-size: 42px;
    }
    p{
      color:#4b4a4a;
      font-size: 18px;
      margin-top: 18px;
    }
  }
}
.taocan {
  // width:600px;
  // margin:0 auto;
  text-align: center;
  position: relative;
  top: -50px;
  .tc-header {
    background: #dc4e2d;
    padding: 15px;
    .fangan {
      color: #fff;
      font-size: 20px;
    }
    .tc-detail {
      color: #fff;
      font-size: 12px;
    }
  }
}
.banben {
  border: 1px solid #e8e8ed;
  background: #fff;
  width: 100%;
  .sbb {
    font-size: 20px;
    line-height: 50px;
  }
  .sbt {
    padding: 20px 0px;
    button {
      padding: 5px 22px;
      border-radius: 10px;
    }
  }
  .price {
    padding: 30px 0px;
    width: 100%;
    > span:nth-child(1) {
      position: relative;
      top: -5px;
      font-size: 20px;
      font-weight: 900;
      color: #cdcdcd;
    }
    > span:nth-child(2) {
      font-size: 24px;
    }
    > span:nth-child(3) {
      font-size: 18px;
    }
  }
  .desc {
    padding: 20px 0px;
    height: 420px;
    p {
      color: #666;
      line-height: 30px;
    }
  }
}
.jieshao {
  p {
    font-size: 15px;
    line-height: 30px;
    margin-top: 54px;
  }
}
</style>
