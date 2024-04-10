import AREA_CODE from "./area-code.min";
import {input_verify} from "./constants";
import StorageConst from "./StorageConst";
const mixin = {
  methods: {
    /**
     * 从localStorage中取值
     * @param objectName
     * @param valName
     * @param defaultVal
     */
    getStoreItem(objectName, valName, defaultVal) {
      if (undefined === defaultVal) {
        return localStorage[objectName];
      }
      if ("true" == localStorage[objectName]) {
        return true;
      }
      if ("false" == localStorage[objectName]) {
        return false;
      }
      if ("undefined" == localStorage[objectName]) {
        return undefined;
      }
      return !!localStorage[objectName] ? JSON.parse(localStorage[objectName])[valName] : defaultVal
    },
    /**
     * 向localStorage中存值
     * @param valName
     * @param val
     */
    setStoreItem(valName, val) {
      localStorage.setItem(valName, val);
    },
      getCurrencyName(){
        let currencyName = localStorage.getItem(StorageConst.CURRENCY_NAME);
        return this.isEmpty(currencyName)?'':currencyName
      },
    /**
     * 校验字符串非空，且长度在minLen至maxLen之间
     *
     * @param str
     * @param varName
     * @param maxLen
     * @param minLen
     * @param isExplicit
     * @param errorHandler
     * @returns {Boolean}
     */
    verifyStringInRange(str, varName, minLen, maxLen, isExplicit, errorHandler = this.$toast) {
      if (this.isEmpty(str)) {
        if (isExplicit) {
          errorHandler(varName + "不能为空，请重新输入！");
        }
        return false;
      }
      if ((str + "").length < minLen) {
        if (isExplicit) {
          errorHandler("输入字符串(" + varName + ")长度不能少于" + minLen + "个字符，请重新输入！");
        }
        return false;
      }
      if ((str + "").length > maxLen) {
        if (isExplicit) {
          errorHandler("输入字符串(" + varName + ")长度不能超过" + maxLen + "个字符，请重新输入！");
        }
        return false;
      }
      return true;
    },
    /**
     * 随机字符串
     * @returns {string}
     */
    getUuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      return s.join("");
    },
    /**
     * 校验字符串中含指定字段
     * @param str
     * @param varName
     * @param field
     * @param isExplicit
     * @param errorHandler
     * @returns {boolean}
     */
    verifyIn(str, varName, field, isExplicit, errorHandler = this.$toast) {
      if (str.indexOf(field) !== -1) {
        if (isExplicit) {
          errorHandler(varName + "包含\"" + field + "\"字段");
        }
        return true;
      } else {
        return false;
      }
    },
    /**
     * 获取身份证信息
     * @param idNum
     */
    getIDCardInfo(idNum) {
      const person = {};
      person.province = AREA_CODE[idNum.substring(0, 2) + "0000"];
      switch (person.province) {
        case "北京市":
        case "天津市":
        case "上海市":
        case "重庆市":
        case "台湾省":
        case "香港特别行政区":
        case "澳门特别行政区":
          person.city = person.province;
          break;
        default:
          person.city = AREA_CODE[idNum.substring(0, 4) + "00"];
          break;
      }
      person.birthday = idNum.substring(6, 10) + "-" + idNum.substring(10, 12) + "-" + idNum.substring(12, 14);
      const sexno = idNum.substring(16, 17);
      if (0 === sexno % 2) {
        person.sex = "女"
      } else {
        person.sex = "男"
      }
      person.age = getAge(person.birthday);
      return person;
    },
    /**
     * 获取年龄
     * @param birthday
     */
    getAge(birthday) {
      var returnAge;
      var birthdayArr = birthday.split("-");
      var birthYear = birthdayArr[0];
      var birthMonth = birthdayArr[1];
      var birthDay = birthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear === birthYear) {
        returnAge = 0;//同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth === birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth;//月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge;//返回周岁年龄
    },

    /**
     * 保留两位小数
     * @param value
     * @returns {string}
     */
    numToFixed2(value) {
      let realVal = '';
      if (!this.isEmpty(value)) {
        realVal = parseFloat(value).toFixed(2);
      }
      return realVal
    },

    /**
     * 保留一位小数
     * @param value
     * @returns {string}
     */
    numToFixed1(value) {
      let realVal = '';
      if (!this.isEmpty(value)) {
        realVal = parseFloat(value).toFixed(1);
      }
      return realVal
    },

    /**
     * 获取文件类型
     * @param filePath
     * @return {*}
     */
    getFileType(filePath) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1)
        return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
      else return "";
    },
    /**
     * 保留到两位小数
     */
    numFix2(num) {
      if (!num) {
        return;
      }
      return num.toFixed(2);
    },

    retainNonNegative(param) {
      return param.replace(/[^\d.]/g, "")
          .replace(/^[0]{2,}/g, "0")
          .replace(/^(\d+)\.(\d{0,2}).*$/, '$1.$2');
    },

    inputLimitPositiveFloat(el) {
      el.target.value = this.retainNonNegative(el.target.value);
    },
    formatPositiveFloat(el) {
      this.inputLimitPositiveFloat(el);
      let str = el.target.value + "";
      var reg = /[0-9]{1}[0-9]*$/;
      if(!this.isEmpty(str)){
        if ("." === str.charAt(str.length - 1)) {
          str = str.substring(0, str.length - 1);
        }
        if(str.indexOf(".") != -1){
          if (!reg.test(str.split(".")[0])) {
            str =  "0." + str.split(".")[1];
          } else {
            str = parseFloat(str.split(".")[0]) + "." + str.split(".")[1];
          }
        }else{
          str = parseFloat(str).toFixed(2);
        }
      }
      el.target.value = str;
      return el.target.value;
    },


    retainNonNegativeFix1(param) {
      return param.replace(/[^\d.]/g, "")
          .replace(/^[0]{2,}/g, "0")
          .replace(/^(\d+)\.(\d?).*$/, '$1.$2');
    },

    inputLimitPositiveFloatFix1(el) {
      el.target.value = this.retainNonNegativeFix1(el.target.value);
    },

    formatPositiveFloatFix1(el) {
      this.inputLimitPositiveFloatFix1(el);
      let str = el.target.value + "";
      if(!this.isEmpty(str)){
        if ("." === str.charAt(str.length - 1)) {
          str = str.substring(0, str.length - 1);
        }
        if(str.indexOf(".") != -1){
          str = parseFloat(str.split(".")[0])+"."+str.split(".")[1];
        }else{
          str = parseFloat(str);
        }
      }
      el.target.value = str;
      return el.target.value;
    },



    /**
     * 限制输入身份证号[数字、字母X]
     */
    checkIDNum(el) {
      if (el.target.value.length === 1) {
        el.target.value = el.target.value.replace(/[^1-9]/g, '');
      } else if (obj.value.length === 18) {
        el.target.value = el.target.value.replace(/[^0-9xX]/g, '');
      } else {
        el.target.value = el.target.value.replace(/\D/g, '');
      }
    },
    /**
     * 校验输入正整数
     * @param el
     */
    checkPositiveInt(el) {
      if (el.target.value.length === 1) {
        el.target.value = el.target.value.replace(/[^1-9]/g, '');
      } else {
        el.target.value = el.target.value.replace(/\D/g, '');
      }
      return el.target.value;
    },

    /**
     * 校验输入数字
     * @param el
     */
    checkNonNegativeInt(el) {
      el.target.value = el.target.value.replace(/\D/g, '');
      return el.target.value
    },


    /**
     * 去除数字前面的0
     * @param el
     */
    checkNonNegativeIntBlur(el) {
      if (parseInt(el.target.value) === 0) {
        el.target.value = 0;
      } else {
        el.target.value = el.target.value.replace(/\b(0+)/gi, "");
      }
      return el.target.value
    },
    /**
     * 获取日期，无分割
     * @param date 2017-02-01
     * @returns 20170702
     */
    getDateNoDivider(date){
      return date.replace(/-/g, "");
    },
    /**
     * 下载文件流
     * @param StreamDate
     * @param fileName
     */
    downloadFileStream(StreamDate,fileName) {
      console.log(typeof StreamDate);
      let url = window.URL.createObjectURL(StreamDate);
      if ('download' in document.createElement('a')) {
        //非IE下载
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        //IE10+下载
        navigator.msSaveBlob(url, fileName)
      }
    },

    /**
     * 乘法
     */
    multiply(arg1, arg2) {
      var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    /*减法，返回绝对值*/
    accSubtr(arg1,arg2){
      var r1,r2,m,n;
      try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
      try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
      m=Math.pow(10,Math.max(r1,r2));
      n=(r1>=r2)?r1:r2;
      return Math.abs((arg1*m-arg2*m)/m).toFixed(n);
    },

    /**
     * 金额分转成元
     *
     * @param money
     * @returns
     */
    moneyToYuan(money) {
      if (this.isEmpty(money)) {
        return '0';
      } else {
        return (money / 100).toFixed(2);
      }
    },

    /**
     * 判断字符串是否为空字符串
     *
     * @param str
     *            字符串
     * @returns {Boolean}
     */
    isEmpty(str) {
      return null == str || undefined == str || 0 == (str + "").trim().length;
    },
    /**
     * 判断字符串是否由字母和数字组成
     *
     * @param str
     *            字符串
     * @returns {Boolean}
     */
    checkPassWord(str)
       {
      var re =  /^[0-9a-zA-Z]*$/;  //判断字符串是否为数字和字母组合
      if (!re.test(str))
      {
    return false;
     }else{
    return true;
     }
    },
    /**
     * 判断字符串手机号
     *
     * @param str
     *            字符串
     * @returns {Boolean}
     */
    checkPhone(str){
      var re =  /^1[3-9][0-9]{9}$/;
      var ph= /^0[0-9-]{10,13}$/;
      if (!re.test(str) && !ph.test(str))
      {
        return false;
      }else{
        return true;
      }
    },
    /**
     * 判断是否在0到10之间，做多保留小数点后一位
     *
     * @param str
     *            字符串
     * @param includeLeft
     *            是否包含左边界
     * @param includeRight
     *            是否包含右边界
     * @returns {Boolean}
     */
    checkOneToTen(str, includeLeft, includeRight)
    {
      if (!includeLeft) {
        if (str === '0' || str === '0.0') {
          return false;
        }
      }
      if (!includeRight) {
        if (str === '10' || str === '10.0') {
          return false;
        }
      }
      var re = /^\+?(?:\d(?:\.\d)?|10(?:\.0)?)$/;
      if (!re.test(str))
      {
        return false;
      }else{
        return true;
      }
    },

/**
     * 判断字符串是否为空字符串
     *
     * @param str
     *            字符串
     * @returns {Boolean}
     */
    isEmptyNull(str) {
      return null == str || undefined == str;
    },
    /**
     * 判断字符串是否为空字符串
     *
     * @param str
     *            字符串
     * @returns {Boolean}
     */
    isEmptySelect(str) {
      return null == str || undefined == str || 0 == (str + "").trim().length || "0" == str;
    },

    /**
     * 金额元转成分
     *
     * @param money
     * @returns
     */
    moneyToFen(money) {
      return Math.round((money*1 * 100) * 1000) / 1000;
    },

    /**
     * 金额元转成分
     * 金额可以为空
     * @param money
     * @returns
     */
    moneyToFenEmpty(money) {
      if (this.isEmpty(money)) {
        return money;
      } else {
        return Math.round((money * 100) * 1000) / 1000;
      }
    },

    /**
     * 获取当前日期
     * @returns
     * 格式2017-07-02
     */
    getNowDate() {
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      return year + "-" + month + "-" + day;
    },
    /**
     * 获取当前日期
     * @returns
     * 格式20170702
     */
    getNowDateNoDivider() {
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      return year + month +  day;
    },
    /**
     * 获取当前日期的前一天
     *
     */
    getYesterday() {
      var date = new Date();
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
      var yyyy = date.getFullYear();
      var mm = this.padleft0(date.getMonth() + 1);
      var dd = this.padleft0(date.getDate());
      return yyyy + "-" + mm + "-" + dd;
    },
    /**
     * 获取当前日期第一秒
     * @returns
     * 格式2017-07-02 02:05:50
     */
    getNowMinTime(n) {
      var mintime = new Date();
      mintime.setTime(mintime.getTime() - n*24 * 60 * 60 * 1000);
      var year = mintime.getFullYear();
      var month = this.padleft0(mintime.getMonth() + 1);
      var day = this.padleft0(mintime.getDate());
      return year + "-" + month + "-" + day + " 00:00:00";
    },

    /**
     * 获取当前日期的前n天
     * 返回格式：2020-01-01
     */
    getPreNDays(n) {
      var date = new Date();
      date.setTime(date.getTime() - n*24 * 60 * 60 * 1000);
      var yyyy = date.getFullYear();
      var mm = this.padleft0(date.getMonth() + 1);
      var dd = this.padleft0(date.getDate());
      return yyyy + "-" + mm + "-" + dd;
    },
    /**
     * 获取当前日期的前n天
     * 返回格式：2020-01-01
     */
    getPreTDays(n) {
      var dateTime = new Date();
      dateTime.setTime(dateTime.getTime() - n*24 * 60 * 60 * 1000);
      var year = dateTime.getFullYear();
      var month = this.padleft0(dateTime.getMonth() + 1);
      var day = this.padleft0(dateTime.getDate());
      var hour = this.padleft0(dateTime.getHours());
      var minute = this.padleft0(dateTime.getMinutes());
      var second = this.padleft0(dateTime.getSeconds());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },

    /**
     * 获取当前日期的后一天
     *
     */
    getTomorrow() {
      var date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      var yyyy = date.getFullYear();
      var mm = this.padleft0(date.getMonth() + 1);
      var dd = this.padleft0(date.getDate());
      return yyyy + "-" + mm + "-" + dd;
    },

    /**
     * 获取当前日期时间
     * @returns
     * 格式2017-07-02 02:05:50
     */
    getNowTime() {
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      var hour = this.padleft0(nowtime.getHours());
      var minute = this.padleft0(nowtime.getMinutes());
      var second = this.padleft0(nowtime.getSeconds());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },
    /**
     * 获取当前日期时间
     * @returns
     * 格式2017-07-02 02:05:50
     */
    getNowTimeSecond() {
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      var hour = this.padleft0(nowtime.getHours());
      var minute = this.padleft0(nowtime.getMinutes());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },

    /**
     * 补齐两位数
     */
    padleft0(obj) {
      return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
    },

    /**
     * 获取前一个月的日期时间
     * @param dateTime
     * @returns
     * 格式2017-07-02 02:05:50
     */
    getLastMonthTime(dateTime) {
      var dateStr = dateTime.replace(/-/g, "/");
      var date = new Date(dateStr);
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth() + 1;
      var currentDate = date.getDate();
      var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
      if (currentYear % 4 == 0 && currentYear % 100 != 0) {
        daysInMonth[2] = 29;
      }
      var prevYear = 0;
      var prevMonth = 0;
      if (currentMonth == 1) {
        prevYear = currentYear - 1;
        prevMonth = 12;
      } else {
        prevYear = currentYear;
        prevMonth = currentMonth - 1;
      }
      currentDate = daysInMonth[prevMonth] >= currentDate ? currentDate : daysInMonth[prevMonth];
      var hour = this.padleft0(date.getHours());
      var minute = this.padleft0(date.getMinutes());
      var second = this.padleft0(date.getSeconds());
      return prevYear + "-" + this.padleft0(prevMonth) + "-" + this.padleft0(currentDate) + " " + hour + ":" + minute + ":" + second;
    },

    /**
     * 获取前一个月的日期
     * @param originalDate
     * @returns
     * 格式2017-07-02
     */
    getLastMonthDate(originalDate) {
      var dateStr = originalDate.replace(/-/g, "/");
      var date = new Date(dateStr);
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth() + 1;
      var currentDate = date.getDate();
      var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
      if (currentYear % 4 == 0 && currentYear % 100 != 0) {
        daysInMonth[2] = 29;
      }
      var prevYear = 0;
      var prevMonth = 0;
      if (currentMonth == 1) {
        prevYear = currentYear - 1;
        prevMonth = 12;
      } else {
        prevYear = currentYear;
        prevMonth = currentMonth - 1;
      }
      currentDate = daysInMonth[prevMonth] >= currentDate ? currentDate : daysInMonth[prevMonth];
      return prevYear + "-" + this.padleft0(prevMonth) + "-" + this.padleft0(currentDate);
    },

    /**
     * 获取后n个月的日期
     * @param originalDate
     * @param num
     * @returns
     * 格式2017-07-02
     */
    getNextNMonthDate(originalDate, num) {
      var dateStr = originalDate.replace(/-/g, "/");
      var date = new Date(dateStr);
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth() + 1;
      var currentDate = date.getDate();
      var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
      if (currentYear % 4 == 0 && currentYear % 100 != 0) {
        daysInMonth[2] = 29;
      }
      var nextYear = 0;
      var nextMonth = 0;
      if ((currentMonth + num) > 12) {
        nextYear = currentYear + 1;
        nextMonth = currentMonth + num - 12;
      } else {
        nextYear = currentYear;
        nextMonth = currentMonth + num;
      }
      currentDate = daysInMonth[nextMonth] >= currentDate ? currentDate : daysInMonth[nextMonth];
      return nextYear + "-" + this.padleft0(nextMonth) + "-" + this.padleft0(currentDate);
    },
      getPreYearDate(originalDate) {
          var dateStr = originalDate.replace(/-/g, "/");
          var date = new Date(dateStr);
          var currentYear = date.getFullYear();
          var currentMonth = date.getMonth() + 1;
          var currentDate = date.getDate();
          var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
          if (currentYear % 4 == 0 && currentYear % 100 != 0) {
              daysInMonth[2] = 29;
          }
          let nextYear = currentYear - 1;
          currentDate = daysInMonth[currentMonth] >= currentDate ? currentDate : daysInMonth[currentMonth];
          return nextYear + "-" + this.padleft0(currentMonth) + "-" + this.padleft0(currentDate);
      },

    /**
     * 获取近num+1个月的年月
     * @param num
     * @return {Array}
     */
    getRecentYearMonth(num) {
      var d = new Date();
      var year = d.getFullYear();
      var month = this.padleft0(d.getMonth() + 1);
      var result = [year + "-" + month];
      for (var i = 0; i < num; i++) {
        d.setMonth(d.getMonth() - 1);
        var m = this.padleft0(d.getMonth() + 1);
        result.push(d.getFullYear() + "-" + m);
      }
      return result;
    },
    /**
     * 获取上个月的第一天
     */
    getLastMonthFirstDate(){
      var nowdays = new Date();
      var year = nowdays.getFullYear();
      var month = nowdays.getMonth();
      if(month==0) {
        month=12;
        year=year-1;
      }
      return year + "-" + this.padleft0(month) + "-" + "01";
    },
    /**
     * 获取上个月的最后一天
     */
    getLastMonthEndDate(){
      var nowdays = new Date();
      var year = nowdays.getFullYear();
      var month = nowdays.getMonth();
      if(month==0)
      {
        month=12;
        year=year-1;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var myDate = new Date(year, month, 0);
      return  year + "-" + month + "-" + myDate.getDate();
    },

    /**
     * 判断变量是否在数组中
     * @param str
     * @param arry
     * @return {boolean}
     */
    isInArray(str, arry) {
      for (var i = 0; i < arry.length; i++) {
        if (arry[i] === str) {
          return true;
        }
      }
      return false;
    },

    /**
     * 返回元素在数组中的索引
     * @param a
     * @param obj
     * @return {boolean}
     */
    arrayIndex(a, obj) {
      var i = a.length;
      while (i--) {
        if (a[i] === obj) {
          return i;
        }
      }
      return false;
    },

    /**
     * 判断字符串长度大于自然长度engLen时，后面加省略号
     */
    retainStringFixLenEng(str, engLen) {
      if (this.getLenEng(str) <= engLen) {
        return str;
      }
      // 进行截断操作
      var result = "";
      var iLengthEng = 0;
      for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          iLengthEng += 1;
        } else {
          iLengthEng += 2;
        }
        if (iLengthEng < engLen - 3) {
          result += str.substr(i, 1);
        } else {
          break;
        }
      }
      return result + '...';
    },

    /**
     * 判断字符串长度大于len是，后面加省略号
     */
    retainStringFixLen(str, len) {
      return str.length > len ? str.slice(0, len - 3) + '...' : str;
    },

    /**
     * 获取字符自然长度
     *
     * @param str
     * @returns {Number}
     */
    getLenEng(str) {
      var lengthEng = 0;
      for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          lengthEng += 1;
        } else {
          lengthEng += 2;
        }
      }
      return lengthEng;
    },

    /**
     * 百分比
     * @param num
     * @param total
     * @return {*}
     * @constructor
     * @return {string}
     */
    GetPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
    },

    /**
     * 判断是否在取值范围内
     * @param amount
     * @param varName
     * @param min
     * @param max
     * @param isExplicit
     * @param  errorHandler
     * @returns {boolean}
     */
    verifyAmountInRange(amount, varName, min, max, isExplicit,errorHandler = this.$toast) {
      if (this.isEmpty(amount)) {
        if (isExplicit) {
          errorHandler(varName + "不能为空，请重新输入！");
        }
        return false;
      }

      if (amount > max) {
        if (isExplicit) {
          errorHandler(varName + "要求不超过" + max + "，请重新输入！");
        }
        return false;
      }

      if (amount < min) {
        if (isExplicit) {
          errorHandler(varName + "要求不少于" + min + "，请重新输入！");
        }
        return false;
      }
      return true;
    },
    /**
     * 合法性校验
     * @param content 内容
     * @param type 类型
     * @returns {boolean}
     */
    validate(content, type) {
      if (this.isEmpty(content)) {
        return false;
      }
      var regex = "^[";
      // 包含数字
      if (0 !== (type & input_verify.TYPE_NUMERIC)) {
        regex += "0-9";
      }
      // 包含小写字母
      if (0 !== (type & input_verify.TYPE_LOWER_LETTER)) {
        regex += "a-z";
      } // 大写字母
      if (0 !== (type & input_verify.TYPE_UPPER_LETTER)) {
        regex += "A-Z";
      } // 包含下划线
      if (0 !== (type & input_verify.TYPE_UNDER_LINE)) {
        regex += "_";
      } // 包含汉字
      if (0 !== (type & input_verify.TYPE_CHINESE_CHAR)) {
        regex += "\\u4e00-\\u9fa5";
      }
      // 包含特殊字符
      if (0 !== (type & input_verify.TYPE_SPECIAL_CHAR)) {
        regex += "`~!@#\\$%\\^&\\*\\(\\)_\\+\\-=\\{\\}\\|\\[\\]\\\\:\";'<>\\?,\\./";
      }
      // 包含中文标点符号
      if (0 !== (type & input_verify.TYPE_CHINESE_PRINT_CHAR)) {
        regex += "。？！，、；：“”‘'（）《》〈〉【】…—～￥";
      }
      regex += "]+$";

      var reg = new RegExp(regex);
      return reg.test(content);
    },
	// 日期格式化
	 formaterDate(str) {
		 if(!this.isEmpty(str)){
			 return str.substring(0,10)
		 }
	 },
  //  获取存储分页
  getPagination() {
    return this.isEmpty(sessionStorage.getItem('PAGE')) ? 1: (parseInt(sessionStorage.getItem('PAGE')))
  },
  // 存储分页
  setPagination(page) {
     sessionStorage.setItem('PAGE', page)
  },
  }
}
export default mixin;
