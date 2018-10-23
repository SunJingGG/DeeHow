<template>
  <div class="SubOrderContainer">
     <div class="SubOrderMain">
         <div class="SubOrderSteps">
             <el-steps process-status="process " align-center :active="regSteps">
                <el-step title="提交订单"></el-step>
                <el-step title="完成付款"></el-step>
                <el-step title="完成支付"></el-step>
             </el-steps>
         </div>
         <div class="OrderMessage" v-show="regSteps == 0"> <!-- v-bind:class="{hide:isOrder}" -->           
             <div class="SubOrderMessageHeader"><h3>购买高级版</h3></div>
                  <el-form ref="form" :model="form" label-width="90px">
                        <el-form-item label="套餐名称：">
                            <span>{{preferentialTitle}}</span>
                        </el-form-item>
                        <el-form-item label="公司名称：">
                             <span>{{unitName}}</span>
                        </el-form-item>
                        <el-form-item label="公司编码：">
                             <span>{{unitCode}}</span>
                        </el-form-item>
                        <el-form-item label="成员名额：">
                             <div class="block">
                                <el-slider
                                v-model="serNumber"
                                show-input>
                                </el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="购买年限：">
                              <el-radio-group v-model="resource">
                                    <el-radio  :label="1">1年</el-radio>
                                    <el-radio  :label="2">2年</el-radio>
                                    <el-radio  :label="3">3年</el-radio>
                                    <el-radio  :label="4">4年</el-radio>
                              </el-radio-group>
                        </el-form-item>
                        <el-form-item label="价格：">          
                                    <span>{{price}}</span>/人/月x<span>{{resource*12}}</span>个月x<span>{{serNumber}}</span>人=<span>{{price*resource*12*serNumber}}</span>元                             
                        </el-form-item>
                        <div class="orderBtn">
                            <span>总计：<b>{{price*resource*12*serNumber}}</b>元</span>
                            <el-button round v-on:click="Hide">提交订单</el-button>
                        </div>
                  </el-form>
         </div>

         <div class="OrderMessage"  v-show="regSteps == 1"> <!-- v-bind:class="{hide:isPay}" -->
            <div class="OrderDetailsHeader"><h3>订单详情</h3></div>
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="公司名称：">
                            <span>{{unitName}}</span>
                    </el-form-item>
                    <el-form-item label="公司编码：">
                            <span>{{unitCode}}</span>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                            <el-input class="phone" v-model="phone"></el-input><span class="phoneMessage">支付成功后将给该号码发送确认短信</span>
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
                    <a><img src="../../assets/byProduct/pay.png" alt=""></a>
                    <a><img src="../../assets/byProduct/pay1.png" alt=""></a>
                </div>
                <div class="orderBtn">
                        <span>总计：<b>{{price*resource*12*serNumber}}</b>元</span>
                        <el-button round v-on:click="Hide1">支付</el-button>
                </div>
        </div>

        <div class="OrderMessage finished" v-show="regSteps == 2"><!-- v-bind:class="{hide:isSuccess}" -->
             <div class="MessageBox">
                 <dl>
                     <dt><img src="../../assets/byProduct/success.png" alt=""></dt>
                     <dd>支付成功，请注意查收短信</dd>
                 </dl>
             </div>
             <div class="BtnGroups">
                 <el-row>
                   <router-link :to="{path:'/OPMA/orderManage/index'}"> 
                    <el-button round>继续购买</el-button>
                   </router-link>
                   <router-link :to="{path:'/OPMA/orderManage/index'}"> 
                    <el-button round>返回CMS</el-button>
                    </router-link>
                 </el-row>
             </div>
        </div>

        <div class="OrderMessage finished" v-show="regSteps == 3" >
             <div class="MessageBox">
                 <dl>
                     <dt><img src="../../assets/byProduct/wrong.png" alt=""></dt>
                     <dd>付款失败</dd>
                 </dl>
             </div>
             <div class="BtnGroups">
                 <el-row>
                    <el-button round>继续购买</el-button>
                    <el-button round>返回CMS</el-button>
                 </el-row>
             </div>
        </div>
         
     </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
h1,
h2 {
  padding: 0;
  margin: 0;
}
.clear {
  clear: both;
}
.active{
  color:red;
}
.SubOrderContainer {
  width: 100%;
  .SubOrderMain {
    width: 600px;
    // height:550px;
    margin: 0 auto;
    margin-top: 50px;
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
      }
      .BtnGroups {
        margin-top: 50px;
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
  .finished {
    text-align: center;
  }
}
</style>


<script>
import {
    insertOrder
} from "@/api/order";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "初级版"
        },
        {
          value: "选项2",
          label: "中极版"
        },
        {
          value: "选项3",
          label: "高级版"
        }
			],
			isOrder: false,
			isPay: true,
			isSuccess:true,
      isWrong:true,
      preferentialTitle:'',
      price:0,
      unitName :'',
      unitCode:'',
      value: "",
			serNumber: 0,
			resource:0,
			total:0,
			product:'',
      phone: "",
			form: {
				
        },
      regSteps: 0,
      tableData: [
        
			],
    };
	},
	methods:{
     Hide(){
			 	let object=new Object();
				object.price=this.price;
				object.users=this.serNumber;
				object.product=this.preferentialTitle;     
        object.years=this.resource;
        object.sprice=this.price*this.serNumber*this.resource*12;
        let now = new Date();
        now.setFullYear(now.getFullYear () + this.resource);
        // object.time=now.getFullYear()+"-"+(parseInt(now.getMonth())+1)+"-"+now.getDate(); 
        object.time=now.toLocaleString();
        this.total=object.sprice;
        let array=new Array();
        array.push(object);
				this.tableData=array;
        console.log(this.tableData);
        if(this.serNumber!=0&this.resource!=0){
            // this.isOrder =true;
            // this.isPay =false;
            this.regSteps=1;
         }else{
                this.$message({
                type: "info",
                message: "请选择人数和年限"
              });     
         }				
		 },
		 Hide1(){
         this.insertOrder();     		 
		 },
		insertOrder(){
			let o=new Object();
			o.preferentialId=this.$route.query.id;
			o.sum=this.total;
			o.personNum=this.serNumber;
			o.phone=this.phone;
      o.validityTime=this.resource;
			insertOrder(o).then(res => {
        console.log(res);
        if (res.httpCode == 200) {
              // this.isPay =true;
              // this.isSuccess =false;
              this.regSteps=2;
            } else {
          }	
			})
		},  
		
	},
	mounted(){
		this.preferentialTitle=this.$route.query.preferentialTitle;
    this.price=this.$route.query.price;
    this.unitName=this.$route.query.name;
    this.unitCode=this.$route.query.code;
		console.log(this.$route.query.id)
	}
	
};
</script>
