<template>
	<div class="posa">
		<h2 style="margin-left:8%">
			<em>欢迎使用</em>
		</h2>
		<div class="smenu">
			
			<div class="smodel hvr-outline-out" v-for="(item,index) in userMenu" :key="index" @click="toPage(item.remark)">
				<div class="redramImg">
					<img :src="`/qingqiu/staticResource/iconImg/png${item.modelId}.png`">
				</div>
				<p class="smodelName">{{item.modelName}}</p>
			</div>
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
		let userMenu = JSON.parse(
      localStorage.getItem("userMenu")
		);
		if(!userMenu){
			removeToken();
			window.reload();
		}
		console.log(userMenu)
    this.userMenu  = userMenu
	}
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>

.posa{
  position: absolute;
  width: 100%;
  height:100%;
	overflow: hidden;
	background: #ececec;
	.smenu{
		width:80%;
		margin: 30px auto;
	}
}
.smodel{
	float: left;
	// width:200px;
	// height:200px;
	padding: 30px 60px;
	// border:1px solid #ccc;
	cursor: pointer;
	margin-left: 30px;
	.redramImg{
		text-align: center;
		width: 50px;
	}
	.smodelName{
		text-align: center;
	}
}
</style>
