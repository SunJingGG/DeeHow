<template>
  <div class="SubOrderContainer">
     <div class="SubOrderMain">
         <div class="SubOrderSteps">
             <el-steps  :active="0" align-center>
                <el-step title="提交订单"></el-step>
                <el-step title="完成付款"></el-step>
                <el-step title="完成支付"></el-step>
             </el-steps>
         </div>
         <div class="OrderMessage ">
             <div class="SubOrderMessageHeader"><h3>购买高级版</h3></div>
                  <el-form ref="form" :model="form" label-width="90px">
                        <el-form-item label="活动名称：">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="公司名称：">
                             <span>北京迪浩</span>
                        </el-form-item>
                        <el-form-item label="企业域名：">
                             <span>www.bjdihao.com.cn</span>
                        </el-form-item>
                        <el-form-item label="成员名额：">
                             <div class="block">
                                <el-slider
                                v-model="value8"
                                show-input>
                                </el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="购买年限：">
                              <el-radio-group>
                                    <el-radio label="1年"></el-radio>
                                    <el-radio label="2年"></el-radio>
                                    <el-radio label="3年"></el-radio>
                                    <el-radio label="4年"></el-radio>
                              </el-radio-group>
                        </el-form-item>
                        <el-form-item label="价格：">          
                                    <div class="division"><p class="firstP">699/人/月</p><p>12个月</p></div>x<span>12</span>个月x<span>10</span>人=<span>6990.00</span>元                             
                        </el-form-item>
                        <div class="orderBtn">
                            <span>总计：<b>6999.00</b>元</span>
                            <el-button round>提交订单</el-button>
                        </div>
                  </el-form>
         </div>

        <div class="OrderMessage hide2">
            <div class="OrderDetailsHeader"><h3>订单详情 （201807171028290）</h3></div>
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="公司名称：">
                            <span>北京迪浩</span>
                    </el-form-item>
                    <el-form-item label="企业域名：">
                            <span>www.bjdihao.com.cn</span>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                            <el-input class="phone"></el-input><span class="phoneMessage">支付成功后将给该号码发送确认短信</span>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData">
                    <el-table-column
                        prop="product"
                        label="产品"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="service"
                        label="服务类型"
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
                    <el-checkbox label="使用优惠劵" name="type"></el-checkbox>
                </div>
                <div class="clear"></div>
                <div class="payWay">
                    <a href=""><img src="../../assets/byProduct/pay.png" alt=""></a>
                    <a href=""><img src="../../assets/byProduct/pay1.png" alt=""></a>
                </div>
                <div class="orderBtn">
                        <span>总计：<b>6999.00</b>元</span>
                        <el-button round>提交订单</el-button>
                </div>
        </div>

        <div class="OrderMessage finished hide2">
             <div class="MessageBox">
                 <dl>
                     <dt><img src="../../assets/byProduct/success.png" alt=""></dt>
                     <dd>支付成功，请注意查收短信</dd>
                 </dl>
             </div>
             <div class="BtnGroups">
                 <el-row>
                    <el-button round>继续购买</el-button>
                    <el-button round>查看订单</el-button>
                    <el-button round>返回CMS</el-button>
                 </el-row>
             </div>
        </div>

        <div class="OrderMessage finished hide2">
             <div class="MessageBox">
                 <dl>
                     <dt><img src="../../assets/byProduct/wrong.png" alt=""></dt>
                     <dd>付款失败</dd>
                 </dl>
             </div>
             <div class="BtnGroups">
                 <el-row>
                    <el-button round>继续购买</el-button>
                    <el-button round>查看订单</el-button>
                    <el-button round>返回CMS</el-button>
                 </el-row>
             </div>
        </div>
         
     </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$light_gray:#eee;
h1,h2{
    padding:0;
    margin:0;
}
.clear{
    clear:both;
}
.SubOrderContainer{
    width:100%;
    .SubOrderMain{
        width:600px;
        // height:550px;
        margin:0 auto;
        margin-top:50px;
        // position: absolute;
        // top:50%;
        // left:50%;
        // transform: translate(-50%,-50%); 
        .hide2{
             display:none;
        }
        .OrderMessage{
            width:100%;
            .SubOrderMessageHeader,.OrderDetailsHeader{
                height:40px;
                background: #f2f2f2;
                h3{
                    padding-left: 20px;
                    line-height: 40px;
                }
            }
            .el-form{
                    width:80%;
                    margin:0 auto;
                    margin-top: 20px;
                    .division{
                        float: left;
                        margin-top: -16px;
                        .firstP{
                            border-bottom: 1px solid #000;
                        }
                    }
                    .el-form-item {
                         margin-bottom: 6px;
                    }
                    .phone{
                        width:150px;
                    }
                    .phoneMessage{
                        margin-left: 20px;
                        font-size: 12px;
                        color:#bbb;
                    }
                }
            .el-table,.payWay{
                width:85%;
                margin:0 auto;
            }
            .chooseWay{
                width:85%;
                margin:0 auto;
                padding:10px;
                border-bottom: 1px solid #bbb;
                .el-checkbox{
                    float:right;
                }
            }
            .orderBtn{
                float: right;
                span{
                    font-size: 18px;
                }
                b{
                  color:#ee4239;
                }
                .el-button{
                    margin-left: 20px;
                    background: #3a96ff;
                    color:#fff;
                }
            }
            .MessageBox{
                margin-top:50px;
            }
            .BtnGroups{
                margin-top:50px;
                .el-button{
                    margin:20px;
                    width:100px;
                    border:1px solid #ee4239;
                    color:#ee4239;
                }
                .el-button:hover{
                    background: #ee4239;
                    color:#fff;
                }
            }
        }
    }
    .finished{
        text-align: center;
    }
}
</style>


<script>
export default {
       data() {
      return {
        options: [{
          value: '选项1',
          label: '初级版'
        }, {
          value: '选项2',
          label: '中极版'
        }, {
          value: '选项3',
          label: '高级版'
        }],
        value: '',
        value8: 0,
        tableData: [{
            product:"cms高级版",
            service: '软件产品',
            price: '699/元/人',
            users:"10人",
            time:"2018-07-17至2018-07-20",
            sprice:"6990.00"
          }]
      }
    }
  }
</script>
