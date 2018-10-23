<template>
	<div class="BigBackGround">
		<div class="el-container">
			<div class="el-header">
				<div class="Logo">
					<img src="../../assets/Application/logo.png" alt="">
				</div>
				<div class="Login">
					<img class="UserPng" src="../../assets/Application/userpng.png" alt="">
					<span>管理员</span>
					<img class="UserBtn" src="../../assets/Application/userbtn.png" alt="">
				</div>
			</div>
		</div>
		<div class="el-container Middle">
			<div class="el-aside">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#28282e" text-color="#fff" active-text-color="#ee4239">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>日志管理</span>
						</template>

						<el-menu-item index="1-3">选项3</el-menu-item>
						<el-menu-item index="1-4">选项3</el-menu-item>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">租户管理</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">订单管理</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">应用管理</span>
					</el-menu-item>
					<el-menu-item index="5">
						<i class="el-icon-setting"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="el-main">
				<p>平台应用</p>
				<div class="Modules">
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/CRM.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png1.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png2.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png3.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png4.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png5.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png6.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png7.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png8.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png9.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/png10.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
					<div class="ModulesChild">
						<dl>
							<dt><img src="../../assets/Application/CRM.png" alt=""></dt>
							<dd>CRM</dd>
						</dl>
					</div>
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
.BigBackGround {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}
.el-header {
  width: 100%;
  height: 60px;
  background: #fff;
  .Logo {
    float: left;
    width: 110px;
    height: 40px;
    margin-left: 10px;
    margin-top: 12px;
  }
  .Login {
    width: 200px;
    height: 40px;
    float: right;
    margin-right: 30px;
    margin-top: 12px;
    .UserPng {
      width: 40px;
      float: left;
    }
    span {
      margin-left: 20px;
      float: left;
      margin-top: 12px;
    }
    .UserBtn {
      float: left;
      width: 24px;
      margin-left: 50px;
      margin-top: 12px;
    }
  }
}
.Middle {
  margin-top: 10px;
}
.el-aside {
  width: 240px;
}
.el-menu {
  height: 550px;
}
.el-main {
  background: #fff;
  margin-left: 10px;
  padding: 20px 30px 0 40px;
  p {
    height: 30px;
  }
  .Modules {
    width: 90%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;
    height: 300px;
    .ModulesChild {
      width: 130px;
      height: 130px;
      padding: 20px 20px;
      float: left;
      text-align: center;
      background: #f2f2f2;
      img {
        width: 50px;
      }
    }
  }
}
</style>


<script>
import {getMenu} from "@/api/login"
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
		},
		getUserMenu(){
			getMenu({}).then(res=>{
				console.log(res)
			}).catch(err=>{

			})
		}
	},
	mounted(){
		this.getUserMenu()
	}
};
</script>
