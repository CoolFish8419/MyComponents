<template>
    <div>
        <div class="input_container" :class="{input_num:inputContent.length>0}">
            <input class="input_normal" :placeholder="placeHolder" :type="inputType"
               :class="{input_disabled:disabled,input_password_wrong:pwdWrong}" :value="value"
                   ref="inputElement" @input="handleInput($event.target.value)">
            <span class="input_icon" v-if="clearable" @click="clearContent"></span>
            <span class="input_password" v-if="showPassword" @click="togglePwdType"
                  :class="{input_password_show:this.inputType==='text'}"></span>
            <span class="input_length" v-if="maxLength>=0"
                  :class="{input_length_full:this.currentLength===this.maxLength}">
                {{currentLength}}/{{maxLength}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "inputNormal.vue",
        props:{
            placeHolder:{
                type:String,
                default:'',
            },
            disabled:{
                type:Boolean,
                default:false
            },
            clearable:{
                type:Boolean,
                default:false
            },
            showPassword:{
                type:Boolean,
                default:false,
            },
            maxLength:{
                type:Number,
            },
            minLength:{
                type:Number,
            },
            value:{
                type:String,
            }
        },
        watch:{
          value()
          {
              if(this.inputContent.length > this.maxLength && this.maxLength>=0)
              {
                  this.inputContent = this.value.slice(0, this.maxLength);
              }
              else {
                  this.inputContent = this.value;
              }
          }
        },
        data(){
            return {
                inputContent:'',
                toggleType:true,
                pwdWrong:false,
            }
        },
        computed:{
            inputType(){
                return this.showPassword && this.toggleType? 'password':'text';
            },
            currentLength(){
                return this.inputContent.length < this.maxLength? this.inputContent.length:this.maxLength;
            }
        },
        methods:{
            togglePwdType(){
                this.toggleType=!this.toggleType;
                this.$refs.inputElement.focus();
            },
            handleInput(newVal){
                this.inputContent=newVal;
                if(this.inputContent.length > this.maxLength && this.maxLength>=0)
                {
                   this.inputContent = this.inputContent.slice(0, this.maxLength);
                }
                this.$emit('input',this.inputContent);
            },
            clearContent(){
                this.inputContent='';
                this.$emit('input',this.inputContent);
            },
        }
    }
</script>

<style scoped>
    .input_container{
        position: relative;
        width: 300px;
    }
    .input_label{
        margin-bottom: 4px;
        font-family: MicrosoftYaHei;
        font-size:12px;
        line-height: 20px;
        color: var(--font-color-primary, #333333);
    }
    .input_normal{
        width: 300px;
        height: 32px;
        font-size:12px;
        line-height: 12px;
        color:var(--font-color-primary, #333333);
        text-align: center;
        border-radius: 4px;
        border:solid 1px var(--border-color-secondary,#DDDDDD);
    }
    .input_normal::placeholder{
        font-family: MicrosoftYaHei;
        font-size:12px;
        line-height: 12px;
        color:var(--font-color-placeholder,#CCCCCC);
        text-align: center;
    }
    .input_normal:hover{
         border:solid 1px #BBBBBB;
     }
    .input_normal:focus{
        border:solid 1px var(--main-color, #00AAAA);
    }
    .input_disabled{
        background-color: #F5F5F5;
        pointer-events: none;
    }
    /*清除模式*/
    .input_icon{
        position: absolute;
        display: inline-block;
        top:9px;
        margin-left:-26px;
        width: 14px;
        height: 14px;
        background: url("./bg_clear_normal.png") no-repeat center/14px 14px;
        opacity:0;
        cursor:pointer;
    }
    .input_container:focus  .input_icon{
        opacity: 1;
    }
    .input_container:focus  .input_icon:hover{
        background: url("./bg_clear_hover.png") no-repeat center/14px 14px;
    }
    .input_num:hover  .input_icon{
        opacity: 1;
    }
    .input_num:hover .input_normal{
        border:solid 1px #BBBBBB;
    }
    .input_num:hover  .input_icon:hover{
        background: url("./bg_clear_hover.png") no-repeat center/14px 14px;
    }
    .input_num .input_normal:focus {
        border:solid 1px var(--main-color, #00AAAA);
    }
    /*密码框*/
    .input_password{
        position: absolute;
        display: inline-block;
        top:9px;
        margin-left:-26px;
        width: 14px;
        height: 14px;
        background: url("./bg_nopassword_normal.png") no-repeat center/14px 14px;
        opacity:0;
        cursor:pointer;
    }
    .input_container:focus  .input_password{
        opacity: 1;
    }
    .input_container:focus  .input_password:hover{
        background: url("./bg_nopassword_hover.png") no-repeat center/14px 14px;
    }
    .input_num:hover  .input_password{
        opacity: 1;
    }
    .input_num:hover .input_normal{
        border:solid 1px #BBBBBB;
    }
    .input_num:hover  .input_password:hover{
        background: url("./bg_nopassword_hover.png") no-repeat center/14px 14px;
    }
    .input_num .input_normal:focus {
        border:solid 1px var(--main-color, #00AAAA);
    }
    .input_password_show{
        background: url("./bg_password_normal.png") no-repeat center/14px 14px;
    }
    .input_container:focus  .input_password_show{
        opacity: 1;
    }
    .input_container:focus  .input_password_show:hover{
        background: url("./bg_password_hover.png") no-repeat center/14px 14px;
    }
    .input_num:hover  .input_password_show{
        opacity: 1;
    }
    .input_num:hover .input_normal{
        border:solid 1px #BBBBBB;
    }
    .input_num:hover  .input_password_show:hover{
        background: url("./bg_password_hover.png") no-repeat center/14px 14px;
    }
    .input_num .input_normal:focus {
        border:solid 1px var(--main-color, #00AAAA);
    }
    .input_password_wrong{
        border: solid 1px #ff797e;
    }
    /*限制数字*/
    .input_length{
        position: absolute;
        display: inline-block;
        top:6px;
        right:8px;
        margin-left:-26px;
        height: 20px;
        line-height: 20px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 12px;
        color: #999999;
    }
    .input_length_full{
        color: var(--font-color-primary, #333333);
    }
</style>