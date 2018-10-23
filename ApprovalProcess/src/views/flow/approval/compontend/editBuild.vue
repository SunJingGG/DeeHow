<template>
  <div>
      <div class="title">
       <span>元器件修改入库申请表</span>
     </div>
    <div class="row">
      <div class="col-md-6">
        <div class="sview">
          <template v-if="dataSheet">
            <embed :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+dataSheet" type="" style="width:100%;height:100%">
          </template>
        </div>
      </div>
      <div class="col-md-6">
        <div class="sview" style="overflow:auto">
          <div>
            <h2 style="text-align:center">{{this.auditObj.categoryName}}</h2>
          </div>
          <div style="margin-top:20px" v-show="cateIds.length>0">
            <div class="row">
              <div class="col-md-4">
                <div>
                  <button class="btn btn-primary" type="button">
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
                  <button class="btn btn-success" type="button"><i class="icon icon-print"></i> 封装</button>
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
                  {{form.manufacturer}}
                </el-form-item>
                <el-form-item :label="propty.publicProperty.packageType">
                  {{form.packageType}}
                </el-form-item>
                <el-form-item :label="propty.publicProperty.partType">
                  {{form.partType}}
                </el-form-item>
                <el-form-item :label="propty.publicProperty.preRanking">
                  {{form.preRanking}}
                </el-form-item>
                <el-form-item :label="propty.publicProperty.productModel">
                  {{form.productModel}}
                </el-form-item>
                <el-form-item :label="propty.publicProperty.value">
                  {{form.value}}
                </el-form-item>
              </el-form>
              <br>
              <table class="table">
                <tr v-for="(item, index) in propty.specialProperty" :key="index">
                  <td style="width:80px">{{item.name}}</td>
                  <td>
                    {{item.value}}
                  </td>
                </tr>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="message" v-if="ifAudit">
      元器件修改申请没有编辑过，所以没有详情信息。
    </div>
  </div>
</template>
<script>

// import svgPanZoom from "svg.panzoom.js"

import {readeditApplyDetialByKey} from "@/api/ele"
export default {
  props: ['processId'],
  data() {
    return {
      auditObj:{},
      processInstanceId:'',
      dataSheet:"",
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
      propty: {
        publicProperty: {},
        specialProperty: []
      },
      ifAudit:false,
    };
  },
  methods: {
    initSvg(sid){
      let sembed = $('#'+sid)
      let obj = svgPanZoom('#'+sid, {
          zoomEnabled: true,
        });
      obj.setZoomScaleSensitivity(0.5)
    },
    initData() {
      let sh = $(window).height();
      $(".sview").height(sh - 140 + "px");
      this.auditObj.public;
      this.cateIds.push(this.auditObj.categoryId);
      for(var i in this.auditObj.public){
        this.propty.publicProperty[i] = this.auditObj.public[i].name;
        this.form[i] = this.auditObj.public[i].value;
      }
      this.propty.specialProperty = this.auditObj.special;
    },
    readData(){
      readeditApplyDetialByKey({putStorageProcessKey:this.processInstanceId}).then(res=>{
        console.log(res)
        this.auditObj = res.data;
        this.$emit('childByValue',res.data.reviseApplyId);
        console.log(res.data.type!='false')
        if(!res.data.type || res.data.type=='false'){
          this.$message.error("没有编辑");
          this.ifAudit = true;
          return false;
        }
        this.initData();
        this.dataSheet = res.data.public.manual.value
        console.log(res.data.reviseApplyId);
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.processInstanceId = this.$route.query.processInstanceId;
    this.readData();
  }
};
</script>
<style lang="scss" scoped>
.title{
  width:100%;
  height:50px;
  line-height: 34px;
  border-bottom:1px solid #ccc;
  font-size: 16px;
}
.message{
  width:100%;
  height:200px;
  line-height: 200px;
  text-align: center;
}
</style>

