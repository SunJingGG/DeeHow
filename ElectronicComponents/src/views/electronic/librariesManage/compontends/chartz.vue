<template>
  <div>
    <div id="chartTwo" style="width:600px;height:400px;margin-left:100px;"></div>
  </div>
</template>
<script>
export default {
  props: ['childCom'],
  data() {
    return {
     
    };
  },
  methods: {
    readData() {
      let option= {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: this.childCom.xValue,
          name:"时间",
          axisLabel:{
            interval : 0,
            rotate:45,
          }
        },
        yAxis: {
          type: "category",
          name:"状态", 
          axisLabel:{
             interval : 0,
            formatter : function(params){
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 3;
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        var start = p * provideNumber;
                        var end = start + provideNumber;
                        if (p == rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber);
                        } else {
                            tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;
                    }
 
                } else {
                    newParamsName = params;
                }
                return newParamsName
            }
          }  
        },
        series: [
          {
            data: this.childCom.yValue,
            type: "line"
          }
        ]
      }
      let option1 = $.extend(true, {}, option);
      var myChart = echarts.init(
        document.getElementById("chartTwo")
      );
      myChart.setOption(option1);
    }
  },
  mounted() {
    this.readData();
    console.log(this.childCom)
  }
};
</script>
<style  lang="scss" scoped>
</style>

