<template>
  <div class="LoginContainer">
     <div class="SuitBox">
         <div class="Suit">
             <div class="SuitTop">
                 免费版
             </div>
             <div class="SuitMiddle">
                 <div class="price price1"><span>￥0</span>/人/月</div>
                 <el-button round>当前版本</el-button>
             </div>
             <div class="SuitBottom">
                <ul>
                    <li>用户：10人以下</li>
                    <li>任务</li>
                    <li>消息</li>
                    <li>日历</li>
                    <li>网盘</li>
                    <li>服务集成</li>
                    <li>基本任务统计</li>
                    <li>自定义权限及角色管理</li>
                </ul>
             </div>
         </div>
          <div class="Suit">
             <div class="SuitTop">
                 专业版
             </div>
             <div class="SuitMiddle">
                 <div class="price price2"><span>￥299</span>/人/月</div>
                 <el-button round class="up">立刻升级</el-button>
             </div>
             <div class="SuitBottom">
                <ul>
                    <li>用户：10人以上</li>
                    <li>免费版全部功能</li>
                    <li>简报</li>
                    <li>审批</li>
                    <li>甘特图</li>
                    <li>短信提醒</li>
                    <li>自定义项目字段</li>
                    <li>支持日历排期视图</li>
                    <li>完善的安全日志</li>
                    <li>自定义任务统计</li>
                </ul>
             </div>
         </div>
           <div class="Suit">
             <div class="SuitTop">
                 企业版
             </div>
             <div class="SuitMiddle">
                 <div class="price price3"><span>￥499</span>/人/月</div>
                 <el-button round class="up">立刻升级</el-button>
             </div>
             <div class="SuitBottom">
                <ul>
                     <li>用户：10人以上</li>
                    <li>专业版全部功能</li>
                    <li>考勤</li>
                    <li>门户</li>
                    <li>公告</li>
                    <li>目标（OKR）</li>
                    <li>任务工时及统计</li>
                    <li>企业自定义</li>
                    <li>数据导出备份</li>
                    <li>自定义任务统计</li>
                </ul>
             </div>
         </div>
           <div class="Suit">
             <div class="SuitTop">
                 旗舰版
             </div>
             <div class="SuitMiddle">
                 <div class="price price4"><span>￥699</span>/人/月</div>
                 <el-button round class="up">立刻升级</el-button>
             </div>
             <div class="SuitBottom">
                <ul>
                   <li>用户：10人以上</li>
                    <li>专业版全部功能</li>
                    <li>考勤</li>
                    <li>门户</li>
                    <li>公告</li>
                    <li>目标（OKR）</li>
                    <li>任务工时及统计</li>
                    <li>企业自定义</li>
                    <li>数据导出备份</li>
                    <li>自定义任务统计</li>
                </ul>
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
.LoginContainer{
    width:100%;
    padding-top:40px;
    .SuitBox{
        width:800px;
        margin:0 auto;
        .Suit{
            width:180px;
            background: #fff;
            border:1px solid #000;
            float: left;
            margin:10px;
            text-align: center;
            .SuitTop{
                height:50px;
                line-height: 50px;
                color:#aaa;
                font-size: 18px;
                border-bottom: 1px solid #ccc;
            }
            .SuitMiddle{
                height:130px;
                border-bottom: 1px solid #ccc;
                .price{
                    font-size: 16px;
                    margin-top: 40px;
                }
                .price1{
                   color:#3fbad7;
                }
                .price2{
                   color:#23d6bc;
                }
                .price3{
                   color:#ee4239;
                }
                .price4{
                   color:#3873a5;
                }
                .el-button{
                    width:120px;
                    height:30px;
                    background: #ccc;
                    color:#fff;
                    margin-top: 20px;
                }
                .up{
                    background: #ffc92b;
                    color: #fff;
                    border: 1px solid #ffc92b;
                }
            }
            .SuitBottom{
                height:300px;
                padding-top: 20px;
                color:#aaa;
                li{
                    margin-top: 5px;
                }
            }
        }     
    }
}

</style>


<script>
export default {
    
  }
</script>
