<template>
  <div>
      <div class="title">
          <span>流程配置</span>
      </div>
      <div>
        <div class="flowImg">
          <p>流程图</p>
            <img :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+this.PNG" alt="">
        </div>
        <div class="flowSet">
           <p>流程配置</p>
           <div class="btns">
            <el-button type="danger"  @click="saveData()" >保存配置</el-button>
            <el-button type="danger" plain>返 回</el-button>
            </div>
            <div class="Users">
             <p>节点人员</p>
             <div v-for="(item,index) in works" :key="index">
              <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="任务名称：">
                    <span>{{item.name}} </span>
                  </el-form-item>
                  <el-form-item label="执行人分类：">
                    <el-select v-model="form.name[index]" @change="classifyChange(index)" placeholder="请选择执行人">
                      <el-option v-for="(item,index) in options" :key="index" :value="item.value" :label="item.lable"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="选择执行人：">
                    <el-button icon="el-icon-plus" circle @click="userChoose(index)"></el-button>
                  </el-form-item>
                   <el-form-item label="已选择：">
                     <div v-if="item.pList&&item.pList.length>0">
                       {{item.pList[0].account}}
                     </div>
                    <!-- <el-input type="textarea" v-model="form.account['account'+index]">                   
                    </el-input> -->
                  </el-form-item>
              </el-form>
             </div>
            </div>
        </div>
       <el-dialog title="选择执行人" :visible.sync="dialogForm1Visible" width="500px">
                 <div class="dept">
                   <el-checkbox-group v-model="deptcheckList">
                      <el-checkbox  v-for="(item,index) in deptList" :key="index"  :label="item.id">{{item.deptName}}</el-checkbox>
                    </el-checkbox-group>  
                 </div>
                  <div slot="footer" class="dialog-footer">
                      <el-button type="danger" @click="userChooseSubmit1()">确 定</el-button>
                      <el-button type="danger" plain @click="dialogForm1Visible = false">取 消</el-button>
                    </div>
         </el-dialog> 
         <el-dialog title="选择执行人" :visible.sync="dialogForm2Visible" width="70%">
                      <div class="users">
                          <div class="tree">
                            <el-tree :data="data" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                          </div>
                            <div>
                              已选择： {{selectedUser.substr(1)}}
                           </div>
                         
                          <div class="table">
                            <el-table  :data="userTableData" border style="width: 100%"  highlight-current-row ref="singleTable" @select="dataSelect" @select-all="selectAll" >
                              <el-table-column type="selection" width="55px" >
                              </el-table-column>
                              <el-table-column prop="userName" label="姓名">
                              </el-table-column>
                              <el-table-column prop="account" label="电话">
                              </el-table-column>
                              <el-table-column prop="email" label="邮箱" width="200px">
                              </el-table-column>
                            </el-table>
                            <div class="block">
                              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                              </el-pagination>
                            </div>
                          </div>
                        </div>
                        <div style="clear:both"></div>
                        <div slot="footer" class="dialog-footer">
                          <el-button type="danger" @click="userChooseSubmit2()">确 定</el-button>
                          <el-button type="danger" plain @click="dialogForm2Visible = false">取 消</el-button>
                        </div>
                 </el-dialog> 
      </div>
  </div>
</template>

<script>
import {
  flowUsersFit,
  flowUsersFitSave,
  readDeptList,
  readDeptTree,
  readUserPage,
  userIdDept,
  // readUserByDept
} from "@/api/flow";
export default {
 data(){
   return{
     index:0,
     dialogForm1Visible:false,
     dialogForm2Visible:false,
     procDefId:'',
     total:0,
     PNG:'',
     showdept:'',
     userIds:{
       userIds:'',
     },
     form:{
       name: [],
       account:{},
     },
     options:[
       { value: 1, lable: '人员' },
       { value: 2, lable: '部门' },
     ],
     //任务已选择人员Id
     userIdList:[],
     //任务已选择人员展示名
     userNameList:[],
     deptList:[],
     deptcheckList:[],
     data: [],
     userTableData:[],
     works:[],
     selectedUser:'',
     allSelectUser:[],
     defaultProps: {
       children: "children",
       label: "deptName"
     },
      search: {
        deptId:'',
        pageNum:1,
        pageSize:10,
      },
   }
 },
 methods:{
   readData() {
      readDeptTree({}).then(res => {
        this.data = res.data;
      });
       readDeptList({}).then(res=>{
         console.log(res.data);
        this.deptList = res.data;
      });
      flowUsersFit({procDefId:this.procDefId}).then(res =>{
        //  console.log(res);
         this.works=res.data;
         this.PNG=res.pngName;
         for(let i=0;i<this.works.length;i++){
          //  console.log(this.works[i].pList[0]);
            if(this.works[i].pList!=''&&this.works[i].pList.length!=0){           
                if(this.works[i].pList[0].remark=='1'){
                      this.form.name.push(1);
                      //this.form.account.push(this.works[i].pList[0].account); 
                      //this.form.account['account'+i]=this.works[i].pList[0].account;
                }else if(this.works[i].pList[0].remark=='2'){
                      this.form.name.push(2);
                      this.userIds.userIds=this.works[i].pList[0].userId;
                      //console.log(this.userIds);
                      userIdDept(this.userIds).then(res =>{
                          this.showdept=res.data;
                          //console.log(this.showdept.deptNames);
                          this.works[i].pList[0].account=this.showdept.deptNames;
                          this.works[i].pList[0].userId=this.showdept.deptIds;
                      }) 
                }    
                     
            }else{
              this.form.name.push(1);
            }
         }
        //  console.log(this.works);
        //  console.log(this.form.account);
      })
    },
    userChoose(index){
       this.index=index;
       if(this.form.name[index]==1){//人员弹窗
          this.dialogForm2Visible=true;
        //  this.readData();
          this.search=new Object();
          // console.log(this.works[this.index].pList[0]);
          if(this.works[this.index].pList[0]==undefined||this.works[this.index].pList[0].userId==''){
            this.works[this.index].pList[0]=new Object();
            this.works[this.index].pList[0].userId='';
            this.works[this.index].pList[0].account='';
            this.selectedUser=',';
          }else{
            this.userIdList[this.index]=','+this.works[this.index].pList[0].userId;
            this.userNameList[this.index]=','+this.works[this.index].pList[0].account;
            this.selectedUser=this.userNameList[this.index];
          }
          this.readUser();
          
       }else{//部门弹窗
        this.deptcheckList=new Array();
        this.dialogForm1Visible=true;
        if(this.works[this.index].pList[0]!=undefined&&this.works[this.index].pList[0].account!=''){
          let userIds=this.works[this.index].pList[0].userId;
          let userIdArray=userIds.split(',');
          for(let i=0;i<userIdArray.length;i++){
            this.deptcheckList.push(userIdArray[i]);
          }
        }else{
          this.works[this.index].pList[0]=new Object();
          this.works[this.index].pList[0].account='';
          this.works[this.index].pList[0].userId='';
        }
        console.log(this.deptcheckList);
       }
    },
    handleNodeClick(data) {
         this.search.deptId=data.id;
         this.readUser();
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readUser();
    },
   handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readUser();
    },
    readUser(){
      readUserPage(this.search).then(res =>{
         //console.log(res);
         this.userTableData=res.data;
         this.total = res.total;
         this.selected();
         //console.log(this.userTableData);
      })
      
    },
    selected(){
      this.$nextTick(function(){
        let task=this.works[this.index];
        if(task.pList&&task.pList.length>0){//勾选 已选择的数据
          for(let i=0;i<this.userTableData.length;i++){
              let user=this.userTableData[i];
              if((this.userIdList[this.index]+',').indexOf(','+user.id+',')!=-1){
                this.$refs.singleTable.toggleRowSelection(this.userTableData[i]);
              }
            }
         }

     });
    },
    //单行选中、取消
   dataSelect(val,row){
     let lock=true;
     if(this.userIdList[this.index]==undefined){
        this.userIdList[this.index]='';
        this.userNameList[this.index]='';
     }
     for(let i=0;i<val.length;i++){
       if(val[i].id==row.id){//已勾选的数组包含当前row就是勾选，不包含就是取消勾选
          lock=false;
          this.userNameList[this.index]+=','+row.userName;
          this.userIdList[this.index]+=','+row.id;
       }
     }
     if(lock){//取消当前行勾选
        this.userNameList[this.index]=this.userNameList[this.index].replace(','+row.userName,"");
        this.userIdList[this.index]=this.userIdList[this.index].replace(','+row.id,"");
     }
     this.selectedUser=this.userNameList[this.index];
    //  console.log(this.userNameList[this.index]);
    //  console.log(this.userIdList[this.index]);

   },
   //全选
   selectAll(val){
    for(let i=0;i<val.length;i++){
      let ids=this.userIdList[this.index];
      if((ids+',').indexOf(','+val[i].id+',')==-1){
        this.userIdList[this.index]+=','+val[i].id;
        this.userNameList[this.index]+=','+val[i].userName;
      }
    }
    if(val.length!=0){
      [...this.allSelectUser]=val;
    }
    if(val.length==0){//取消全选
      for(let j=0;j<this.allSelectUser.length;j++){
        this.userNameList[this.index]=this.userNameList[this.index].replace(','+this.allSelectUser[j].userName,"");
        this.userIdList[this.index]=this.userIdList[this.index].replace(','+this.allSelectUser[j].id,"");
      }
    }
    this.selectedUser=this.userNameList[this.index];
   },
  
    //选择部门弹窗确认按钮
   userChooseSubmit1(){
      // console.log(this.deptcheckList);
      this.works[this.index].pList[0].userId=this.deptcheckList.join(',');
      this.works[this.index].pList[0].account='';
      for(let i=0;i<this.deptcheckList.length;i++){
        for(let j=0;j<this.deptList.length;j++){
          if(this.deptcheckList[i]==this.deptList[j].id){
            this.works[this.index].pList[0].account+=','+this.deptList[j].deptName;
          }
        }
        
      }
      // console.log(this.works[this.index].pList[0].account);
      if(this.works[this.index].pList[0].account!=''){
          this.works[this.index].pList[0].account=this.works[this.index].pList[0].account.substr(1);
      }
      this.dialogForm1Visible=false;
      // console.log(this.deptcheckList);
      
   },
   //选择人员弹窗确认按钮
   userChooseSubmit2(){
      if (this.userIdList[this.index].substr(0,1)==','){//去掉开头逗号
          this.userIdList[this.index]=this.userIdList[this.index].substr(1);
          this.userNameList[this.index]=this.userNameList[this.index].substr(1);
      }
      this.works[this.index].pList[0].userId=this.userIdList[this.index];
      this.works[this.index].pList[0].account=this.userNameList[this.index];
      this.dialogForm2Visible=false;
   },
   //改变分类
   classifyChange(index){
    //  console.log(111);
     this.userIdList[index]='';
     this.userNameList[index]='';
     this.works[index].pList[0].account='';
     this.works[index].pList[0].userId='';
   },
   saveData(){
    for(let i=0;i<this.works.length;i++){
      let pList=this.works[i].pList;
      if(this.form.name[i]==2){//选择部门时
        if(pList){
          
          // readUserByDept({deptIds:pList[0].userId}).then(res => {
          //   pList[0].userId=res.data.userIds;
          //   pList[0].account=res.data.userNames;
          // });
        }
      }
    }
    
   },
 },
 
 mounted(){
  this.procDefId=this.$route.query.procDefId;
  console.log(this.procDefId);
  this.readData();
 }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: -20px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
.flowImg{
  width:60%;
  float: left;
  text-align: center;
  img{
    margin-top: 20px;
  }
  p{
    text-align: left;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #f2f2f2;
    color: #666;
  }
}
.flowSet{
  width:35%;
  float: left;
  margin-left: 20px;
  border: 1px solid #ccc;
  border-top: 0;
  p{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #f2f2f2;
    color: #666;
  }
  .btns{
    margin: 10px 0 10px 10px;
  }
  .Users{
     p{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #f2f2f2;
    color: #666;
  }
  .el-form{
    padding-top: 20px;
  }
  }
}
 .el-dialog{
    .dept{
      width:100%;
      padding-top: 20px;
      margin-top: -20px;
      border-top: 1px solid #ccc;
    }
      .tree{
    float: left;
    width:20%;
  }
  .table{
    width:70%;
    float: left;
    margin-left: 10px;
  }
  .block{
    margin-top: 10px;
  }
  }
</style>

