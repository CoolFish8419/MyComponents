<template>
    <div>
        <p class="input_label">{{label}}</p>
        <div class="input_container" :class="{input_num:inputContent.length>0}">
            <input class="input_normal" :placeholder="placeHolder" :type="inputType"
                   :class="{input_disabled:disabled,input_password_wrong:pwdWrong}" v-model="inputContent"
                   ref="inputElement" @input="handleInput">
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
        name: "input-dark.vue",
        props:{
            placeHolder:{
                type:String,
            },
            disabled:{
                type:Boolean,
                default:false
            },
            clearable:{
                type:Boolean,
                default:false
            },
            label:{
                type:String,
            },
            showPassword:{
                type:Boolean,
                default:false,
            },
            maxLength:{
                type:Number,
            },
            minLength:{
                Type:Number,
            },
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
            handleInput(){
                if(this.inputContent.length > this.maxLength && this.maxLength>=0)
                {
                    this.inputContent = this.inputContent.slice(0, this.maxLength);
                }
                this.$emit('input',this.inputContent);
            },
            clearContent(){
                this.inputContent='';
                this.$emit('input',this.inputContent);
            }
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
        color: rgba(255, 255, 255, 0.9);
    }
    .input_normal{
        width: 300px;
        height: 32px;
        font-size:12px;
        line-height: 12px;
        color:rgba(255, 255, 255, 0.9);
        text-align: center;
        border-radius: 4px;
        background-color: transparent;
        border:solid 1px rgba(255, 255, 255, 0.3);
    }
    .input_normal::placeholder{
        font-family: MicrosoftYaHei;
        font-size:12px;
        line-height: 12px;
        color:rgba(255, 255, 255, 0.4);
        text-align: center;
    }
    .input_normal:hover{
        border:solid 1px rgba(255, 255, 255, 0.6);
    }
    .input_normal:focus{
        border:solid 1px var(--dark-main-color, #51E6FF);
    }
    .input_disabled{
        background-color: rgba(255, 255, 255, 0.15);
        border: solid 1px rgba(255, 255, 255, 0.2);
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
        background: url("./bg_clear_normal_dark.png") no-repeat center/14px 14px;
        opacity:0;
        cursor:pointer;
    }
    .input_container:focus  .input_icon{
        opacity: 1;
    }
    .input_container:focus  .input_icon:hover{
        background: url("./bg_clear_hover_dark.png") no-repeat center/14px 14px;
    }
    .input_num:hover  .input_icon{
        opacity: 1;
    }
    .input_num:hover .input_normal{
        border:solid 1px rgba(255, 255, 255, 0.6);
    }
    .input_num:hover  .input_icon:hover{
        background: url("./bg_clear_hover_dark.png") no-repeat center/14px 14px;
    }
    .input_num .input_normal:focus {
        border:solid 1px var(--dark-main-color, #51E6FF);
    }
    /*密码框*/
    .input_password{
        position: absolute;
        display: inline-block;
        top:9px;
        margin-left:-26px;
        width: 14px;
        height: 14px;
        background: url("./bg_nopassword_normal_dark.png") no-repeat center/14px 14px;
        opacity:0;
        cursor:pointer;
    }
    .input_container:focus  .input_password{
        opacity: 1;
    }
    .input_container:focus  .input_password:hover{
        background: url("./bg_nopassword_hover_dark.png") no-repeat center/14px 14px;
    }
    .input_num:hover  .input_password{
        opacity: 1;
    }
    .input_num:hover .input_normal{
        border:solid 1px rgba(255, 255, 255, 0.6);
    }
    .input_num:hover  .input_password:hover{
        background: url("./bg_nopassword_hover_dark.png") no-repeat center/14px 14px;
    }
    .input_num .input_normal:focus {
        border:solid 1px var(--dark-main-color, #51E6FF);
    }
    .input_password_show{
        background: url("./bg_password_normal_dark.png") no-repeat center/14px 14px;
    }
    .input_container:focus  .input_password_show{
        opacity: 1;
    }
    .input_container:focus  .input_password_show:hover{
        background: url("./bg_password_hover_dark.png") no-repeat center/14px 14px;
    }
    .input_num:hover  .input_password_show{
        opacity: 1;
    }
    .input_num:hover .input_normal{
        border:solid 1px rgba(255, 255, 255, 0.6);
    }
    .input_num:hover  .input_password_show:hover{
        background: url("./bg_password_hover_dark.png") no-repeat center/14px 14px;
    }
    .input_num .input_normal:focus {
        border:solid 1px var(--dark-main-color, #51E6FF);
    }
    .input_password_wrong{
        border: solid 1px #FF797E;
    }
    /*限制数字*/
    .input_length{
        position: absolute;
        display: inline-block;
        top:6px;
        right:8px;
        /*margin-left:-26px;*/
        height: 20px;
        line-height: 20px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #999999;
    }
    .input_length_full{
        font-family: MicrosoftYaHei-Bold;
        color: rgba(255, 255, 255, 0.9);
    }
</style>