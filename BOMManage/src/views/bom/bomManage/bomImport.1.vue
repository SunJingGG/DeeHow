<template>
  <div class="mainbox">
    <div>
      <p class="titlt">
        <b>BOM导入</b>
      </p>
      <div style="text-align:center">
        <img src="../../../assets/bom/excel.jpg" alt="" srcset="" class="hvr-shadow pointer" style="width:100px" @click="download">
        <p>
          <el-button type="text" @click="download">点击下载模板</el-button>
        </p>
      </div>
    </div>
    <div class="mainone row">
      <p class="titlt">
        <b>BOM导入</b>
      </p>
      <div class="col-md-2">
        <span>1.</span>
        <img src="../../../assets/product/file.png" alt="">
        <el-upload class="upload-demo" :action="DEEHOWBASEURL+'/deehow-CMS-Web/public/excel2007/analysis/first_row'" :on-success='lookFirstData' :file-list="fileList">
          <el-button size="small" type="text">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        </el-upload>
      </div>
      <div class="col-md-2">
        <span>2.</span>
        <img src="../../../assets/product/pro1.png" alt=""> 基本器件
        <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
          <!-- <el-form-item label="">
            <el-radio-group v-model="form.resource">
              <el-radio label="process"></el-radio>
              <el-radio label="ignore"></el-radio>
            </el-radio-group>
          </el-form-item> -->
          <!-- <el-form-item style="padding:0;" label="part Number：">
            <el-select v-model="form.partNumberCi" placeholder="请选择">
              <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="class：">
            <el-select v-model="form.classCi" placeholder="请选择">
              <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox label="" name="type">创建新的基础组件</el-checkbox>
          </el-form-item> -->
        </el-form>
      </div>
      <div class="col-md-2">
        <span>3.</span>
        <img src="../../../assets/product/pro2.png" alt=""> 制造商器件
        <!-- <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
          <el-form-item style="padding:0;" label="Manufacturer Name：">
            <el-select v-model="form.manufacturerNameCi" placeholder="请选择">
              <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Part Number：">
            <el-select v-model="form.manufacturerPartNumberCi" placeholder="请选择">
              <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox label="美食/餐厅线上活动" name="type">创建新的制造商</el-checkbox>
          </el-form-item>
        </el-form> -->
      </div>
      <div class="col-md-2">
        <span>4.</span>
        <img src="../../../assets/product/pro3.png" alt=""> 供应商器件
        <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
          <!-- <el-form-item label="">
            <el-radio-group v-model="form.resource">
              <el-radio label="process"></el-radio>
              <el-radio label="ignore"></el-radio>
            </el-radio-group>
          </el-form-item> -->
          <!-- <el-form-item style="padding:0;" label="Supplier Name：">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Part Number：">
            <el-select v-model="form.region" placeholder="请选择分类">
              <el-option v-for="(item,index) in selectList" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
          </el-form-item> -->
        </el-form>
      </div>
      <div class="col-md-2">
        <span>5.</span>
        <img src="../../../assets/product/file.png" alt=""> 预览
        <div style="margin:40px 0 0 10px;cursor:pointer" @click="BomBiJiao">
          <img src="../../../assets/product/file.png" alt=""> Bom比较
        </div>
      </div>
      <div class="col-md-2">
        <span>6.</span>
        <img src="../../../assets/product/file.png" alt=""> 确认导入
        <div style="margin:40px 0 0 10px;">
          <img src="../../../assets/product/file.png" alt="" @click="ProductBiJiao"> 器件比较
        </div>
      </div>
    </div>
    <div class="maintwo">
      <p class="titlt">
        <b>属性配置</b>
      </p>
      <div class="row transfer">
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
          <div class="groupBtns">
            <el-button plain @click="shouDongPP">》》</el-button>
            <br>
            <el-button plain @click="shouDongJCPP">《《</el-button>
            <br>
            <el-button plain @click="ziDongPP">自动匹配</el-button>
            <br>
            <el-button plain @click="startJieXi">开始解析</el-button>
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
        <div class="group">
          <div>
            <ul class="tree-ul">
              <li v-for="(item,index) in treeList" :key="index">
                <!-- <p @click="open(item,index)">
                  <img src="../../../assets/product/pro1.png" style="height:20px;vertical-align:middle;" alt="">{{item.className}}
                 </p> -->
                 <div @click="open(item,index)" class="head-menu">
                  <div>
                    <img src="../../../assets/product/pro1.png" style="height:20px;vertical-align:middle;" alt=""> {{item.className}}
                  </div>
                </div>
                <transition name="el-zoom-in-top">
                  <ul v-if="item.children&&item.children.length>0" v-show="item.open" class="tree-ul">
                    <li v-for="(a,b) in item.children" :key="b">
                      <!-- <p @click="getOldData(a)"><img src="../../../assets/product/pro2.png" style="height:20px;vertical-align:middle;" alt="">{{a.partNumber}}</p> -->
                      <div @click="open(a)" class="head-menu">
                        <div>
                          <img src="../../../assets/product/pro2.png" style="height:20px;vertical-align:middle;" alt=""> {{a.item}}
                        </div>
                        <div>
                          {{a.num}}
                        </div>
                      </div>
                      <transition name="el-zoom-in-top">
                        <ul v-if="a.children&&a.children.length>0" v-show="a.open" class="tree-ul">
                          <li v-for="(c,d) in a.children" :key="d">
                            <!-- <p @click="open(c)"><img src="../../../assets/product/pro3.png" style="height:20px;vertical-align:middle;" alt="">{{c.manufacturerName}}</p>
                             -->
                             <div @click="getOldData(c)" class="head-menu">
                              <div>
                                <img src="../../../assets/product/pro3.png" style="height:20px;vertical-align:middle;" alt=""> {{c.partNumber}}
                              </div>
                              <div>
                                {{a.num}}
                              </div>
                            </div>
                            <transition name="el-zoom-in-top">
                              <div style="padding-left:20px">
                                <table class="table table-hover" v-if="c.children&&c.children.length>0" v-show="c.open">
                                  <tr v-for="(e,f) in c.children" :key="f">
                                    <td style="width:20%">
                                      <i class="el-icon-success" style="color:green;"></i>
                                    </td>
                                    <td style="width:20%">{{e.dealerName}}</td>
                                    <td style="width:20%">{{e.dealerPartNumber}}</td>
                                    <td style="width:20%">{{e.stockCycle}}</td>
                                    <td style="width:20%">{{e.title}}</td>
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
          <el-button type="primary" @click="dialogForm1Visible = true">确认导入</el-button>
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
    <el-dialog title="请选择产品版本" :visible.sync="dialogForm1Visible">
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="(item,index) in productTree" :key="index" :title="item.label" :name="index">
            <el-radio v-for="(v,i) in item.children" :key="i" v-model="banBeng1" :label="v.data.id">{{v.label}}</el-radio>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
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
      selectTempList: [
        {
          name: "Class",
          value: "classCi"
        },
        {
          name: "Part Number",
          value: "partNumberCi"
        },
        {
          name: "Designators",
          value: "itemCi"
        },
        {
          name: "Quantity",
          value: "numCi"
        },
        {
          name: "物料名称",
          value: "componentNameCi"
        },
        {
          name: "规格型号",
          value: "productModelCi"
        },
        {
          name: "封装形式",
          value: "packageTypeCi"
        },
        {
          name: "质量等级",
          value: "preRankingCi"
        },
        {
          name: "物料描述",
          value: "descriptionCi"
        },
        {
          name: "可替代料",
          value: "replacePartCi"
        },
        {
          name: "值",
          value: "valueCi"
        },
        {
          name: "额定值",
          value: "ratedValueCi"
        },
        {
          name: "公差",
          value: "toleranceCi"
        },
        {
          name: "价格",
          value: "priceCi"
        },
        {
          name: "库存",
          value: "stockCi"
        },
        {
          name: "Manufacturer Name",
          value: "manufacturerNameCi"
        },
        {
          name: "Manufacturer Part Number",
          value: "manufacturerPartNumberCi"
        },
        {
          name: "Supplier Name",
          value: "dealerNameCi"
        },
        {
          name: "Supplier Part Number",
          value: "dealerPartNumberCi"
        },
        {
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
      dialogForm1Visible: false,
      activeNames: [],
      form: {
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
          name: "Designators",
          field: "item"
        },
        {
          name: "Quantity",
          field: "num"
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
        // {
        //   name:'库存',
        //   field:'title',
        // },
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
      this.dataFile = file.raw;
    },
    startJieXi() {
      let param = new FormData();
      let file = "";
      this.guanXiList.forEach((v, i) => {
        console.log(v.jian);
        console.log(v.zhi);
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
            // this.treeList = res.data.treeList;
            let arr = res.data.treeList;
            
            arr.forEach((val,index)=>{
              // let arr1 = [];
              val.children.forEach((v,i)=>{
                let arr1 = [];
                arr1.push($.extend(true,{},v))
                v.children = arr1;
              })
            })
            this.treeList = arr;
            console.log(arr)
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
      obj.jian = selectTempList[this.yuanIndex].value;
      obj.zhi = this.muBiaoIndex;
      this.guanXiList.push(obj);
      this.yuanIndex = null;
      this.muBiaoIndex = null;
    },
    shouDongJCPP() {
      this.guanXiList.splice(this.guanXiIndex, 1);
      this.guanXiIndex = null;
    },
    ziDongPP() {
      this.guanXiList = [];
      let selectList = this.selectList;
      this.selectTempList.forEach((v, ind) => {
        // this.selectList.forEach((val,index))
        for (var i = 0; i < selectList.length; i++) {
          if (v.name == selectList[i]) {
            let obj = new Object();
            obj.show = v.name + "《--》" + selectList[i];
            obj.jian = v.value;
            obj.zhi = i;
            this.guanXiList.push(obj);
            return false;
          }
        }
      });
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
    getOldData(item) {
      readProductListByName({ partNumber: item.partNumber })
        .then(res => {
          console.log(res);
          console.log(item);
          this.yetLibraryData = res.data ? res.data[0] : {};
          this.newExeclData = item;
          let arr = [];
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
        treeList: this.treeList
      };
      console.log(JSON.stringify(param));
      updateBomVersionManage(param)
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            this.$message.suucess("导入成功");
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
      AndProductCompare({ treeList: this.treeList })
        .then(res => {
          console.log(res);
          this.$router.push({ name: "比较预览", params: { data: res.data } });
        })
        .catch(err => {});
    },
    confirmVersion() {
      let param = {
        treeList: this.treeList,
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
    }
  },
  mounted() {
    this.getSelectOption();
    this.treeList = this.addTreeIO(this.treeList, true);
    this.$forceUpdate();
    console.log(this.treeList);
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
  .mainone {
    > div {
      float: left;
      padding-top: 15px;
      .el-form {
        margin: 10px 0 20px 0;
      }
      span {
        float: left;
      }
      img {
        float: left;
        margin-top: -10px;
      }
    }
  }
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
      .el-button {
        width: 80px;
        margin-top: 40px;
      }
    }
  }
  .mainthird {
    margin-top: 20px;
  }
  .tree-ul {
    padding-left: 20px;
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
}
.head-menu {
  cursor: pointer;
  &:hover {
    background-color: #ebf2f9;
  }
  > div {
    display: inline-block;
    overflow:  hidden;
    &:nth-child(1) {
      width: 35%;
    }
    &:nth-child(2) {
      width: 5%;
    }
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(4) {
      width: 20%;
    }
    &:nth-child(5) {
      width: 25%;
    }
  }
}
</style>
