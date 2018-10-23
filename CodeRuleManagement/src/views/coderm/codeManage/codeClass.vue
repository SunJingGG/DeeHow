<template>
  <div>
    <el-row :gutter="20" style="margin-right:0px">
      <el-col :span="5">
        <el-tree :data="treeList" :highlight-current="true" ref="tree" id="stree" style="overflow:auto" @node-click="nodeClick" node-key="id" :props="defaultProps"></el-tree>
      </el-col>
      <el-col :span="19" style="border:1px solid #ccc;padding:0" id="sView">
        <div>
          <p class="title" style="padding:10px">分类管理</p>
        </div>
        <div style="padding-right:15px;padding-top:15px;min-height:500px" >
          <div style="padding-right:15px;padding-top:15px;width:700px">
            <el-form ref="deptForm" :model="form" label-width="80px">
              <el-form-item label="分类名称" :label-width="formLabelWidth = '80px'">
                <el-input v-model="form.title" placeholder="请输入分类名称"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="请输入分类备注"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="form.id" type="primary" :loading="loading" @click.native.prevent="onSubmit">确认</el-button>
                <el-button v-if="form.id" type="warning" @click.native.prevent="removeData">删除</el-button>
                <el-button v-if="ifAddClass" type="primary" plain @click.native.prevent="addData">添加</el-button>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <p class="">温馨提示 : <el-button size="mini" @click="resatParent">点击这里</el-button>  添加顶级分类</p>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="分类管理" :visible.sync="dialogFormVisible" :modal="true">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth = '80px'">
          <el-input v-model="form.title" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" placeholder="请输入分类备注"></el-input>
        </el-form-item>
        <el-form-item label="属于" :label-width="formLabelWidth">
          {{parentName}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { readCodingClassTree , updataCodingClass , deleteCodingClass} from "@/api/codeRule"
  export default {
    data() {
      return {
        dialogFormVisible: false,
        fullscreenLoading: false,
        loading:false,
        listData: [],
        parentId:null,
        parentName:'最顶级',
        ifAddClass:true, // 是否可以添加下级
        treeList: [],
        form: {
          title: '',
          remark:'',
          parentId:'0'
        },
        formcus: {
          title: '',
          remark:'',
          parentId:'0'
        },
        defaultProps: {
          children: "children",
          label: "title"
        },
      };
    },
    methods: {
      resatParent(){
        this.parentId=null;
        this.parentName='最顶级';
        this.addData()
      },
      addData() {
        if(!this.parentId){
          this.parentId = 0;
          this.parentName = '最顶级'
        }
        this.form = Object.assign({},this.formcus)
        this.form.parentId = this.parentId;
        this.dialogFormVisible = true;
      },
      // 树被点击
      nodeClick(a) {
        if(a.parentId != '0'){
          this.ifAddClass = false;
        }else{
          this.ifAddClass = true;
        }
        let newObj = new Object();
        $.extend(true, newObj, a);
        this.form = newObj;
        this.parentId = a.id;
        this.parentName = a.title
      },
      readTreeList() {
        readCodingClassTree({})
          .then(response => {
            console.log(response);
            this.treeList = response.data;
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "数据加载失败！！！"
            });
            console.log(error)
          });
      },
      removeData() {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteCodingClass({ id: this.form.id })
              .then(res => {
                if (res.httpCode == 200) {
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                  this.readTreeList();
                  this.form = Object.assign({},this.formcus)
                } else {
                  this.$message({
                    type: "info",
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                this.$message({
                  type: "info",
                  message: "操作失败"
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      // 确认按钮被点击
      onSubmit() {
        if(this.form.title.length == 0){
          this.$message('请输入分类名称');
          return;
        }
        console.log(this.form)
        updataCodingClass(this.form)
          .then(res => {
            console.log(res);
            if (res.httpCode == 200) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.readTreeList();
              this.dialogFormVisible = false;
            } else {
              this.$message("操作失败");
            }
          })
          .catch(err => {
            this.$message("操作失败");
          });
      },
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
    }
  };
</script>

<style  lang="scss" scoped>
  .title {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-weight: 800;
  }
  .row_width {
    width: 47%;
  }
  .el-select {
    width: 100%;
  }
</style>
