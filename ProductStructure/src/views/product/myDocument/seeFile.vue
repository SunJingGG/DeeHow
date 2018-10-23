<template>
    <div v-loading="loading">
        <div style="border-bottom:1px solid #ccc;min-height:40px;" v-show="router.length>0">
            <ul style="padding:0;" class="clearfix">
                <li style="float:left;min-width:60px;height:40px;line-height:40px;font-weight:700;font-size:16px;" @click="goBack(item.dParent,item.a,index)" v-for="(item,index) in router" :key="index">
                    {{item.dName}}&nbsp;
                    <img src="../../../assets/right.png" style="display:inline-block;width:16px;height:16px;" v-show="index != router.length-1">&nbsp;
                </li>
            </ul>
            <!-- <el-button ></el-button> -->
        </div>
        <ul id="box" class="clearfix" v-if="data2.length > 0">
            <li class="item"  v-for="(item,index) in data2" :key="index">
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
                    <img class="img" src="../../../assets/filePage.png" style="display:block;" alt="">
                </div>
                <div v-else>
                    <div style="height:40px;"></div>
                    <div v-if="item.dName.includes('.doc') || item.dName.includes('.docx')">
                        <img class="img" src="../../../assets/wrod.png" style="display:block;" alt="">
                    </div>
                    <div v-else-if="item.dName.includes('.txt')">
                        <img class="img" src="../../../assets/txt.png" style="display:block;" alt="">
                    </div>
                    <div v-else-if="item.dName.includes('.pdf')">
                        <img class="img" src="../../../assets/pdf.png" style="display:block;" alt="">
                    </div>
                    <div v-else-if="item.dName.includes('.xls')">
                        <img class="img" src="../../../assets/excel.png" style="display:block;" alt="">
                    </div>
                    <div v-else-if="item.dName.includes('.png')" >
                        <img class="img" :src="'/charger-PUR-Web/purchaseContractInfo/viewImg?fileName=' 
                        + item.dName +'&filePath='+item.dAddress" >
                    </div>
                    <div v-else>
                        <img class="img" src="../../../assets/else.png" style="display:block;" alt="">
                    </div>
                </div>
                <div style="height:30px;line-height:30px;margin-top:5px;margin-bottom:5px;">
                    <div v-if="item.dClass != 1">
                        <div style="width:70%;float:left;font-weight:700;display:inline-block; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                            {{item.dName}}
                        </div>
                        <!--  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :label="item.id" :title="item.label" :key="item.id" v-show="item.dClass == 2">{{item.dName}}</el-checkbox>
                    </el-checkbox-group> -->
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
        <!--  <el-checkbox-group v-show="data2.length > 0" style="position: fixed; top: 80px; right: 31px;">
            <el-checkbox-button type="success" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox-button>
        </el-checkbox-group>
        <el-button v-show="checkedCities.length>0" @click="downLoadSelect" style="position: fixed; top: 80px; right: 200px;" type="info">下载</el-button>
        <el-button v-show="checkedCities.length>0" @click="giveUpSelect" style="position: fixed; top: 80px; right: 102px;" type="success">取消选择</el-button> -->
    </div>
</template>
<script>
import { deviceDocumentUpateFolder, deviceDocumentReadTree, deviceDocumentReadList } from "@/api/fileManagement";
export default {
    data() {
        return {

            router: [],
            checkAll: true,
            checkedCities: [],
            filePath: [],
            cities: [],
            isIndeterminate: true,
            data: {},
            addDatas: [],
            partentId: null,
            a: null,
            oneOfAdress: null,
            parentAdress: null,
            data2: [],
            loading: false,

            defaultProps: {
                children: 'children',
                label: 'dName'
            }
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
                    if (response.data.length > 0) {
                        response.data.forEach((v) => {
                            this.cities.push(v.id);
                        })
                    }
                } else {
                    this.$message.info(response.msg);
                }
            })
        },
        inFilePage(id, item) {
            this.partentId = item.dParent;
            this.parentAdress = item.dParentAddress;
            this.a = item.a;
            if (item.a == 1) {
                this.oneOfAdress = item.dAddress;
            }
            this.loading = true;
            deviceDocumentReadList({ "dParent": id }).then(response => {
                if (response.httpCode == 200) {
                    this.data2 = response.data;
                    let obj = {};
                    obj.dParent = item.dParent;
                    obj.a = item.a;
                    obj.dName = item.dName;
                    this.router.push(obj);
                    this.loading = false;


                } else {
                    this.$message.info(response.msg);
                    this.loading = false;
                }
            })
        },
        goBack(dParent, a, index) {
            let obj = {};

            obj.dParent = dParent;
            obj.a = a;


            deviceDocumentReadList(obj).then(response => {
                if (response.httpCode == 200) {
                    this.data2 = response.data;
                    let end = Number(this.router.length) - Number(index)
                    this.router.splice(index, end);


                } else {
                    this.$message.info(response.msg);
                }
            })
        },
        preImg(id) {
            alert("双击预览");
        },
        downLoadOne(id) {
            // /charger-PUR-Web/purchaseContractInfo/viewImg?fileName=' 
            //             + item.dName +'&filePath='+item.dAddress 
            console.log('charger-DEV-Web/deviceDocument/downloadDocument?id=' + id)
            self.location.href = 'charger-DEV-Web/deviceDocument/downloadDocument?id=' + id;


        },

        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        // 下载选中
        downLoadSelect() {
            this.filePath = [];
            this.data2.forEach((v, i) => {
                this.checkedCities.forEach((k, j) => {
                    if (v.id == k) {
                        this.filePath.push(v.dAddress);
                    }
                })
            })
            let string = this.filePath.toString();
            self.location.href = "/charger-DEV-Web/deviceDocument/downloadFolder?param=" + string;
            console.log("/charger-DEV-Web/deviceDocument/downloadFolder?param=" + string)
        },
        handleCheckAllChange(event) {
            this.checkedCities = event.target.checked ? this.cities : [];
            this.isIndeterminate = false;
        },
        // 取消选择
        giveUpSelect() {
            this.checkedCities = [];
        },
        uploaderSuccess(response, file, fileList) {
            if (response.httpCode == "200") {
                this.uploadFileMultipleArray = fileList;
                console.log(this.uploadFileMultipleArray)
            } else {
                this.$message({
                    type: "error",
                    message: response.msg
                });
            }
        },
        submitUpload() {

        },
        handleRemove(file, fileList) {
            this.uploadFileMultipleArray = fileList;

        },
        handlePreview(file) {
            console.log(file);
        },

        handleNodeClick(data) {
            this.data = data;
            if (this.data.children.length > 0 || this.data.children) {
                this.data.children.forEach((v) => {
                    this.cities.push(v.id);
                })
            }

        },
    }
}
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
                webkit-transition: all .8s cubic-bezier(.175, .885, .32, 1);
                transition: all .8s cubic-bezier(.175, .885, .32, 1);
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