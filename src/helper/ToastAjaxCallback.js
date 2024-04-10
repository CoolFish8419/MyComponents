import DefaultAjaxCallback from "../ajax/DefaultAjaxCallback";
import AjaxErrorCodeConst from "../ajax/AjaxErrorCodeConst";

class ToastAjaxCallback extends DefaultAjaxCallback {

    constructor(vue, success) {
        super();

        this.onStart = function(){
        };
        this.onSuccess = function (data) {
            success(data);
        };
        this.onFail = function (data) {
            vue.$toast(data.errMsg);
            if(AjaxErrorCodeConst.NOT_LOGIN === data.errCode){
				console.log(vue.$route.name)
                if("Login" != vue.$route.name) {
                    vue.$router.push("/");
                }
            }
        };
        this.onError = function (err) {
            console.log(err)
            vue.$toast("网络异常，请稍候再试");
        };
        this.onComplete=function(){
        }
    }
}

export default ToastAjaxCallback
