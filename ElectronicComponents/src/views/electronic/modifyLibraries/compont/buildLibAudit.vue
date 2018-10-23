<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="sview">
          <embed :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+sdata.dataSheet" type="" style="width:100%;height:100%">
        </div>
      </div>
      <div class="col-md-6">
        <div class="sview" style="overflow:auto">
          <div>
            <div v-show="!auditIO">
              <el-cascader placeholder="请选择分类" :options="categoryTree" :props="{
              value:'id',
              label:'categoryName',
              children:'childrenList',
            }" filterable v-model="cateIds" style="width:100%" @change="setSelectID"></el-cascader>
            </div>
            <div v-show="auditIO" class="clearfix">
              {{this.auditObj.categoryName}}
              <!-- <el-button type="primary" icon="el-icon-edit" class="pull-right" circle @click="edit"></el-button> -->
            </div>
          </div>
          <div style="margin-top:20px" v-show="cateIds.length>0">
            <div class="row">
              <div class="col-md-4">
                <div>
                  <button class="btn btn-primary" type="button" @click="selectSymCds()">
                    <i class="icon icon-bullseye"></i> 原理图符号</button>
                </div>
                <div style="padding-top:10px;width100%;height:300px" >
                  <template v-if="form.symCdsSvg">
                  <object id="sembed" :data="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+form.symCdsSvg" @load="initSvg('sembed')" width="100%" height="100%"></object>
                  </template>
                </div>
              </div>
              <div class="col-md-4">
                <div>
                  <button class="btn btn-success" type="button" @click="selectFootPrint()"><i class="icon icon-print"></i> 封装</button>
                </div>
                <div style="padding-top:10px;width100%;height:300px;background:#333">
                  <template v-if="form.footPrintCdsSvg">
                    
                  <object id="sembed1" :data="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+form.footPrintCdsSvg" @load="initSvg('sembed1')"  width="100%" height="100%"></object>
                  </template>
                </div>
              </div>
              <div class="col-md-4">
                <div>

                <button class="btn btn-danger" type="button"><i class="icon icon-cube-alt"></i> 3D Model</button>
                </div>
                
              </div>
            </div>
            <div style="margin-top:20px">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item :label="propty.publicProperty.manufacturer">
                  <el-input v-model="form.manufacturer"></el-input>
                </el-form-item>
                <el-form-item :label="propty.publicProperty.packageType">
                  <el-input v-model="form.packageType"></el-input>
                </el-form-item>
                <el-form-item :label="propty.publicProperty.partType">
                  <el-input v-model="form.partType"></el-input>
                </el-form-item>
                <el-form-item :label="propty.publicProperty.preRanking">
                  <el-input v-model="form.preRanking"></el-input>
                </el-form-item>
                <el-form-item :label="propty.publicProperty.productModel">
                  <el-input v-model="form.productModel"></el-input>
                </el-form-item>
                <el-form-item :label="propty.publicProperty.value">
                  <el-input v-model="form.value"></el-input>
                </el-form-item>
              </el-form>
              <br>
              <table class="table">
                <tr v-for="(item, index) in propty.specialProperty" :key="index">
                  <td style="width:80px">{{item.name}}</td>
                  <td>
                    <el-input v-model="item.value"></el-input>
                  </td>
                </tr>
              </table>
              <div>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <el-dialog title="选择原理图" :visible.sync="cdsIO" width="80%">
      <div class="row">
        <div class="col-md-4">
          <div class="select-view">
            <el-input v-model="filterOlb" placeholder="搜索" @change="clearIndex(olbIndex)"></el-input>
            <ul class="nav nav-secondary nav-stacked">
              <li v-for="(item,index) in olbLibraryFilterList" :class="olbIndex == index? 'active':''" :key="index" @click="lookNextList(index)">
                <a>{{item.olbName}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="select-view">
            <el-input v-model="filtersvg" placeholder="搜索"  @change="clearIndex(svgIndex)"></el-input>
            <ul class="nav nav-primary nav-stacked">
              <li v-for="(item,index) in svgFilterList" :class="svgIndex == index? 'active':''" :key="index" @click="setSvgIndex(index)">
                <a>{{item.svgName}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cdsIO = false">取 消</el-button>
        <el-button type="primary" @click="onSetSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择封装符号" :visible.sync="footPrintIO" width="80%">
      <div class="row">
        <div class="col-md-4">
          <div class="select-view">
            <ul class="nav nav-secondary nav-stacked">
              <el-input v-model="filterPrintOlb" placeholder="搜索" @change="clearIndex(footIndex)"></el-input>
              <li v-for="(item,index) in footPrintFilterList" :class="footIndex == index? 'active':''" :key="index" @click="lookNextFootList(index)">
                <a>{{item.olbName}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="select-view">
            <ul class="nav nav-primary nav-stacked">
              <el-input v-model="filterPrintSvg" placeholder="搜索" @change="clearIndex(svgTwoIndex)"></el-input>
              <li v-for="(item,index) in svgTwoFilterList" :class="svgTwoIndex == index? 'active':''" :key="index" @click="setTwoSvgIndex(index)">
                <a>{{item.svgName}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="footPrintIO = false">取 消</el-button>
        <el-button type="primary" @click="onSetFootSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  readCategoryTree,
  getLastCateProperty,
  readComponentOlbLibraryList,
  readComponentOlbLibrarySvgList,
  updateReviseApply,
  readReviseApplyMore
} from "@/api/ele";

import SVG from "svg.js"
// import svgPanZoom from "svg.panzoom.js"


export default {
  props: ["sdata","auditObj"],
  data() {
    return {
      cdsIO: false,
      auditIO: false,
      footPrintIO: false,
      form: {
        symCds: "",
        symCdsOlb: "",
        symCdsSvg: "",
        footPrintCds: "",
        footPrintCdsOlb: "",
        footPrintCdsSvg: "",
        manual: "",
        manufacturer: "",
        model3d: "",
        model3dPath: "",
        packageType: "",
        partType: "",
        preRanking: "",
        productModel: "",
        value: ""
      },
      formcus: {
        symCds: "",
        symCdsOlb: "",
        symCdsSvg: "",
        footPrintCds: "",
        footPrintCdsOlb: "",
        footPrintCdsSvg: "",
        manual: "",
        manufacturer: "",
        model3d: "",
        model3dPath: "",
        packageType: "",
        partType: "",
        preRanking: "",
        productModel: "",
        value: ""
      },
      cateIds: [],
      categoryTree: [],
      categoryList:[],
      olbLibraryList: [],
      olbIndex:null,
      svgList:[],
      svgIndex:null,
      footPrintList: [],
      footIndex:null,
      svgTwoList: [],
      svgTwoIndex: null,
      propty: {
        publicProperty: {},
        specialProperty: []
      },
      filterOlb:'',
      filtersvg:'',
      filterPrintOlb:'',
      filterPrintSvg:'',
    };
  },
  computed:{
    olbLibraryFilterList() {
      return this.olbLibraryList.filter(item => {
        // console.log(item)
        let aaa = item.olbName;
        let bbb = this.filterOlb;
        return aaa.includes(bbb);
      });
    },
    footPrintFilterList() {
      return this.footPrintList.filter(item => {
        // console.log(item)
        let aaa = item.olbName;
        let bbb = this.filterPrintOlb;
        return aaa.includes(bbb);
      });
    },
    svgFilterList() {
      return this.svgList.filter(item => {
        // console.log(item)
        let aaa = item.svgName;
        let bbb = this.filtersvg;
        return aaa.includes(bbb);
      });
    },
    svgTwoFilterList() {
      return this.svgTwoList.filter(item => {
        // console.log(item)
        let aaa = item.svgName;
        let bbb = this.filterPrintSvg;
        return aaa.includes(bbb);
      });
    }
  },
  methods: {
    selectSymCds() {
      this.cdsIO = true;
    },
    selectFootPrint(){
      this.footPrintIO = true;
    },
    setSvgIndex(index){
      this.svgIndex = index;
    },
    setTwoSvgIndex(index){
      this.svgTwoIndex = index;
    },
    lookNextList(index){
      this.olbIndex = index;
      readComponentOlbLibrarySvgList({olbId:this.olbLibraryFilterList[index].id}).then(res=>{
        this.svgList = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    lookNextFootList(index){
      this.footIndex = index;
      readComponentOlbLibrarySvgList({olbId:this.footPrintFilterList[index].id}).then(res=>{
        this.svgTwoList = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    setSelectID() {
      let categoryId;
      if (this.cateIds.length > 0) {
        categoryId = this.cateIds[this.cateIds.length - 1];
      }
      getLastCateProperty({ categoryId })
        .then(res => {
          this.propty = res.data;
          this.form.manual = this.sdata.dataSheet;

          this.propty.specialProperty.forEach((v, i) => {
            v.value = "";
          });
        })
        .catch(err => {});
    },
    onSetSubmit() {
      let olb = this.olbLibraryFilterList[this.olbIndex]
      let svg = this.svgFilterList[this.svgIndex]
      if(!olb || !svg){
        return false;
      }
      this.form.symCds = olb.olbName
      this.form.symCdsOlb = olb.olbPath
      this.form.symCdsSvg = svg.svgPath
      this.cdsIO = false;
    },
    initSvg(sid){
      let sembed = $('#'+sid)
      console.log(sembed)
      let obj = svgPanZoom('#'+sid, {
          zoomEnabled: true,
          // zoomFactor:100,
          // events: {
          //     mouseWheel: true, // enables mouse wheel zooming events
          //     doubleClick: true, // enables double-click to zoom-in events
          //     drag: true, // enables drag and drop to move the SVG events
          //     dragCursor:  "move" // cursor to use while dragging the SVG
          // },

        });
      obj.setZoomScaleSensitivity(0.5)
    },
    clearIndex(xb){
      this[xb]=0;
    },
    sDrawSvg(){
      console.log(SVG)
      console.log(svgPanZoom)
        /**
         * console.log(res)
        $('#drawing').html(res)
        // draw.svg(``)
        console.log($('#drawing').children()[0].id)
        let Svgjs = $('#drawing').children()[0].id
        svgPanZoom('#'+Svgjs, {
            zoomEnabled: true,
            controlIconsEnabled: false
        });
         */
      var draw = SVG('drawing')
      // var rect = draw.rect(100, 100).attr({ fill: '#f06' })
//       $('#drawing').html()
//       // draw.svg(``)
//  console.log($('#drawing').children()[0].id)
//  let Svgjs = $('#drawing').children()[0].id
//       svgPanZoom('#'+Svgjs, {
//           zoomEnabled: true,
//           controlIconsEnabled: false
//       });

      
    },
    onSetFootSubmit() {
      let olb = this.footPrintFilterList[this.footIndex]
      let svg = this.svgTwoFilterList[this.svgTwoIndex]
      if( !olb || !svg){
        
        return false;
      }
      this.form.footPrintCds = olb.olbName
      this.form.footPrintCdsOlb = olb.olbPath
      this.form.footPrintCdsSvg = svg.svgPath
      this.footPrintIO = false;
    },
    onSubmit(){
      let obj = new Object();
      obj.reviseApplyId = this.sdata.id;
      obj.categoryId = this.cateIds[this.cateIds.length - 1];
      obj.componentRevisePublicData = this.form;
      let arr = [];
      this.propty.specialProperty.forEach((v,i)=>{
        arr.push({specialPropertyId:v.propertyId?v.propertyId:v.specialPropertyId,value:v.value})
      })
      obj.componentReviseSpecialDataList = arr;
      updateReviseApply(obj).then(res=>{
        console.log(res)
        this.$message.success('操作成功')
      }).catch(err=>{
        console.log(err)
      })
    },
    edit(){
      this.cateIds = [];
      this.auditIO = false;
      this.form = Object.assign({},this.formcus)
    },
    initData() {
      let sh = $(window).height();
      $(".sview").height(sh - 140 + "px");
      this.auditObj.public;
      if(this.auditObj.categoryId){
        this.cateIds.push(this.auditObj.categoryId);
      }
      for(var i in this.auditObj.public){
        this.propty.publicProperty[i] = this.auditObj.public[i].name;
        this.form[i] = this.auditObj.public[i].value;
      }
      this.propty.specialProperty = this.auditObj.special;
      console.log(this.propty.specialProperty)
    },
    getSelectOption() {
      readCategoryTree({})
        .then(res => {
          //对数组进行一些操作o
          function removeTreeChildren(arr) {
            arr.forEach((v, i) => {
              if (v.childrenList && v.childrenList.length > 0) {
                removeTreeChildren(v.childrenList);
              } else {
                delete v.childrenList;
              }
            });
            return arr;
          }
          
          function treeToArr(obj,menuArr){
            obj.forEach((val,key)=>{
              menuArr.push(val)
              if(val.childrenList&&val.childrenList.length>0){
                treeToArr(val.childrenList,menuArr)
              }
            });
            return menuArr
          }
          let sarr = removeTreeChildren(res.data);
          let aarr =treeToArr(res.data,[]);
          this.categoryList = aarr;
          this.categoryTree = sarr;
          //初始化加载的数据
          this.initData();
        })
        .catch(err => {
          console.log(err);
        });
      readComponentOlbLibraryList({ type: "1" })
        .then(res => {
          this.olbLibraryList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      readComponentOlbLibraryList({ type: "2" })
        .then(res => {
          this.footPrintList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.auditObj.type == "true")
    if(this.auditObj && this.auditObj.type == "true"){
      this.auditIO = true;
    }
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
.sview {
}
.select-view{
  height:65vh;
  overflow: auto;
}
</style>

