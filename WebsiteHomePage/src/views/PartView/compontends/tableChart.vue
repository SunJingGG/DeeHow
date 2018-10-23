<template>
  <el-table :header-cell-style="rowClass" :cell-style="cellStyle" stripe :data="tableData5" @expand-change="expandRow" style="width: 100%;margin-bottom:100px;">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="row">
          <div class="col-md-6">
            <div :id="'chart'+props.row.id" style="width:100%;height:280px"></div>
          </div>
          <div class="col-md-6">
            <div :id="'chart1'+props.row.id" style="width:100%;height:280px"></div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="经销商" prop="suppliersName">
    </el-table-column>
    <el-table-column label="物料编码" prop="suppliersNo">
    </el-table-column>
    <el-table-column label="库存" prop="suppliersStock"></el-table-column>
    <el-table-column label="价格(1-10件)" prop="suppliersPriceA"></el-table-column>
    <el-table-column label="价格(10-50件)" prop="suppliersPriceB"></el-table-column>
    <el-table-column label="价格(50-100件)" prop="suppliersPriceC"></el-table-column>
    <el-table-column label="价格(100-1000件)" prop="suppliersPriceD"></el-table-column>
    <el-table-column label="价格(1000-10000件)" prop="suppliersPriceE"></el-table-column>
    <el-table-column label="价格(10000件以上)" prop="suppliersPriceF"></el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { readCategoryGoodsDetailprice,readCategoryGoodsDetailtable} from "@/api/ele";
export default {
  props: ["childCom1"],
  data() {
    return {
      rowClass: {
        background: "#f7f7f7",
        fontSize: "13px"
      },
      price: [],
      list: [],
      price1: [],
      price2: [],
      price3: [],
      price4: [],
      price5: [],
      price6: [],
      totle: [],
      tableData5: [],
      suppliersName:'',
      suppliersNo:'',
      manufacturersName:'',
      manufacturersNo:'',
    };
  },
  methods: {
    tableMessage(){
      readCategoryGoodsDetailtable(this.childCom1).then(res =>{
        //console.log(res);
        this.tableData5=res.data;
        //console.log(this.tableData5)
      })
    },
    expandRow(row, expandedRows) {
      console.log(row);
      console.log(expandedRows);
      this.suppliersName=row.suppliersName;
      //console.log(this.suppliersName);
      this.suppliersNo=row.suppliersNo;
      //console.log(this.suppliersNo);
      this.$nextTick(() => {
        readCategoryGoodsDetailprice({
          suppliersName: this.suppliersName,
          suppliersNo: this.suppliersNo,
          manufacturersName:this.childCom1.manufacturersName,
          manufacturersNo:this.childCom1.manufacturersNo
        }).then(res => {
          console.log(res);
          this.price = res.data;
          console.log(this.price)
          this.list=[],
          this.price1=[],
          this.price2=[],
          this.price3=[],
          this.price4=[],
          this.price5=[],
          this.price6=[],
          this.totle=[],
          this.price.forEach((v, i) => {
            this.list.push(v.logTime);
            this.price1.push(v.suppliersPriceA);
            this.price2.push(v.suppliersPriceB);
            this.price3.push(v.suppliersPriceC);
            this.price4.push(v.suppliersPriceD);
            this.price5.push(v.suppliersPriceE);
            this.price6.push(v.suppliersPriceF);
            this.totle.push(v.suppliersStock);
          });
          this.readData("chart" + row.id);
          this.readData1("chart1" + row.id);
        });
      });
    },
    rnd(n, m) {
      var random = Math.floor(Math.random() * (m - n + 1) + n);
      return random;
    },
    readData(id) {
      let option = {
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["价格(1-10件)", "价格(10-50件)", "价格(50-100件)", "价格(100-1000件)", "价格(10000件以上)"]
        // },
        xAxis: {
          type: "category",
          data: this.list,
          name: "时间"
        },
        yAxis: {
          type: "value",
          name: "价格"
        },
        series: [
          {
            name: "价格(1-10件)",
            data: this.price1,
            type: "line"
          },
          {
            name: "价格(10-50件)",
            data: this.price2,
            type: "line"
          },
          {
            name: "价格(50-100件)",
            data: this.price3,
            type: "line"
          },
          {
            name: "价格(100-1000件)",
            data: this.price4,
            type: "line"
          },
          {
            name: "价格(1000-10000件)",
            data: this.price5,
            type: "line"
          },
          {
            name: "价格(10000件以上)",
            data: this.price6,
            type: "line"
          }
        ]
      };
      let option1 = $.extend(true, {}, option);
      if (document.getElementById(id)) {
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option1);
      }
    },
    readData1(id) {
      let option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: this.list,
          name: "时间"
        },
        yAxis: {
          type: "value",
          name: "库存"
        },
        series: [
          {
            data: this.totle,
            type: "line"
          }
        ]
      };
      let option1 = $.extend(true, {}, option);
      if (document.getElementById(id)) {
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option1);
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex >= 4) {
        //指定坐标
        return "color:#ff791b;";
      } else if (columnIndex === 3) {
        return "color:#006400;";
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.tableMessage();
    console.log(this.childCom1);
  }
};
</script>