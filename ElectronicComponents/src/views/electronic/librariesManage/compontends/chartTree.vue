<template>
  <div>
    <div id="chartThree" style="width:600px;height:400px;margin-left:100px;"></div>
  </div>
</template>
<script>
export default {
  props: ["callgraphs"],
  data() {
    return {
    };
  },
  methods: {
    readData() {
      echarts.util.each(this.callgraphs.children, function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
      });
      let option = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
          },
          series: [
            {
              type: "tree",
              data: [this.callgraphs],
              top: "1%",
              left: "7%",
              bottom: "1%",
              right: "20%",
              symbolSize: 7,
              label: {
                normal: {
                  position: "left",
                  verticalAlign: "middle",
                  align: "right",
                  fontSize: 9
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

      let option1 = $.extend(true, {}, option);
      var myChart = echarts.init(document.getElementById("chartThree"));
      myChart.setOption(option1);
      console.log(this.callgraphs);
    }
  },
  mounted() {
    this.readData();
    //console.log(this.callgraphs);
  }
};
</script>
<style  lang="scss" scoped>
</style>
