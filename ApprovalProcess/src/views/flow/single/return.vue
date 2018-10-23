<template>
  <div>
    <div style="float:right;margin-bottom:20px;">
      <el-button type="primary" @click="applynew">
        <i class="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;新建申请</el-button>
    </div>
    <div style="clear:both;"></div>
    <div>
      <ul class="list-group">
        <a class="list-group-item showhide" v-for="(item,index) in tableData" :key="index" @click="change(item)">
          <span class="label label-dot label-warning" style="margin-right:20px" v-if="item.lookState == '1'"></span>
          <span class="label label-dot label-success" style="margin-right:20px" v-if="item.lookState == '2'"></span>
          {{item.actName}}
          <div class="pull-right spstatus1">
            <span class="user ellipsis">{{item.procStsrtName}}</span>
            <span class="date">{{item.procStsrtTime}}</span>
          </div>
          <!-- <div class="pull-right spstatus">
          <span class="user ellipsis">[{{item.taskState|taskState}} : {{item.actName}}
             ]
          </span>
        </div> -->
        </a>
      </ul>
      <div>
        <span class="label label-dot label-warning"></span> 未查看
        <span class="label label-dot label-success" style="margin-left:20px"></span> 已查看
      </div>
      <div class="block" style="margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="sparams.current" :page-sizes="[10, 20, 30, 120]" :page-size="sparams.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="申请表单" :visible.sync="dialogTableVisible" width="1000px">
      <table class="table table-bordered">
        <tr>
          <td rowspan="4" style="width:30px;padding-top:66px;">
            <span>编号</span>
          </td>
          <td style="width:120px;">
            <span class="text-muted">构件类别 :</span>
          </td>
          <td colspan="6">
            <el-radio-group v-model="mainInfo.partType">
              <el-radio label="1">新增</el-radio>
              <el-radio label="2">变更</el-radio>
              <el-radio label="3">删除</el-radio>
              <el-radio label="4">其它</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">物料属性 :</span>
          </td>
          <td colspan="6">
            <el-radio-group v-model="mainInfo.materialProperty">
              <el-radio label="1">原料</el-radio>
              <el-radio label="2">半成品</el-radio>
              <el-radio label="3">成品</el-radio>
              <el-radio label="4">工具</el-radio>
              <el-radio label="5">广宣品</el-radio>
              <el-radio label="6">非生产物料</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">生产属性 :</span>
          </td>
          <td colspan="6">
            <el-radio-group v-model="mainInfo.productProperty">
              <el-radio label="1">外购</el-radio>
              <el-radio label="2">自制</el-radio>
              <el-radio label="3">外协</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td style="width:230px;">
            <span class="text-muted">品名/型号/规格/材质("/"代表空格)</span>
          </td>
          <td>
            <span class="text-muted">扩展属性</span>
          </td>
          <td>
            <span class="text-muted">单位</span>
          </td>
          <td>
            <span class="text-muted">重量</span>
          </td>
          <td>
            <span class="text-muted">重量单位</span>
          </td>
          <td>
            <span class="text-muted">代号(图号)</span>
          </td>
          <td></td>
        </tr>
        <tr v-for="(item,index) in mainInfo.detailList" :key="index">
          <td>{{index+1}}</td>
          <td>
            <el-input v-model="item.productName"></el-input>
          </td>
          <td>
            <el-input v-model="item.unit"></el-input>
          </td>
          <td>
            <el-input v-model="item.attribute"></el-input>
          </td>
          <td>
            <el-input v-model="item.weight"></el-input>
          </td>
          <td>
            <el-input v-model="item.weightUnit"></el-input>
          </td>
          <td>
            <el-input v-model="item.productNo"></el-input>
          </td>
          <td>
            <i v-if="index+1==mainInfo.detailList.length&&mainInfo.detailList.length<10" class="fa fa-plus" @click="addline" aria-hidden="true" style="color:red;margin-top:10px;"></i>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applysubmit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改表单" :visible.sync="dialogTableVisible1" width="1000px">
      <table class="table table-bordered">
        <tr>
          <td rowspan="4" style="width:30px;padding-top:66px;">
            <span>编号</span>
          </td>
          <td style="width:120px;">
            <span class="text-muted">构件类别 :</span>
          </td>
          <td colspan="6">
            <el-radio-group v-model="mainInfo.partType">
              <el-radio label="1">新增</el-radio>
              <el-radio label="2">变更</el-radio>
              <el-radio label="3">删除</el-radio>
              <el-radio label="4">其它</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">物料属性 :</span>
          </td>
          <td colspan="6">
            <el-radio-group v-model="mainInfo.materialProperty">
              <el-radio label="1">原料</el-radio>
              <el-radio label="2">半成品</el-radio>
              <el-radio label="3">成品</el-radio>
              <el-radio label="4">工具</el-radio>
              <el-radio label="5">广宣品</el-radio>
              <el-radio label="6">非生产物料</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-muted">生产属性 :</span>
          </td>
          <td colspan="6">
            <el-radio-group v-model="mainInfo.productProperty">
              <el-radio label="1">外购</el-radio>
              <el-radio label="2">自制</el-radio>
              <el-radio label="3">外协</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td style="width:230px;">
            <span class="text-muted">品名/型号/规格/材质("/"代表空格)</span>
          </td>
          <td>
            <span class="text-muted">扩展属性</span>
          </td>
          <td>
            <span class="text-muted">单位</span>
          </td>
          <td>
            <span class="text-muted">重量</span>
          </td>
          <td>
            <span class="text-muted">重量单位</span>
          </td>
          <td>
            <span class="text-muted">代号(图号)</span>
          </td>
          <td></td>
        </tr>
        <tr v-for="(item,index) in mainInfo.detailList" :key="index">
          <td>{{index+1}}</td>
          <td>
            <el-input v-model="item.productName"></el-input>
          </td>
          <td>
            <el-input v-model="item.unit"></el-input>
          </td>
          <td>
            <el-input v-model="item.attribute"></el-input>
          </td>
          <td>
            <el-input v-model="item.weight"></el-input>
          </td>
          <td>
            <el-input v-model="item.weightUnit"></el-input>
          </td>
          <td>
            <el-input v-model="item.productNo"></el-input>
          </td>
          <td>
            <i v-if="index+1==mainInfo.detailList.length&&mainInfo.detailList.length<10" class="fa fa-plus" @click="addline" aria-hidden="true" style="color:red;margin-top:10px;"></i>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changesubmit">确 定</el-button>
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ApplyNewNumDetail, ApplyNewNum, returnNewNumDetail } from "@/api/flow";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible1: false,
      sparams: {
        processKey: "",
        size: 10,
        current: 1
      },
      total: 0,
      changeid: "",
      summitType: "",
      mainInfo: {
        partType: "",
        materialProperty: "",
        productProperty: "",
        applyTime: "",
        detailList: [
          {
            productName: "",
            unit: "",
            attribute: "",
            weight: "",
            weightUnit: "",
            productNo: ""
          }
        ]
      },
      changedetail: {},
      tableData: [],
      changedetailList: []
    };
  },
  methods: {
    readData() {
      returnNewNumDetail(this.sparams).then(res => {
        //console.log(res)
        this.tableData = res.data;
        this.total=res.total;
      });
    },
    applysubmit() {
      let date = new Date(new Date().getTime());
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      this.mainInfo.applyTime =
        y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      ApplyNewNum({ mainInfo: this.mainInfo, summitType: 0 }).then(res => {
        console.log(res);
        if (res.httpCode == "200") {
          this.$message.success("申请成功");
          this.dialogTableVisible = false;
          this.readData();
          //this.mainInfo={};
        }
      });
    },
    addline() {
      let obj = new Object();
      (obj.productName = ""),
        (obj.unit = ""),
        (obj.attribute = ""),
        (obj.weight = ""),
        (obj.weightUnit = ""),
        (obj.productNo = ""),
        this.mainInfo.detailList.push(obj);
    },
    applynew() {
      this.mainInfo.partType = "";
      (this.mainInfo.productProperty = ""),
        (this.mainInfo.materialProperty = ""),
        (this.mainInfo.detailList = [
          {
            productName: "",
            unit: "",
            attribute: "",
            weight: "",
            weightUnit: "",
            productNo: ""
          }
        ]),
        (this.dialogTableVisible = true);
    },
    handleSizeChange(val) {
      this.sparams.size = val;
      this.readData();
    },
    handleCurrentChange(val) {
      this.sparams.current = val;
      this.readData();
    },
    change(item) {
      //console.log(item);
      this.dialogTableVisible1 = true;
      this.changeid = item.businessId;
      ApplyNewNumDetail({ mainId: this.changeid }).then(res => {
        console.log(res);
        this.mainInfo = res.data;
        this.mainInfo.detailList = res.data.detailList;
            this.mainInfo.detailList.forEach((v, i) => {
                v.id='';
            });
      });
    },
    changesubmit() {
      ApplyNewNum({
        mainInfo: this.mainInfo,
        summitType: 1,
        id: this.changeid
      }).then(res => {
        console.log(res);
        if (res.httpCode == "200") {
          this.$message.success("修改成功");
          this.dialogTableVisible1 = false;
          this.readData();
          //this.mainInfo={};
        }
      });
    }
  },
  mounted() {
    this.sparams.processKey = this.$route.params.formSign;
    console.log(this.sparams);
    this.readData();
  }
};
</script>

<style lang="scss" scoped>
</style>

