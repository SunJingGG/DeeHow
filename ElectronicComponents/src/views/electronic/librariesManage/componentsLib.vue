<template>
  <div>
    <div class="row">
      <div class="treeBox" ref="treeBox">
        <el-tree style="width:300px" :data="threeList" ref="tree" default-expand-all :props="defaultProps" @node-click="getCurrentNode" node-key="id"></el-tree>
      </div>
      <div class="tableRight" ref="tableRight">
        <el-table :header-cell-style="rowClass" highlight-current-row :data="listData" style="width: 100%" border :max-height="tableHeight" @row-click="lookDetail">
          <el-table-column prop="manufacturer" label="制造商"></el-table-column>
          <el-table-column prop="partNumber" label="物品编号"></el-table-column>
          <el-table-column prop="partName" label="名称"></el-table-column>
          <el-table-column prop="partType" label="类型"></el-table-column>
          <el-table-column prop="productModel" label="规格"></el-table-column>
          <el-table-column prop="packageType" label="封装类型"></el-table-column>
          <el-table-column prop="preRanking" label="质量等级"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="startFlow( scope.$index)" size="small">修改申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <transition name="mybox">
        <div class="tabdetail" ref="tabdetail" v-show="tabdetailshow" v-clickoutside="handleClose">
          <el-tabs style="padding:10px 0 0 10px;" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本属性" name="first">
              <div ref="messagebox" class="one messagebox">
                <div>
                  <p>展示图</p>
                  <div style="width:100%;background:#fff;text-align:center;">
                    <template v-if="result.public.image&&result.public.image.value">
                      <img :src="DEEHOWBASEURL+'/getView/'+result.public.image.value" style="width:150px;margin-top:6px;" alt="">
                    </template>
                  </div>
                </div>
                <div>
                  <p>基本信息</p>
                  <el-form disabled style="margin-top:10px;" :inline="true" :model="result.public" class="demo-form-inline" label-width="120px">
                    <el-form-item label="物料编码">
                      <el-input v-model="result.public.partNumber.value">{{result.public.partNumber.value}}</el-input>
                    </el-form-item>
                    <el-form-item label="物料类型">
                      <el-input v-model="result.public.partType.value"></el-input>
                    </el-form-item>
                    <el-form-item label="规格型号">
                      <el-input v-model="result.public.productModel.value"></el-input>
                    </el-form-item>
                    <el-form-item label="物料公差">
                      <el-input v-model="result.public.tolerance.value"></el-input>
                    </el-form-item>
                    <el-form-item label="封装类型">
                      <el-input v-model="result.public.packageType.value"></el-input>
                    </el-form-item>
                    <el-form-item label="额定值">
                      <el-input v-model="result.public.ratedValue.value"></el-input>
                    </el-form-item>
                    <el-form-item label="质量等级">
                      <el-input v-model="result.public.preRanking.value"></el-input>
                    </el-form-item>
                    <el-form-item label="制造商">
                      <el-input v-model="result.public.manufacturer.value"></el-input>
                    </el-form-item>
                    <el-form-item label="物料描述">
                      <el-input type="textarea" style="width:522px;" v-model="result.public.description.value"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <p>属性</p>
                  <table class="table table-bordered" style="margin-top:10px;">
                    <thead>
                      <tr>
                        <td>名称</td>
                        <td>参数</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in result.special" :key="index">
                        <td style="width:120px;">{{item.name}}</td>
                        <td>{{item.value}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="调用关系" name="second">
              <div ref="messagebox1" style="background:#fff;" class="two messagebox">
                <template v-if="getdatac">
                  <chart-tree :callgraphs="callgraphs"></chart-tree>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="相似器件" name="third">
              <div ref="messagebox2" style="background:#fff;padding:10px;" class="three messagebox">
                <div>
                  <div @click="open1" style="cursor:pointer;"> <img style="width:20px;margin-right:4px;vertical-align:middle;" src="../../../assets/part/same.png" alt=""> 完全相似</div>
                  <transition name="el-zoom-in-top">
                    <ul v-show="same1" style="margin-left:24px;">
                      <li style="line-height:26px;display:block;" v-for="(item,index) in samepart.sameList" :key="index"> <img src="../../../assets/part/same2.png" style="height:18px;margin-right:8px;float:left;vertical-align:middle;" alt="">
                        <span style="float:left;">{{item.partNumber}}</span>
                      </li>
                    </ul>
                  </transition>
                </div>
                <div style="clear:both;"></div>
                <div>
                  <div @click="open2" style="cursor:pointer;"> <img style="width:20px;margin-right:4px;vertical-align:middle;" src="../../../assets/part/same.png" alt=""> 部分相似</div>
                  <transition name="el-zoom-in-top">
                    <ul v-show="same2" style="margin-left:24px;">
                      <li style="line-height:26px;display:block;" v-for="(item,index) in samepart.unlikelinessList" :key="index"> <img src="../../../assets/part/same2.png" style="height:18px;margin-right:8px;float:left;vertical-align:middle;" alt="">
                        <span style="float:left;">{{item.partNumber}}</span>
                      </li>
                    </ul>
                  </transition>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="可替代料" name="fourth">
              <div ref="messagebox3" class="four messagebox">
                <div style="float:right;margin-right:40px;">
                  <el-button type="primary" @click="applyreplace">
                    <i class="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;新增可替代料</el-button>
                </div>
                <div style="clear:both;"></div>
                <div style="margin-top:15px;">
                  <ul class="list-group">
                    <a class="list-group-item showhide" v-for="(item,index) in replace" :key="index">
                      <img src="../../../assets/part/same2.png" style="height:18px;margin-right:8px;float:left;vertical-align:middle;" alt=""> {{item.partNumber}}
                      <a style="float:right;" @click="deleteRel(item)">x</a>
                    </a>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="生命周期" name="fifth">
              <div ref="messagebox4" style="background:#fff;" class="five messagebox">
                <chartz v-if="getdata" :child-com="content"></chartz>
              </div>
            </el-tab-pane>
            <el-tab-pane label="原理图符号、封装" name="sixth">
              <div ref="messagebox5" style="background:#fff;" class="six messagebox">
                <div>    
                   <p>
                    原理图符号
                    <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left" title="这是原理图的web预览，如果有多个原理图的话，仅显示第一个。"></i>           
                  </p>
                  <div class="svgmodel">
                    <template v-if="result.public.symCdsSvg.value">
                      <object id="sembed" :data="DEEHOWBASEURL+'/getView/'+result.public.symCdsSvg.value" @load="initSvg('sembed')" width="100%" height="100%"></object>
                    </template>
                  </div>
                </div>
                <div>
                  <p>封装
                    <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left" title="这是原理图的web预览，如果有多个原理图的话，仅显示第一个。"></i>
                  </p>
                  <div class="svgmodel" style="">
                    <template v-if="result.public.footPrintCdsSvg.value">
                      <object id="sembed1" :data="DEEHOWBASEURL+'/getView/'+result.public.footPrintCdsSvg.value" @load="initSvg('sembed1')" width="100%" height="100%"></object>
                    </template>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="供应链" name="seventh">
              <div ref="messagebox6" class="seven messagebox">
                <el-table :data="zhizs" border style="width: 100%">
                  <el-table-column prop="manufacturersName" label="供应商名称" width="200">
                  </el-table-column>
                  <el-table-column prop="suppliersNo" label="供应商编码">
                  </el-table-column>
                </el-table>
                <div class="block" style="margin-top:20px;">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="mainNum.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="mainNum.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!-- <a class="close" @click="closeDetail">X</a> -->
        </div>
      </transition>
      <el-dialog title="添加可替代物料" :visible.sync="dialogForm2Visible" @open="opendia()" width="70%">
        <div class="users row">
          <div class="tree col-md-3" ref="treeBox1">
            <el-tree  style="width:300px" :data="data" default-expand-all :props="defaultProps" @node-click="handleNodeClickDia"></el-tree>
          </div>
          <div class="col-md-9">
            <div>
              已选择： {{selectedUser.substr(1)}}
            </div>
            <el-table :data="userTableData" border style="width: 100%;margin-top:10px;" highlight-current-row ref="singleTable" @select="dataSelect" @select-all="selectAll">
              <el-table-column type="selection" width="55px">
              </el-table-column>
              <el-table-column prop="manufacturer" label="制造商"></el-table-column>
              <el-table-column prop="partNumber" label="物品编号"></el-table-column>
              <el-table-column prop="partName" label="名称"></el-table-column>
              <el-table-column prop="partType" label="类型"></el-table-column>
              <el-table-column prop="productModel" label="规格"></el-table-column>
              <el-table-column prop="packageType" label="封装类型"></el-table-column>
              <el-table-column prop="preRanking" label="质量等级"></el-table-column>
            </el-table>
            <div class="block" style="margin-top:20px;">
              <el-pagination @size-change="handleSizeChangeDia" @current-change="handleCurrentChangeDia" :current-page="searchDia.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="searchDia.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDia">
              </el-pagination>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="userChooseSubmit2()">确 定</el-button>
          <el-button type="primary" plain @click="dialogForm2Visible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  readCategoryTree,
  readCategoryGoods,
  readCategoryGoodsPage,
  readCategoryGoodsDetail,
  readCategoryGoodsDetaillife,
  manufacturersList,
  sameparts,
  fungibleparts,
  addfungibleparts,
  deletefungibleparts,
  Callgraphs
} from "@/api/ele.js";
import chartz from "./compontends/chartz";
import chartTree from "./compontends/charttree";
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
  components: {
    chartz,chartTree
  },
  data() {
    return {
      dialogForm2Visible: false,
      data: [],
      selectedUser: "",
      userId: "",
      currentRow:'',
      allSelectUser: [],
      userTableData: [],
      searchDia: {
        categoryId: "",
        pageNum: 1,
        pageSize: 10
      },
      goodId: "",
      totalDia: 0,
      total:0,
      tabdetailshow: false,
      getdata: false,
      getdatac: false,
      same1: true,
      same2: true,
      activeName: "first",
      public: "",
      special: "",
      threeList: [],
      listData: [],
      mainNum: {},
      content: {},
      samepart: {},
      callgraphs:{},
      replace: [],
      zhizs: [],
      clientHeight: "",
      clientWidth: "",
      defaultProps: {
        children: "childrenList",
        label: "categoryName"
      },
      rowClass: {
        background: "#F2F2F2",
        fontSize: "13px"
      },
      result: {
        special: [],
        public: {
          productModel: {
            name: "规格型号",
            specialPropertyId: null,
            value: "ISL1208IB8"
          },
          symCds: {
            name: "原理图符合",
            specialPropertyId: null,
            value: "CLOCK_ICS.OLB||ISL1208IB8"
          },
          footPrintCds: {
            name: "Cadence封装符号",
            specialPropertyId: null,
            value: ""
          },
          preRanking: {
            name: "优选等级/质量等级",
            specialPropertyId: null,
            value: "C"
          },
          model3d: {
            name: "三维模型",
            specialPropertyId: null,
            value: ""
          },
          manual: {
            name: "手册",
            specialPropertyId: null,
            value: ""
          },
          ratedValue: {
            name: "额定值",
            specialPropertyId: null,
            value: ""
          },
          tolerance: {
            name: "公差",
            specialPropertyId: null,
            value: ""
          },
          partNumber: {
            name: "物料编码",
            specialPropertyId: null,
            value: "DZ23010001"
          },
          description: {
            name: "物料描述",
            specialPropertyId: null,
            value: "碳质电阻器 56K OHM 5%"
          },
          value: {
            name: "value",
            specialPropertyId: null,
            value: ""
          },
          packageType: {
            name: "封装类型",
            specialPropertyId: null,
            value: "SO-8"
          },
          partType: {
            name: "器件类型",
            specialPropertyId: null,
            value: "实时时钟"
          },
          manufacturer: {
            name: "生产厂家",
            specialPropertyId: null,
            value: "Intersil"
          },
          symCdsSvg: {
            name: "",
            specialPropertyId: null,
            value: ""
          },
          footPrintCdsSvg: {
            name: "",
            specialPropertyId: null,
            value: ""
          }
        }
      },
      tableHeight: $(window).height() - 90
    };
  },
  directives: {clickoutside},
  methods: {
    //单行选中、取消
    dataSelect(val, row) {
      let lock = true;
      for (let i = 0; i < val.length; i++) {
        if (val[i].id == row.id) {
          //已勾选的数组包含当前row就是勾选，不包含就是取消勾选
          lock = false;
          this.selectedUser += "," + row.partNumber;
          this.userId += "," + row.id;
        }
      }
      if (lock) {
        //取消当前行勾选
        this.selectedUser = this.selectedUser.replace("," + row.partNumber, "");
        this.userId = this.userId.replace("," + row.id, "");
      }
      //  console.log(this.userNameList[this.index]);
      //  console.log(this.userIdList[this.index]);
    },
    //全选
    selectAll(val) {
      for (let i = 0; i < val.length; i++) {
        let ids = this.userId;
        if ((ids + ",").indexOf("," + val[i].id + ",") == -1) {
          this.userId += "," + val[i].id;
          this.selectedUser += "," + val[i].partNumber;
        }
      }
      if (val.length != 0) {
        [...this.allSelectUser] = val;
      }
      if (val.length == 0) {
        //取消全选
        for (let j = 0; j < this.allSelectUser.length; j++) {
          this.selectedUser = this.selectedUser.replace(
            "," + this.allSelectUser[j].partNumber,
            ""
          );
          this.userId = this.userId.replace("," + this.allSelectUser[j].id, "");
        }
      }
    },

    handleSizeChangeDia(val) {
      this.searchDia.pageSize = val;
      this.readUser();
    },
    handleCurrentChangeDia(val) {
      this.searchDia.pageNum = val;
      this.readUser();
    },
    //保存新增物料确认按钮
    userChooseSubmit2() {
      if (this.userId.substr(0, 1) == ",") {
        //去掉开头逗号
        this.userId = this.userId.substr(1);
      }
      //调接口
      addfungibleparts({ id: this.goodId, goodIds: this.userId }).then(res => {
        this.dialogForm2Visible = false;
        this.getrelacelist();
      });
    },
    readUser() {
      readCategoryGoodsPage(this.searchDia).then(res => {
        this.userTableData = res.data;
        this.totalDia = res.total;
        this.selected();
      });
      this.selected();
    },
    selected() {
      this.$nextTick(function() {
        let task = this.replace;
        if (task && task.length > 0) {
          //勾选 已选择的数据
          for (let i = 0; i < this.userTableData.length; i++) {
            let user = this.userTableData[i];
            if ((this.userId + ",").indexOf("," + user.id + ",") != -1) {
              this.$refs.singleTable.toggleRowSelection(this.userTableData[i]);
            }
          }
        }
      });
    },
    handleNodeClickDia(data, node) {
      if (node.level == 1) {
        return false;
      }
      this.searchDia.categoryId=data.id;
      this.readUser();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    readData(id) {
      readCategoryGoods({ id })
        .then(res => {
          this.listData = res.data;
        })
        .catch(err => {});
    },
    initSvg(sid) {
      let sembed = $("#" + sid);
      let obj = svgPanZoom("#" + sid, {
        zoomEnabled: true
      });
      obj.setZoomScaleSensitivity(0.5);
    },
    readTree() {
      readCategoryTree({})
        .then(res => {
          this.threeList = res.data;
          this.data = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentNode(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
      if (b.level == 1) {
        return false;
      }
      this.readData(a.id);
    },
    lookDetail(val) {
      this.getdata = false;
      this.getdatac = false;
      console.log(val);
      this.currentRow = val;
      this.goodId = this.currentRow.id;
      console.log(this.goodId);
      readCategoryGoodsDetail({ id: this.goodId}).then(res => {
        this.result = res.data;
        this.tabdetailshow = !this.tabdetailshow;
        let obj = new Object();
        obj.manufacturersName = res.data.public.manufacturer.value;
        obj.manufacturersNo = res.data.public.manufacturerPartNumber.value;
        obj.pageSize=10;
        obj.pageNum=1;
        this.mainNum = obj;
        //console.log(this.mainNum);
        readCategoryGoodsDetaillife(this.mainNum).then(res => {
          //console.log(res);
          this.content = res.data;;
          console.log(this.content);
          this.getdata = true;
        });
        this.zzspage();
        sameparts({ id: this.goodId }).then(res => {
          console.log(res);
          this.samepart = res.data;
        });
        this.getrelacelist();
        Callgraphs({partNumber:this.currentRow.partNumber}).then(res =>{
          console.log(res)
          this.callgraphs=res.data;
          console.log(this.callgraphs);
          this.getdatac = true;
        })
      });
    },
    zzspage() {
      manufacturersList(this.mainNum).then(res => {
        this.zhizs = res.data;
        this.total=res.total;
        console.log(this.zhizs);
      });
    },
    getrelacelist(){
      fungibleparts({ id: this.goodId }).then(res => {
          console.log(res);
          this.replace = res.data;
          this.userId = '';
          this.selectedUser = '';
          for (let i = 0; i < this.replace.length; i++) {
            this.userId += "," + this.replace[i].id;
            this.selectedUser += "," + this.replace[i].partNumber;
          }
        });
    },
    open1() {
      this.same1 = !this.same1;
    },
    open2() {
      this.same2 = !this.same2;
    },
    // closeDetail() {
    //   this.tabdetailshow = false;
    // },
     handleClose(e) {
            this.tabdetailshow = false;
        },
    applyreplace() {
      this.searchDia={};
      this.readTree();
      this.readUser();
      this.dialogForm2Visible = true;
    },
    
    opendia(){
        this.$nextTick(function() {
        this.$refs.treeBox1.style.height = this.clientHeight - 200 + "px";
      });
    },
    deleteRel(item){
     deletefungibleparts({id: this.goodId,goodIds:item.id}).then(res =>{
         console.log(res);
         if(res.httpCode == "200"){
           this.$message.success("删除成功"); 
            this.getrelacelist();         
          }
     })
    },
     handleSizeChange(val) {
      this.mainNum.pageSize = val;
      this.zzspage();
    },
    handleCurrentChange(val) {
      this.mainNum.pageNum = val;
      this.zzspage();
    },
    startFlow(index) {
      this.$router.push({
        path: "/ELECTRONICS/librariesManage/startFlowProcess",
        query: { id: this.goodId }
      });
      // startProcessOrder({ processKey: "libraryApply" }).then(res => {
      //   buildLibApply({
      //     status: "5",
      //     id: this.listData[index].id,
      //     putStorageProcessKey: res.processInstanceId
      //   })
      //     .then(response => {
      //       this.readData();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }).catch(err=>{
      //   console.log(err)
      // });
    },
    changeFixed(clientHeight) {
      //动态修改可视区域高度
      console.log(clientHeight);
      this.$refs.treeBox.style.height = clientHeight - 60 + "px";
      this.$refs.tabdetail.style.height = clientHeight + "px";
      this.$refs.messagebox.style.height = clientHeight - 100 + "px";
    },
    changeFixed1(clientWidth) {
      //动态修改可视区域宽度
      console.log(clientWidth);
      this.$refs.tableRight.style.width = clientWidth - 480 + "px";
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    },
    clientWidth: function() {
      this.changeFixed1(this.clientWidth);
    }
  },
  mounted() {
    this.readTree();
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // 获取浏览器可视区域宽度
    this.clientWidth = `${document.documentElement.clientWidth}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientWidth = `${document.documentElement.clientWidth}`;
    };
  }
};
</script>


<style lang="scss" scoped>
.treeBox {
  width: 240px;
  float: left;
  overflow-x: scroll;
}
.tree {
  width: 240px;
  overflow: scroll;
}
.row {
  position: relative;
}
.tabdetail {
  background: #f9f9f9;
  width: 800px;
  position: fixed;
  top: 46px;
  right: 0px;
  z-index: 100;
  box-shadow: -3px 0 3px -1px #ccc;
  //overflow: scroll;
}
.close {
  position: absolute;
  top: 20px;
  right: 15px;
}
.el-tab-pane {
  .messagebox {
    overflow: scroll;
  }
}
.one,.six{
  > div {
    p {
      width: 100%;
      background: #f2f2f2;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
    }
  }
}
.svgmodel{
  height:240px;
}
.tableRight {
  float: left;
  margin-left: 20px;
}
.users {
  margin-top: -20px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}
.mybox-enter-active {
  transition: all 0.4s linear;
}
.mybox-leave-active {
  transition: all 0.3s linear;
  // height: 2000px;
}
.mybox-enter,
.mybox-leave-to {
  transform: translateX(800px);
  opacity: 1;
}
</style>


