<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="指定区域" name="first"></el-tab-pane>
      <el-tab-pane label="器件种类" name="second"></el-tab-pane>
      <el-tab-pane label="边" name="third"></el-tab-pane>
      <el-tab-pane label="类型" name="fourth"></el-tab-pane>
      <el-tab-pane label="级别" name="fifth"></el-tab-pane>
      <el-tab-pane label="方式" name="sixth"></el-tab-pane>
      <el-tab-pane label="集合类型" name="seventh"></el-tab-pane>

    </el-tabs>
    <span class="btns" v-show="isShowTable">
        <el-button type="primary" @click="entrywork">新增维护项</el-button>
    </span>
    <el-row v-show="isShowTable" style="width: 90%">
      <el-col :span="19">
        <el-table :data="tableData" style="width: 100%" border v-loading="loading"
                  element-loading-text="拼命加载中" stripe>
          <el-table-column prop="value" label="值">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">

            <template slot-scope="scope">
              <el-button @click="handleUpdateClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
            <!--<template slot-scope="scope" v-else>-->
            <!--<el-button @click="handleUpdateClick(scope.row)" type="text" size="small">添加</el-button>-->
            <!--</template>-->
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--集合类型的列表-->
    <el-row v-show="!isShowTable">
      <el-col :span="19">
        <el-table :data="setsTypeList" style="width: 100%" border v-loading="loading"
                  element-loading-text="拼命加载中" stripe>
          <el-table-column prop="name" label="类型名称">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="type" label="类型">
          </el-table-column>
          <el-table-column prop="value" label="值">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">

            <template slot-scope="scope">
              <el-button @click="handleAddClick(scope.row)" type="text" size="small">添加</el-button>
              <!--<el-button @click="handleUpdateClick(scope.row)" type="text" size="small">修改</el-button>-->
              <!--<el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>-->
            </template>
            <!--<template slot-scope="scope" v-else>-->
            <!--<el-button @click="handleUpdateClick(scope.row)" type="text" size="small">添加</el-button>-->
            <!--</template>-->
          </el-table-column>
        </el-table>
        <!--<div class="block">-->
        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
        <!--:current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize"-->
        <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
        <!--</el-pagination>-->
        <!--</div>-->
      </el-col>
    </el-row>
    <!--新增维护项时的弹框-->
    <el-dialog class="weihu" title="新增维护项" :visible.sync="dialogItemVisible" width="40%">
      <el-form :inline="true" ref="ruleForm" label-width="70px" label-position="left">
        <span class="star">*</span>
        <el-form-item label="维护项：" prop="modelName">
          <el-select v-model="form.name" placeholder="请选择维护项">
            <el-option label="指定区域" value="REGION"></el-option>
            <el-option label="器件种类" value="GATEGORY"></el-option>
            <el-option label="边" value="EDGE"></el-option>
            <el-option label="级别" value="LEVEL"></el-option>
            <el-option label="方式" value="MODE"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <span class="star">*</span>
        <el-form-item label="输入值：">
          <el-input v-model="form.value" placeholder="请输入其值" maxlength="50"></el-input>
        </el-form-item>
        <br>
        <div style="display: flex;flex-direction: column">
          <div>
            <span class="remark">*</span>
            <el-form-item label="备注：">
              <el-input v-model="form.remark" placeholder="请输入备注(最多100字)" maxlength="100" type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}">
              </el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-around">
            <span></span>
            <span style="">还可输入<b v-text="msg"></b>个字</span>
            <span></span>
          </div>
        </div>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button type="primary" plain @click="dialogItemVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--维护项修改弹框-->
    <el-dialog class="weihu" title="修改维护项" :visible.sync="dialogMaintenanceItemVisible" width="40%">
      <el-form :inline="true" ref="ruleForm" label-width="70px" label-position="left">

        <span class="star">*</span>
        <el-form-item label="修改值：">
          <el-input v-model="updateForm.value" placeholder="请输入修改值" maxlength="50"></el-input>
        </el-form-item>
        <br/>
        <div>
          <span class="remark">*</span>
          <el-form-item label="备注：">
            <el-input v-model="updateForm.remark" placeholder="请输入备注(最多100字)" maxlength="100" type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}">
            </el-input>
          </el-form-item>
          <span style="float:right">还可输入<b v-text="updatemsg"></b>个字</span>
        </div>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updataSubmit">确 定</el-button>
        <el-button type="primary" plain @click="dialogMaintenanceItemVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加集合类型弹框-->
    <el-dialog title="添加集合类型" :visible.sync="dialogSetsVisible" width="40%">
      <el-form :inline="true" ref="ruleForm" label-width="90px" label-position="left">

        <div style="display: flex;justify-content: space-between;align-items: center;">
          <div>
            <span class="star">*</span>
            <el-form-item label="集合名称：">
              <el-input v-model="setsName" placeholder="请输入集合名称" maxlength="50" style="width: 200px"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;flex-direction: column">
            <el-button type="primary" @click="addParameter" style="height: 35px">新增参数</el-button>
            <el-checkbox style="margin-top: 10px" v-model="checked">是否作为选项值</el-checkbox>
          </div>
        </div>
        <!-- 参数输入框 -->
        <ul style="margin-left: 20px;display: flex;flex-direction: column;">
          <li v-for="(param,index) in params" :key="index" class="paramClass">
            <div style="display: inline-block;width: 60px;">参数{{index + 1}}：</div>
            <el-input v-model="param.name" placeholder="请输入参数名" maxlength="50"
                      style="margin-left: 25px;width: 200px"></el-input>
            <el-button type="danger" icon="el-icon-delete" circle size="small"
                       @click="params.splice(index,1)" style="margin-left: 10px"></el-button>
          </li>
        </ul>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit">确 定</el-button>
        <el-button type="primary" plain @click="dialogSetsVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMaintenanceItem,
    deleteMaintenanceItem,
    addItemAttributesData,
    addSetsItem,
    readSetsItem
  } from "@/api/rules";

  export default {
    data() {
      return {
        isShowTable: true,
        checked: false,
        setsName: '',
        params: [
          {value: '', name: ''}
        ],
        msg: '100',
        updatemsg: '100',
        activeName: 'first',
        dialogItemVisible: false, // 修改时是否弹框
        dialogMaintenanceItemVisible: false, // 新增时是否弹框
        dialogSetsVisible: false, // 添加集合类型是否弹框
        updateItem: {},
        tableData: [],
        setsTypeList: [],
        total: 0,
        type: 'REGION',
        current: 0,
        search: {
          pageSize: 10,
          pageNum: 1,
        },
        form: {
          name: "",
          remark: "",
          value: ""
        },
        updateForm: {
          value: '',
          remark: ""
        },
        loading: true,

      };
    },
    methods: {
      tabHandleClick(tab) {
        // 集合类型
        if (tab.index == 6) {
          readSetsItem({}).then(res => {
            let tempData = res.data;
            // 以下循环为了把服务器端数据处理成自己想展示的数据
            for (let i = 0; i < tempData.length; i++) {
              if (tempData[i].type == 'false') {
                tempData[i].type = '输入';
              } else {
                tempData[i].type = '选择';
              }
              let oldValue = tempData[i].value;
              let jsonValue = JSON.parse(oldValue);
              let v = '';
              for (let j = 0;j < jsonValue.length;j++){
                v += jsonValue[j].name + '、';
                tempData[i].value = v.slice(0,v.length - 1);
              }
            }
            console.log(tempData);
            this.setsTypeList = res.data;
            this.isShowTable = false;
          })
        } else {
          let type = '';
          switch (tab.index) {
            case "0":
              type = "REGION" // 指定区域
              break;
            case "1":
              type = "GATEGORY" // 器件种类
              break;
            case "2":
              type = "EDGE" // 边
              break;
            case "3":
              type = "TYPE" // 类型
              break;
            case "4":
              type = "LEVEL" // 级别
              break;
            case "5":
              type = "MODE" // 方式
              break;
          }
          this.type = type;
          this.loading = true;
          this.isShowTable = true;
          this.search.pageNum = 1;
          this.getMaintenanceItemData(type);
        }
      },
      // 查询条目属性接口
      getMaintenanceItemData(type) {
        let param = {};
        param.type = type;
        param.pageSize = this.search.pageSize;
        param.pageNum = this.search.pageNum;
        getMaintenanceItem(param).then(res => {
          if (res.httpCode == 200) {
            this.tableData = res.data;
            this.total = res.total;
            if(this.total>0){
              this.$message.success("请求成功");
            }
            this.loading = false;
            // 下方判断为了解决(当第二页删除后第二页为空数据了时的情况)
            if ((this.total >= this.search.pageSize) && (this.total % Number(this.search.pageSize)) == 0 && this.tableData.length == 0) {
              this.search.pageNum -= 1;
              this.getMaintenanceItemData(this.type);
            }
          }
        })
      },
      // 新增参数
      addParameter() {
        if (this.params.length > 9) {
          this.$message.error("最多10个参数");
          return;
        }
        this.params.push(
          {value: '', name: ''});
      },
      // 新增集合类型弹框中的确定
      addSubmit() {
        if (this.setsName.length == 0) {
          this.$message.error("集合名称不可为空");
          return;
        }
        if (this.params.length == 0) {
          this.$message.error("至少需要一个参数");
          return;
        }
        for (let i = 0; i < this.params.length; i++) {
          let p = this.params[i];
          if (p.name.length == 0) {
            this.$message.error("参数值不可为空");
            return;
          }
        }
        this.loading = true;
        let param = {};
        param.type = this.checked;
        param.value = JSON.stringify(this.params);
        param.name = this.setsName;
        addSetsItem(param).then(res => {
          if (res.httpCode == 200) {
            this.dialogSetsVisible = false;
            this.loading = false;
            this.$message.success("添加成功");
            this.setsName = '';
            this.checked = false;
            this.params = [
              {value: '', name: ''}
            ]
          }
        })
      },
      // 添加被点击
      handleAddClick(data) {
        this.dialogSetsVisible = true;
      },
      // 修改被点击
      handleUpdateClick(data) {
        this.updateItem = data;
        console.log(data);
        this.dialogMaintenanceItemVisible = true;
        this.updateForm.value = data.value;
        this.updateForm.remark = data.remark;
      },
      // 删除维护项提交
      handleDeleteClick(data) {
        this.loading = true;
        let param = {};
        param.id = data.id;
        deleteMaintenanceItem(param).then(res => {
          if (res.httpCode == 200) {
            // this.$message.success("删除成功");
            this.getMaintenanceItemData(data.type);
          }
        })
      },
      // 分页
      handleSizeChange(val) {
        this.search.pageSize = val;
        this.getMaintenanceItemData(this.type);
      },
      // 分页
      handleCurrentChange(val) {
        this.search.pageNum = val;
        this.getMaintenanceItemData(this.type);
      },
      // 新增维护项
      entrywork() {
        this.dialogItemVisible = true;
      },
      // 条目维护弹框中的确定按钮点击
      onSubmit() {
        if (this.form.name.length == 0 || this.form.value.length == 0) {
          this.$message.error('请先完善好信息')
        } else {
          this.addItemAttributes(this.form.name, this.form.value, this.form.remark);
          this.getMaintenanceItemData(this.type);
        }
      },
      // 增加条目属性接口
      addItemAttributes(type, value, remark) {
        this.loading = true;
        let param = {};
        param.type = type;
        param.value = value;
        param.remark = remark;
        addItemAttributesData(param).then(res => {
          if (res.httpCode == 200) {
            let index = "";
            switch (this.form.name) {
              case "REGION":
                index = "first";
                break;
              case "GATEGORY":
                index = "second";
                break;
              case "EDGE":
                index = "third";
                break;
              case "LEVEL":
                index = "fifth";
                break;
              case "MODE":
                index = "sixth";
                break;
            }
            // 添加成功后tab跟着跳转到刚刚添加的那一类上
            this.activeName = index
            this.getMaintenanceItemData(this.form.name);
            // 清空数据
            this.form.name = '';
            this.form.value = '';
            this.form.remark = '';
            this.dialogItemVisible = false;
            // this.$message.success("添加成功");
          }
        })
      },
      // 修改维护项提交
      updataSubmit() {
        if (this.updateForm.value.length == 0) {
          this.$message.error("输入值不可为空");
          return;
        }
        if ((this.updateForm.value === this.updateItem.value) && (this.updateForm.remark === this.updateItem.remark)) {
          this.$message.error("并未修改，就不要确定了");
        } else {
          let param = {};
          param.id = this.updateItem.id;
          param.type = this.updateItem.type;
          param.value = this.updateForm.value;
          param.remark = this.updateForm.remark;
          addItemAttributesData(param).then(res => {
            if (res.httpCode == 200) {
              this.dialogMaintenanceItemVisible = false;
              // this.$message.success("修改成功");
              this.getMaintenanceItemData(this.updateItem.type);
            }
          })
        }
      },
    },
    mounted() {
      this.getMaintenanceItemData("REGION");
    },
    watch: {
      form: {
        handler(curVal) {
          this.msg = 100 - curVal.remark.length
          if (curVal.remark.length == 0) {
            this.msg = '100'
          } else if (this.msg == 0) {
            this.msg = '0'
          }
        },
        deep: true,
      },
      updateForm: {
        handler(curVal) {
          this.updatemsg = 100 - curVal.remark.length
          if (curVal.remark.length == 0) {
            this.updatemsg = '100'
          } else if (this.updatemsg == 0) {
            this.updatemsg = '0'
          }
        },
        deep: true,
      }
    }
  };
</script>

<style lang="scss" scoped>

  .btns {
    float: right;
    height: 60px;
    line-height: 40px;
  }

  .block {
    margin-top: 20px;
  }

  .star {
    font-size: 26px;
    color: red;
    margin-right: 8px;
  }

  .remark {
    font-size: 26px;
    color: white;
    margin-right: 8px;
  }

  .el-form {
    margin-top: -20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;

  .el-input, .el-select, .el-textarea {
    width: 350px;
  }

  }
  .paramClass {
    margin-top: 8px;
  }
  .setsClass{
    display: flex;
    flex: 1;
  }

</style>

