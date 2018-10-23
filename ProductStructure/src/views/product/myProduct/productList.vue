<template>
  <div @click="hideRMenu">
    <el-row class="row">
      <el-col :span="5" style="overflow:auto">
        <div class="lefttree" ref="producttree">
          <el-tree :data="data" ref="tree" :props="defaultProps" :expand-on-click-node="false" :default-expanded-keys="expandKeys" @node-contextmenu="contextMenuClick" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node)" @mouseleave="leave(node)">
              <img v-if="node.level == 1" src="../../../assets/product/fkp.png" style="width:12px" alt="">
              <img v-if="node.level == 2" src="../../../assets/product/fkv.png" style="width:12px" alt="">
              <img v-if="node.level == 3" src="../../../assets/product/diyiji.png" style="width:12px" alt="">
              <img v-if="node.level == 4" src="../../../assets/product/fkb.png" style="width:12px" alt="">
              <span>{{ node.label }}</span>&nbsp;&nbsp;
              <i class="el-icon-setting logo" @click="showBtns(node,data)" v-show="seen&&node.id==current"></i>
              <span v-show="seen&&node.id==current&&productwork==true">
                <el-button type="text" size="mini" @click="() => editProduct(data,node)">
                  修改
                </el-button>
                <el-button v-show="seen&&node.id==current&&productworkdel==true" type="text" size="mini" @click="() => deleteProduct(data, node)">
                  删除
                </el-button>
              </span>
              <span v-show="seen&&node.id==current&&versionwork==true">
                <el-button type="text" size="mini" @click="() => editVersion(data,node)">
                  修改
                </el-button>
                <el-button v-show="seen&&node.id==current&&versiontworkdel==true" type="text" size="mini" @click="() => deleteVersion(data,node)">
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
          <div id="rMenu" class="list-group" @click.stop.prevent :style="treeMenu">
            <a class="list-group-item" v-if="leavel == 2" @mousedown.stop.prevent="importBomBanBen">导入BOM</a>
            <a class="list-group-item" v-if="leavel == 2" @mousedown.stop.prevent="exportBomBanBen">导出BOM</a>
            <a class="list-group-item" v-if="leavel == 3" @mousedown.stop.prevent="dialogForm2Visible = true">新建BOM</a>
            <a class="list-group-item" v-if="leavel == 4" @mousedown.stop.prevent="dialogSelectEleVisible = true">替换BOM</a>
            <a class="list-group-item" v-if="leavel == 4" @mousedown.stop.prevent="removeBOM">删除BOM</a>
          </div>
        </div>
      </el-col>
      <el-col :span="19" style="border-left: 1px solid #e5e5e5;">
        <div class="rightbox" ref="rightbox" style="overflow-x:scroll;">
          <div class="clearfix">
            <div class="stitle">
              产品属性
            </div>
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="el-icon-plus" v-if="versionData" @click="importBomBanBen">导入BOM</el-button>
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="addProduct">添加产品</el-button>
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="addEdition">新增版本</el-button>
            </div>
          </div>
          <div class="splan">
            <div class="group tree-ul" style="overflow:auto;">
              <div style="width:2000px">
                <div class="head-menu" style="height:32px">
                  <div v-for="(item,index) in titleList" :key="index" :style="index>3?'margin-left:5px':''">{{item}}</div>
                </div>
                <ul class="tree-ul">
                  <li v-for="(a,b) in treeList" :key="b">
                    <div @click="open1(a)" class="head-menu">
                      <div>
                        <template v-if="a.children&&a.children.length>0">

                          <i v-show="!a.open" class="el-icon-caret-right"></i>
                          <i v-show="a.open" class="el-icon-caret-bottom"></i>
                        </template>
                        <img src="../../../assets/bom/dierji.png" style="height:20px;vertical-align:middle;" alt="">
                        <span>{{a.item}}</span>
                      </div>
                      <div>
                        {{a.num}}
                      </div>
                    </div>
                    <transition name="el-zoom-in-top">
                      <ul v-if="a.children&&a.children.length>0" v-show="a.open" class="tree-ul">
                        <li v-for="(c,d) in a.children" :key="d">
                          <div @click="getOldData(c)" class="head-menu">
                            <div style="padding-left:20px">
                              <template v-if="c.childrenCopy&&c.childrenCopy.length>0">
                                <i v-show="!c.open" class="el-icon-caret-right"></i>
                                <i v-show="c.open" class="el-icon-caret-bottom"></i>
                              </template>
                              <img src="../../../assets/bom/fkb.png" style="height:20px;vertical-align:middle;" alt="">
                              <span>{{c.partNumber}}</span>
                            </div>
                            <div>
                              {{c.productModel}}
                            </div>
                            <div>
                              {{c.description}}
                            </div>
                            <div>
                              {{c.preRanking}}
                            </div>
                            <div>
                              {{c.price}}
                            </div>
                            <div>
                              {{c.ratedValue}}
                            </div>
                            <div>
                              {{c.replacePart}}
                            </div>
                            <div>
                              {{c.stock}}
                            </div>
                            <div>
                              {{c.tolerance}}
                            </div>
                            <div>
                              {{c.value}}
                            </div>
                          </div>
                          <transition name="el-zoom-in-top">
                            <ul v-if="c.childrenCopy&&c.childrenCopy.length>0" v-show="c.open" class="tree-ul">
                              <li v-for="(e,f) in c.childrenCopy" :key="f">
                                <div @click="open2(e)" class="head-menu">
                                  <div style="padding-left:40px">
                                    <template v-if="e.children&&e.children.length>0">
                                      <i v-show="!e.open" class="el-icon-caret-right"></i>
                                      <i v-show="e.open" class="el-icon-caret-bottom"></i>
                                    </template>
                                    <img src="../../../assets/bom/fkm.png" style="height:20px;vertical-align:middle;" alt=""><span> {{e.manufacturerName}}</span>
                                  </div>
                                  <div>
                                    {{e.manufacturerPartNumber}}
                                  </div>
                                </div>
                                <transition name="el-zoom-in-top">
                                  <div style="padding-left:60px ; width:850px">
                                    <table class="table table-hover" v-if="e.children&&e.children.length>0" v-show="e.open">
                                      <thead>
                                        <tr>
                                          <th>供应商名称</th>
                                          <th>供应商编号</th>
                                          <th>供货周期</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="(g,h) in e.children" :key="h">
                                          <td><img src="../../../assets/bom/fks.png" style="height:20px;vertical-align:middle;" alt="">{{g.dealerName}}</td>
                                          <td>{{g.dealerPartNumber}}</td>
                                          <td>{{g.stockCycle}}</td>
                                          <!-- <td>{{g.title}}</td> -->
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </transition>
                              </li>
                            </ul>
                          </transition>
                        </li>
                      </ul>
                    </transition>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="splan" style="margin-top:20px;background:#FAF8F8">
            <el-tabs v-model="activeName"  @tab-click="handleClick">
              <el-tab-pane label="属性" name="first">
                <div class="titlt">
                  <b>基本属性</b>
                  <el-button icon="el-icon-edit" size="mini" class="pull-right" @click="editionAddBtn"></el-button>
                </div>
                <div class="slable">
                  <table class="stable">
                    <tr>
                      <td style="width: 59px;">产品名称:</td>
                      <td style="width:140px">
                        <!-- <el-input style="width:100%" v-model=""></el-input> -->
                        {{form1.productName}}
                      </td>
                      <td>
                        <!-- <el-button icon="el-icon-edit"></el-button> -->
                      </td>
                      <td style="width: 40px;">版本:</td>
                      <td style="width:140px">
                        <el-input style="width:100%" v-model="form1.versionName"></el-input>
                      </td>
                      <td>
                        <!-- <el-button icon="el-icon-edit"></el-button> -->
                      </td>
                      <!-- <td style="width: 40px;">模板:</td>
                      <td style="width:140px">
                        <el-input style="width:100%"></el-input>
                      </td>
                      <td> -->
                        <!-- <el-button icon="el-icon-edit"></el-button> -->
                      <!-- </td> -->
                      <td style="width: 59px;">产品状态:</td>
                      <td style="width:240px">
                        <!-- <el-input style="width:100%"></el-input> -->
                        <el-radio-group v-model="form1.status" size="small">
                          <el-radio label="1" border>正常</el-radio>
                          <el-radio label="2" border>禁用</el-radio>
                        </el-radio-group>
                      </td>
                      <td>
                        <!-- <el-button icon="el-icon-edit"></el-button> -->
                      </td>
                    </tr>
                    <tr>
                      <td style="vertical-align: top;">产品信息:</td>
                      <td colspan="4">
                        <el-input type="textarea" v-model="form1.remark" maxlength="100" placeholder="请输入版本描述"></el-input>
                        <span style="float:right">还可输入
                          <b v-text="msg1"></b>字</span>
                      </td>
                      <!-- <td style="vertical-align: top;">
                        <el-button icon="el-icon-plus"></el-button>
                      </td> -->
                    </tr>
                    <tr>
                      <td>锁 &nbsp; &nbsp;定: </td>
                      <td>
                        <el-checkbox></el-checkbox>
                      </td>
                    </tr>
                  </table>

                </div>
                <div class="titlt">
                  <b>子组件</b>
                </div>
                <div class="clearfix">
                  <table class=" pull-left table table-bordered" style="table-layout:fixed;width:50%">
                    <tr>
                      <td>子组件</td>
                      <td>数量</td>
                      <td>意见</td>
                      <td>操作</td>
                    </tr>
                    <tr v-for="(item,index) in bomVersionList" :key="index">
                      <td>{{item.productName + ' - ' +item.versionName}}</td>
                      <td>
                        <template v-if="!item.audit">
                          {{item.quantity}}
                        </template>
                        <template v-else>
                          <el-input v-model="item.quantity"></el-input>
                        </template>
                      </td>
                      <td>
                        <template v-if="!item.audit">
                          {{item.comment}}
                        </template>
                        <template v-else>
                          <el-input v-model="item.comment"></el-input>
                        </template>
                      </td>
                      <td>
                        <el-button type="text" v-if="!item.audit" @click="companyVersion(item)">修改</el-button>
                        <el-button type="text" v-if="item.audit" @click="auditVersionRelation(item)">保存</el-button>
                        <el-button type="text" @click="deleteVersionRelation(item.id)">删除</el-button>
                      </td>
                    </tr>
                  </table>
                  <div class="pull-left" style="margin-left:10px">
                    <el-button icon="el-icon-plus" :disabled="!versionData" @click="dialogSelectVerVisible = true"></el-button>
                  </div>
                </div>
                <div class="titlt" v-if="versionData">
                  <b>文档</b>
                </div>
                <div class="clearfix" v-if="versionData">
                  <table class=" pull-left table table-bordered" style="table-layout:fixed;width:50%">
                    <tr>
                      <td>文档名称</td>
                      <td>操作</td>
                    </tr>
                    <tr v-for="(item,index) in documentList" :key="index">
                      <td>{{item.name}}</td>
                      <td><el-button type="text" @click="deleteDocument(index)">删除</el-button></td>
                    </tr>
                  </table>
                  <div class="pull-left" style="margin-left:10px">
                    <el-button icon="el-icon-plus"  @click="dialogSelectDocVisible = true"></el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="产品结构" name="second">
                <template v-if="versionData&&activeName=='second'">
                  <product-structure :versionData="versionData" :num='"1"'></product-structure>
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="产品管理" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="form.productName" maxlength="50" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品描述：" prop="remark">
          <el-input type="textarea" v-model="form.remark" maxlength="100" placeholder="请输入产品描述"></el-input>
          <span style="float:right">还可输入
            <b v-text="msg"></b>字</span>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="productAddBtn">确 定</el-button>
        <el-button type="primary" plain @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="版本管理" :visible.sync="dialogForm1Visible" width="40%">
      <el-form :model="form1" :rules="rules" ref="rule1Form" label-width="100px">
        <el-form-item label="产品名称：" prop="productId">
          <el-select style="width:100%;" :disabled="readonly" v-model="form1.productId" placeholder="请选择产品">
            <el-option v-for="(item,index) in productlist" :key="index" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本名称：" prop="versionName">
          <el-input v-model="form1.versionName" maxlength="50" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="版本描述：" prop="remark">
          <el-input type="textarea" v-model="form1.remark" maxlength="100" placeholder="请输入版本描述"></el-input>
          <span style="float:right">还可输入
            <b v-text="msg1"></b>字</span>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="canclick" @click="editionAddBtn">确 定</el-button>
        <el-button type="primary" plain @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建BOM条目" :visible.sync="dialogForm2Visible" width="40%">
      <div>
        <div>
          <el-radio v-model="bomForm.radio" label="1">提示符隔开</el-radio>
          <span>其数量等于指示符的数目对于多个指示器，使用","分隔它们。指定范围。指定一个引用指示器和一个数量指示器</span>
          <el-input v-model="bomForm.designators" :disabled="bomForm.radio == '2'"></el-input>
        </div>
        <hr style="margin: 15px 0px;">
        <div>
          <el-radio v-model="bomForm.radio" label="2">指定</el-radio>
          <span>一个引用指示器和一个数量指示器</span>
          <div>
            <span>指示器:</span>
            <el-input v-model="bomForm.designatorsNum" :disabled="bomForm.radio == '1'" style="width: 200px;display: inline-block;"></el-input>
            <span>数量:</span>
            <el-input  v-model="bomForm.num"  :disabled="bomForm.radio == '1'" style="width: 200px;display: inline-block;"></el-input>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectElection">确 定</el-button>
        <el-button type="primary" plain @click="dialogForm2Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择" :visible.sync="dialogSelectEleVisible" width="80%">
      <select-ele @reciveProduct='recivePro'></select-ele>
    </el-dialog>
    <el-dialog title="选择" :visible.sync="dialogSelectVerVisible" width="60%">
      <select-version @reciveVersion='reciveVersion'></select-version>
    </el-dialog>
    <el-dialog title="选择" :visible.sync="dialogSelectDocVisible" width="80%">
      <select-doc @reciveDocument='reciveDocument'></select-doc>
    </el-dialog>
  </div>
</template>

<script>
import {
  AddProduct,
  Allproductlist,
  AddbomVersion,
  ProductTree,
  deleteProduct,
  deleteVersion,
  readProductInfoData,
  updateBomComponentManage,
  replaceBomComponentManage,
  deleteBomComponentManage,
  updateBomVersionRelation,
  readBomVersionRelationList,
  deleteBomVersionRelation
} from "@/api/product";
// import "vue-orgchart/dist/style.min.css";
// import { VoBasic } from "vue-orgchart";
import selectEle from "./compont/selectEle";
import selectVersion from "./compont/selectVersion";
import productStructure from "./compont/productStructure";
import selectDoc from "./compont/selectDoc";
export default {
  components: { selectEle , selectVersion ,productStructure , selectDoc},
  data() {
    return {
      clientHeight: "",
      clientWidth: "",
      dialogFormVisible: false,
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      dialogSelectEleVisible: false,
      dialogSelectVerVisible: false,
      dialogSelectDocVisible: false,
      productwork: false,
      versionwork: false,
      productworkdel: false,
      versiontworkdel: false,
      readonly: false,
      canclick: false,
      structpng: false,
      msg: 100,
      msg1: 100,
      seen: false,
      current: 0,
      vname: "",
      partNumber: "",
      structpngname: "",
      nodemessage: "",
      classDataList: [],
      partDataList: [],
      productlist: [],
      leftList: [],
      rightList: [],
      chartData: {},
      form: {
        productName: "",
        remark: "",
        parentId: "",
        id: ""
      },
      form1: {
        productName: "",
        versionName: "",
        productId: "",
        remark: "",
        parentId: "",
        sort: "1",
        id: ""
      },
      rules: {
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        versionName: [
          { required: true, message: "请输入版本名称", trigger: "blur" }
        ]
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      titleList: ["部位", "数量"],
      titleList1: ["部位", "数量"],
      titleList2: [
        "Part Number",
        "规格型号",
        "物料描述",
        "质量等级",
        "价格",
        "额定值",
        "替代料",
        "库存",
        "公差",
        "值"
      ],
      titleList3: ["制造商名称", "制造商编码"],
      titleList4: ["供应商名称", "供应商编码"],
      treeList: [],
      expandKeys: [],
      activeName: "first",
      formInline: {},
      versionData: null,
      treeMenu: {
        top: 0 + "px",
        left: 0 + "px",
        display: "none"
      },
      selectBom:{},
      bomForm: {
        radio: "1",
        classId: "",
        designators: "",
        num: "",
        componentId: "",
        versionId: ""
      },
      versionNode:{},
      leavel:'',//控制邮件菜单的内容
      nodeData:{},//右键的node对象,
      bomVersionList:[],
      documentList:[],
    };
  },
  methods: {
    readData() {
      ProductTree({}).then(res => {
        this.data = res.data;
      });
      Allproductlist({}).then(res => {
        this.productlist = res.data;
      });
    },
    addProduct() {
      this.dialogFormVisible = true;
      if (this.$refs["ruleForm"] !== undefined) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    editProduct(data, node) {
      this.dialogFormVisible = true;
      this.form.productName = data.data.productName;
      this.form.remark = data.data.remark;
      this.form.id = data.data.id;
    },
    deleteProduct(data, node) {
      let id;
      id = node.data.data.id;
      deleteProduct({ id: id }).then(res => {
        if (res.httpCode == 200) {
          this.$message.success("产品删除成功");
          this.$refs.tree.remove(node);
          this.readData();
        }
      });
    },
    productAddBtn() {
      if (this.form.productName != "") {
        AddProduct(this.form).then(res => {
          if (res.httpCode == 200) {
            this.readData();
            this.form = {};
            this.nodemessage = {};
            this.dialogFormVisible = false;
            this.$message.success("操作成功");
          } else {
            this.$message.error("请填写产品信息");
          }
        });
      }
    },
    // 添加版本
    addEdition() {
      this.readonly = false;
      this.vname = "";
      this.form1 = {
        productName: "",
        versionName: "",
        productId: "",
        remark: "",
        parentId: "",
        sort: "1",
        id: ""
      };
      if (this.$refs["rule1Form"] !== undefined) {
        this.$refs["rule1Form"].resetFields();
      }
      if (this.nodemessage.level == 1) {
        this.form1.productId = this.nodemessage.data.data.id;
      } else {
        this.form1.productId = "";
      }
      this.dialogForm1Visible = true;
    },
    editVersion(data, node) {
      this.canclick = false;
      this.dialogForm1Visible = true;
      if (node.level == 2) {
        this.readonly = true;
      }
      this.form1.id = data.data.id;
      this.vname = data.data.versionName;
      this.form1.versionName = data.data.versionName;
      this.form1.remark = data.data.remark;
      this.form1.productId = data.parentId;
    },
    deleteVersion(data, node) {
      let id;
      id = node.data.data.id;
      deleteVersion({ id: id }).then(res => {
        if (res.httpCode == 200) {
          this.$message.success("版本删除成功");
          this.$refs.tree.remove(node);
          this.readData();
        }
      });
    },
    editionAddBtn() {
      if (this.form1.productId != "" && this.form1.versionName != "") {
        AddbomVersion(this.form1).then(res => {
          if (res.httpCode == 200) {
            this.readData();
            this.form1 = {};
            this.nodemessage = {};
            this.dialogForm1Visible = false;
            this.$message.success("操作成功");
          } else {
            this.$message.error("请填写版本信息");
          }
        });
      }
    },
    treeToLable(tree) {
      tree.forEach(a => {
        a.label = a.className;
        if (a.children) {
          a.children.forEach(b => {
            b.label = b.partNumber;
            if (b.children) {
              let arr = b.children.concat([]);
              delete b.children;
              b.childrenCopy = arr;
            }
          });
        }
      });
    },
    resfeTreeData(){
      readProductInfoData({ versionId: this.versionNode.data.data.id })
          .then(res => {
            let resData = res.data;
            this.treeToLable(resData);
            this.versionNode.data.children = resData;
            this.versionNode.expanded = true;
          })
          .catch(err => {
            console.log(err);
          });
    },
    handleNodeClick(data, node) {
      this.nodemessage = node;
      this.hideRMenu();
      // readProductInfoData({versionId:node.parent.data.id,classId:node.data.id}).then(res=>{
      if(node.level == 1){
        // this.version.parentName = node.parent.data.data.productName;
        this.versionData = null;
      }else if (node.level == 2) {
        this.versionData = node.data.data;
        console.log(this.versionData);
        this.documentList = JSON.parse(this.versionData.document)
        this.form1 = node.data.data;
        this.form1.productName = node.parent.data.data.productName;
        readProductInfoData({ versionId: node.data.data.id })
          .then(res => {
            let resData = res.data;
            this.treeToLable(resData);
            this.nodemessage.data.children = resData;
            node.expanded = true;
          })
          .catch(err => {
            console.log(err);
          });
        this.getVersionRelationList(this.versionData)
        this.activeName = 'first'
      } else if (node.level == 4) {
        this.versionData = null;
        this.treeList = [];
        let addObj = $.extend(true, {}, node.data);
        let addArr = [];
        addArr.push(node.data);
        addObj.children = addArr;
        this.treeList.push(addObj);
      } else {
        this.versionData = null;
      }
      return false;
    },
    showBtns(node, data) {
      this.current = node.id;
      if (node.level == 1) {
        if (node.childNodes.length == 0) {
          this.productwork = true;
          this.productworkdel = true;
        } else if (node.childNodes.length > 0) {
          this.productwork = true;
          this.productworkdel = false;
        }
      } else if (node.level == 2) {
        this.versionwork = true;
        this.versiontworkdel = true;
      }
    },
    enter(node) {
      if (node.level == 1 || node.level == 2) {
        this.current = node.id;
        this.seen = true;
      }
    },
    leave() {
      this.seen = false;
      this.productwork = false;
      this.versionwork = false;
      this.productworkdel = false;
      this.versiontworkdel = false;
    },
    changeFixed(clientHeight) {
      //动态修改可视区域高度
      this.$refs.producttree.style.height = clientHeight - 80 + "px";
      this.$refs.rightbox.style.height = clientHeight - 46 + "px";
    },
    open(item) {
      item.open = !item.open;
      this.$forceUpdate();
    },
    open1(item) {
      this.titleList = this.titleList1;
      item.open = !item.open;
      this.$forceUpdate();
    },
    open2(item) {
      this.titleList = this.titleList3;
      item.open = !item.open;
      this.$forceUpdate();
    },
    getOldData(item) {
      this.titleList = this.titleList2;

      item.open = !item.open;
      this.$forceUpdate();
    },
    importBomBanBen() {
      this.$router.push({
        name: "BOM导入",
        params: { data: this.versionData }
      });
    },
    exportBomBanBen(){
      this.$router.push({
        name: "BOM导出",
        params: { data: this.versionData }
      });
    },
    contextMenuClick(a, b, c) {
      this.leavel = c.level;
      this.nodeData = c;
      if (c.level == 2) {
        this.versionData = c.data.data;
        this.treeMenu.left = a.clientX + "px";
        this.treeMenu.top = a.clientY + "px";
        this.treeMenu.display = "block";
      }else if (c.level == 3) {
        this.bomForm.classId = b.classId;
        this.bomForm.versionId = c.parent.data.data.id;
        this.versionNode = c.parent;
        this.treeMenu.left = a.clientX + "px";
        this.treeMenu.top = a.clientY + "px";
        this.treeMenu.display = "block";
      }else if(c.level == 4){
        this.versionNode = c.parent.parent;
        this.treeMenu.left = a.clientX + "px";
        this.treeMenu.top = a.clientY + "px";
        this.treeMenu.display = "block";
      }
    },
    hideRMenu() {
      this.treeMenu.display = "none";
    },
    selectElection() {
      this.dialogSelectEleVisible = true;
    },
    addNewBom(a){
      this.selectBom = a;
      let obj = Object.assign({},this.bomForm);
      if(obj.radio == 1){
        obj.num = null;
      }else if(obj.radio == 2){
        obj.designators = this.bomForm.designatorsNum;
      }
      obj.componentId = a.id;
      updateBomComponentManage(obj).then(res=>{
        this.dialogForm2Visible = false
        this.dialogSelectEleVisible = false
        if (res.data.status == "1") {
          this.$message.success("操作成功");
          console.log('重新刷新当前分类')
          this.resfeTreeData();
        } else if (res.data.status == "2") {
          let str = `<strong>${res.data.msg}</strong>`;
          str += '<div style="max-height:80vh;overflow:auto">';
          str += "</div>";
          this.$alert(str, "操作出错", {
            dangerouslyUseHTMLString: true
          });
        } else if(res.data.status == '3') {
          let str = `<strong>${res.data.msg}</strong>`;
          str += '<div style="max-height:80vh;overflow:auto">';
          res.data.existsStrs.forEach((v, i) => {
            str += `
              <span style="padding:10px">${v}</span>
          `;
          });
          str += "</div>";
          this.$alert(str, "操作出错", {
            dangerouslyUseHTMLString: true
          });
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    replaceBom(a){
      let obj = {
        componentId:this.nodeData.data.componentId,
        goodsId:a.id,
      };
      replaceBomComponentManage(obj).then(res=>{
        this.resfeTreeData();
        this.hideRMenu();
        this.$message.success("操作成功");
      }).catch(err=>{
        console.log(err)
      })
    },
    recivePro(a) {
      if(this.leavel == '3'){
        this.addNewBom(a);
      }else if(this.leavel == '4'){
        this.replaceBom(a)
      }
      this.dialogSelectEleVisible = false;
    },
    removeBOM(){
      deleteBomComponentManage({id:this.nodeData.data.componentId}).then(res=>{
        this.$refs.tree.remove(this.nodeData);
        this.hideRMenu();
        this.$message.success("操作成功");
      }).catch(err=>{
        console.log(err)
      })
    },
    reciveVersion(a){
      a.versionId = this.versionData.id;
      this.auditVersionRelation(a);
    },
    getVersionRelationList(a){
      readBomVersionRelationList({versionId:a.id}).then(res=>{
        this.bomVersionList = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    deleteVersionRelation(id){
      deleteBomVersionRelation({id}).then(res=>{
        this.getVersionRelationList(this.versionData)
      }).catch(err=>{
        console.log(err)
      })
    },
    auditVersionRelation(a){
      updateBomVersionRelation(a).then(res=>{
        this.$message.success("操作成功");
        this.dialogSelectVerVisible = false;
        this.getVersionRelationList(this.versionData)
      }).catch(err=>{

      })
    },
    companyVersion(item){
      console.log(item);
      item.audit = true;
      this.$forceUpdate();
    },
    handleClick(a,b){
      console.log(a)
      console.log(b)
      console.log(this.versionData)
      console.log(this.activeName)
    },
    reciveDocument(a){
      console.log(a)
      console.log(this.versionData)
      let arr = this.documentList.concat([]);
      arr.push({name:a.dName,path:a.dAddress})
      let obj = Object.assign({},this.versionData);
      obj.document = JSON.stringify(arr);
      this.saveBomVersion(obj,arr);
    },
    deleteDocument(index){
      let arr = this.documentList.concat([]);
      arr.splice(index,1);
      let obj = Object.assign({},this.versionData);
      obj.document = JSON.stringify(arr);
      this.saveBomVersion(obj,arr);
      console.log(obj)
    },
    saveBomVersion(obj,arr){
      AddbomVersion(obj).then(res => {
        this.dialogSelectDocVisible = false;
        this.$message.success("操作成功");
        this.documentList = arr;
        this.versionData.document = JSON.stringify(arr);
      });
    }
  },
  computed: {
    newRemark() {
      return this.form1.remark;
    },
    newFromRemark() {
      return this.form.remark;
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    },
    newRemark(val) {
      if (val != null) {
        this.msg1 = 100 - val.length;
        if (val.length == 0) {
          this.msg1 = 100;
        } else if (this.msg1 == 0) {
          this.msg1 = 0;
        }
      }
    },
    newFromRemark(val) {
      if (val != null) {
        this.msg = 100 - val.length;
        if (val.length == 0) {
          this.msg = 100;
        } else if (this.msg == 0) {
          this.msg = 0;
        }
      }
    },
    
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // 获取浏览器可视区域宽度
    this.clientWidth = `${document.documentElement.clientWidth}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientWidth = `${document.documentElement.clientWidth}`;
    };
    this.readData();
  }
};
</script>

<style lang="scss" scoped>
.lefttree {
  padding-top: 20px;
  width: 100%;
  overflow: auto;
}
.rightbox {
  // background: #f1f1f1;
  width: 100%;
  padding-top: 20px;
  float: left;
  margin-left: 10px;
}
.el-dialog {
  .el-form {
    margin-top: -20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
}
.custom-tree-node {
  width: 100%;
}
.logo {
  margin-top: 6px;
}
</style>
<style lang="scss">
#voleft {
  margin-top: 30px;
}
#chart-container {
  overflow-x: scroll;
  overflow-y: hidden;
}
.basicleft {
  > div:last-child {
    min-height: 300px;
  }
}
.basicleft {
  > div:not(:last-child) {
    display: none;
  }
}
.tree-ul {
  // padding-left: 20px;
  p {
    cursor: pointer;
    &:hover {
      background-color: #ebf2f9;
    }
  }
}
.head-menu {
  cursor: pointer;
  &:hover {
    background-color: #ebf2f9;
  }
  > div {
    display: inline-block;
    overflow: hidden;
    width: 150px;
    margin: 0;
    padding: 0;
    &:nth-child(1) {
      width: 230px;
    }
    // &:nth-child(2) {
    //   width: 5%;
    // }
    // &:nth-child(3) {
    //   width: 10%;
    // }
  }
}
.titlt {
  height: 30px;
  line-height: 30px;
  background: #f1f1f1;
  margin-bottom: 15px;
  padding-left: 20px;
}
.stitle {
  float: left;
  border-left: 3px solid #32aafe;
  padding-left: 10px;
}
.slable {
  .el-form-item__label {
    font-size: 12px;
  }
  .stable {
    width: 100%;
    tr td {
      padding: 4px 1px;
    }
  }
}
.splan {
  padding: 20px;
  border: 1px solid #e5e5e5;
  margin-top: 10px;
}
#rMenu {
  width: 119px;
  font-size: 10px;
  position: fixed;
  display: none;
}
</style>
