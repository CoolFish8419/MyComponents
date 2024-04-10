/**
 * Copyright © WarmHeart Intelligence Technology Group (Jiangsu) Co.,Ltd Company, Limited.
 * All Rights Reserved
 */
import DefaultAjaxCallback from "@/ajax/DefaultAjaxCallback";
import AjaxErrorCodeConst from "@/ajax/AjaxErrorCodeConst";
import CookieConst from "@/constant/CookieConst";

class LoadingAjaxCallback extends DefaultAjaxCallback {

    constructor(vue, success, fail, error) {
        super();
        this.onStart = function () {
            vue.$loading.show();
        };
        this.onComplete = function () {
            vue.$loading.hide();
        };
        this.onSuccess = function (data) {
            success(data);
        };
        this.onFail = function (data) {
            // vue.$toast(data.errMsg);
            if(AjaxErrorCodeConst.NOT_LOGIN === data.errCode){
				console.log(vue.$route.name)
                if("Login" != vue.$route.name) {
                    vue.$router.push("/");
                }
            }
          fail(data);
        };
        this.onError = function (err) {
            console.log(err)
            error();
        };
    }
}

export default LoadingAjaxCallback
