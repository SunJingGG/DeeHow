<template>
  <div class="mainbox">
    <!-- <div>
      <p class="titlt">
        <b>BOM导入</b>
      </p>
      <div style="text-align:center">
        <img src="../../../assets/bom/excel.jpg" alt="" srcset="" class="hvr-shadow pointer" style="width:100px" @click="download">
        <p>
          <el-button type="text" @click="download">点击下载模板</el-button>
        </p>
      </div>
    </div> -->
    <div>
      <p class="titlt">
        <b>BOM导入</b>
      </p>
      <el-row>
        <el-col :span="2">
          <div style="padding-left:10px" class="text-c">
            <img src="../../../assets/bom/fkd.png" alt="" srcset="">
            <p>
              <el-button type="text" @click="download">下载模板</el-button>
            </p>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-left:10px" class="text-c">
            <img src="../../../assets/bom/fku.png" alt="" srcset="">
            <div>
              <el-upload class="upload-demo" :action="DEEHOWBASEURL+'/deehow-CMS-Web/public/excel2007/analysis/first_row'" :on-success='lookFirstData' :file-list="fileList">
                <el-button size="small" type="text">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
              </el-upload>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="padding-left:10px">
            <img src="../../../assets/bom/cpp.png" alt="" srcset="">
            <div>
              <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
                <p style="text-align:left">产品名称：</p>
                <el-form-item style="padding:0;" label="">
                  <el-select v-model="form.componentNameCi" placeholder="请选择"  @change="removeSelectListOption('componentNameCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <p style="text-align:left">产品版本：</p>
                <el-form-item>
                  <el-select v-model="form.noKnow" placeholder="请选择">
                    <!-- <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option> -->
                  </el-select>
                </el-form-item>
                <p style="text-align:left">Refernce：</p>
                <el-form-item>
                  <el-select v-model="form.itemCi" placeholder="请选择"  @change="removeSelectListOption('itemCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <p style="text-align:left">数量：</p>
                <el-form-item>
                  <el-select v-model="form.numCi" placeholder="请选择"  @change="removeSelectListOption('numCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="padding-left:10px">
            <img src="../../../assets/bom/fkb.png" alt="" srcset="">
            <div>
              <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
                <p style="text-align:left">part Number：</p>
                <el-form-item style="padding:0;" label="">
                  <el-select v-model="form.partNumberCi" placeholder="请选择"  @change="removeSelectListOption('partNumberCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <p style="text-align:left">类型：</p>
                <el-form-item>
                  <el-select v-model="form.classCi" placeholder="请选择" @change="removeSelectListOption('classCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="padding-left:10px">
            <img src="../../../assets/bom/fkm.png" alt="" srcset="">
            <div>
              <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
                <p style="text-align:left">制造商名称：</p>
                <el-form-item style="padding:0;" label="">
                  <el-select v-model="form.manufacturerNameCi" placeholder="请选择" @change="removeSelectListOption('manufacturerNameCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <p style="text-align:left">PartNumber：</p>
                <el-form-item>
                  <el-select v-model="form.manufacturerPartNumberCi" placeholder="请选择"  @change="removeSelectListOption('manufacturerPartNumberCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="padding-left:10px">
            <img src="../../../assets/bom/fks.png" alt="" srcset="">
            <div>
              <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
                <p style="text-align:left">供应商名称：</p>
                <el-form-item style="padding:0;" label="">
                  <el-select v-model="form.dealerNameCi" placeholder="请选择" @change="removeSelectListOption('dealerNameCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <p style="text-align:left">PartNumber：</p>
                <el-form-item>
                  <el-select v-model="form.dealerPartNumberCi" placeholder="请选择"  @change="removeSelectListOption('dealerPartNumberCi')">
                    <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-left:10px" class="text-c">
              <img src="../../../assets/bom/fkp.png" alt="" srcset="">
              <p>
                <el-button type="text" @click="startJieXi">预览</el-button>
              </p>
            
          </div>
          <div style="padding-left:10px" class="text-c">
            <template v-if="treeYuanList.length>0">
              <img src="../../../assets/bom/fkc.png" alt="" srcset="">
              <p>
                <el-button type="text" @click="BomBiJiao">BOM比较</el-button>
              </p>
            </template>
            <template v-else>
              <img src="../../../assets/bom/fkdisc.png" alt="" srcset="">
              <p>
                <el-button type="text" :disabled="true">BOM比较</el-button>
              </p>
            </template>
            
          </div>
        </el-col>
        <el-col :span="2">
          
          <div style="padding-left:10px" class="text-c">
            <template v-if="treeYuanList.length>0">
              <img src="../../../assets/bom/fkt.png" alt="" srcset="">
              <p>
                <el-button type="text" @click="onSubmit">确认导入</el-button>
              </p>
            </template>
            <template v-else>
              <img src="../../../assets/bom/fkdist.png" alt="" srcset="">
              <p>
                <el-button type="text" :disabled="true">确认导入</el-button>
              </p>
            </template>
            
          </div>
          <div style="padding-left:10px" class="text-c">
            <template v-if="treeYuanList.length>0">
              <img src="../../../assets/bom/fklc.png" alt="" srcset="">
              <p>
                <el-button type="text" @click="ProductBiJiao">器件比较</el-button>
              </p>
            </template>
            <template v-else>
              <img src="../../../assets/bom/fkdisc.png" alt="" srcset="">
              <p>
                <el-button type="text" :disabled="true">器件比较</el-button>
              </p>
            </template>
            
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="maintwo">
      <p class="titlt">
        <b>属性配置</b>
      </p>
      <div class="row transfer">

        <div class="col-md-2">
          <div class="transbox">
            <p>原数据属性</p>
            <div class="sview">
              <ul class="list-select">
                <li class="list-select-item" v-for="(item,index) in selectList" :key="index" :class="muBiaoIndex == index?'active':''" @click="setMuBiao(index)">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="transbox">
            <p>目标数据属性</p>
            <div class="sview">
              <ul class="list-select">
                <li class="list-select-item" v-for="(item,index) in selectTempList" :key="index" :class="yuanIndex == index?'active':''" @click="setYuan(index)">{{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="groupBtns">
            <img src="../../../assets/bom/toright.png" @click="shouDongPP" alt="" srcset="" class="hvr-forward" style="width: 50px;">
            <br>
            <img src="../../../assets/bom/toleft.png" @click="shouDongJCPP" alt="" srcset="" class="hvr-backward" style="width: 50px;">
            <br>
            <!-- <el-button plain @click="ziDongPP">自动匹配</el-button> -->
            <img src="../../../assets/bom/zdong.png" @click="ziDongPP" alt="" srcset="" class="hvr-rotate">
          </div>
          </div>
          <div class="col-md-6">
            <div class="transbox">
              <p>原《--》目标</p>
              <div class="sview">
                <ul class="list-select">
                  <li class="list-select-item" v-for="(item,index) in guanXiList" :key="index" :class="guanXiIndex == index?'active':''" @click="setSelectGuanXiIndex(index)">{{item.show}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mainthird row">
        <div class="viewbox col-md-8">
          <p class="titlt">
            <b>导入预览</b>
          </p>
          <div class="group" style="overflow:auto">
            <div style="width:2000px">
              <div class="head-menu" style="height:32px">
                <div v-for="(item,index) in titleList" :key="index" :style="index>3?'margin-left:5px':''">{{item}}</div>
              </div>
              <ul class="tree-ul">
                <li v-for="(item,index) in treeList" :key="index">
                  <div @click="open1(item,index)" class="head-menu">
                    <div style="padding-left:0px">
                      <template v-if="item.children&&item.children.length>0">
                        <i v-show="!item.open" class="el-icon-caret-right"></i>
                        <i v-show="item.open" class="el-icon-caret-bottom"></i>
                      </template>
                      <img src="../../../assets/bom/diyiji.png" style="height:20px;vertical-align:middle;" alt=""> <span>{{item.className}}</span>
                    </div>
                  </div>
                  <transition name="el-zoom-in-top">
                    <ul v-if="item.children&&item.children.length>0" v-show="item.open" class="tree-ul">
                      <li v-for="(a,b) in item.children" :key="b">
                        <div @click="open1(a)" class="head-menu">
                          <div style="padding-left:20px">
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
                                <div style="padding-left:40px">
                                  <template  v-if="c.children&&c.children.length>0">
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
                                <ul v-if="c.children&&c.children.length>0" v-show="c.open" class="tree-ul">
                                  <li v-for="(e,f) in c.children" :key="f">
                                    <div @click="open2(e)" class="head-menu">
                                      <div style="padding-left:60px">
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
                                      <div style="padding-left:80px ; width:850px">
                                        <table class="table table-hover" v-if="e.children&&e.children.length>0" v-show="e.open">
                                          <tr v-for="(g,h) in e.children" :key="h">
                                            <td><img src="../../../assets/bom/fks.png" style="height:20px;vertical-align:middle;" alt="">{{g.dealerName}}</td>
                                            <td>{{g.dealerPartNumber}}</td>
                                            <td>{{g.stockCycle}}</td>
                                            <td>{{g.title}}</td>
                                          </tr>
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
                  </transition>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tablebox col-md-4">
          <p class="titlt">
            <b>优选库器件对比</b>
          </p>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>项目</th>
                <th>库值</th>
                <th>新值</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in compareTheList" :key="index" :style="{'color':(item.ifLike?'#000':'red')}">
                <td>{{item.name}}</td>
                <td>{{item.oldData}}</td>
                <td>{{item.newData}}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <el-button type="primary" @click="onSubmit">确认导入</el-button>
          </div>
        </div>
      </div>
      <el-dialog title="请选择产品版本" :visible.sync="dialogFormVisible">
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item,index) in productTree" :key="index" :title="item.label" :name="index">
              <el-radio v-for="(v,i) in item.children" :key="i" v-model="banBeng" :label="v.data.id">{{v.label}}</el-radio>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmVersion">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {
  byConnectionAttribute,
  readProductListByName,
  updateBomVersionManage,
  readProductTree,
  readBomCompareFrom,
  AndProductCompare
} from "@/api/bom";
export default {
  data() {
    return {
      fileList: [],
      selectList: [],
      selectIndexList: [],
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
      selectTempList: [
        {
          index:5,
          name: "规格型号",
          value: "productModelCi"
        },
        {
          index:6,
          name: "封装形式",
          value: "packageTypeCi"
        },
        {
          index:7,
          name: "质量等级",
          value: "preRankingCi"
        },
        {
          index:8,
          name: "物料描述",
          value: "descriptionCi"
        },
        {
          index:9,
          name: "可替代料",
          value: "replacePartCi"
        },
        {
          index:10,
          name: "值",
          value: "valueCi"
        },
        {
          index:11,
          name: "额定值",
          value: "ratedValueCi"
        },
        {
          index:12,
          name: "公差",
          value: "toleranceCi"
        },
        {
          index:13,
          name: "价格",
          value: "priceCi"
        },
        {
          index:14,
          name: "库存",
          value: "stockCi"
        },
        {
          index:19,
          name: "备货周期",
          value: "stockCycleCi"
        }
      ],
      selectIndexTempList: [
        {
          index:5,
          name: "规格型号",
          value: "productModelCi"
        },
        {
          index:6,
          name: "封装形式",
          value: "packageTypeCi"
        },
        {
          index:7,
          name: "质量等级",
          value: "preRankingCi"
        },
        {
          index:8,
          name: "物料描述",
          value: "descriptionCi"
        },
        {
          index:9,
          name: "可替代料",
          value: "replacePartCi"
        },
        {
          index:10,
          name: "值",
          value: "valueCi"
        },
        {
          index:11,
          name: "额定值",
          value: "ratedValueCi"
        },
        {
          index:12,
          name: "公差",
          value: "toleranceCi"
        },
        {
          index:13,
          name: "价格",
          value: "priceCi"
        },
        {
          index:14,
          name: "库存",
          value: "stockCi"
        },
        {
          index:19,
          name: "备货周期",
          value: "stockCycleCi"
        }
      ],
      guanXiList: [],
      yuanIndex: null,
      muBiaoIndex: null,
      guanXiIndex: null,
      dataFile: null,
      labelPosition: "top",
      dialogFormVisible: false,
      activeNames: [],
      form:{
        componentNameCi:null,
        numCi:null,
        partNumberCi:null,
        classCi:null,
        manufacturerNameCi:null,
        manufacturerPartNumberCi:null,
        dealerNameCi:null,
        dealerPartNumberCi:null,
        itemCi:null,
        noKnow:null,
      },
      formbf:{
        componentNameCi:null,
        numCi:null,
        partNumberCi:null,
        classCi:null,
        manufacturerNameCi:null,
        manufacturerPartNumberCi:null,
        dealerNameCi:null,
        dealerPartNumberCi:null,
        itemCi:null,
        noKnow:null,
      }, 
      forms: {
        classCi: null,
        partNumberCi: null,
        componentNameCi: null,
        itemCi: null,
        numCi: null,
        productModelCi: null,
        packageTypeCi: null,
        preRankingCi: null,
        descriptionCi: null,
        replacePartCi: null,
        valueCi: null,
        ratedValueCi: null,
        toleranceCi: null,
        priceCi: null,
        stockCi: null,
        manufacturerNameCi: null,
        manufacturerPartNumberCi: null,
        dealerNameCi: null,
        dealerPartNumberCi: null,
        stockCycleCi: null,
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      form1: {
        roleName: "",
        roleNumber: "",
        remark: "",
        roleRevise: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入规则名称", trigger: "blur" }
        ],
        // roleNumber: [{required: true, message: "请输入规则编码", trigger: "change"}],
        // ruleId: [{required: true, message: "请输入版本", trigger: "blur"}],
        modelName: [
          { required: true, message: "请输入模型名称", trigger: "blur" }
        ],
        // modelNumber: [{required: true, message: "请输入模型编码", trigger: "blur"}],
        roleRevise: [
          { required: true, message: "请输入规则版本", trigger: "blur" }
        ]
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeList: [],
      treeYuanList: [],
      yetLibraryData: {},
      newExeclData: {},
      compareTheField: [
        {
          name: "物料名称",
          field: "componentName"
        },
        {
          name: "物料描述",
          field: "description"
        },
        {
          name: "封装形式",
          field: "packageType"
        },
        {
          name: "Part Number",
          field: "partNumber"
        },
        {
          name: "质量等级",
          field: "preRanking"
        },
        {
          name: "价格",
          field: "price"
        },
        {
          name: "规格型号",
          field: "productModel"
        },
        {
          name: "额定值",
          field: "ratedValue"
        },
        {
          name: "替代料",
          field: "replacePart"
        },
        {
          name: "库存",
          field: "stock"
        },
        {
          name: "公差",
          field: "tolerance"
        },
        {
          name: "value",
          field: "value"
        }
      ],
      compareTheList: [],
      productTree: [],
      banBeng: "",
      banBeng1: ""
    };
  },
  methods: {
    download() {
      let str =
        this.DEEHOWBASEURL +
        "/deehow-CMS-Web/public/excel2007/import?titleNames=";
      let arr = [
        "Class",
        "Part Number",
        "Designators",
        "Quantity",
        "物料名称",
        "规格型号",
        "封装形式",
        "质量等级",
        "物料描述",
        "可替代料",
        "值",
        "额定值",
        "公差",
        "价格",
        "库存",
        "Manufacturer Name",
        "Manufacturer Part Number",
        "Supplier Name",
        "Supplier Part Number",
        "备货周期"
      ];
      arr.forEach((v, i) => {
        if (i < arr.length - 1) {
          str += v + "&titleNames=";
        } else {
          str += v;
        }
      });
      console.log(str);
      window.location.href = str;
    },
    setMuBiao(index) {
      this.muBiaoIndex = index;
    },
    setYuan(index) {
      this.yuanIndex = index;
    },
    setSelectGuanXiIndex(index) {
      this.guanXiIndex = index;
    },
    lookFirstData(res, file, fileList) {
      this.guanXiList = [];
      this.selectList = res.data;
      this.selectIndexList = [];
      res.data.forEach((v,i)=>{
        let obj = {
          index : i,
          value: v
        }
        this.selectIndexList.push(obj)
      })
      console.log(this.selectIndexList)
      this.dataFile = file.raw;
    },
    startJieXi() {
      let param = new FormData();
      let file = "";
      for(var i in this.form){
        console.log(this.form[i]);
        let abc = this.form[i];
        if(abc){
          let obj = this.selectIndexList.find((a,b,c)=>{
            return a.value == abc
          })
          console.log(obj)
          if(obj){
            param.append(i,obj.index);
          }
        }
      }
      this.guanXiList.forEach((v, i) => {
        param.append(v.jian, v.zhi);
      });
      param.append("file", this.dataFile);
      console.log(param);
      byConnectionAttribute(param)
        .then(res => {
          console.log(res);
          if (res.data.status != "1") {
            this.$alert(res.data.msg, "导入出错", {
              dangerouslyUseHTMLString: true
            });
          } else {
            this.treeYuanList = $.extend(true, {}, res.data).treeList;
            let arr = [].concat(res.data.treeList);

            arr.forEach((val, index) => {
              // let arr1 = [];
              val.children.forEach((v, i) => {
                let arr1 = [];
                arr1.push($.extend(true, {}, v));
                v.children = arr1;
              });
            });
            this.treeList = arr;
            console.log(arr);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shouDongPP() {
      let obj = new Object();
      let selectTempList = this.selectTempList;
      let selectList = this.selectList;
      obj.show =
        selectTempList[this.yuanIndex].name +
        "《--》" +
        selectList[this.muBiaoIndex];
      obj.yuan = Object.assign({},selectTempList[this.yuanIndex]);
      obj.mubiao = selectList[this.muBiaoIndex];
      obj.jian = selectTempList[this.yuanIndex].value;
      let findObj = this.selectIndexList.find((a,b,c)=>{
        return a.value == selectList[this.muBiaoIndex]
      })
      if(findObj){
        obj.zhi = findObj.index;
      }
      this.guanXiList.push(obj);
      selectList.splice(this.muBiaoIndex,1)
      selectTempList.splice(this.yuanIndex,1)
      this.yuanIndex = null;
      this.muBiaoIndex = null;
    },
    shouDongJCPP() {
      console.log(this.guanXiList[this.guanXiIndex])
      let obj = this.guanXiList[this.guanXiIndex];
      this.selectList.push(obj.mubiao)
      this.selectTempList.push(obj.yuan);

      this.guanXiList.splice(this.guanXiIndex, 1);
      this.guanXiIndex = null;
    },
    ziDongPP() {
      this.guanXiList = [];
      let selectList = this.selectList;
      let indexArr1 = [];
      let indexArr2 = [];
      this.selectTempList.forEach((v, ind) => {
        for (var i = 0; i < selectList.length; i++) {
          if (v.name == selectList[i]) {
            let findObj = this.selectIndexList.find((a,b,c)=>{
              return a.value == selectList[i]
            })
            if(findObj){
              let obj = new Object();
              obj.show = v.name + "《--》" + selectList[i];
              obj.yuan = Object.assign({},v);
              obj.mubiao = selectList[i];
              obj.jian = v.value;
              obj.zhi = findObj.index;
              indexArr1.push(ind)
              indexArr2.push(i)
              this.guanXiList.push(obj);
              return false;
            }
          }
        }
      });
      console.log(indexArr1)
      console.log(indexArr2);
      let newArr1 = [];
      let newArr2 = [];
      this.selectTempList.forEach((v,i)=>{
        if(indexArr1.indexOf(i)>-1){

        }else{
          newArr1.push(v)
        }
      })
      this.selectList.forEach((v,i)=>{
        if(indexArr2.indexOf(i)>-1){

        }else{
          newArr2.push(v)
        }
      })
      this.selectTempList = newArr1;
      this.selectList = newArr2;
    },
    addTreeIO(arr, bl) {
      arr.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
          v.open = bl;
          this.addTreeIO(v.children, bl);
        } else {
          v.open = bl;
        }
      });
      return arr;
    },
    open(item) {
      console.log(item);
      item.open = !item.open;
      this.$forceUpdate();
    },
    open1(item) {
      console.log(item);
      this.titleList = this.titleList1;
      item.open = !item.open;
      this.$forceUpdate();
    },
    open2(item) {
      console.log(item);
      this.titleList = this.titleList3;
      item.open = !item.open;
      this.$forceUpdate();
    },
    getOldData(item) {
      this.titleList = this.titleList2;
      readProductListByName({ partNumber: item.partNumber })
        .then(res => {
          console.log(res);
          console.log(item);
          this.yetLibraryData = res.data ? res.data[0] : {};
          this.newExeclData = item;
          let arr = [];
          console.log(this.compareTheField)
          this.compareTheField.forEach((v, i) => {
            let obj = {
              name: v.name,
              field: v.field,
              oldData: this.yetLibraryData[v.field]
                ? this.yetLibraryData[v.field]
                : "",
              newData: this.newExeclData[v.field]
                ? this.newExeclData[v.field]
                : ""
            };
            if (obj.oldData == obj.newData) {
              obj.ifLike = true;
            } else {
              obj.ifLike = false;
            }
            arr.push(obj);
          });
          console.log(arr);
          this.compareTheList = arr;
        })
        .catch(err => {
          console.log(err);
        });
      item.open = !item.open;
      this.$forceUpdate();
    },
    onSubmit() {
      if (!this.banBeng1) {
        this.dialogFormVisible = true;
        return false;
      }
      let param = {
        versionId: this.banBeng1,
        treeList: this.treeYuanList
      };
      console.log(JSON.stringify(param));
      updateBomVersionManage(param)
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            this.$message.success("导入成功");
          } else if (res.data.status == "2") {
            let str = `<strong>${res.msg}</strong>`;
            str += '<div style="max-height:80vh;overflow:auto">';
            res.data.repeatClassList.forEach((v, i) => {
              str += `
                <span style="padding:10px">${v}</span>
            `;
            });
            str += "</div>";
            this.$alert(str, "导入出错", {
              dangerouslyUseHTMLString: true
            });
          }else if (res.data.status == "4") {
            let str = `<strong>${res.msg}</strong>`;
            str += '<div style="max-height:80vh;overflow:auto">';
            res.data.repeatItemList.forEach((v, i) => {
              str += `
                <span style="padding:10px">${v}</span>
            `;
            });
            str += "</div>";
            this.$alert(str, "导入出错", {
              dangerouslyUseHTMLString: true
            });
          } else {
            let str = `<strong>${res.msg}</strong>`;
            str += '<div style="max-height:80vh;overflow:auto">';
            res.data.notPartNumber.forEach((v, i) => {
              str += `
                <span style="padding:10px">${v}</span>
            `;
            });
            str += "</div>";
            this.$alert(str, "导入出错", {
              dangerouslyUseHTMLString: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSelectOption() {
      readProductTree({})
        .then(res => {
          console.log(res);
          this.productTree = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    BomBiJiao() {
      this.dialogFormVisible = true;
    },
    ProductBiJiao() {
      AndProductCompare({ treeList: this.treeYuanList })
        .then(res => {
          console.log(res);
          this.$router.push({ name: "器件比较", params: { data: res.data } });
        })
        .catch(err => {});
    },
    confirmVersion() {
      let param = {
        treeList: this.treeYuanList,
        version: this.banBeng
      };
      readBomCompareFrom(param)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "比较预览", params: { data: res.data } });
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeSelectListOption(jian){
      console.log(jian);
      console.log(this.form[jian])
      //将原来的值备份一下 , 在改变的时候再把这个值插回去;
      let str = this.form[jian];
      let index = this.selectList.indexOf(str);
      console.log(index)
      if (index > -1) {
        if(this.formbf[jian]){
          this.selectList.splice(index, 1,this.formbf[jian]);
        }else{
          this.selectList.splice(index, 1);
        }
        this.formbf[jian] = this.form[jian];
      }
    }
  },
  mounted() {
    if (!this.$route.params.data) {
      this.$router.replace({ path: "/PROSTRU/myProduct/productList" });
      return false;
    }
    this.banBeng1 = this.$route.params.data.id;
    console.log(this.banBeng1)
    this.getSelectOption();

  }
};
</script>

<style lang="scss" scoped>
.list-select {
  .list-select-item {
    position: relative;
    display: block;
    padding: 10px 15px;
    // margin-bottom:-1px;
    border-bottom: 1px solid #ddd;
    color: #555;
    cursor: pointer;
    &:hover {
      color: #353535;
      text-decoration: none;
      background-color: #ebf2f9;
    }
  }
  .list-select-item.active {
    z-index: 2;
    color: #fff;
    background-color: #3280fc;
    border-color: #3280fc;
  }
}

.mainbox {
  .titlt {
    height: 30px;
    line-height: 30px;
    background: #f1f1f1;
    margin-bottom: 15px;
    padding-left: 20px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .transfer {
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      background: #fafafa;
    }
    .transbox {
      width: 100%;
      height: 300px;
      border: 1px solid #ccc;
      .sview {
        height: 269px;
        overflow: auto;
      }
    }
    .groupBtns {
      text-align: center;
      img {
        cursor: pointer;
        margin-top: 40px;
      }
      .el-button {
        width: 80px;
        margin-top: 40px;
      }
    }
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
.table-hover {
  tr {
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
.text-c {
  text-align: center;
}
</style>
