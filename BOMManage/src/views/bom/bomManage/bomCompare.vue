<template>
  <div v-loading="loading"  element-loading-text="比较中...请耐心等待">
    <div class="row">
      <!-- <div class="col-md-12" style="margin-bottom:20px">
        <el-button style="width:100%" @click="contrastBom">版本比较</el-button>
      </div> -->
      <div class="col-md-6">
        <div class="panel" style="min-height:200px">
          <!-- <div class="panel-heading">
            选择主版本
          </div> -->
          <div class="panel-body" style="text-align:center">
            <!-- <el-collapse v-model="activeNames">
              <el-collapse-item v-for="(item,index) in productTree" :key="index" :title="item.label" :name="index">
                <el-radio v-for="(v,i) in item.children" :key="i" v-model="banBeng" :label="v.data.id">{{v.label}}</el-radio>
              </el-collapse-item>
            </el-collapse> -->
            <!-- <div class="select-bom">
              <i class="el-icon-plus"></i>
            </div> -->
            <template v-if="banBeng">
              <p @click="selectVersion(1)">{{banBeng.showName}}</p>
            </template>
            <template v-else>
              <p>
                <el-button type="text" icon="el-icon-plus" style="font-size:100px"  @click="selectVersion(1)"></el-button>
              </p>
              <p>
                <el-button type="text"  @click="selectVersion(1)">点击选择主版本</el-button>
              </p>
            </template>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel" style="min-height:200px">
          <!-- <div class="panel-heading">
            选择副版本
          </div> -->
          <div class="panel-body" style="text-align:center">
            <!-- <el-collapse v-model="activeNames">
              <el-collapse-item v-for="(item,index) in productTree" :key="index" :title="item.label" :name="index">
                <el-radio v-for="(v,i) in item.children" :key="i" v-model="banBeng1" :label="v.data.id">{{v.label}}</el-radio>
              </el-collapse-item>
            </el-collapse> -->
            <template v-if="banBeng2">
              <p @click="selectVersion(2)">{{banBeng2.showName}}</p>
            </template>
            <template v-else>
              <p>
                <el-button type="text" icon="el-icon-plus" style="font-size:100px" @click="selectVersion(2)"></el-button>
              </p>
              <p>
                <el-button type="text"  @click="selectVersion(2)">点击选择比较版本</el-button>
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="请选择产品版本" :visible.sync="dialogFormVisible">
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="(item,index) in productTree" :key="index" :title="item.label" :name="index">
            <el-radio v-for="(v,i) in item.children" :key="i" v-model="version" :label="v.data.id">{{v.label}}</el-radio>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmVersion">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { readProductTree , bomVersionCompare } from "@/api/bom";
export default {
  data() {
    return {
      productTree: [],
      versionList: [],
      version:'',
      banBeng: null,
      banBeng2: null,
      whatIs:'',
      activeNames: [],
      dialogFormVisible:false,
      loading:false,
    };
  },
  methods: {
    readData() {
      readProductTree({})
        .then(res => {
          this.productTree = res.data;
          this.productTree.forEach(v=>{
            if(v.children){
              v.children.forEach(a=>{
                this.versionList.push(a)
              })
            }
          });
          console.log(this.versionList)
        })
        .catch(err => {
          console.log(err);
        });
    },
    contrastBom(){
      this.loading = true;
      bomVersionCompare({version1:this.banBeng.data.id,version2:this.banBeng2.data.id}).then(res=>{
        console.log(res)
        this.$router.push({ name: "比较预览", params: { data: res.data } });
      }).catch(err=>{
        console.log(err)
        this.loading = true;

      })
    },
    selectVersion(whatIs){
      this.whatIs = whatIs;
      this.dialogFormVisible = true;

    },
    confirmVersion(){
      let obj = this.versionList.find((a,b,c)=>{
        return a.data.id == this.version;
      })
      let pro = this.productTree.find((a,b,c)=>{
        return obj.parentId == a.data.id;
      })
      console.log(pro)
      console.log(obj)
      if(this.whatIs==1){
        this.banBeng = obj
        this.banBeng.showName = pro.label+'>'+obj.label;
      }else if(this.whatIs==2){
        this.banBeng2 = obj
        this.banBeng2.showName = pro.label+'>'+obj.label;
      }
      console.log(this.banBeng)
      console.log(this.banBeng2)
      if(this.banBeng&&this.banBeng2){
        this.contrastBom()
      }
      this.version = null;
      this.dialogFormVisible = false;
    }
  },
  mounted() {
    this.readData();
  }
};
</script>

<style lang="scss" scoped>

</style>
