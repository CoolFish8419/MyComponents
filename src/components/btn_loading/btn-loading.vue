<template>
    <div class="btn_loading_box" v-show="loading">
        <button class="btn_loading_large" :disabled="loading" v-show="btnType === 'large'">
            <img class="btn_img_loading_icon_large" src="./icon_loading.png">
            <span class="btn_span_text_large">Loading</span>
        </button>
        <button class="btn_loading_mid" :disabled="loading" v-show="btnType === 'mid'">
            <img class="btn_img_loading_icon_mid" src="./icon_loading.png">
            <span class="btn_span_text_mid">Loading</span>
        </button>
        <button class="btn_loading_small" :disabled="loading" v-show="btnType === 'small'">
            <img class="btn_img_loading_icon_small" src="./icon_loading.png">
        </button>
    </div>
</template>

<script>
  export default {
    name: "btn-loading",
    data() {
      return {
        loading: true,
        btnType: ""
      };
    },
    props: {
      buttonType:String,
      isLoading: Boolean,
    },
    created(){
      this.btnType = this.buttonType
      this.loading = this.isLoading
    },
  };
</script>

<style scoped>
    .btn_loading_box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn_loading_large {
        width: 120px;
        height: 40px;
        background-color: #4797fa;
        margin-right: 10px;
        border-radius: 6px;
    }

    .btn_img_loading_icon_large {
        height: 20px;
        margin-right: 8px;
        vertical-align: middle;
        animation: rotate .8s linear infinite;
    }

    .btn_span_text_large {
        color: #ffffff;
        font-weight: bold;
        vertical-align: middle;
    }

    .btn_loading_mid {
        width: 100px;
        height: 30px;
        margin-right: 8px;
        background-color: #4797fa;
        border-radius: 6px;
    }

    .btn_img_loading_icon_mid {
        height: 20px;
        margin-right: 8px;
        vertical-align: middle;
        animation: rotate .8s linear infinite;
    }

    .btn_span_text_mid {
        color: #ffffff;
        font-weight: bold;
        vertical-align: middle;
    }

    .btn_loading_small {
        width: 40px;
        height: 40px;
        background-color: #4797fa;
        border-radius: 6px;
    }

    .btn_img_loading_icon_small {
        height: 30px;
        vertical-align: middle;
        animation: rotate .4s linear infinite;
    }

    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }
</style>