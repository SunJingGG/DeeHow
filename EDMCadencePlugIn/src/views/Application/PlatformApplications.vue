<template>
	<div class="posa">
		<!-- <h2 style="margin-left:8%">
			<em>欢迎使用</em>
		</h2> -->
		<div class="title">
			<div style="width:20%">
				<b style="font-size:43px;">EDM</b>
				<p>元器件的建库平台</p>
			</div>
			<div class="inputbox"><input type="text" placeholder="在此输入您需要的服务">
				<button>搜全部</button>
				<div class="under-search">
					<ul class="recommand-keywords">
						<li>
							<a rel="nofollow" target="_blank">基础运维</a>
						</li>
						<li>
							<a rel="nofollow" target="_blank">我的配置</a>
						</li>
						<li>
							<a rel="nofollow" target="_blank">审批中心</a>
						</li>
						<li>
							<a rel="nofollow" target="_blank">日报管理</a>
						</li>
						<li>
							<a rel="nofollow" target="_blank">元器件管理</a>
						</li>
						<li>
							<a rel="nofollow" target="_blank">规则管理</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="banner">

		</div>
		<div class="message">
			<div class="intro">
				<div class="msg">
					<div class="msgLeft">
						<h2>建库服务</h2>
						<p>为企业提供专业的建库服务</p>
					</div>
					<div><img src="../../assets/Application/intro1.png" alt=""></div>
				</div>
				<div class="msg">
					<div class="msgLeft">
						<h2>优选库管理</h2>
						<p>为企业搭建设计优选库</p>
					</div>
					<div><img src="../../assets/Application/intro2.png" alt=""></div>
				</div>
				<div class="msg">
					<div class="msgLeft">
						<h2>规则库管理</h2>
						<p>搭建自己的检查规则库平台</p>
					</div>
					<div><img src="../../assets/Application/intro3.png" alt=""></div>
				</div>
				<div class="msg">
					<div class="msgLeft">
						<h2>设计协同</h2>
						<p>不同场所、人进行设计协同</p>
					</div>
					<div><img src="../../assets/Application/intro4.png" alt=""></div>
				</div>
			</div>
			<div style="clear:both;"></div>
			<div class="ask">
				<div class="first">
					<b>原理图符号库没有？</b>
					<br>
					<b>建库繁琐？</b>
					<br>
					<b>没关系，统统交给我们来做</b>
				</div>
				<div>
					<span>登陆我们的平台</span>
					<p>www.bjdihao.com.cn</p>
				</div>
				<div>
					<span>搜索对应器件</span>
					<p></p>
				</div>
				<div>
					<span>提交建库申请</span>
					<p></p>
				</div>
				<div>
					<span>我们将在24小时内</span>
					<p>完成您的建库需求</p>
				</div>
			</div>
			<div style="clear:both;"></div>
			<div class="bigTit">
				<span class="left_pic"><img src="../../assets/Application/intro5.png" alt=""></span>
				<span class="area">我们系统提供的服务</span>
				<span class="left_pic"><img src="../../assets/Application/intro6.png" alt=""></span>
			</div>
			<div style="clear:both;"></div>
			<div class="models">
				<div class="model modelF" style="border:1px solid #f19f4f;">
					<div class="modelB" style="background:#f19f4f;">
						<div><img src="../../assets/Application/modelf1.png" alt=""></div>
						<h3>基础设置</h3>
						<p>
							<span>设置系统运行基础环境 <br> 及条件参数</span>
						</p>
					</div>
					<div class="more">
						<h4>其他产品</h4>
						<a>查看更多</a>
					</div>
				</div>
				<!-- <div class="model modelC hvr-grow-shadow" v-for="(item,index) in userMenu" :key="index" @click="toPage(item.remark)">
					<h3>{{item.modelName}}</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img :src="`/deehow-CMS-Web/public/file/view?filePath=${item.icon}`"></div>
					<p>选它部署ECS</p>
				</div> -->
				<div class="model modelC hvr-grow-shadow">
					<router-link to="/EDM/engineeringManage/engineeringList">
					<h3>工程管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model6.png" alt=""></div>
					<p>选它部署ECS</p>
					</router-link>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>工程分析</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model7.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div style="clear:both;"></div>
			</div>
			<!-- <div class="models">
				<div class="model modelF" style="border:1px solid #f27864;">
					<div class="modelB" style="background:#f27864;">
						<div><img src="../../assets/Application/modelf2.png" alt=""></div>
						<h3>优选库平台</h3>
						<p>
							<span>搭建优选库平台 <br> 及条件参数</span>
						</p>
					</div>
					<div class="more">
						<h4>其他产品</h4>
						<a>查看更多</a>
					</div>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>元器件管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model6.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>元器件类目管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model7.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>在线建库</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model8.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>订单管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model9.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
			</div>
			<div class="models">
				<div class="model modelF" style="border:1px solid #74d98c;">
					<div class="modelB" style="background:#74d98c;">
						<div><img src="../../assets/Application/modelf3.png" alt=""></div>
						<h3>规则库平台</h3>
						<p>
							<span>搭建优选库平台 <br> 及条件参数</span>
						</p>
					</div>
					<div class="more">
						<h4>其他产品</h4>
						<a>查看更多</a>
					</div>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>规则管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model10.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>规则模型管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model11.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>规则条目管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model12.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>检查结果分析</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model13.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
			</div>
			<div class="models">
				<div class="model modelF" style="border:1px solid #62cfcd;">
					<div class="modelB" style="background:#62cfcd;">
						<div><img src="../../assets/Application/modelf4.png" alt=""></div>
						<h3>协同设计</h3>
						<p>
							<span>搭建优选库平台 <br> 及条件参数</span>
						</p>
					</div>
					<div class="more">
						<h4>其他产品</h4>
						<a>查看更多</a>
					</div>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>模型管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model14.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>项目管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model15.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>设计工具管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model16.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>设计路线管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model17.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
			</div>
			<div class="models">
				<div class="model modelF" style="border:1px solid #f46655;">
					<div class="modelB" style="background:#f46655;">
						<div><img src="../../assets/Application/modelf5.png" alt=""></div>
						<h3>插件管理</h3>
						<p>
							<span>搭建优选库平台 <br> 及条件参数</span>
						</p>
					</div>
					<div class="more">
						<h4>其他产品</h4>
						<a>查看更多</a>
					</div>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>出图模块</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model18.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>符号解析</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model19.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>规则检查工具</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model20.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>CIS配置模块</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model21.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
			</div>
		  <div style="clear:both;"></div> -->
			<div class="bigTit">
				<span class="left_pic"><img src="../../assets/Application/intro5.png" alt=""></span>
				<span class="area">即将上线</span>
				<span class="left_pic"><img src="../../assets/Application/intro6.png" alt=""></span>
			</div>
			<div class="models">
				<div class="model modelC hvr-grow-shadow">
					<h3>BOM差异管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model22.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>BOM在线检查</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model23.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>稽核状态管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model24.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
				<div class="model modelC hvr-grow-shadow">
					<h3>稽核过程管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model25.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
					<div class="model modelC hvr-grow-shadow">
					<h3>稽核结果管理</h3>
					<p>经典的PHP运行环境镜像，多种操作系统可供选择。</p>
					<div><img src="../../assets/Application/model26.png" alt=""></div>
					<p>选它部署ECS</p>
				</div>
			</div>
			<!-- <div class="smenu">
			<div class="smodel hvr-outline-out" v-for="(item,index) in userMenu" :key="index" @click="toPage(item.remark)">
				<div class="redramImg">
					<img :src="`/deehow-CMS-Web/public/file/view?filePath=${item.icon}`">
				</div>
				<p class="smodelName">{{item.modelName}}</p>
			</div>
		</div>
		<div style="clear:both;"></div> -->
		</div>
	</div>
</template>
<script>
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
	data(){
		return {
			userMenu:[],
		}
	},
	methods:{
		toPage(a) {
      window.location.href =
        "http://" + location.host + `/${a}/index.html`;
    }
	},
	mounted(){
		// let userMenu = JSON.parse(
    //   localStorage.getItem("userMenu")
		// );
		// if(!userMenu){
		// 	removeToken();
		// 	window.reload();
		// }
		// console.log(userMenu)
    // this.userMenu  = userMenu
	}
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.posa {
  position: absolute;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  // background:url("../../assets/Application/applicationBack.png") center center;
  background: #fafafa;
  background-size: 100% 100%;
  .smenu {
    width: 80%;
    margin: 30px auto;
  }
}
.title {
  width: 1200px;
  margin: 0 auto;
  height: 130px;
  padding: 20px 0 0 30px;
  > div {
    float: left;
  }
  .inputbox {
    input {
      float: left;
      width: 400px;
      height: 35px;
      background: #fafafa;
      outline: none;
      border: 0;
      border: 1px solid #ccc;
      padding-left: 10px;
      margin-top: 20px;
    }
    button {
      float: left;
      width: 60px;
      height: 35px;
      background: #43a3c1;
      color: #fff;
      outline: none;
      border: 0;
      margin-top: 20px;
    }
  }
	.under-search {
  overflow: hidden;
  width: 100%;
  ul {
    margin-left: -8px;
    margin-top: 8px;
    overflow: hidden;
    li {
      float: left;
      font-size: 0;
      a {
        padding: 0 6px;
        border-left: 1px solid #979797;
        font-size: 12px;
        color: #979797;
      }
    }
  }
}
}
.banner {
  width: 100%;
  height: 320px;
 background: url("../../assets/Application/banner1.png") no-repeat center center;
}
.ask {
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 0 20px;
  > div {
    float: left;
    width: 232px;
    height: 100px;
    background: #fff;
    border: 1px solid #e9eaea;
    border-left: 0;
    padding: 20px;
    text-align: center;
    padding-top: 30px;
    span {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
  }
  .first {
    color: #fff;
    font-size: 15px;
    padding-top: 15px;
    text-align: left;
    background: url("../../assets/Application/ask.png") no-repeat center center;
  }
}
.message {
  width: 1200px;
  margin: 0 auto;
  .intro {
    padding: 20px 10px;
    .msg {
      float: left;
      width: 274px;
      height: 100px;
      background: #fff;
      margin: 0 10px;
      padding: 5px 20px 10px 20px;
      > div {
        float: left;
      }
      .msgLeft {
        width: 160px;
        p {
          font-size: 12px;
        }
      }
      img {
        margin-left: 12px;
        margin-top: 15px;
        width: 60px;
        height: 60px;
      }
    }
  }
  .models {
    padding: 20px 10px;
    .model {
      float: left;
      width: 215px;
      height: 270px;
      text-align: center;
      background: #fff;
      margin: 10px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .modelF {
      border: 1px solid #43a3c1;
      .modelB {
        padding-top: 20px;
        height: 210px;
        color: #fff;
        p {
          height: 90px;
          margin-top: 25px;
          overflow: hidden;
          span {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      .more {
        text-align: left;
        padding-left: 10px;
        a {
          color: #43a3c1;
        }
      }
    }
    .modelC {
			cursor: pointer;
      padding-top: 20px;
      img {
        margin: 30px 0;
      }
      p {
        padding: 0 10px;
        font-size: 12px;
      }
    }
  }
}
.bigTit {
  text-align: center;
  width: 1200px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 5px;
}
.smodel {
  float: left;
  // width:200px;
  // height:200px;
  padding: 30px 60px;
  background: #fff;
  // border:1px solid #ccc;
  cursor: pointer;
  margin-left: 30px;
  .redramImg {
    text-align: center;
    width: 50px;
    margin: 0 auto;
  }
  .smodelName {
    text-align: center;
    font-size: 20px;
  }
}
</style>

