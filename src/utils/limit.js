/**
 * 只能输入大于0的正整数（不能以0开头）
 * @param {string} value
 * @returns {string | number} 返回空字符或数字
 */
function integerFn(value) {
    var val = value + ''
    var reg = /[1-9]{1}[0-9]*$/;
    var strArray = val.split("");
    var newStrs = "";
    for (var i = 0; i < strArray.length; i++) {
        if (reg.test(strArray[i])) {
            newStrs += strArray[i];
        } else if (i > 0 && strArray[i] === "0") {
            newStrs += strArray[i];
        }
    }
    if (newStrs - 0 > 0) {
        return newStrs - 0;
    } else {
        return "";
    }
}

function isEmpty(str) {
    return null == str || undefined == str || 0 == (str + "").trim().length;
}

/**
 * 只能输入大于等于0的正整数（不能以0开头）
 * @param {string} value
 * @returns {string | number} 返回空字符或数字
 */
function integerFnZero(value, max) {
    var val = value + ''
    var reg = /[0-9]{1}[0-9]*$/;
    var strArray = val.split("");
    var newStrs = "";
    for (var i = 0; i < strArray.length; i++) {
        if (reg.test(strArray[i])) {
            newStrs += strArray[i];
        } else if (i > 0 && strArray[i] === "0") {
            newStrs += strArray[i];
        }
    }
    if (newStrs.length >= 2) {
        if (newStrs[0] == 0) {
            newStrs = newStrs.substring(1, newStrs.length)
        }
    }
    if (!isEmpty(max)) {
        if (newStrs * 1 > max) {
            newStrs = max
        }
    }
    console.log(newStrs)
    return newStrs
}

/**
 * 只能输入大于0的正整数（不能以0开头）并且限制最大数
 * @param {string} value
 * @returns {string | number} 返回空字符或数字
 */
function integerFnMax(value, max) {
    var val = value + ''
    console.log(val)
    var reg = /[1-9]{1}[0-9]*$/;
    var strArray = val.split("");
    var newStrs = "";
    for (var i = 0; i < strArray.length; i++) {
        if (reg.test(strArray[i])) {
            newStrs += strArray[i];
        } else if (i > 0 && strArray[i] === "0") {
            newStrs += strArray[i];
        }
    }
    if (newStrs - 0 > 0) {
        if (newStrs * 1 > max) {
            newStrs = max
        }

        return newStrs;
    } else {
        return "";
    }
}

function retainNonNegative(param) {
    return param.replace(/[^\d.]/g, "")
        .replace(/^[0]{2,}/g, "0")
        .replace(/^(\d+)\.(\d{0,2}).*$/, '$1.$2');
}

/**
 * 只能输入大于0的正整数（不能以0开头）并且限制最大数
 * @param {string} value
 * @returns {string | number} 返回空字符或数字
 */
function integerFnMaxDot(value, max) {
    var val = value + ''
    var reg = /[0-9]{1}[0-9]*$/;
    var newStrs = "";
    if (val.indexOf('.') != -1) {
        let valStr = retainNonNegative(val)
        if ("." === valStr.charAt(valStr.length - 1)) {
            newStrs = valStr.substring(0, valStr.length - 1);
        }
        if (valStr.indexOf(".") != -1) {
            if (!reg.test(valStr.split(".")[0])) {
                newStrs =  "0." + valStr.split(".")[1];
            } else {
                newStrs = parseFloat(valStr.split(".")[0]) + "." + valStr.split(".")[1];
            }

        } else {
            newStrs = parseFloat(valStr).toFixed(2);
        }
    } else {
        var strArray = val.split("");
        for (var i = 0; i < strArray.length; i++) {
            if (reg.test(strArray[i])) {
                newStrs += strArray[i];
            } else if (i > 0 && strArray[i] === "0") {
                newStrs += strArray[i];
            }
        }
    }
    if (newStrs * 1 > max) {
        newStrs = max
    }
    return newStrs;

}

export default {
    integerFn,
    integerFnZero,
    integerFnMax,
    integerFnMaxDot
};