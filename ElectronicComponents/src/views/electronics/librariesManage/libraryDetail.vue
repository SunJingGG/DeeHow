<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div>
          <h2>原理图符号
            <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left"></i>
          </h2>
          <hr>
          <div class="svgmodel">
            <template v-if="result.public.symCdsSvg.value">
              <object id="sembed" :data="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+result.public.symCdsSvg.value" @load="initSvg('sembed')" width="100%" height="100%"></object>
            </template>
          </div>
          <hr>
        </div>
        <div>
          <div class="words">
            <h5>名称: {{result.public.productModel.value}}</h5>
            <!-- <p>系统监控器 - 带复位和看门狗微处理器的电源监控器Montr</p> -->
            <h5>
              <span>封装类型：</span> {{result.public.packageType.value}}</h5>
            <h5>
              <span>原理图符号:</span> {{result.public.symCds.value}}</h5>
          </div>
        </div>
        <div>
          <el-button icon="el-icon-view" @click="lookAttachment">查看Datasheet</el-button>
        </div>
        <div style="margin-top:20px">
          <el-button icon="el-icon-back" @click="goBack">返回</el-button>
        </div>
      </div>
      <div class="col-md-4">
        <div>
          <h2>封装
            <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left" title="这是原理图的web预览，如果有多个原理图的话，仅显示第一个。"></i>
          </h2>
          <hr>
          <div class="svgmodel" style="background:#333">
            <template v-if="result.public.footPrintCdsSvg.value">
              <object id="sembed1" :data="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+result.public.footPrintCdsSvg.value" @load="initSvg('sembed1')" width="100%" height="100%"></object>
            </template>
          </div>
          <hr>
        </div>
      </div>
      <div class="col-md-4">
        <div>

          <h2>详情
            <i class="el-icon-warning el-icon--right" data-toggle="tooltip" data-placement="left" title="这是原理图的web预览，如果有多个原理图的话，仅显示第一个。"></i>
          </h2>
          <hr>
          <div class="sview" :style="{height:tableHeight+'px'}">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <td>名称</td>
                  <td>参数</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in result.special" :key="index">
                  <td>{{item.name}}</td>
                  <td>{{item.value}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { readCategoryGoodsDetail } from "@/api/ele.js";
export default {
  data() {
    return {
      tableHeight: $(window).height() - 150,
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
      }
    };
  },
  methods: {
    initSvg(sid) {
      let sembed = $("#" + sid);
      let obj = svgPanZoom("#" + sid, {
        zoomEnabled: true
      });
      obj.setZoomScaleSensitivity(0.5);
    },
    readData(obj) {
      readCategoryGoodsDetail(obj)
        .then(res => {
          console.log(res);
          this.result = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initModel() {
      console.log(this.$route);
      this.id = this.$route.query.id;
      let obj = { id: this.id };
      this.readData(obj);
    },
    lookAttachment(index) {
      let newWin = window.open(
        "http://" +
          window.location.host +
          "/deehow-CMS-Web/public/file/view?filePath=" +
          this.result.public.manual.value
      );
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.initModel();
  }
};
</script>
<style lang="scss" scoped>
.svgmodel {
  width: 100%;
  height: 300px;
  padding-right: 42px;
}
.sview{
  overflow: auto;
  min-height:300px;
}
</style>
