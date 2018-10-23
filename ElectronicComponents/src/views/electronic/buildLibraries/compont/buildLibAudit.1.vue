<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="sview">
          <!-- <object :data="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+sdata.dataSheet" type="application/pdf" width="100%" height="100%">

            <iframe :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+sdata.dataSheet" width="100%" height="100%" style="border: none;">

              点击预览
              <a :href="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+sdata.dataSheet">Download PDF</a>

            </iframe>

          </object> -->
          <embed :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+sdata.dataSheet" type="" style="width:100%;height:100%">
        </div>
      </div>
      <div class="col-md-6">
        <div class="sview" style="overflow:auto">
          <div>
            <el-cascader placeholder="请选择分类" :options="categoryTree" :props="{
              value:'id',
              label:'categoryName',
              children:'childrenList',
            }" filterable v-model="cateIds" style="width:100%" @change="setSelectID"></el-cascader>
          </div>
          <div style="margin-top:20px" v-show="cateIds.length>0">
            <div class="row">
              <div class="col-md-4">
                <div>
                  <button class="btn btn-primary" type="button" @click="selectSymCds()">
                    <i class="icon icon-bullseye"></i> 原理图符号</button>
                </div>
                <div>
                  <!-- <embed :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath=/home/www/apps/file/2018-08-20/1.svg'" type=""> -->
                  <!-- <svg  aria-hidden="true">
                    <use :xlink:href="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath=/home/www/apps/file/2018-08-20/1.svg'"></use>
                  </svg> -->
                  <img :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath=/home/www/apps/file/2018-08-20/1.svg'" alt="" srcset="">
                </div>
              </div>
              <div class="col-md-4">
                <button class="btn btn-success" type="button" @click="selectFootPrint()">
                  <i class="icon icon-print"></i> 封装</button>
              </div>
              <div class="col-md-4">
                <button class="btn btn-danger" type="button">
                  <i class="icon icon-cube-alt"></i> 3D Model</button>
              </div>
            </div>
            <div style="margin-top:20px">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item :label="propty.publicProperty.manufacturer">
                  <el-input v-model="form.manufacturer"></el-input>
                </el-form-item>
                <el-form-item :label="propty.publicProperty.manual">
                  <el-input v-model="form.manual"></el-input>
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
                <el-button type="primary" @click="onSubmit">创建</el-button>
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
          <ul class="nav nav-secondary nav-stacked">
            <li v-for="(item,index) in olbLibraryList" :class="olbIndex == index? 'active':''" :key="index" @click="lookNextList(index)">
              <a>{{item.olbName}}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul class="nav nav-primary nav-stacked">
            <li v-for="(item,index) in svgList" :class="svgIndex == index? 'active':''" :key="index" @click="setSvgIndex(index)">
              <a>{{item.svgName}}</a>
            </li>
          </ul>
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
          <ul class="nav nav-secondary nav-stacked">
            <li v-for="(item,index) in footPrintList" :class="footIndex == index? 'active':''" :key="index" @click="lookNextFootList(index)">
              <a>{{item.olbName}}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul class="nav nav-primary nav-stacked">
            <li v-for="(item,index) in svgTwoList" :class="svgTwoIndex == index? 'active':''" :key="index" @click="setTwoSvgIndex(index)">
              <a>{{item.svgName}}</a>
            </li>
          </ul>
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
  readOrderDetail,
  readCategoryTree,
  getLastCateProperty,
  readComponentOlbLibraryList,
  readComponentOlbLibrarySvgList,
  updateAddApply
} from "@/api/ele";
export default {
  props: ["sdata"],
  data() {
    return {
      cdsIO: false,
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
      cateIds: [],
      categoryTree: [],
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
      }
    };
  },
  methods: {
    readDate() {
      readOrderDetail({ id: this.sdata.id })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      readComponentOlbLibrarySvgList({olbId:this.olbLibraryList[index].id}).then(res=>{
        console.log(res)
        this.svgList = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    lookNextFootList(index){
      this.footIndex = index;
      readComponentOlbLibrarySvgList({olbId:this.footPrintList[index].id}).then(res=>{
        console.log(res)
        this.svgTwoList = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    setSelectID() {
      console.log(this.cateIds);
      let categoryId;
      if (this.cateIds.length > 0) {
        categoryId = this.cateIds[this.cateIds.length - 1];
      }
      getLastCateProperty({ categoryId })
        .then(res => {
          console.log(res);
          this.propty = res.data;
          this.propty.specialProperty.forEach((v, i) => {
            v.value = "";
          });
        })
        .catch(err => {});
    },
    onSetSubmit() {
      let olb = this.olbLibraryList[this.olbIndex]
      let svg = this.svgList[this.svgIndex]
      this.form.symCds = olb.olbName
      this.form.symCdsOlb = olb.olbPath
      this.form.symCdsSvg = svg.svgPath
      this.cdsIO = false;
    },
    onSetFootSubmit() {
      let olb = this.footPrintList[this.footIndex]
      let svg = this.svgTwoList[this.svgTwoIndex]
      this.form.footPrintCds = olb.olbName
      this.form.footPrintCdsOlb = olb.olbPath
      this.form.footPrintCdsSvg = svg.svgPath
      this.footPrintIO = false;
    },
    onSubmit(){
      let obj = new Object();
      obj.addApplyId = this.sdata.id;
      obj.categoryId = this.cateIds[this.cateIds.length - 1];
      obj.componentRevisePublicData = this.form;
      let arr = [];
      this.propty.specialProperty.forEach((v,i)=>{
        arr.push({specialPropertyId:v.id,value:v.value})
      })
      obj.componentReviseSpecialDataList = arr;
      console.log(obj)
      updateAddApply(obj).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    initData() {
      console.log(this.sdata);
      console.log($(window).height());
      let sh = $(window).height();
      $(".sview").height(sh - 140 + "px");
      // this.readDate();
    },
    getSelectOption() {
      readCategoryTree({})
        .then(res => {
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
          let sarr = removeTreeChildren(res.data);
          this.categoryTree = sarr;
        })
        .catch(err => {
          cosnole.log(err);
        });
      readComponentOlbLibraryList({ type: "1" })
        .then(res => {
          console.log(res);
          this.olbLibraryList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      readComponentOlbLibraryList({ type: "2" })
        .then(res => {
          console.log(res);
          this.footPrintList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.initData();
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
.sview {
}
</style>

