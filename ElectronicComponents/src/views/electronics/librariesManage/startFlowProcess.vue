<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>属性名称</th>
            <th  style="width:30%">属性值</th>
            <th style="width:30%">修改目标值</th>
            <th>是否修改</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in auditArr" :key="index">
            <td>{{item.modified}}</td>
            <td>{{item.modifiedValue}}</td>
            <td>
              <template v-if="item.ifAudit">
                <el-input v-model="item.originalValue"></el-input>
              </template>
            </td>
            <td>
              <template v-if="!item.ifAudit">
                <el-button type="" size="mini" icon="el-icon-circle-check-outline" @click="item.ifAudit = true">修改</el-button>
              </template>
              <template v-else>
                <el-button type="" size="mini" icon="el-icon-circle-close-outline"  @click="item.ifAudit = false">取消</el-button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align:center;padding:20px">
        <el-button type="primary" @click="startFlow">提交申请</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { readCategoryGoodsDetail , startProcessOrder , updateProjectReviseApply} from "@/api/ele.js";
export default {
  data() {
    return {
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
      },
      auditArr:[],
      goodsId:'',
    };
  },
  methods: {
    readData(obj) {
      readCategoryGoodsDetail(obj)
        .then(res => {
          console.log(res);
          this.result = res.data;
          // let arr = $.extend(this.result.special
          let arr = [];
          let pub = this.result.public;
          let spe = this.result.special;
          for (var i in pub) {
            if (
              i != "symCdsSvg" &&
              i != "footPrintCdsSvg" &&
              i != "footPrintCds" &&
              i != "model3d" &&
              i != "manual" &&
              i != "symCds"
            ) {
              let obj = {
                modified: pub[i].name,
                modifiedValue: pub[i].value,
                originalValue:  '',
                ifAudit:false,
              };
              arr.push(obj)
            }
          }
          spe.forEach((v,i)=>{
            let obj = {
              modified: v.name,
              modifiedValue: v.value,
              originalValue: '',
              ifAudit:false,
            };
            arr.push(obj)
          })

          this.auditArr = arr;
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
    startFlow(index){
      startProcessOrder({ processKey: "partModifyApply" }).then(res => {
        let arr =[];
        this.auditArr.forEach((v,i)=>{
          if(v.ifAudit){
            arr.push(v)
          }
        })
        let obj = {
          applyProcessKey:res.processInstanceId,
          dataSheet:this.result.public.manual.value,
          detailList:arr,
          partName:this.result.public.productModel.value,
          goodsId:this.$route.query.id,
        }
        updateProjectReviseApply(obj)
          .then(response => {
            this.$message.success('操作成功')
          })
          .catch(err => {
            console.log(err);
          });
      }).catch(err=>{
        console.log(err)
      });
    },
    goBack() {
      this.$router.go(-1);
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
.sview {
  overflow: auto;
  min-height: 300px;
}
</style>
