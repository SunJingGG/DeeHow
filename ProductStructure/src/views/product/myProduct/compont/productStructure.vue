<template>
  <div>
    <div id="chartOne" class="chart-size"></div>
  </div>
</template>

<script>
import { readVersionAssumption } from "@/api/product";
var data1 = {
  name: "flare",
  children: [
    {
      name: "data",
      children: [
        {
          name: "converters",
          children: [
            { name: "Converters", value: 721 },
            { name: "DelimitedTextConverter", value: 4294 }
          ]
        },
        {
          name: "DataUtil",
          value: 3322
        }
      ]
    },
    {
      name: "display",
      children: [
        { name: "DirtySprite", value: 8833 },
        { name: "LineSprite", value: 1732 },
        { name: "RectSprite", value: 3623 }
      ]
    },
    {
      name: "flex",
      children: [{ name: "FlareVis", value: 4116 }]
    },
    {
      name: "query",
      children: [
        { name: "AggregateExpression", value: 1616 },
        { name: "And", value: 1027 },
        { name: "Arithmetic", value: 3891 },
        { name: "Average", value: 891 },
        { name: "BinaryExpression", value: 2893 },
        { name: "Comparison", value: 5103 },
        { name: "CompositeExpression", value: 3677 },
        { name: "Count", value: 781 },
        { name: "DateUtil", value: 4141 },
        { name: "Distinct", value: 933 },
        { name: "Expression", value: 5130 },
        { name: "ExpressionIterator", value: 3617 },
        { name: "Fn", value: 3240 },
        { name: "If", value: 2732 },
        { name: "IsA", value: 2039 },
        { name: "Literal", value: 1214 },
        { name: "Match", value: 3748 },
        { name: "Maximum", value: 843 },
        {
          name: "methods",
          children: [
            { name: "add", value: 593 },
            { name: "and", value: 330 },
            { name: "average", value: 287 },
            { name: "count", value: 277 },
            { name: "distinct", value: 292 },
            { name: "div", value: 595 },
            { name: "eq", value: 594 },
            { name: "fn", value: 460 },
            { name: "gt", value: 603 },
            { name: "gte", value: 625 },
            { name: "iff", value: 748 },
            { name: "isa", value: 461 },
            { name: "lt", value: 597 },
            { name: "lte", value: 619 },
            { name: "max", value: 283 },
            { name: "min", value: 283 },
            { name: "mod", value: 591 },
            { name: "mul", value: 603 },
            { name: "neq", value: 599 },
            { name: "not", value: 386 },
            { name: "or", value: 323 },
            { name: "orderby", value: 307 },
            { name: "range", value: 772 },
            { name: "select", value: 296 },
            { name: "stddev", value: 363 },
            { name: "sub", value: 600 },
            { name: "sum", value: 280 },
            { name: "update", value: 307 },
            { name: "variance", value: 335 },
            { name: "where", value: 299 },
            { name: "xor", value: 354 },
            { name: "_", value: 264 }
          ]
        },
        { name: "Minimum", value: 843 },
        { name: "Not", value: 1554 },
        { name: "Or", value: 970 },
        { name: "Query", value: 13896 },
        { name: "Range", value: 1594 },
        { name: "StringUtil", value: 4130 },
        { name: "Sum", value: 791 },
        { name: "Variable", value: 1124 },
        { name: "Variance", value: 1876 },
        { name: "Xor", value: 1101 }
      ]
    },
    {
      name: "scale",
      children: [
        { name: "IScaleMap", value: 2105 },
        { name: "LinearScale", value: 1316 },
        { name: "LogScale", value: 3151 },
        { name: "OrdinalScale", value: 3770 },
        { name: "QuantileScale", value: 2435 },
        { name: "QuantitativeScale", value: 4839 },
        { name: "RootScale", value: 1756 },
        { name: "Scale", value: 4268 },
        { name: "ScaleType", value: 1821 },
        { name: "TimeScale", value: 5833 }
      ]
    }
  ]
};

var data2 = {
  name: "flare",
  children: [
    {
      name: "flex",
      children: [{ name: "FlareVis", value: 4116 }]
    },
    {
      name: "scale",
      orient: "RL",
      children: [
        { name: "IScaleMap", value: 2105 },
        { name: "LinearScale", value: 1316 },
        { name: "LogScale", value: 3151 },
        { name: "OrdinalScale", value: 3770 },
        { name: "QuantileScale", value: 2435 },
        { name: "QuantitativeScale", value: 4839 },
        { name: "RootScale", value: 1756 },
        { name: "Scale", value: 4268 },
        { name: "ScaleType", value: 1821 },
        { name: "TimeScale", value: 5833 }
      ]
    },
    {
      name: "display",
      children: [{ name: "DirtySprite", value: 8833 }]
    }
  ]
};
export default {
  props: ["versionData"],
  data() {
    return {
      leftData:null,
      rightData:null,
      option: {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                saveAsImage: {}
            }
        },
        legend: {
          top: "2%",
          left: "3%",
          orient: "vertical",
          data: [
            {
              name: "被关联",
              icon: "diamond"
            },
            {
              name: "关联项",
              icon: "rectangle"
            }
          ],
          borderColor: "#c23531"
        },
        series: [
          {
            type: "tree",
            name: "被关联",
            data: [],
            orient: "RL",
            roma:true,
            top: "5%",
            left: "7%",
            bottom: "2%",
            right: "60%",
            symbolSize: 7,
            label: {
              normal: {
                position: "right",
                verticalAlign: "middle",
                align: "right"
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
          {
            type: "tree",
            name: "关联项",
            data: [],

            top: "20%",
            left: "60%",
            bottom: "22%",
            right: "18%",
            symbolSize: 7,
            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right"
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
    };
  },
  methods: {
    readData() {
      readVersionAssumption({ id: this.versionData.id })
        .then(res => {
          // this.initCharts();
          this.initData(res.data);
          console.log(res);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData(d){
      let name = this.versionData.productName+'-'+this.versionData.versionName;
      if(d.left.length>0){
        let obj = {
          name:'被关联',
          children:[],
        }
        d.left.forEach((v)=>{
          obj.children.push({name:v.productName+'-'+v.versionName})
        })
        this.leftData = [obj];
        this.option.series[0].data = [obj];
      }
      if(d.right){
        let obj2 = {
          name:'关联项',
          children:[],
        }
        function zhuan(arr,arr2){
          arr.forEach(val=>{
            let mb = {
              name:val.productName+'-'+val.versionName,
              children:[],
            }
            if(val.childrenModels){
              zhuan(val.childrenModels,mb.children);
            }
            arr2.push(mb)
          })
        }
        
        zhuan(d.right.childrenModels,obj2.children)
        this.rightData = obj2;
        this.option.series[1].data = [obj2];
        console.log(this.option)
        this.initCharts();
      }
    },
    initCharts() {
      
      var myChart = echarts.init(document.getElementById("chartOne"));
      myChart.setOption(this.option);
    }
  },
  mounted() {
    console.log(this.versionData);
    console.log(echarts);
    console.log(this.option);
    this.initCharts();
    this.readData();
  }
};
</script>
<style lang="scss" scoped>
.chart-size {
  width: 100%;
  height: 400px;
}
</style>


