<template>
  <div v-loading="loading">
    <div  v-show="classRouter.length>0">
      <ol class="breadcrumb" style="margin-bottom: 0px;">
        <li v-for="(item,index) in classRouter" :key="index"  @click="goBack(item.dParent,item.dParentIs,index)"><a >{{item.dName}}</a></li>
      </ol>
    </div>
    <hr>
    <ul id="box" class="clearfix" v-if="data2.length > 0">
      <li class="item" v-for="(item,index) in data2" :key="index">
        <div class="tip" v-if="item.dClass == 1">
          <p>创建人:{{item.createName}}</p>
          <p>创建时间:{{item.createTime}}</p>
        </div>
        <div class="tip" v-else>
          <p>上传者:{{item.createName}}</p>
          <p>上传时间:{{item.createTime}}</p>
        </div>
        <div v-if="item.dClass == 1" @dblclick="inFilePage(item.id,item)">
          <div style="height:40px;"></div>
          <img class="img" src="../../../assets/document/filePage.png" style="display:block;" alt="">
        </div>
        <div v-else>
          <div style="height:40px;"></div>
          <div v-if="item.dName.includes('.doc') || item.dName.includes('.docx')">
            <img class="img" src="../../../assets/document/wrod.png" style="display:block;" alt="">
          </div>
          <div v-else-if="item.dName.includes('.txt')">
            <img class="img" src="../../../assets/document/txt.png" style="display:block;" alt="">
          </div>
          <div v-else-if="item.dName.includes('.pdf')">
            <img class="img" src="../../../assets/document/pdf.png" style="display:block;" alt="">
          </div>
          <div v-else-if="item.dName.includes('.xls')">
            <img class="img" src="../../../assets/document/excel.png" style="display:block;" alt="">
          </div>
          <div v-else-if="item.dName.includes('.png')">
            <img class="img" :src="'/charger-PUR-Web/purchaseContractInfo/viewImg?fileName=' 
                        + item.dName +'&filePath='+item.dAddress">
          </div>
          <div v-else> 
            <img class="img" src="../../../assets/document/else.png" style="display:block;" alt="">
          </div>
        </div>
        <div style="height:30px;line-height:30px;margin-top:5px;margin-bottom:5px;">
          <div v-if="item.dClass != 1">
            <div style="width:70%;float:left;font-weight:700;display:inline-block; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              {{item.dName}}
            </div>
            <div class="delate" @click="downLoadOne(item.id)" v-show="item.dClass == 2">下载</div>
          </div>
          <div v-else style="width:100%;font-weight:700;float:left;text-align:center;display:inline-block; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
            {{item.dName}}
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      暂无数据~~
    </div>
  </div>
</template>
<script>
import {
  deviceDocumentUpateFolder,
  deviceDocumentReadTree,
  deviceDocumentReadList
} from "@/api/flm";
export default {
  data() {
    return {
      classRouter: [],
      data: {},
      partentId: null,
      dParentIs: null,
      oneOfAdress: null,
      parentAdress: null,
      data2: [],
      loading: false,
    };
  },
  mounted() {
    this.readerData();
  },
  methods: {
    readerData() {
      let obj = {};
      obj.dClass = "1";
      deviceDocumentReadTree(obj).then(response => {
        if (response.httpCode == 200) {
          this.data2 = response.data;
        } else {
          this.$message.info(response.msg);
        }
      });
    },
    inFilePage(id, item) {
      this.partentId = item.dParent;
      this.parentAdress = item.dParentAddress;
      this.dParentIs = item.dParentIs;
      console.log(item)
      if (item.dParentIs == 1) {
        this.oneOfAdress = item.dAddress;
      }
      this.loading = true;
      deviceDocumentReadList({ dParent: id }).then(response => {
        if (response.httpCode == 200) {
          this.data2 = response.data;
          let obj = {};
          obj.dParent = item.dParent;
          obj.dParentIs = item.dParentIs;
          obj.dName = item.dName;
          this.classRouter.push(obj);
          this.loading = false;
        } else {
          this.$message.info(response.msg);
          this.loading = false;
        }
      });
    },
    goBack(dParent, a, index) {
      let obj = {};
      obj.dParent = dParent;
      obj.dParentIs = a;
      deviceDocumentReadList(obj).then(response => {
        if (response.httpCode == 200) {
          this.data2 = response.data;
          let end = Number(this.classRouter.length) - Number(index);
          this.classRouter.splice(index, end);
        } else {
          this.$message.info(response.msg);
        }
      });
    },
    downLoadOne(id) {
      console.log("deehow-ELIBM-Web/document/download/document?id=" + id);
      self.location.href =
        "deehow-ELIBM-Web/document/download/document?id=" + id;
    },
  }
};
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}

.el-tree {
  border: none;
}

#box {
  margin: 0;
  padding: 0;
  .item {
    overflow: hidden;
    cursor: pointer;
    height: 240px;
    margin: 0 1%;
    width: 14%;
    float: left;
    position: relative;
    margin-bottom: 30px;
    &:hover {
      background: #f5fbff;
      border: 1px solid #dceaff;
      .tip {
        display: block;
        top: 0px;
        webkit-transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1);
        transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1);
      }
    }
  }
  .img {
    padding-top: 5px;
    min-width: 150px;
    height: 158px;
    margin: 0 auto;
  }
  .close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 15px !important;
    height: 15px; // display:none;
  }
  .word {
    text-align: center;
    margin-top: 5px;
    font-weight: 700;
  }
  .tip {
    position: absolute;
    background: #ccdce6;
    top: -48px;
    left: 0px;
    width: 100%;
    height: 48px;
    margin: 0 auto;
    p {
      color: #666;
      font-weight: 700;
    }
  }
}

.delate {
  display: inline-block;
  width: 25%;
  float: left;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #50bfff;
  }
}
</style>