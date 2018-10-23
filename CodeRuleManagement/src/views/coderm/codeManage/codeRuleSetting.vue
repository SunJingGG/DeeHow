<template>
  <div>
    <el-row :gutter="20" style="margin-right:0px">
      <el-col :span="5">
        <el-tree :default-expand-all="true" :data="treeList" :highlight-current="true" ref="tree" id="stree"
                 style="overflow:auto" @node-click="nodeClick" node-key="id" :props="defaultProps"></el-tree>
      </el-col>
      <el-col :span="19" style="border:1px solid #ccc;padding:0" id="sView">
        <div>
          <p class="title" style="padding:10px">规则设置</p>
        </div>
        <div style="padding-right:15px;padding-top:15px;min-height:500px" v-loading="fullscreenLoading">
          <el-col :span="24">
            <!-- 是末级 -->
            <div v-if="isLastStage">
              <table class="table inheritTable">
                <tr v-for="(v,i) in ruleSetList">
                  <td style="width:100px">第{{i + 1}}段</td>
                  <td style="width:200px">
                    <el-select v-model="v.type" placeholder="请选择" style="width:100%" @change="changeType(i)">
                      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"
                                 :disabled="item.disabled"></el-option>
                    </el-select>
                  </td>
                  <td style="width:200px">
                    <el-input v-model="v.value" v-if="v.type == 1" onkeyup="this.value=this.value.replace(/[^a-zA-Z]/g,'')" placeholder="请输入字母"></el-input>
                    <el-input v-model="v.value" v-if="v.type == 2" placeholder="不能为字母数字汉字"
                              @blur="testReg(i)"></el-input>
                    <el-input v-model="v.value" v-if="v.type == 3" placeholder="" :disabled="true"></el-input>
                    <el-input v-model="v.value" v-if="v.type == 4" placeholder="请输入位数" type="number"></el-input>
                  </td>
                  <td style="width:200px">
              <span style="padding:5px;background:#dfdfdf;border-radius:6px;color:#fff" v-if="v.value">
              <template v-if="v.type !=4 ">{{v.value}}</template><template
                v-if="v.type == 4">{{v.value | filterNumber}}</template>
              </span>
                  </td>
                  <td style="width:240px">
                    <el-button type="primary" plain @click="addLine(i)">添加</el-button>
                    <el-button type="danger" plain @click="removeLine(i)">删除</el-button>
                  </td>
                </tr>
              </table>
            </div>
            <!-- 不是末级 -->
            <div v-else>
              请选择末级分类进行编辑
            </div>
            <div v-if="isLastStage">
              编码预览：
              <template v-for="v in ruleSetList">
                <template v-if="v.type !=4 ">{{v.value}}</template>
                <template v-if="v.type == 4">{{v.value | filterNumber}}</template>
              </template>
            </div>
            <div style="text-align:center;padding-top:20px" v-if="isLastStage">
              <el-button :plain="true" type="success" @click="onSubmit">应 用</el-button>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {readCodingClassTree, updataCodingRule, readCodingRuleList} from "@/api/codeRule"

  export default {
    data() {
      return {
        dialogFormVisible: false,
        fullscreenLoading: false,
        parentId: null,
        isLastStage: false, // 是不是末级
        treeList: [],
        ruleSetList: [],
        codeCategoryId: '', // 分类id
        ruleDetails: {
          stage: null,
          type: null,
          value: null,
        },
        defaultProps: {
          children: "children",
          label: "title"
        },
        typeOptions: [
          {
            value: '1',
            label: '自定义'
          }, {
            value: '2',
            label: '分隔符'
          }, {
            value: '3',
            label: '日期'
          },
          {
            value: '4',
            label: '流水号',
          }
        ],
      };
    },
    methods: {
      // 添加一行
      addLine(index) {
        this.ruleSetList.push({
          stage: null,
          type: null,
          value: null,
        });
        let type = this.ruleSetList[index].type;
        if (type != 1) {
          this.typeOptions.forEach((v) => {
            if (v.value == type) {
              v.disabled = true;
            }
          })
        }
      },
      changeType(index) {
        this.typeOptions.forEach((v) => {
          v.disabled = false;
        })
        this.ruleSetList[index].value = '';
        this.ruleSetList.forEach((val) => {
          this.typeOptions.forEach((v) => {
            if (v.value == val.type && v.value != 1) {
              v.disabled = true;
            }
          })
        })
        let type = this.ruleSetList[index].type;
        if (type == 3) {
          let sdate = new Date();
          let y = sdate.getFullYear();
          let m = sdate.getMonth() + 1;
          if (m < 10) {
            m = "0" + m
          }
          let d = sdate.getDate();
          if (d < 10) {
            d = "0" + d
          }
          this.ruleSetList[index].value = y.toString() + m.toString() + d.toString()
        }

      },
      testReg(index) {
        let value = this.ruleSetList[index].value;
        // if(type == )
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？-]");
        let str = "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？-]"
        console.log(pattern.test(value))
        if (!str.includes(value)) {
          this.ruleSetList[index].value = "-";
          this.$message({
            type: "info",
            message: "可以输入`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？-"
          });
        }

      },
      // 删除某行
      removeLine(index) {
        let type = this.ruleSetList[index].type;
        if (type != 1) {
          this.typeOptions.forEach((v, i) => {
            if (v.value == type) {
              v.disabled = false;
            }
          })
        }
        this.ruleSetList.splice(index, 1);
      },
      // 树节点被点击
      nodeClick(a, b) {
        this.codeCategoryId = a.id
        if (b.level == 1) {
          this.isLastStage = false;
        } else {
          this.fullscreenLoading = true;
          this.isLastStage = true;
          this.ruleSetList = [];
          readCodingRuleList({codeCategoryId: a.id})
            .then(res => {
              console.log(res);
              this.fullscreenLoading = false;
              this.typeOptions.forEach((v) => {
                v.disabled = false;
              })
              if (res.data.length > 0) {
                this.ruleSetList = res.data;
                // this.typeOptions.forEach((v) => {
                //   // if (v.value == val.type && v.value != 1) {
                //     v.disabled = false;
                //   // }
                // })
                this.ruleSetList.forEach((val) => {
                  this.typeOptions.forEach((v) => {
                    if (v.value == val.type && v.value != 1) {
                      v.disabled = true;
                    }
                  })
                })
              } else {
                this.ruleSetList.push(this.ruleDetails);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      readTreeList() {
        readCodingClassTree({})
          .then(response => {
            console.log(response);
            this.treeList = response.data;
          })
          .catch(error => {
            this.$message.error("数据加载失败");
            console.log(error)
          });
      },
      // 应用
      onSubmit() {
        let ifLiushui = false;
        let isLegay = false;
        let isNull = false;
        this.ruleSetList.forEach((v, i) => {
          if ((v.value == null || v.value.length == 0) && v.type != 4) {
            isNull = true;
          }
          if ((v.value == null || v.value.length == 0 || v.value <= 0) && v.type == 4) {
            isLegay = true;
          }
          if (v.type == 4) {
            ifLiushui = true;
          }
          v.stage = (i + 1).toString();
        })
        if (isNull) {
          this.$message("有值为空，请检查");
          return;
        }
        if (isLegay) {
          this.$message("流水号不合法，请检查");
          return;
        }
        if (!ifLiushui) {
          this.$message("请选择个流水号并确保不重复");
          return;
        }
        let params = {};
        params.codeCategoryId = this.codeCategoryId;
        params.ruleDetails = this.ruleSetList;
        updataCodingRule(params)
          .then(res => {
            console.log(res);
            if (res.httpCode == 200) {
              this.$message.success("操作成功");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => {
            this.$message("操作失败");
          });
      }
    },
    mounted() {
      var stree = document.getElementById("stree");
      let clHeight = $(window).height();
      stree.style.height = clHeight - 80 + "px";
      $(window).resize(v => {
        $("#stree").height($(window).height() - 80);
        $("#sView").height($(window).height() - 80);
      });
      this.readTreeList();
      // this.getInventoryAttribute();
    },
    filters: {
      filterNumber(value) {
        let str = ""
        for (var i = 0; i < Number(value); i++) {
          if (i == (Number(value) - 1)) {
            str += "1"
          } else {
            str += "0"
          }
        }
        return str
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-weight: 800;
  }

  .inheritTable tr td {
    text-align: center;
    vertical-align: inherit;
  }

  .el-select {
    width: 100%;
  }
</style>
