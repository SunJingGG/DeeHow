<template>
  <div>
    <!-- <div class="container"></div> -->
    <div style="background:#f7f7f8;padding-bottom:30px" v-show="regSteps == 0">
      <div class="container clearfix">
        <div class="taocan">
          <div class="tc-header">
            <p class="fangan">CMS 入门解决方案</p>
            <p class="tc-detail">搜索下面的CMS解决方案,找到最适合您的电子设计需求的解决方案</p>
          </div>
        </div>
        <div class="row" style="margin-top:50px;text-align:center">
          <div class="col-md-3">
            <div class="banben hvr-float-shadow ">
              <div class="sbb">免费版</div>
              <hr>
              <div class="price  hvr-overline-from-left">
                <span class="fh">￥</span>
                <span style="color:#3db9d7">{{change.price0}}/</span>
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
                <span style="color:#16d4b8">{{change.price1}}/</span>
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
                <span style="color:#d7384e">{{change.price2}}/</span>
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
                <span style="color:#316fa3">{{change.price3}}/</span>
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

      <div class="SubOrderMain">
         <div class="OrderMessage" v-show="regSteps == 1"> <!-- v-bind:class="{hide:isOrder}" -->  
              <div class="SubOrderSteps">
                <el-steps process-status="process" :active="0">
                    <el-step title="提交订单"></el-step>
                    <el-step title="完成付款"></el-step>
                    <el-step title="完成支付"></el-step>
                </el-steps>
            </div>         
             <div class="SubOrderMessageHeader"><h3>购买高级版</h3></div>
                  <el-form ref="form" :model="form" label-width="90px">
                        <el-form-item label="套餐名称：">
                            <span>{{change.preferentialTitle}}</span>
                        </el-form-item>
                        <el-form-item label="公司名称：">
                             <span>{{change.unitName}}</span>
                        </el-form-item>
                        <el-form-item label="公司编码：">
                             <span>{{change.unitCode}}</span>
                        </el-form-item>
                        <el-form-item label="成员名额：">
                             <div class="block">
                                <el-slider
                                v-model="change.serNumber"
                                show-input>
                                </el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="购买年限：">
                              <el-radio-group v-model="change.resource">
                                    <el-radio  :label="1">1年</el-radio>
                                    <el-radio  :label="2">2年</el-radio>
                                    <el-radio  :label="3">3年</el-radio>
                                    <el-radio  :label="4">4年</el-radio>
                              </el-radio-group>
                        </el-form-item>
                        <el-form-item label="价格：">          
                                    <span>{{change.price}}</span>/人/月x<span>{{change.resource*12}}</span>个月x<span>{{change.serNumber}}</span>人=<span>{{change.price*change.resource*12*change.serNumber}}</span>元                             
                        </el-form-item>
                        <div class="orderBtn">
                            <span>总计：<b>{{change.price*change.resource*12*change.serNumber}}</b>元</span>
                            <el-button round v-on:click="Hide">提交订单</el-button>
                        </div>
                  </el-form>
         </div>

         <div class="OrderMessage"  v-show="regSteps == 2"> <!-- v-bind:class="{hide:isPay}" -->
         <div class="SubOrderSteps">
                <el-steps process-status="process" :active="1">
                    <el-step title="提交订单"></el-step>
                    <el-step title="完成付款"></el-step>
                    <el-step title="完成支付"></el-step>
                </el-steps>
            </div>
            <div class="OrderDetailsHeader"><h3>订单详情</h3></div>
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="公司名称：">
                            <span>{{change.unitName}}</span>
                    </el-form-item>
                    <el-form-item label="公司编码：">
                            <span>{{change.unitCode}}</span>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                            <el-input class="phone" v-model="change.phone"></el-input><span class="phoneMessage">支付成功后将给该号码发送确认短信</span>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData">
                    <el-table-column
                        prop="product"
                        label="产品"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="years"
                        label="购买年限"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价">
                    </el-table-column>
                    <el-table-column
                        prop="users"
                        label="成员名额">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="有效时间">
                    </el-table-column>
                    <el-table-column
                        prop="sprice"
                        label="服务价格（元）">
                    </el-table-column>
                </el-table>
                <div class="chooseWay">
                    <span>选择支付方式</span>
                </div>
                <div class="clear"></div>
                <div class="payWay">
                    <span><img src="../../../assets/byProduct/pay.png" alt=""></span>
                    <span><img src="../../../assets/byProduct/pay1.png" alt=""></span>
                </div>
                <div class="orderBtn">
                        <span>总计：<b>{{change.price*change.resource*12*change.serNumber}}</b>元</span>
                        <el-button round v-on:click="Hide1">支付</el-button>
                </div>
        </div>

        <div class="OrderMessage" v-show="regSteps == 3"><!-- v-bind:class="{hide:isSuccess}" -->
        <div class="SubOrderSteps">
                <el-steps process-status="process" :active="2">
                    <el-step title="提交订单"></el-step>
                    <el-step title="完成付款"></el-step>
                    <el-step title="完成支付"></el-step>
                </el-steps>
            </div>
             <div class="MessageBox">
                 <dl>
                     <dt><img src="../../../assets/byProduct/success.png" alt=""></dt>
                     <dd>支付成功，请注意查收短信</dd>
                 </dl>
             </div>
             <div class="BtnGroups">
                 <el-row>
                    <el-button round @click="again">继续购买</el-button>
                    <el-button round @click="again">返回CMS</el-button>
                 </el-row>
             </div>
        </div>

        <div class="OrderMessage" v-show="regSteps == 4" >
          <div class="SubOrderSteps">
                <el-steps process-status="process" :active="2">
                    <el-step title="提交订单"></el-step>
                    <el-step title="完成付款"></el-step>
                    <el-step title="完成支付"></el-step>
                </el-steps>
            </div>
             <div class="MessageBox">
                 <dl>
                     <dt><img src="../../../assets/byProduct/wrong.png" alt=""></dt>
                     <dd>付款失败</dd>
                 </dl>
             </div>
             <div class="BtnGroups">
                 <el-row>
                    <el-button round @click="regSteps = 0">继续购买</el-button>
                    <el-button round @click="regSteps = 0">返回CMS</el-button>
                 </el-row>
             </div>
        </div>
         
     </div>
  </div>
</template>

<script>
import { getOrderMessage, insertOrder } from "@/api/order";
export default {
  data() {
    return {
      change:{
        name: "",
        code: "",
        price0: 0,
        price1: 0,
        price2: 0,
        price3: 0,
        preferentialTitle: "",
        price: 0,
        unitName: "",
        unitCode: "",
        value: "",
        serNumber: 0,
        resource: 0,
        total: 0,
        product: "",
        phone: "",
      },
      list: [],
      prices: [],     
      form: {},
      regSteps: 0,
      tableData: [],
      idbox:{},
    };
  },
  methods: {
    OrderMessage() {
      getOrderMessage({}).then(res => {
        console.log(res);
        if (res.data.length > 0) {
          this.list = res.data;
          console.log(this.list);
          this.list.forEach((v, i) => {
            //console.log(v.price)
            this.prices.push(v.price);
            this.change.price0 = this.prices[0];
            this.change.price1 = this.prices[1];
            this.change.price2 = this.prices[2];
            this.change.price3 = this.prices[3];
          });
          this.change.name = res.unitName;
          this.change.code = res.unitCode;
        } else {
        }
      });
    },
    byProduct(num) {
      this.regSteps = 1;
      console.log(this.list[num]);
      let obj = this.list[num];
      this.idbox.id= obj.id;
      this.change.preferentialTitle=obj.preferentialTitle;
      this.change.price=obj.price;
      this.change.unitName=this.change.name;
      this.change.unitCode=this.change.code;
    },
    Hide() {
      let object = new Object();
      object.price = this.change.price;
      object.users = this.change.serNumber;
      object.product = this.change.preferentialTitle;
      object.years = this.change.resource;
      object.sprice = this.change.price * this.change.serNumber * this.change.resource * 12;
      let now = new Date();
      now.setFullYear(now.getFullYear() + this.change.resource);
      // object.time=now.getFullYear()+"-"+(parseInt(now.getMonth())+1)+"-"+now.getDate();
      object.time = now.toLocaleDateString();
      this.change.total = object.sprice;
      let array = new Array();
      array.push(object);
      this.tableData = array;
      console.log(this.tableData);
      if ((this.change.serNumber != 0) & (this.change.resource != 0)) {
        // this.isOrder =true;
        // this.isPay =false;
        this.regSteps = 2;
      } else {
        this.$message({
          type: "info",
          message: "请选择人数和年限"
        });
      }
    },
    Hide1() {
      this.insertOrder();
    },
    again(){
      this.regSteps = 0;
       //window.location.reload();
    },
    insertOrder() {
      let o = new Object();
      o.preferentialId = this.idbox.id;
      o.sum = this.change.total;
      o.personNum = this.change.serNumber;
      o.phone = this.change.phone;
      o.validityTime = this.change.resource;
      insertOrder(o).then(res => {
        console.log(res);
        if (res.httpCode == 200) {
          this.regSteps = 3;
          this.change = {};
          this.OrderMessage();
        } else {
        }
      });
    }
  },
  mounted() {
    this.OrderMessage();
    console.log(this.$store);
    console.log(this.$route.query.id);
  }
};
</script>


<style lang="scss" scoped>
.banner {
  // width:100%;
  // height:560px;
  // background:url('../../../assets/home/banner.png') no-repeat;
  // background-size: 100%;
}
.taocan {
  // width:600px;
  // margin:0 auto;
  text-align: center;
  position: relative;
  top: 50px;
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

.clear {
  clear: both;
}
.active {
  color: red;
}
.SubOrderMain {
  width: 600px;
  // height:550px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 80px;
  // position: absolute;
  // top:50%;
  // left:50%;
  // transform: translate(-50%,-50%);
  .hide {
    display: none;
  }
  .OrderMessage {
    width: 100%;
    .SubOrderMessageHeader,
    .OrderDetailsHeader {
      height: 40px;
      background: #f2f2f2;
      h3 {
        padding-left: 20px;
        line-height: 40px;
      }
    }
    .el-form {
      width: 80%;
      margin: 0 auto;
      margin-top: 20px;
      .el-form-item {
        margin-bottom: 6px;
      }
      .phone {
        width: 150px;
      }
      .phoneMessage {
        margin-left: 20px;
        font-size: 12px;
        color: #bbb;
      }
    }
    .el-table,
    .payWay {
      width: 85%;
      margin: 0 auto;
    }
    .chooseWay {
      width: 85%;
      margin: 0 auto;
      padding: 10px;
      border-bottom: 1px solid #bbb;
    }
    .orderBtn {
      float: right;
      span {
        font-size: 18px;
      }
      b {
        color: #ee4239;
      }
      .el-button {
        margin-left: 20px;
        background: #3a96ff;
        color: #fff;
      }
    }
    .MessageBox {
      margin-top: 50px;
      text-align: center;
    }
    .BtnGroups {
      margin-top: 50px;
      text-align: center;
      .el-button {
        margin: 20px;
        width: 100px;
        border: 1px solid #ee4239;
        color: #ee4239;
      }
      .el-button:hover {
        background: #ee4239;
        color: #fff;
      }
    }
  }
}
</style>
