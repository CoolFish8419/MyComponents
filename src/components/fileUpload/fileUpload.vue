<template>
    <div style="width: 100%;height: 100%;">
<!--        图片-->
        <div v-if="uploadType==='img'" style="width:100%;height: 100%;display: flex;justify-content: center;">
            <!--        图片上传-->
            <div class="upload-img" v-if="showUpload&&!disableUpload">
                <div class="has-img">上传图片</div>
                <input
                        type="file"
                        :name="name"
                        ref="loadFile"
                        @change="uploadFile"
                        accept="image/png, image/jpg, image/jpeg"
                />
            </div>
            <!--        禁用图片-->
            <div class="upload-img-disabled" v-if="disableUpload" @click="toastForDisabled">
                <div class="has-img has-img-disabled">上传图片</div>
                <div class="toast-disabled" v-if="toastDisabled"><p>图片上传数量已达上限</p></div>
            </div>
            <!--        已上传的图片列表-->
            <div class="img-uploaded" v-for="(item,index) in fileList" :key='index'  @mouseover="toShowBlock(index)" @mouseleave="stopShowBlock(index)">
                <img :src="item.url"/>
                <div class="icon-center" v-if="showBlock===index">
                    <div class="icon-img icon-left" @click="previewImg(index)"></div>
                    <div class="icon-img icon-right" @click="deleteFile(index)"></div>
                </div>
            </div>
        </div>
<!--        文件-->
        <div v-if="uploadType==='file'">
            <!--        文件上传-->
            <div class="upload-file" >
                <div class="has-img has-file">上传文件</div>
                <input
                        type="file"
                        :name="name"
                        ref="loadFileSec"
                        @change="uploadFile"
                />
            </div>
            <!--        已上传的文件列表-->
            <draggable v-model="innerFileList" forceFallback="true" group="people" animation="1000" >
                <transition-group>
                    <div class="file-uploaded" v-for="(item,index) in innerFileList" :key='index'>
                        <img class="file_uploaded_icon" v-if="item.name.split('.')[1]==='docx'" src="./icon_word.png"/>
                        <img class="file_uploaded_icon" v-else-if="item.name.split('.')[1]==='pptx'" src="./icon_ppt.png"/>
                        <img class="file_uploaded_icon" v-else-if="item.name.split('.')[1]==='pdf'" src="./icon_pdf.png"/>
                        <img class="file_uploaded_icon" v-else-if="item.name.split('.')[1]==='xlsx'" src="./icon_excel.png"/>
                        <img class="file_uploaded_icon" v-else src="./icon_unknow.png"/>
                        <div class="file_uploaded_txt">{{item.name}}</div>
                        <div class="icon_file_preview" @click="previewImg(index)" @mouseover="handleOver(0,index)" @mouseleave="handleLeave(0,index)">
                            <div class="icon_file_delete_txt" v-if="previewShow===index">预览文件</div>
                            <a :href="item.url" target="_blank" onclick="openPreview(event)" style="width: 100%;height: 100%;color:transparent">预览</a>
                        </div>
                        <div class="icon_file_delete" @click="deleteFile(index)" @mouseover="handleOver(1,index)" @mouseleave="handleLeave(1,index)">
                            <div class="icon_file_delete_txt" v-if="deleteShow===index">删除文件</div>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
<!--        弹窗-->
        <div class="dialog_mask"  tabindex="10"  v-show="showImg&&uploadType==='img'">
            <div class="middle_center_dialog">
                <div class="center-dlg" style="width: 300px; padding: 24px 24px 48px">
                    <div class="title-dlg">图片预览</div>
                    <div class="enquity-title" id="displayImg"></div>
                    <div class="btn-container">
                        <button class="btn-dlg" @click="hideDialog">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    import draggable from 'vuedraggable';
    export default {
        name: "imgUpload",
        components:{draggable},
        data(){
            return{
                disabled:false,
                toastDisabled:false,
                showError:false,
                showImg:false,
                innerFileList:[],
                previewIndex:'',
                deleteShow:'',
                previewShow:'',
                showBlock:'',
            }
        },
        props:{
            url:{
                type:String,
            },
            fileList:{
              type:Array,
              default:function()
              {
                  return [];
              }
            },
            headers:{
                type:Object,
            },
            limit:{
                type:Number,
                default:1,
            },
            data:{
                type:Object,
                default:function(){return {}},
            },
            name:{
              type:String,
              default:'file',
            },
            withCredentials:{
                type:Boolean,
            },
            uploadType:{
                type:String,
            }
        },
        created()
        {
            this.innerFileList=this.fileList;
        },
        watch:{
          fileList()
          {
              this.innerFileList=this.fileList;
          },
          innerFileList()
          {
            this.$emit('updateList',this.fileList);
          }
        },
        computed:{
          disableUpload(){
              if(this.limit===1)
                  return false;
              if(this.disabled || this.limit===this.fileList.length)
                  return true;
              else return false;
          },
          showUpload(){
              if(this.limit===1)
              {
                 if(this.fileList.length===this.limit)
                     return false;
                 else return true;
              }
              else return true;
          },
        },
        methods:{
            handleOver(item,index)
            {
                if(item){
                    this.deleteShow=index;
                }
                else{this.previewShow=index;}
            },
            handleLeave(item)
            {
              if(item){
                  this.deleteShow='';
              }else{this.previewShow='';}
            },
            postFile(url, data, filename) {
                let axiosInstanceFile = axios.create({
                    withCredentials: this.withCredentials,
                    headers:this.headers,
                });
                axiosInstanceFile.post(url, data).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        this.$emit('getResponse',response, filename);
                    }
                }).catch(error => {
                    console.error(error);
                })
            },
            uploadFiles(file,filename)
            {
              this.postFile(this.url,file,filename)
            },
            uploadFile()
            {
                let file='';
                if(this.uploadType==='img')
                {
                    file = this.$refs.loadFile.files[0];
                }
                else
                {
                   file = this.$refs.loadFileSec.files[0];
                }
                let formFile = new FormData();
                formFile.append("file", file);
                Object.keys(this.data).forEach(key => {
                    formFile.append(key,this.data[key]);
                });
                this.uploadFiles(formFile,file.name)
            },
            toShowBlock(index){
                this.showBlock=index;
            },
            stopShowBlock(){
              this.showBlock='';
            },
            previewImg(index){
                this.showImg=true;
                if(this.uploadType==='img')
                {
                    var divElement = document.getElementById('displayImg');
                    divElement.style.backgroundImage = 'url("'+this.fileList[index].url+'")';
                    divElement.style.backgroundSize = 'cover';
                    divElement.style.backgroundRepeat = 'no-repeat';
                    divElement.style.backgroundPosition = 'center';
                }
            },
            openPreview(event) {
                event.preventDefault(); // 阻止默认的链接跳转行为

                var fileURL = event.target.href; // 获取文件的URL

                // 打开新窗口或标签页，并加载文件预览内容
                window.open(fileURL, '_blank');
            },
            deleteFile(index){
                if(this.uploadType==='img')
                {
                    let text =
                        '<p class="ui_mar_top_8 font-size-20 font-weight ">确认删除此图片吗?</p>';
                    //这个alert为旧版本（0.0.5）的alert
                    this.$alert(
                        text,
                        (e) => {
                            if (e) {
                                this.$emit('delete',index)
                            }
                        },
                        true
                    );
                    //下为新版本alert（1.0）
                    // this.$alert({text:"确认删除此图片吗?"
                    //     ,click:(state)=>{
                    //         if(state){
                    //             this.$emit('delete',index)
                    //         }
                    //     }
                    // });
                }
                else{
                    let text =
                        '<p class="ui_mar_top_8 font-size-20 font-weight ">确认删除此文件吗?</p>';
                    //这个alert为旧版本（0.0.5）的alert
                    this.$alert(
                        text,
                        (e) => {
                            if (e) {

                                this.$emit('delete',index)
                            }
                        },
                        true
                    );
                    //下为新版本alert（1.0）
                    // this.$alert({text:"确认删除此文件吗?"
                    //     ,click:(state)=>{
                    //         if(state){
                    //             this.$emit('delete',index)
                    //         }
                    //     }
                    // });
                }
            },
            toastForDisabled(){
                let that=this;
                that.toastDisabled=true;
                setTimeout(function(){that.toastDisabled=false;},1000);
            },
            hideDialog(){
                this.showImg = false;
            },
        }
    }
</script>

<style scoped>
    .upload-img {
        display: inline-block;
        position: relative;
        width: 100px;
        height: 100px;
        background-color: transparent;
        border-radius: 4px;
        border: dotted 2px #CCCCCC;
    }
    .upload-file{
        position: relative;
        width: 350px;
        height: 32px;
        margin-bottom:8px;
        background-color: transparent;
        border-radius: 4px;
        border: dotted 2px #CCCCCC;
    }
    .upload-img-disabled{
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #EEEEEE;
        border-radius: 4px;
        border: dotted 2px #CCCCCC;
    }
    .upload-img:hover, .upload-file:hover{
        border:dotted 2px #00AAAA;
        color:rgba(0, 170, 170, 0.4);
    }
    .upload-img:hover .has-img{
        color:#00AAAA;
        background: url("./bg_upload_hover.png") no-repeat center 31px/10px 10px;
    }
    .upload-file:hover .has-img{
        color:#00AAAA;
        background: url("./bg_upload_hover.png") no-repeat 133px center/10px 10px;
    }
    .upload-img input {
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    .upload-file input{
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    .toast-disabled{
        position: absolute;
        bottom:-34px;
        left:-12px;
        width: 124px;
        height: 30px;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
    }
    .toast-disabled p {
        top: 50%;
        transform: translateY(50%);
        font-family: MicrosoftYaHei;
        line-height: 30px;
        font-size:20px;
        zoom:0.5;
        color: #666666;
    }
    .img-uploaded{
        position: relative;
        display: inline-block;
        margin-left:10px;
        width: 100px;
        height: 100px;
        background-color: transparent;
        border-radius: 4px;
    }
    .img-uploaded:hover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* 透明度为 0.5 的黑色背景 */
    }
    .file-uploaded{
        position: relative;
        display: block;
        margin-top:8px;
        width: 350px;
        height: 56px;
        background-color: #F7F8FA;
        border-radius: 4px;
    }
    .file-uploaded:first-of-type{
        margin-top:16px;
    }
    .file_uploaded_icon{
        display: inline-block;
        position: absolute;
        left:0;
        vertical-align: top;
        width: 32px;
        height: 32px;
        margin-left: 8px;
        margin-top: 12px;
        border-radius: 4px;
    }
    .file_uploaded_txt{
        display: inline-block;
        position: absolute;
        left:40px;
        height: 100%;
        width: 238px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        line-height: 56px;
        color: #333333;
        text-align: left;
        white-space: nowrap; /* 设置文字不换行 */
        overflow: hidden; /* 隐藏溢出的文字 */
        text-overflow: ellipsis; /* 使用省略号表示溢出的文字 */
    }
    .error-uploaded img{
        width: 40px;
        height: 40px;
        margin-top:calc(50% - 20px);
    }
    .has-img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        padding-top: 49px;
        font-size: 12px;
        line-height: 20px;
        color: #4E5969;
        text-align: center;
        white-space: nowrap;
        background: url("./bg_upload_normal.png") no-repeat center 31px/10px 10px;
    }
    .has-file{
        padding-top:5px;
        background: url("./bg_upload_normal.png") no-repeat 133px center/10px 10px;
    }
    .has-img-disabled{
        color:rgba(78, 89, 105, 0.4);
        background:url("./bg_upload_disable.png") no-repeat center 31px/10px 10px;
    }
    .icon-center{
        position: relative;
        top:-50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .icon-img{
        display: inline-block;
        width: 24px;
        height: 24px;
    }
    .icon-left{
        margin-right: 8px;
        background:url("./bg_preview_normal.png") center center/24px 24px;
        cursor: pointer;
        z-index: 100;
    }
    .icon-left:hover{
        background:url("./bg_preview_hover.png") center center/24px 24px;
    }
    .icon-right{
        background:url("./bg_delete_normal.png") center center/24px 24px;
        cursor: pointer;
        z-index: 100;
    }
    .icon-right:hover{
        background:url("./bg_delete_hover.png") center center/24px 24px;
    }
    .icon_file_preview{
        position: absolute;
        display: inline-block;
        width: 24px;
        height: 24px;
        right:32px;
        margin-right: 8px;
        margin-top: 16px;
        background:url("./icon_file_preview_normal.png") center center/24px 24px;
        cursor: pointer;
        z-index: 100;
        overflow: visible;
    }
    .icon_file_preview:hover{
        background:url("./icon_file_preview_hover.png") center center/24px 24px;
    }
    .icon_file_delete{
        position: absolute;
        display: inline-block;
        width: 24px;
        height: 24px;
        right:0;
        margin-right: 8px;
        margin-top: 16px;
        background:url("./icon_file_delete_normal.png") center center/24px 24px;
        cursor: pointer;
        z-index: 100;
        overflow: visible;
    }
    .icon_file_delete:hover{
        background:url("./icon_file_delete_hover.png") center center/24px 24px;
    }
    .icon_file_delete_txt{
        display: inline-block;
        position: absolute;
        top:-34px;
        left:-20px;
        width: 64px;
        height: 30px;
        font-family: MicrosoftYaHei;
        font-size: 10px;
        line-height: 30px;
        text-align: center;
        color: #666666;
        background-color: #ffffff;
        box-shadow: 0px 0px 10px 0px
        rgba(0, 0, 0, 0.08);
        border-radius: 4px;
    }
    .center-dlg{
        position: relative;
        background: #FFFFFF;
    }
    .title-dlg{
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        letter-spacing: 1px;
        color: #494949;
        border-left: 7px solid #00bf7f;
        padding-left: 12px;
    }
    .btn-container{
        position: relative;
        width: 100%;
        font-size: 0;
        text-align: center;
        box-sizing: border-box;
    }
    .btn-dlg{
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin-top: 20px;
        width: 92px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #00aaaa;
        text-align: center;
        border: 1px solid #00aaaa;
        border-radius: 4px;
        background-color: #fff;
    }
    .enquity-title {
        margin: 24px auto 20px;
        width: 200px;
        height: 200px;
    }
    .dialog_mask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        text-align: center;
        font-size: 0;
        white-space: nowrap;
        /* overflow: auto; */
        z-index: 900;
    }
    .dialog_mask:after {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    .middle_center_dialog{
        display: inline-block;
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
        text-align: left;
        white-space: normal;
        /* overflow: auto; */
        vertical-align: middle;
    }
</style>