<template>
  <div>
    <div class="sbyproduct">
      <!-- <img src="../../assets/byProduct/bybg.png" alt="" srcset=""> -->
      <h3 class="payment-mothed">支付方式</h3>
      <div class="">
        <div class="container">
          <p class="ifby">如何购买/定价</p>
        </div>
        <hr>
      </div>
      <div class="container" style="margin-top:30px">
        <div>
          <p class="stitle">CMS入门解决方案</p>
          <p class="sdesc">为您提供最适合您的电子设计需求的解决方案</p>
        </div>
        <table class="table table-bordered stab" >
          <tr>
            <td>
              <div class="greypanel">
                <p class="sversion">初级版</p>
                <div class="bymounth">
                  
                  <p  style="padding-bottom:20px">
                    <span class="rmbfh">￥</span>
                    <span style="color:#55C1DB">
                      <span class="srmb">39/</span><span class="smounth">人/月</span>
                    </span>
                    
                  </p>
                  <el-button type="info" round>当前版本</el-button>
                </div>
                <!-- <p class="introduction">在浏览器中或与您的PCB设计工具集成.</p> -->
              </div>
            </td>
            <td>
              <div class="greypanel">
                <p class="sversion">高级版</p>
                <div class="bymounth">
                  <p style="padding-bottom:20px">
                    <span class="rmbfh">￥</span>
                    <span style="color:#41dbc3">
                      <span class="srmb">39/</span><span class="smounth">人/月</span>
                    </span>
                  </p>
                  <el-button type="danger" round>立即升级</el-button>
                </div>
                <p class="introduction" style="margin-top:20px;text-align:center">在浏览器中或与您的PCB设计工具集成.</p>
                <div class="sdetail">
                  <p class="introduction">-每个BOM的浏览器支持</p>
                  <p class="introduction">-集成在Altium Designer中</p>
                </div>
              </div>
            </td>
            <td>
              <div class="greypanel">
                <p class="sversion">高级版</p>
                <div class="bymounth">
                  <p style="padding-bottom:20px">
                    <span class="rmbfh">￥</span>
                    <span style="color:#316fc3">
                      <span class="srmb">39/</span><span class="smounth">人/月</span>
                    </span>
                  </p>
                  <el-button type="danger" round>立即升级</el-button>
                </div>
                <p class="introduction" style="margin-top:20px;text-align:center">在浏览器中或与您的PCB设计工具集成.</p>
                <div class="sdetail">
                  <p class="introduction">-集成在Altium Designer中</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="whitepanel">
                <p class="scovers">包括所有的未注册的搜索功能,以及:</p>
                <ul class="regulations">
                  <li>
                    <img src="../../assets/byProduct/over.png" alt="">
                    <span>无限制访问Ciiva零件数据库中的数千个组件.</span>
                  </li>
                  <li>
                    <img src="../../assets/byProduct/over.png" alt="">
                    <span>每个Ciiva部件的历史生命周期数据,定价和可用性.</span>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div class="whitepanel">
                <p class="scovers">包括所有CMS的搜索功能,以及:</p>
                <ul class="regulations">
                  <li>
                    <img src="../../assets/byProduct/over.png" alt="">
                    <span>对BOM中的每个组件进行一键式零件分析.</span>
                  </li>
                  <li>
                    <img src="../../assets/byProduct/over.png" alt="">
                    <span>使用BOM中每个组件的首选分销商获
得最优惠的价格.</span>
                  </li>
                </ul>
              </div>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <div id="test">
          <div v-for = "item in list" :key="item">{{item.phone}}</div>
    </div>
  </div>
</template>
<script>
import {
    getOrderMessage
} from "@/api/order";
export default {
    data() {
      return {
            address: "",
            auditTime: null,
            createBy: "",
            createTime: "",
            email: "",
            enable: "",
            id: "",
            keyword: "",
            password: "",
            phone: "",
            principal: "",
            principalId: "",
            remark: "",
            status: "",
            unitName: "",
            updateBy: "",
            updateTime: "",
            userName: "",
            list:[],
      }
    },
    methods:{
       OrderMessage(){
         getOrderMessage({}).then(res => {
           console.log(res);
           if(res.data.length>0){
                this.list=res.data;
           }else{

           }
         })
       },
       
    },
    mounted(){
          this.OrderMessage();
       },
  }
</script>
<style lang="scss" scoped>
#test{
  width:100px;
  height:300px;
  border:1px solid #000;
}
.sbyproduct{
  background: url('../../assets/byProduct/bybg.png') no-repeat;
  background-size: 100% 100%;
  width:100%;
  height:60px;
  .payment-mothed{
    text-align: center;
    color: #fff;
    line-height: 60px;
    margin: 0;

  }
  .stitle{
    text-align: center;
    font-weight: 500;
    font-size:24px;
  }
  .sdesc{
    text-align: center;
    font-size: 12px;
    color:#999;
  }
  .ifby{
    text-align: right;
    line-height:35px;
    color:#666;
  }
  .stab{
    width: 820px;
    margin: 20px auto;

    tr td{
      width:33.33%;
      padding:0;
    }
  }
  .greypanel{
    background: #fafafa;
    height:320px;
    width:100%;
    // border:1px solid #ccc;
    
    .sversion{
      text-align: center;
      padding-top:20px;
      font-size:15px;
    }
    .introduction{
      color:#999;
      font-size:12px;
    }
    .bymounth{
      margin-top:30px;
      text-align: center;
      .rmbfh{
        font-size:30px;
        font-weight: 600;
        color:#ccc;
        position: relative;
        top: -10px;
      }
      .srmb{
        font-size:30px;
        font-weight: 500;
      }
      .smounth{
        font-size:20px;
      }
      
    }
    .sdetail{
      width:90%;
      margin:20px auto 0px;
      border-top:1px solid #ccc;
      text-align:left;
      padding-left:30px;
      padding-top: 20px;
    }
  }
  .whitepanel{
    height:100%;
    width: 100%;
    padding-top:20px;
    .scovers{
      text-align: center;
      line-height:20px;
      font-weight:500;
    }
    .regulations{
      position: relative;
      li{
        position: relative;
        img{
          position: absolute;
          left:-25px;
          width: 17px;
        }
      }
      margin-top: 20px;
      padding-left:60px;
      padding-right:20px;
    }
  }
}
</style>
