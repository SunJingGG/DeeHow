<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <div class="head-menu" style="height:32px">
          <div>status</div>
          <div></div>
          <div>Quantity</div>
          <div>{{lookData.columnName1}}</div>
          <div>{{lookData.columnName2}}</div>
        </div>
        <ul class="tree-ul">
          <li v-for="(item,index) in lookData.treeData.childrenList" :key="index">
            <div @click="open(item,index)" class="head-menu">
              <div>
                <template v-if="item.childrenList&&item.childrenList.length>0">
                  <i v-show="!item.open" class="el-icon-caret-right"></i>
                  <i v-show="item.open" class="el-icon-caret-bottom"></i>
                </template>
                <img src="../../../assets/bom/dierji.png" style="height:20px;vertical-align:middle;" alt="">
                <span>{{item.name}}</span>
              </div>
              <div></div>
              <div></div>
              <div>{{item.bomContent1}}</div>
              <div>{{item.bomContent2}}</div>
            </div>
            <transition name="el-zoom-in-top">
              <ul class="tree-ul" v-show="item.open">
                <li v-for="(a,b) in item.childrenList" :key="b">
                  <div @click="open(a,b)" class="head-menu">
                    <div style="padding-left:40px">
                      <template v-if="a.childrenList&&a.childrenList.length>0">
                        <i v-show="!a.open" class="el-icon-caret-right"></i>
                        <i v-show="a.open" class="el-icon-caret-bottom"></i>
                      </template>
                      <img src="../../../assets/bom/fkb.png" style="height:20px;vertical-align:middle;" alt="">
                      <span>{{a.showStatus}}</span>
                    </div>
                    <div>
                      <img v-if="a.ifSame == 1" src="../../../assets/bom/xz.png" alt="" style="width: 15px;" srcset="">
                      <img v-if="a.ifSame == 2" src="../../../assets/bom/sc.png" alt="" style="width: 15px;" srcset="">
                      <img v-if="a.ifSame == 3" src="../../../assets/bom/xt.png" alt="" style="width: 15px;" srcset="">
                      <img v-if="a.ifSame == 4" src="../../../assets/bom/bt.png" alt="" style="width: 15px;" srcset="">
                      </div>
                      <div>
                        {{a.quantity?a.quantity:''}}
                      </div>
                      <div>
                        {{a.bomContent1}}
                      </div>
                      <div>
                        {{a.bomContent2}}
                      </div>
                    </div>
                    <transition name="el-zoom-in-top">
                      <ul class="tree-ul" v-show="a.open">
                        <li v-for="(c,d) in a.childrenList" :key="d">
                          <div @click="open(c,d)" class="head-menu">
                            <div style="padding-left:60px">
                              <template v-if="c.childrenList&&c.childrenList.length>0">
                                <i v-show="!c.open" class="el-icon-caret-right"></i>
                                <i v-show="c.open" class="el-icon-caret-bottom"></i>
                              </template>
                              <img src="../../../assets/bom/fkm.png" style="height:20px;vertical-align:middle;" alt="">
                              <span>{{c.showStatus}}</span>
                            </div>
                            <div>
                              <img v-if="c.ifSame == 1" src="../../../assets/bom/xz.png" alt="" style="width: 15px;" srcset="">
                              <img v-if="c.ifSame == 2" src="../../../assets/bom/sc.png" alt="" style="width: 15px;" srcset="">
                              <img v-if="c.ifSame == 3" src="../../../assets/bom/xt.png" alt="" style="width: 15px;" srcset="">
                              <img v-if="c.ifSame == 4" src="../../../assets/bom/bt.png" alt="" style="width: 15px;" srcset="">
                            </div>
                              <div></div>
                              <div>
                                {{c.bomContent1}}
                              </div>
                              <div>
                                {{c.bomContent2}}
                              </div>
                            </div>
                            <transition name="el-zoom-in-top">
                              <ul class="tree-ul" v-show="c.open">
                                <li v-for="(e,f) in c.childrenList" :key="f">
                                  <div @click="open(e,f)" class="head-menu">
                                    <div style="padding-left:100px">
                                      <img src="../../../assets/bom/fks.png" style="height:20px;vertical-align:middle;" alt=""> <span>{{e.showStatus}} </span>
                                    </div>
                                    <div>
                                      <img v-if="e.ifSame == 1" src="../../../assets/bom/xz.png" alt="" style="width: 15px;" srcset="">
                                      <img v-if="e.ifSame == 2" src="../../../assets/bom/sc.png" alt="" style="width: 15px;" srcset="">
                                      <img v-if="e.ifSame == 3" src="../../../assets/bom/xt.png" alt="" style="width: 15px;" srcset="">
                                      <img v-if="e.ifSame == 4" src="../../../assets/bom/bt.png" alt="" style="width: 15px;" srcset="">
                                  </div>
                                      <div></div>
                                      <div>
                                        {{e.bomContent1}}
                                      </div>
                                      <div>
                                        {{e.bomContent2}}
                                      </div>
                                    </div>
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
      <div class="col-md-4">
        <div>
          <el-button @click="exportDBjieGuo">导出对比结果</el-button>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="元器件" name="1">
            <el-checkbox v-model="compareField" v-for="(item,index) in compareTheFieldList" @change="look(1)" :key="index" :label="index">{{item.name}}</el-checkbox>
          </el-collapse-item>
          <el-collapse-item title="制造商" name="2">
            <el-checkbox v-model="compareField2" v-for="(item,index) in compareTheFieldList2" @change="look(2)" :key="index" :label="index">{{item.name}}</el-checkbox>
          </el-collapse-item>
          <el-collapse-item title="供应商" name="3">
            <el-checkbox v-model="compareField3" v-for="(item,index) in compareTheFieldList3" @change="look(3)" :key="index" :label="index">{{item.name}}</el-checkbox>
          </el-collapse-item>
        </el-collapse>
        <div>
          <el-button @click="refreshResult">刷新</el-button>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>项目</th>
                <th>库值</th>
                <th>新值</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in focusData.compareResultsList" :key="index" :style="{'color':(item.ifLike?'#000':'red')}">
                <td>{{item.name}}</td>
                <td>{{item.oldData}}</td>
                <td>{{item.newData}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <el-dialog title="对比结果" :visible.sync="dialogFormVisible" width="80%">
      <div>
        <div>
          <el-button type="primary" @click="exportComparResult">导 出</el-button>
        </div>
        <el-table :data="compareTheResultsList" style="width: 100%">
          <el-table-column prop="key1" label="名称" width="180"></el-table-column>
          <el-table-column prop="key2" label="数量" width="180"></el-table-column>
          <el-table-column prop="key3" label="导入值"></el-table-column>
          <el-table-column prop="key4" label="比较值"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportComparResult">导 出</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { readProductCompareResult, exportExcleComparResult } from "@/api/bom";
let compareTheField1 = [
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
];
let compareTheField2 = [
  {
    name: "制造商名称",
    field: "manufacturerName"
  },
  {
    name: "制造商编码",
    field: "manufacturerPartNumber"
  }
];
let compareTheField3 = [
  {
    name: "供应商名称",
    field: "dealerName"
  },
  {
    name: "供应商编码",
    field: "dealerPartNumber"
  },
  {
    name: "备货周期",
    field: "stockCycle"
  }
];
export default {
  data() {
    return {
      activeNames: ['1','2','3'],
      dialogFormVisible: false,
      lookData: {
        columnName1: "发光二极管 4",
        columnName2: "Virtual Product Version",
        state: "2",
        treeData: {
          result: "",
          quantity: "",
          bomList2: null,
          bomList1: null,
          name: "发光二极管 4#Virtual Product Version",
          bomContent2: "",
          bomContent1: "",
          type: 1,
          childrenList: [
            {
              result: "",
              quantity: "",
              bomList2: {
                classId: null,
                componentName: "娴嬭瘯 2.0 [Sample]",
                createBy: null,
                createTime: null,
                description: "",
                enable: null,
                id: null,
                item: "Ceramic Capacitor",
                keyword: "",
                manufacturerList: null,
                num: "1",
                packageType: "X5R",
                partNumber: "X5R-2.2u-6.3V-10%-0402",
                partType: "",
                preRanking: "",
                price: null,
                productModel: "",
                ratedValue: "6.3V",
                remark: "",
                replacePart: "",
                stock: null,
                tolerance: "",
                updateBy: null,
                updateTime: null,
                value: "2.2uF",
                versionId: null
              },
              bomList1: {
                classId: null,
                componentName: "X5R-2.2u-6.3V-10%-0402",
                createBy: null,
                createTime: null,
                description: "",
                enable: null,
                id: null,
                item: "",
                keyword: "",
                manufacturerList: null,
                num: "1",
                packageType: "",
                partNumber: "X5R-2.2u-6.3V-10%-0402",
                partType: "",
                preRanking: "",
                price: "0.00",
                productModel: "",
                ratedValue: "6.3V",
                remark: "",
                replacePart: "",
                stock: "0.0",
                tolerance: "10%",
                updateBy: null,
                updateTime: null,
                value: "2.2uF",
                versionId: null
              },
              name: "",
              bomContent2: "X5R-2.2u-6.3V-10%-0402 ",
              bomContent1: "X5R-2.2u-6.3V-10%-0402 ",
              type: 2,
              childrenList: [
                {
                  result: "",
                  quantity: "",
                  bomList2: {
                    componentId: null,
                    createBy: null,
                    createTime: null,
                    dealerList: null,
                    enable: null,
                    id: null,
                    keyword: "",
                    manufacturerName: "Murata",
                    manufacturerPartNumber: "GRM155R60J225ME15D",
                    remark: "",
                    updateBy: null,
                    updateTime: null,
                    versionId: null
                  },
                  bomList1: null,
                  name: "",
                  bomContent2: "Murata GRM155R60J225ME15D",
                  bomContent1: null,
                  type: 3,
                  childrenList: [
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Avnet",
                        dealerPartNumber: "GRM155R60J225ME15D/BKN",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Avnet GRM155R60J225ME15D/BKN",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Avnet",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Avnet GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Avnet",
                        dealerPartNumber: "GRM155R60J225ME15D/BKN",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Avnet GRM155R60J225ME15D/BKN",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Avnet",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Avnet GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Avnet",
                        dealerPartNumber: "GRM155R60J225ME15D/BKN",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Avnet GRM155R60J225ME15D/BKN",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Avnet",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Avnet GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "490-4519-2-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 490-4519-2-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "490-4519-1-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 490-4519-1-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "490-4519-6-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 490-4519-6-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "490-4519-2-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 490-4519-2-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "490-4519-1-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 490-4519-1-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "490-4519-6-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 490-4519-6-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Mouser",
                        dealerPartNumber: "81-GRM155R60J225ME5D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Mouser 81-GRM155R60J225ME5D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Mouser",
                        dealerPartNumber: "81-GRM155R60J225ME5D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Mouser 81-GRM155R60J225ME5D",
                      bomContent1: null,
                      type: 4
                    }
                  ]
                },
                {
                  result: "",
                  quantity: "",
                  bomList2: {
                    componentId: null,
                    createBy: null,
                    createTime: null,
                    dealerList: null,
                    enable: null,
                    id: null,
                    keyword: "",
                    manufacturerName: "TDK",
                    manufacturerPartNumber: "C1005X5R0J225K",
                    remark: "",
                    updateBy: null,
                    updateTime: null,
                    versionId: null
                  },
                  bomList1: null,
                  name: "",
                  bomContent2: "TDK C1005X5R0J225K",
                  bomContent1: null,
                  type: 3,
                  childrenList: [
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "C1005X5R0J225K",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow C1005X5R0J225K",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "C1005X5R0J225K",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow C1005X5R0J225K",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "445-6847-6-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 445-6847-6-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "445-6847-2-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 445-6847-2-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "445-6847-1-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 445-6847-1-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "445-6847-6-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 445-6847-6-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "445-6847-2-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 445-6847-2-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "445-6847-1-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 445-6847-1-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Mouser",
                        dealerPartNumber: "810-C1005X5R0J225K",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Mouser 810-C1005X5R0J225K",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Mouser",
                        dealerPartNumber: "810-C1005X5R0J225K",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Mouser 810-C1005X5R0J225K",
                      bomContent1: null,
                      type: 4
                    }
                  ]
                },
                {
                  result: "",
                  quantity: "",
                  bomList2: {
                    componentId: null,
                    createBy: null,
                    createTime: null,
                    dealerList: null,
                    enable: null,
                    id: null,
                    keyword: "",
                    manufacturerName: "Taiyo Yuden",
                    manufacturerPartNumber: "JMK105BJ225MV-F",
                    remark: "",
                    updateBy: null,
                    updateTime: null,
                    versionId: null
                  },
                  bomList1: null,
                  name: "",
                  bomContent2: "Taiyo Yuden JMK105BJ225MV-F",
                  bomContent1: null,
                  type: 3,
                  childrenList: [
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Arrow",
                        dealerPartNumber: "GRM155R60J225ME15D",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Arrow GRM155R60J225ME15D",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "587-1453-2-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 587-1453-2-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "587-1453-1-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 587-1453-1-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "587-1453-6-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 587-1453-6-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "587-1453-2-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 587-1453-2-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "587-1453-1-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 587-1453-1-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Digikey",
                        dealerPartNumber: "587-1453-6-ND",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Digikey 587-1453-6-ND",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Element14",
                        dealerPartNumber: "1650926",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Element14 1650926",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Element14",
                        dealerPartNumber: "1650926",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Element14 1650926",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Mouser",
                        dealerPartNumber: "963-JMK105BJ225MV-F",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Mouser 963-JMK105BJ225MV-F",
                      bomContent1: null,
                      type: 4
                    },
                    {
                      result: "",
                      quantity: "",
                      bomList2: {
                        createBy: null,
                        createTime: null,
                        dealerName: "Mouser",
                        dealerPartNumber: "963-JMK105BJ225MV-F",
                        enable: null,
                        id: null,
                        keyword: "",
                        manufacturerId: null,
                        remark: "",
                        stockCycle: "",
                        updateBy: null,
                        updateTime: null,
                        versionId: null
                      },
                      bomList1: null,
                      name: "",
                      bomContent2: "Mouser 963-JMK105BJ225MV-F",
                      bomContent1: null,
                      type: 4
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      compareTheFieldList: [
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
      compareTheFieldList2: [
        {
          name: "制造商名称",
          field: "manufacturerName"
        },
        {
          name: "制造商编码",
          field: "manufacturerPartNumber"
        }
      ],
      compareTheFieldList3: [
        {
          name: "供应商名称",
          field: "dealerName"
        },
        {
          name: "供应商编码",
          field: "dealerPartNumber"
        },
        {
          name: "备货周期",
          field: "stockCycle"
        }
      ],
      compareTheField1: compareTheField1,
      compareTheField2: compareTheField2,
      compareTheField3: compareTheField3,
      compareField: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      compareField2: [0, 1],
      compareField3: [0, 1, 2],
      compareResultsList: [],
      compareResultsList2: [],
      compareResultsList3: [],
      focusData: {},
      compareTheResultsList: []
    };
  },
  methods: {
    chakan() {
      console.log(JSON.stringify(this.lookData.treeData));
    },
    exportDBjieGuo() {
      readProductCompareResult({ treeList: this.lookData.treeData })
        .then(res => {
          console.log(res);
          this.compareTheResultsList = res.data;
          this.dialogFormVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    downLoadFile(filePath) {
      window.location.href =
        this.DEEHOWBASEURL +
        "/deehow-CMS-Web/public/file/download?filePath=" +
        filePath;
    },
    exportComparResult() {
      let arr = this.compareTheResultsList.concat([]);
      arr.unshift({
        key1: "名称",
        key2: "数量",
        key3: "导入值",
        key4: "比较值"
      });

      let obj = {
        type: "1",
        key: "key1,key2,key3,key4",
        compareResult: arr
      };
      exportExcleComparResult(obj)
        .then(res => {
          console.log(res);
          this.downLoadFile(res.data.filePath + res.data.fileName);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTreeIO(arr, bl) {
      arr.forEach((v, i) => {
        if (v.childrenList && v.childrenList.length > 0) {
          v.open = bl;
          this.addTreeIO(v.childrenList, bl);
        } else {
          v.open = bl;
        }
      });
      return arr;
    },
    open(item) {
      console.log(item);
      this.focusData = item;
      item.open = !item.open;
      this.$forceUpdate();
    },
    look(index) {
      let arr = [];
      if (index == 1) {
        this.compareField.forEach(v => {
          arr.push(this.compareTheFieldList[v]);
        });
        this.compareTheField = arr;
      } else if (index == 2) {
        this.compareField2.forEach(v => {
          arr.push(this.compareTheFieldList2[v]);
        });
        this.compareTheField2 = arr;
      } else if (index == 3) {
        this.compareField3.forEach(v => {
          arr.push(this.compareTheFieldList3[v]);
        });
        this.compareTheField3 = arr;
      }
    },
    refreshResult() {
      // this.lookData = {};
      // this.lookData = this.$route.params.data;
      this.initData();
      this.$forceUpdate();
    },
    initData() {
      let treeArr = this.lookData.treeData.childrenList;
      treeArr.forEach(value => {
        value.childrenList.forEach(oneValue => {
          this.bijiaoNum1(oneValue);
          
          oneValue.childrenList.forEach(towValue => {
            this.bijiaoNum2(towValue);
            if(towValue.childrenList&&towValue.childrenList.length>0){

              towValue.childrenList.forEach(threeValue => {
                this.bijiaoNum3(threeValue);
              });
            }
          });
        });
      });
      console.log(treeArr);
    },
    bijiaoNum1(item) {
      if (item.bomList1) {
        if (item.bomList2) {
          let flag = 3;
          let arr = [];
          this.compareTheField1.forEach((v, i) => {
            let obj = {
              name: v.name,
              field: v.field,
              oldData: item.bomList1[v.field] ? item.bomList1[v.field] : "",
              newData: item.bomList2[v.field] ? item.bomList2[v.field] : ""
            };
            if (obj.oldData != obj.newData) {
              flag = 4;
              obj.ifLike = false;
            } else {
              obj.ifLike = true;
            }
            arr.push(obj);
          });
          item.compareResultsList = arr;
          item.ifSame = flag;
          if (flag == 3) {
            item.showStatus = "相同";
          } else {
            item.showStatus = "不同";
          }
        } else {
          item.ifSame = "2";
          item.showStatus = "删除";
        }
      } else {
        if (!item.bomList2) {
          item.ifSame = "0";
          item.showStatus = "无";
        } else {
          item.ifSame = "1";
          item.showStatus = "新增";
        }
      }
    },
    bijiaoNum2(item) {
      if (item.bomList1) {
        if (item.bomList2) {
          let flag = 3;
          let arr = [];
          this.compareTheField2.forEach((v, i) => {
            let obj = {
              name: v.name,
              field: v.field,
              oldData: item.bomList1[v.field] ? item.bomList1[v.field] : "",
              newData: item.bomList2[v.field] ? item.bomList2[v.field] : ""
            };
            if (obj.oldData != obj.newData) {
              flag = 4;
              obj.ifLike = false;
            } else {
              obj.ifLike = true;
            }
            arr.push(obj);
          });
          item.compareResultsList = arr;
          item.ifSame = flag;
          if (flag == 3) {
            item.showStatus = "相同";
          } else {
            item.showStatus = "不同";
          }
        } else {
          item.ifSame = "2";
          item.showStatus = "删除";
        }
      } else {
        item.ifSame = "1";
        item.showStatus = "新增";
      }
    },
    bijiaoNum3(item) {
      if (item.bomList1) {
        if (item.bomList2) {
          let flag = 3;
          let arr = [];
          this.compareTheField3.forEach((v, i) => {
            let obj = {
              name: v.name,
              field: v.field,
              oldData: item.bomList1[v.field] ? item.bomList1[v.field] : "",
              newData: item.bomList2[v.field] ? item.bomList2[v.field] : ""
            };
            if (obj.oldData != obj.newData) {
              flag = 4;
              obj.ifLike = false;
            } else {
              obj.ifLike = true;
            }
            arr.push(obj);
          });
          item.compareResultsList = arr;
          item.ifSame = flag;
          if (flag == 3) {
            item.showStatus = "相同";
          } else {
            item.showStatus = "不同";
          }
        } else {
          item.ifSame = "2";
          item.showStatus = "删除";
        }
      } else {
        item.ifSame = "1";
        item.showStatus = "新增";
      }
    }
  },
  mounted() {
    if (!this.$route.params.data) {
      this.$router.replace({ path: "/BOM/bomManage/bomImport" });
      return false;
    }
    this.lookData = this.$route.params.data;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
.head-menu {
  cursor: pointer;
  &:hover {
    background-color: #ebf2f9;
  }
  > div {
    display: inline-block;
    overflow: hidden;
    &:nth-child(1) {
      padding-left: 20px;
      width: 35%;
    }
    &:nth-child(2) {
      width: 5%;
    }
    &:nth-child(3) {
      width: 5%;
    }
    &:nth-child(4) {
      width: 20%;
    }
    &:nth-child(5) {
      width: 25%;
    }
  }
}
// .tree-ul {

// }
</style>
