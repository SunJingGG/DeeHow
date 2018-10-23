<template>
  <div style="display: flex;flex-direction: column">
    <div>
      <div class="title">
        <span>条目添加</span>
      </div>
      <el-form :inline="true" :rules="rules" :model="form" class="demo-form-inline" label-width="120px" ref="allform">
        <el-form-item label="条目名称：" prop="entryName">
          <el-input v-model="form.entryName" placeholder="请输入条目名称"></el-input>
        </el-form-item>
        <el-form-item label="条目标识：" prop="entryIdentification">
          <el-input v-model="form.entryIdentification" placeholder="请输入条目标识"></el-input>
        </el-form-item>
        <el-form-item label="方式：" prop="mode">
          <el-select v-model="form.mode" placeholder="请选择方式">

            <el-option v-for="(item,index) in mode" :key="index" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" prop="type" v-show="modelShow">
          <el-select v-model="form.type" placeholder="请选择类型" @change="typeItemChange">
            <el-option v-for="(item,index) in type" :key="index" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线上检测值：" v-if="form.type==='整数型'" prop="onLineValue">
          <el-input v-model.number="form.onLineValue" onkeyup="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入检测值(整数型)"></el-input>
        </el-form-item>
        <el-form-item label="线上检测值：" v-else-if="form.type==='浮点型'" prop="onLineValue">
          <el-input v-model.number="form.onLineValue" onkeyup="value=value.replace(/[^\d.]/g,'')"
                    placeholder="请输入检测值(浮点型)"></el-input>
        </el-form-item>
        <el-form-item label="线上检测值：" v-else-if="form.type==='字符串型'" prop="onLineValue">
          <el-input v-model.number="form.onLineValue" placeholder="请输入检测值"></el-input>
        </el-form-item>
        <el-form-item label="线上检测值：" v-else-if="form.type==='布尔型'" prop="onLineValue">
          <el-select v-model="form.onLineValue" placeholder="请选择类型">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择集合类型：" v-else-if="form.type==='集合型'" prop="collectionValue" v-show="modelShow">
          <el-select v-model="form.collectionValue" placeholder="请选择集合类型">
            <el-option v-for="(item,index) in setsTypeList" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择值：" v-if="setsTypeItemList.type=='true'" prop="setsTypeItemList" v-show="modelShow">
          <el-select v-model="form.value" placeholder="请选择值" multiple>
            <el-option v-for="(item,index) in setsTypeItemList.value" :key="index" :label="item.name"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <span v-else-if="setsTypeItemList.type=='false'" v-show="modelShow">
      <el-form-item v-for="(item,index) in setsTypeItemList.value" :key="index" :label="item.name">
        <el-input v-model="item.value" placeholder="请输入值"></el-input>
      </el-form-item>
      </span>
        <el-form-item label="级别：" prop="level">
          <el-select v-model="form.level" placeholder="请选择级别">
            <el-option v-for="(item,index) in level" :key="index" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="值：" prop="value">-->
        <!--<el-input v-model="form.value" placeholder="请输入值" onkeyup="value=value.replace(/[^\d.]/g,'')"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="排序号：" prop="sort">-->
        <!--<el-input v-model="form.sort" placeholder="请输入排序号" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="指定区域：" prop="region">-->
        <!--<el-select v-model="form.region" placeholder="请选择指定区域">-->
        <!--<el-option v-for="(item,index) in region" :key="index" :label="item.value" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="器件种类1：" prop="gategoryOne">-->
        <!--<el-select v-model="form.gategoryOne" placeholder="请选择器件种类1">-->
        <!--<el-option v-for="(item,index) in gategory" :key="index" :label="item.value" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="器件种类2：" prop="gategoryTwo">-->
        <!--<el-select v-model="form.gategoryTwo" placeholder="请选择器件种类2">-->
        <!--<el-option v-for="(item,index) in gategory" :key="index" :label="item.value" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="边1：" prop="edgeOne">-->
        <!--<el-select v-model="form.edgeOne" placeholder="请选择边1">-->
        <!--<el-option v-for="(item,index) in edge" :key="index" :label="item.value" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="边2：" prop="edgeTwo">-->
        <!--<el-select v-model="form.edgeTwo" placeholder="请选择边2">-->
        <!--<el-option v-for="(item,index) in edge" :key="index" :label="item.value" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <br>
      </el-form>
    </div>
    <!-- 下方布局 -->
    <div style="display: flex;margin-top: 15px;">
      <!-- 下方左侧 -->
        <!-- 下方左侧 -->
        <div style="display: flex;">
            <el-upload ref="upload1" :auto-upload="false"
                       list-type="picture"
                       class="upload"
                       :limit="10"
                       action="deehow-ERULEM-Web/erulem/anon/entry/upload/picture" :on-preview="handlePreview"
                       :on-remove="handleRemove" multiple :on-exceed="handleExceed" :file-list="pngList"
                       :on-error="handleError"
                       :on-success="handleSuccess" :before-upload="beforePngUpload" accept=".jpg,.png,.gif">
              <el-button size="small" type="primary" slot="trigger">选择条目图片</el-button>
              <el-button size="small" type="success" @click="submitUpload1">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件</div>
            </el-upload>
        </div>
        <!-- 下方中间 -->
        <div style="display: flex;">
          <el-upload class="upload" ref="upload2" :auto-upload="false"
                     :limit="10"
                     action="deehow-ERULEM-Web/erulem/anon/entry/upload/document" :on-preview="handlePreview"
                     :on-remove="handleRemove1" multiple :on-exceed="handleExceed" :file-list="fileList"
                     :on-success="sucfile" :before-upload="beforePdfUpload" accept=".pdf">
            <el-button size="small" type="primary" slot="trigger">选择技术文档</el-button>
            <el-button size="small" type="success" @click="submitUpload2">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
          </el-upload>
        </div>
      <!-- 下方右侧 -->
      <div style="display: flex;flex: 1;flex-direction: column;">
        <div style="display: flex;flex: 1;flex-direction: column;">
          <el-input :autosize="{ minRows: 4, maxRows: 10}" type="textarea" maxlength="1000"
                    v-model="form.remark" placeholder="请输入条目描述，不能超过1000字"></el-input>
          <div style="display: flex;justify-content: space-between">
            <span></span>
            <span>还可输入<b v-text="msg"></b>字</span>
          </div>
        </div>
        <div slot="footer" class="operateClass">
          <span></span>
          <div>
            <el-button type="primary" @click="onSubmit">确 认</el-button>
            <el-button @click="reset">取 消</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {addEntry, uphodeLists, entryPicture, entryFile, readSetsItem} from "@/api/rules";

  export default {
    data() {
      return {
        modelShow: false,
        fullscreenLoading: false,
        dataFile: "",
        msg: 1000,
        editdata: {},
        pngList: [],
        fileList: [],
        uphodeList: [],
        setsTypeList: [],
        setsTypeItemList: [],
        region: [],
        gategory: [],
        edge: [],
        type: [],
        level: [],
        mode: [],
        pngs: [],
        pdfs: [],
        lastType: '',
        form: {
          id: "",
          modelId: "",
          entryName: "",
          entryIdentification: "",
          sort: "",
          region: "",
          gategoryOne: "",
          gategoryTwo: "",
          edgeOne: "",
          edgeTwo: "",
          type: "",
          value: [],
          level: "",
          mode: "",
          onLineValue: "",
          img: '',
          technologyFiles: '',
          remark: "",
          collectionValue: "",
          collectionItemValue: "",
        },
        form1cus: {
          id: "",
          modelId: "",
          entryName: "",
          entryIdentification: "",
          sort: "",
          region: "",
          gategoryOne: "",
          gategoryTwo: "",
          edgeOne: "",
          edgeTwo: "",
          type: "",
          value: "",
          level: "",
          mode: "",
          onLineValue: "",
          img: "",
          technologyFiles: "",
          remark: ""
        },
        rules: {
          entryName: [
            {required: true, message: "请输入条目名称", trigger: "blur"}
          ],
          entryIdentification: [
            {required: true, message: "请输入条目标识", trigger: "blur"}
          ],
          onLineValue: [
            {required: true, message: "线上检测值不可为空", trigger: "blur"},
            // { type: 'number', message: '检测值必须为数字'}
          ],
          collectionValue: [
            {required: true, message: "请选择集合类型", trigger: "change"}
          ],
          temp: [
            {required: true, message: "请输入值", trigger: "blur"},
          ],
          level: [
            {required: true, message: "请选择级别", trigger: "blur"},
          ],
          mode: [
            {required: true, message: "请选择方式", trigger: "blur"},
          ],
          // edgeOne: [{ required: true, message: "请选择边1", trigger: "change" }],
          // edgeTwo: [{ required: true, message: "请选择边2", trigger: "change" }],
          type: [{required: true, message: "请选择类型", trigger: "change"}],

        }
      };
    },
    methods: {
      onSubmit() {
        // console.log(this.form)
        // console.log('setsTypeItemList：：：')
        // console.log(this.setsTypeItemList.value);
        // return;
        if (this.form.mode == '自动') {
          if (this.setsTypeItemList.type == 'false') {
            let temp = '';
            for (let i = 0; i < this.setsTypeItemList.value.length; i++) {
              if (this.setsTypeItemList.value[i].value.length == 0) {
                this.$message.error("参数值不可以为空");
                return;
              }
              temp += this.setsTypeItemList.value[i].value + ','
            }
            console.log(temp);
            if (temp.length > 0) {
              this.form.value = temp.slice(0, temp.length - 1);
            }
          } else {
            if (this.form.value.length == 0) {
              this.$message.error("参数值不可以为空");
              return;
            }
            this.form.value = JSON.stringify(this.form.value)
          }
        }

        this.form.img = '';
        this.form.technologyFiles = '';
        for (let i = 0; i < this.pngs.length; i++) {
          this.form.img += ',' + this.pngs[i];
        }
        if (this.form.img.indexOf(",") == 0) {
          this.form.img = this.form.img.substring(1, this.form.img.length);
        }
        this.form.img = this.form.img.substring(0, this.form.img.length);
        for (let i = 0; i < this.pdfs.length; i++) {
          this.form.technologyFiles += ',' + this.pdfs[i];
        }
        if (this.form.technologyFiles.indexOf(",") == 0) {
          this.form.technologyFiles = this.form.technologyFiles.substring(1, this.form.technologyFiles.length);
        }
        // todo:先这样后面再改
        if (this.form.mode == '自动') {
          if (
            this.form.entryName != "" &&
            this.form.entryIdentification != "" &&
            this.form.type != "" &&
            this.form.level != ""
          ) {
            addEntry(this.form).then(res => {
              console.log(res);
              if (res.httpCode == 200) {
                this.$message.success("操作成功");
                // this.form = {};
                this.novalue();
                this.$router.replace({path: "/RULEBASE/myBaseRule/ruleManage"});
              } else {
              }
            });
          } else {
            this.$message.error("条目数据不能为空");
          }
        } else {
          if (
            this.form.entryName != "" &&
            this.form.entryIdentification != "" &&
            this.form.level != ""
          ) {
            addEntry(this.form).then(res => {
              console.log(res);
              if (res.httpCode == 200) {
                this.$message.success("操作成功");
                // this.form = {};
                this.novalue();
                this.$router.replace({path: "/RULEBASE/myBaseRule/ruleManage"});
              } else {
              }
            });
          } else {
            this.$message.error("条目数据不能为空");
          }
        }


      },
      // 图片上传成功回调
      handleSuccess(res, file) {
        this.$message.success("图片上传成功");
        console.log(res);
        this.pngs.push(res.filePath);
        console.log(this.pngs);
      },
      // 图片上传失败回调
      handleError(err, file, fileList){
        console.log('图片上传失败')
        console.log(err)
      },
      sucfile(res, file) {
        console.log(res);
        this.pdfs.push(res.filePath);
      },
      readData() {
        // 获取所有的维护项
        uphodeLists({}).then(res => {
          this.uphodeList = res.data;
          // console.log('获取所有的维护项');
          // console.log(this.uphodeList);
          // console.log('刚开始setsTypeItemList：：：')
          // console.log(this.setsTypeItemList.value);
          for (let i = 0; i < this.uphodeList.length; i++) {
            if (this.uphodeList[i].type == "REGION") {
              this.region.push(this.uphodeList[i]);
            } else if (this.uphodeList[i].type == "GATEGORY") {
              this.gategory.push(this.uphodeList[i]);
            } else if (this.uphodeList[i].type == "EDGE") {
              this.edge.push(this.uphodeList[i]);
            } else if (this.uphodeList[i].type == "TYPE") {
              this.type.push(this.uphodeList[i]);
            } else if (this.uphodeList[i].type == "LEVEL") {
              this.level.push(this.uphodeList[i]);
            } else if (this.uphodeList[i].type == "MODE") {
              this.mode.push(this.uphodeList[i]);
            }
          }
        });
      },
      novalue() {
        if (this.$refs["allform"] !== undefined) {
          this.$refs["allform"].resetFields(); // 清除表单验证
        }
      },
      // addEntry() {
      //   this.form = Object.assign({}, this.formcus);
      // },
      editEntry() {
        this.form = Object.assign({}, this.editdata);
      },
      reset() {
        // this.form={};
        this.novalue();
        this.$router.replace({path: "/RULEBASE/myBaseRule/ruleManage"});
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        for (let i = 0; i < this.pngs.length; i++) {
          if (this.pngs[i] == file.name) {
            this.pngs.splice(i, 1);
            break;
          }
        }
      },
      handleRemove1(file, fileList) {
        console.log(file, fileList);
        for (let i = 0; i < this.pdfs.length; i++) {
          if (this.pdfs[i] == file.name) {
            this.pdfs.splice(i, 1);
            break;
          }
        }
        console.log(this.pdfs);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitUpload1() {
        this.$refs.upload1.submit();
      },
      submitUpload2() {
        this.$refs.upload2.submit();
      },
      beforePngUpload(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpg';
        const isJPEG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isGIF && !isPNG && !isJPEG) {
          this.$message.error("上传图片格式不正确,请重新选择");
          return false;
        }
        return (isJPG || isGIF || isPNG || isJPEG);
      },
      beforePdfUpload(file) {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          this.$message.error("上传文件格式不正确,请重新选择");
          return false;
        }
        return (isPDF);
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      typeItemChange(value) {
        console.log(value)
        if (this.lastType != value) {
          this.form.onLineValue = '';
        }
        this.lastType = value;

      }
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${file.name}？`);
      // },
    },
    computed: {
      newType() {
        return this.form.type
      },
      newCollectionValue() {
        return this.form.collectionValue
      },
      newMode() {
        return this.form.mode
      },
      newRemark() {
        return this.form.remark
      },
    },
    watch: {
      // 监听remark的改变
      newRemark(val) {
        this.msg = 1000 - val.length
        if (val.length == 0) {
          this.msg = 1000
        } else if (this.msg == 0) {
          this.msg = 0
        }
      },
      // 监听form.type的改变
      newType(val, oldVal) {
        if (val == '集合型') {
          // 获取所有的集合类型
          readSetsItem({}).then(res => {
            this.setsTypeList = res.data;
          })
        }
      },
      // 监听form.collectionValue的改变
      newCollectionValue(val) {
        console.log(val);
        this.form.value = [];
        // 获取选中的集合类型里的值
        readSetsItem({"id": val, "entryId": this.form.id}).then(res => {
          res.data[0].value = JSON.parse(res.data[0].value)
          this.setsTypeItemList = res.data[0];
          console.log(this.setsTypeItemList)
        })
      },
      newMode(val, oldVal) {
        console.log(val + ',' + oldVal)
        // if(val != oldVal){
        //     this.modelShow = !this.modelShow
        // }
        if (val == '自动') {
          this.modelShow = true;
        } else {
          this.modelShow = false;
        }
      }
    },
    mounted() {
      if (this.$route.query.modelId != undefined) {
        // this.addEntry();
        this.form.modelId = this.$route.query.modelId;
      } else {
        this.editdata = JSON.parse(this.$route.query.editdata);
        let book = this.editdata.img.split(',');//把路径分割成数组
        for (let i = 0; i < book.length; i++) {
          let obj = {};
          let imgpath = book[i];
          console.log('服务器返回的图片：')
          console.log(imgpath);
          obj.name = '图片' + (i +1)
          obj.url = this.DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+imgpath
          this.pngList.push(obj);
          this.pngs.push(imgpath);//png里是字符串
        }
        console.log('图片数组中的数据：');
        console.log(this.pngList);
        let book1 = this.editdata.technologyFiles.split(',');//把路径分割成数组
        console.log(book1);
        for (let i = 0; i < book1.length; i++) {
          let obj = new Object();
          let objItem = book1[i];
          if(objItem.length > 0){
            obj.name = '文档' + (i+1);
            this.fileList.push(obj);
            this.pdfs.push(book1[i]);
          }
        }
        console.log(this.editdata);
        this.editEntry();
      }
      //console.log(this.form.modelId);
      //console.log(this.editdata);
      //console.log(this.$route.query.id);
      this.readData();
      this.novalue();
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    flex: 1;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    font-size: 17px;
  }

  .el-form {
    margin-top: 30px;

    .el-input,
    .el-select {
      width: 240px;
    }

  }

  .operateClass {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  .upload {
    width: 400px;
    padding-right: 50px;
  }
</style>

