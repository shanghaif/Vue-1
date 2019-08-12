/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import api from "../apiConfig";
import notTokenApi from "../apiConfig/not-token-api";
import sentTokenApi from "../apiConfig/sent-token-api";
import apiTypeMap from "../apiRoot";
import {getToken_H5, getToken_360App, setToken_360App} from "@/utils/auth";

let NODE_ENV = process.env.NODE_ENV;
let recommendProductBase = "http://hc003teststore.blob.core.chinacloudapi.cn/";

if(NODE_ENV === "preproduction") {
    recommendProductBase = "http://hc003tnstore.blob.core.chinacloudapi.cn/";
}

if(NODE_ENV === "production") {
    recommendProductBase = "http://hc003pestore.blob.core.chinacloudapi.cn/";
}

let utils = {
    getToken_H5,
    setToken_360App,
    getToken_360App,
    getRecommendProductUrl(url) {
        return `${recommendProductBase}${url}`;
    },
    getSearchParam(paramName) {
        let search = location.href.substring(location.href.indexOf("?") + 1, location.href.length);
        let array = search.split("&");
        let tempArray;
        let param = {};

        array.forEach((item) => {
            tempArray = item.split("=");
            param[tempArray[0]] = unescape(tempArray[1]);
        });

        return paramName ? param[paramName] : param;
    },
    getApiPath({name, params}, apiType = 0) {
        let path = api[name];

        if(!path) {
            path = sentTokenApi[name];
        }

        if (!path) {
            path = notTokenApi[name];
        }

        if(apiTypeMap) {
            path = apiTypeMap[apiType].api + path;
        }

        if (params) {
            for(let [key, value] of Object.entries(params)) {
                path = path.replace(new RegExp(`:${key}(?=(/|$))`), value);
            }
        }

        return path;
    },
    //末尾补0
    padEnd(a, padLen) {
        let length = padLen;
        let array = a.toString().split(".");
        let tempArray = [];

        if(array.length > 1) {
            tempArray = array[1].split("");
        }
        
        for(let i = 0; i < length; i ++) {
            tempArray.push("0");
        }
        
        a = array[0]  + tempArray.join("");

        return a;
    },
    //小数转换成整数
    getIntFormat(a, b) {
        let baseNum, baseNum1, baseNum2, padLen;
        
        try {
            baseNum1 = a.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }

        try {
            baseNum2 = b.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }

        baseNum = Math.max(baseNum1, baseNum2);
        
        if(!baseNum) {
            return {
                a: parseInt(a),
                b: parseInt(b),
                baseNum: baseNum
            };
        }
        
        if(baseNum1 == baseNum2) {
            a = a.toString().replace(".", "");
            b = b.toString().replace(".", "");
        }
        
        if(baseNum == baseNum1) {
            padLen = baseNum - baseNum2;
            b = this.padEnd(b, padLen);
            a = a.toString().replace(".", "");
        }
        
        if(baseNum == baseNum2) {
            padLen = baseNum - baseNum1;
            a = this.padEnd(a, padLen);
            b = b.toString().replace(".", "");
        }
        
        return {
            a: parseInt(a),
            b: parseInt(b),
            baseNum: Math.pow(10, baseNum)
        };
    },
    //加法
    add(a, b) {
        let obj = this.getIntFormat(a, b);
        let result = obj.a + obj.b;

        if(obj.baseNum) {
            result = result / obj.baseNum;
        }

        return result;
    },
    //减法
    reduce(a, b) {
        let obj = this.getIntFormat(a, b);
        let result = obj.a - obj.b;

        if(obj.baseNum) {
            result = result / obj.baseNum;
        }

        return result;
    },
    //乘法
    multiply(a, b) {
        let obj = this.getIntFormat(a, b);
        let result = obj.a * obj.b;

        if(obj.baseNum) {
            result = result / (obj.baseNum * obj.baseNum);
        }
        
        return result;
    },
    //除法
    divide(a, b) {
        let obj = this.getIntFormat(a, b);
        let  result = obj.a / obj.b;
        
        return result;
    },
    //获取正确的时间格式str
    getFormatDateStr(str) {
        let reg = /\-/g;
        let result = "";

        if(str) {
            result = str.replace(reg, "/");
        }

        return result;
    },
    //回退
    goBack() {
        history.go(-1);
    },
    // 格式化价格
    formatMoney(value, fixNum = 2) {
        let num = 0;

        if(!isNaN(value)) {
            num = Number(value);
        }

        num = num.toFixed(fixNum);

        return `${num}元`;
    },
    // 是否为空对象
    isEmpty(obj) {
        return !obj || JSON.stringify(obj) === "{}";
    },
    //时间格式化
    formatTime(value) {
        return value < 10 ? "0" + value : value;
    },
    // 格式化时间
    getCurrentTime(current) {
        if(!current) {
            current = new Date(); //获取系统当前时间
        }
        
        let year = this.formatTime(current.getFullYear());
        let month = this.formatTime(current.getMonth() + 1);
        let date = this.formatTime(current.getDate());
        let hours = this.formatTime(current.getHours()); //时
        let minutes = this.formatTime(current.getMinutes()); //分
        let seconds = this.formatTime(current.getSeconds()); //秒
        let day = current.getDay();
        
        let weekday = {
            "0": "天",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        };
        
        return {
            year,
            month,
            date,
            hours,
            minutes,
            seconds,
            day,
            dateStr: `${year}-${month}-${date}`,
            dateTimeStr: `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`,
            chinaDateStr: `${year}年${month}月${date}日`,
            dayStr: `星期${weekday[day]}`,
            alias: `周${weekday[day]}`,
            self: current
        };
    },
    capitalize(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    },
    mapState(vm) {
        let self = this;
        let state = vm.$store.state;
        let computed = {};
        
        for(let pro in state) {
            computed[pro] = {
                get() {
                    return vm.$store.state[pro];
                },
                set(val) {
                    vm.$store.dispatch("set" + self.capitalize(pro), val);
                }
            };
        }
        
        return computed;
    },
    getMapProp(map, key, pro) {
        let prop = key;

        if(typeof prop !== "string") {
            prop += "";
        }

        if(!map || !map[prop]) {
            return "";
        }

        return map[prop][pro];
    },
    getMapText(map, key) {
        return this.getMapProp(map, key, "text");
    },
    getMapKey(map, key) {
        return this.getMapProp(map, key, "key");
    },
    getMapKeyByValue(map, pro, value) {
        let key;

        for(let prop in map) {
            if(map[prop][pro] === value) {
                key = prop;

                break;
            }
        }

        return key;
    },
    //根据年龄获取时期
    getPeriod(age) {
        let str = "";

        if(age < 4) {
            str = "幼儿期";
        } else if(age < 7) {
            str = "学龄前期";
        }  else if(age < 13) {
            str = "学龄期";
        } else if(age < 18) {
            str = "少年期";
        } else if(age < 40) {
            str = "青年期";
        }  else if(age < 64) {
            str = "中年期";
        } else {
            str = "老年期";
        }

        return str;
    }
};

export default utils;
