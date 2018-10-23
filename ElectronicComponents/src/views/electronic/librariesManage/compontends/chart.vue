<template>
    <div>
        <div id="chartOne" style="width:100%;height:330px"></div>
    </div>
</template>
<script>
import { chartproduction } from "@/api/part";
export default {
  // props: ["Pdata"],
  data() {
    return {   
    };
  },
  methods: {
    readData() {
      chartproduction({}).then(res => {
        console.log(res);
       let option={
        title: {
          text: "生命周期统计图",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "器件种类",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: res.data.proData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      let option1 = $.extend(true, {},option);
      var myChart = echarts.init(document.getElementById("chartOne"));
      myChart.setOption(option1);
       });  
    }
  },
  mounted() {
    this.readData();
  }
};
</script>
<style  lang="scss" scoped>
</style>

