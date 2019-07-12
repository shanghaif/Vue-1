import axios from "axios";
import Vue from "vue"
import Vuex from "vuex";
import "../assets/js/jquery.md5"
import globalMixin from "../mixins/global";

const vm = new Vue;
var ws;

let common = {
  getOpenId() {
    var openid = localStorage.getItem("kmWechatOpenId") || "";
    if (openid == "") {
      openid = this.getQueryVariable("OpenId") || "";
    }
    if (openid) {
      localStorage.setItem("kmWechatOpenId", openid);
    }
    return openid;
  },
  //获取token
  getToken() {
    let that = this;

    let code = that.getQueryVariable("code") || "";
    let recordNo = that.getQueryVariable("RecordNo") || "";
    let openId = that.getOpenId() || "";

    let token = localStorage.getItem("token");

    if (token) {
      let timestamp = (new Date()).valueOf();
      let goTime = (timestamp - JSON.parse(token).timestamp) / (60 * 1000);
      if (goTime > (23*60)) {
      //if (goTime > 1) {
        localStorage.removeItem("token");
        console.log("登录已过期");
        return that.getToken();
      }
      else {
        return Promise.resolve(token);
      }
    } else if (!openId && !code) {
      let changeUrl = encodeURIComponent(window.location.href);  //编码URL
      let redirect = vm.$api.getWechatCode + changeUrl;
      window.location.href = redirect;
      return Promise.resolve(token);
    } else {

      return vm.$fetch(vm.$api.getToken + "?RecordNo=" + recordNo + "&OpenId=" + openId + "&Code=" + code)
        .then((res) => {
          if (res.IsSuccess === true) {
            let tk = {
              Token: res.ReturnData.Token,
              timestamp: (new Date()).valueOf()
            };
            localStorage.setItem("kmWechatOpenId", res.ReturnData.OpenId);
            localStorage.setItem("MobileUrl", res.ReturnData.MobileUrl);
            localStorage.setItem("token", JSON.stringify(tk));
 
            return Promise.resolve(JSON.stringify(tk));
          } else {
            if (res.ReturnData == null || res.ReturnData.RecordNo == null) {
              vm.$router1.replace({ name: 'error', query: { err: "对不起，未发现档案！" } });
            }
            else {
              var returnRecordNo = res.ReturnData.RecordNo || null;
              if (returnRecordNo != null) {
                if (res.ReturnData.OpenId) {
                  localStorage.setItem("kmWechatOpenId", res.ReturnData.OpenId);
                } else {
                  vm.$router1.replace({ name: 'error', query: { err: "系统出错" } });
                }

                if (!res.ReturnData.IsBindPhone || !res.ReturnData.IsBindWechat) {
                  vm.$router1.replace({ name: 'phone-number', query: { RecordNo: returnRecordNo } });
                }
              }
            }
          }
        })
    }
  },
  //获取token
  getNewToken() {
    let that = this;

    let openId = that.getOpenId();
    let tokenObj = localStorage.getItem("token");
    if(!openId|| !tokenObj)
    {
      return Promise.resolve();;
    } 
    let token=  JSON.parse(tokenObj).Token;
    return vm.$fetch(vm.$api.getMobileNewToken + "?openid=" + openId + "&oldtoken=" + token)
    .then((res) => {
      if (res.ReturnData) {
        let tk = {
          Token: res.ReturnData.Token,
          timestamp: (new Date()).valueOf()
        };
        localStorage.setItem("kmWechatOpenId", res.ReturnData.OpenId);
        localStorage.setItem("MobileUrl", res.ReturnData.MobileUrl);
        localStorage.setItem("token", JSON.stringify(tk));
        localStorage.setItem("IP", res.ReturnData.IP);

        return Promise.resolve(res.ReturnData.Token);
      } 
    })
  },
  WebSocketConnent(){
    var ip= localStorage.getItem("IP");
    var openId= localStorage.getItem("kmWechatOpenId");
    var url="ws://"+ip+":2019";
    var url = "ws://127.0.0.1:2019";
    if ("WebSocket" in window) {
        ws = new WebSocket(url);
    }
    else if ("MozWebSocket" in window) {
        ws = new MozWebSocket(url);
    }
    else{
      console.log("WebSocketConnent","浏览器版本过低，请升级您的浏览器")
    }

    //注册各类回调
    ws.onopen = function () {
        ws.send(openId);
      console.log("WebSocketConnent","连接服务器成功");
    }

    ws.onclose = function () {
      console.log("WebSocketConnent","与服务器断开连接");
    }
    ws.onerror = function () {
      console.log("WebSocketConnent","数据传输发生错误");
    }
    ws.onmessage = function (receiveMsg) {
      localStorage.removeItem("token");

      console.log("WebSocketConnent","服务器推送过来的消息："+receiveMsg.data);
    }
  },
  getMobileUrl(api) {
    if (api.indexOf('http') === -1) {
      return localStorage.getItem("MobileUrl") + api;
    }
    return api;
  },
  //时间转换
  formatTime(value) {
    return value < 10 ? "0" + value : value;
  },
  dataFormat(value, fmt) {
    let getDate = new Date(value);
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt;
  },
  getTime(current) {
    if (!current) {
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
      day: `星期${weekday[day]}`
    };
  },

  getQueryVariable(name) {
    let reg = new RegExp("(?:[#|?|&|?])" + name + "=([^?|#|&|=|?|/]*)");
    let r = window.location.href.match(reg);
    if (r !== null) {
      //console.log(unescape(r[1]));
      return unescape(r[1]);
    }
    return false;
  },

  //创建折线图表
  getCharts(val1, val2) {
    let option = {};
    let v1Data = {
      name: val1.name,
      type: 'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {   //区域颜色
        normal: {
          color: '#aae8d0'
        }
      },
      itemStyle: {  //折线和圆圈颜色
        normal: {
          color: '#6ccc56',
          lineStyle: {
            width: 1,
            color: '#6ccc56'
          }
        },
      },
      data: val1.data
    };

    let seriesData = [];
    let nameData = [];
    let xdata = [];

    if (val2) {
      let v2Data = {
        name: val2.name,
        type: 'line',
     //   stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {
          normal: {
            color: '#bff2f9'
          }
        },
        itemStyle: {
          normal: {
            color: '#0b7cff',
            lineStyle: {
              width: 1,
              color: '#0b7cff'
            }
          },
        },
        data: val2.data
      };
      seriesData[0] = v1Data;
      seriesData[1] = v2Data;
      nameData[0] = val1.name;
      nameData[1] = val2.name;
      xdata = val1.xData;
    }
    else {
      seriesData[0] = v1Data;
      nameData[0] = val1.name;
      xdata = val1.xData;
    }

    option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: nameData,
        left: 'left',
      },
      grid: {  //调整图像边距
        left: '3%',
        right: '4%',
        bottom: '-4%',
        top: '16%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          show: false,  //不显示X轴
          data: xdata,
        }
      ],
      yAxis: [
        {
          type: 'value',
        }
      ],
      series: seriesData,
      dataZoom: [   //左右拖动
        {
          type: 'inside',
          start: 0,
          end: 10000,
          minValueSpan: 5
        },
      ],
    };

    return option;
  },

  //创建饼状图表
  getPieCharts(data ,val) {
    let color = [];
    if (data.length === 3) {
      color = ['#00cbe9', '#fe8b31', '#50f3f3'];
    }
    else {
      color = ['#00cbe9', '#fe8b31', '#ffc635', '#fe8b31', '#ff3b3b', '#50f3f3'];
    }
    let option = {
      tooltip: {
        trigger: 'item',
      },
      grid: {  //调整图像边距
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '0%',
        containLabel: true
      },
      series: [
        {
          name: val,
          type: 'pie',
          color: color,
          center: ['50%', '50%'],
          radius: ['40%', '70%'],
          x: 0,
          y: 0,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              fontSize: '12',
              formatter: '{a}',
              color: '#333333'
            },
            emphasis: {
              show: false,  //不显示中间文字
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data,
        }
      ]
    };

    return option;
  },

  //绘制环
  drawMain(drawing_elem, percent, forecolor, bgcolor) {
    /*
        @drawing_elem: 绘制对象
        @percent：绘制圆环百分比, 范围[0, 100]
        @forecolor: 绘制圆环的前景色，颜色代码
        @bgcolor: 绘制圆环的背景色，颜色代码
    */
    let context = drawing_elem.getContext("2d");
    let center_x = drawing_elem.width / 2;
    let center_y = drawing_elem.height / 2;
    let rad = Math.PI * 2 / 100;
    let speed = 0;

    // 绘制背景圆圈
    function backgroundCircle() {
      context.save();
      context.beginPath();
      context.lineWidth = 12; //设置线宽
      let radius = center_x - context.lineWidth;
      context.lineCap = "round";
      context.strokeStyle = bgcolor;
      context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
      context.restore();
    }

    //绘制运动圆环
    function foregroundCircle(n) {
      context.save();
      context.strokeStyle = forecolor;
      context.lineWidth = 12;
      context.lineCap = "round";
      let radius = center_x - context.lineWidth;
      context.beginPath();
      context.arc(center_x, center_y, radius, -Math.PI / 2, -Math.PI / 2 + n * rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      context.stroke();
      context.closePath();
      context.restore();
    }

    //绘制文字
    function text(n) {
      context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
      context.fillStyle = forecolor;
      let font_size = 40;
      context.font = font_size + "px Helvetica";
      let text_width = context.measureText(n.toFixed(0) + "%").width;
      context.fillText(n.toFixed(0) + "%", center_x - text_width / 2, center_y + font_size / 2);
      context.restore();
    }

    //执行动画
    (function drawFrame() {
      window.requestAnimationFrame(drawFrame);
      context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
      backgroundCircle();
      text(speed);
      foregroundCircle(speed);
      if (speed >= percent) return;
      speed += 1;
    }());
  },


};

export default common;
