<template>
  <div class="LoginBox">
    <div class="LoginBoxHeader">
      <!-- <div><a class="CodeLogin"  :class="logSteps==0?'active':''">扫码登录</a></div> -->
      <div>
        <router-link to="/login/logUser">
          <a class="NumberLogin">扫码登录</a>
        </router-link>
      </div>
      <div>
        <router-link to="/login/logHome">
          <a class="CodeLogin">账号登录</a>
        </router-link>
      </div>
    </div>
    <div>
      <div class="CodePng">
        <!-- <img src="../../assets/login/code.png" alt=""> -->
        <img src="/deehow-CMS-Web/public/anon/get/session_id/qrcode" alt="二维码" />
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  h1,
  h2 {
    padding: 0;
    margin: 0;
  }



  span {
    display: inline;
    float: right;
    margin-right: 8px;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
  }

  ;

  .LoginBox {
    width: 360px;
    height: 430px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 20%;
    left: 56%;
    padding-top: 12px;

    .LoginBoxHeader {
      width: 100%;
      height: 50px;
      border-bottom: 2px solid #ccc;

      div {
        width: 50%;
        float: left;
        text-align: center;

        a {
          display: inline-block;
          line-height: 42px;
          width: 100px;
          height: 50px;
        }

        .NumberLogin {
          border-bottom: 3px solid #ee4239;
          color: #ee4239;
        }
      }
    }

    .CodePng {
      width: 60%;
      margin: 0 auto;
      margin-top: 6vh;
      text-align: center;
    }
  }
</style>

<script>
  import { exitApp } from "@/utils/auth";
  export default {
    data() {
      return {
        ping: null,
      }
    },
    methods: {

      websocket() {
        let that = this;
        let ws = new WebSocket(this.DEEHOWWEBSCOKETURL)
        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send('Holle')
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          console.log('数据已接收...')
          console.log(evt);
          // alert('liuzhongwei')
          // that.
          console.log(this)
          console.log(that.$store)
          that.$store
            .dispatch("CodeLog")
            .then((res) => {
              console.log(res)
              this.$router.push({ path: "/" });
            })
            .catch(res => {
              console.log(res)
              that.$message.error('您暂无权限,请联系管理员为您分配菜单');
              setInterval(() => {
                exitApp();
              }, 2000)
            });
        }
        ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭...')
        }
        // this.xintiao = ()=>{
        //   this.ping = setInterval(()=>{
        //     ws.send('保持心跳')
        //     console.log('心跳')
        //   },1000)
        // }
        ws.valInt = setInterval(() => {
          ws.send('保持心跳')
          console.log('保持心跳')
        }, 55000)
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          if (ws.valInt) {
            clearInterval(ws.valInt)
          }
          ws.close()
        }
      }
    },
    mounted() {
      // this.initWebpack();
      this.websocket();
      // this.xintiao();
    },
    destroyed() {

      this.over();
    }
  }
</script>