<template>
  <div class="basic-file">
    <ul>
      <li class="clearfix">
        <p class="red_start"><span>*</span>真实姓名</p>
        <div class="wb"></div>
        <input type="text" v-model.lazy="allData.Name" />
      </li>
      <li class="clearfix">
        <p>身份证</p>
        <div class="wb"></div>
        <input type="text" v-model.lazy="allData.PersonNo" v-on:blur="setBlur()" v-bind:disabled="IsEditPersonNo" />
      </li>
      <li class="clearfix">
        <p class="red_start"><span>*</span>性别</p>
        <div class="wb"><img src="../assets/img/arrow.jpg" height="10" width="6" /></div>
        <div class="pc-box">
          <input type="hidden" name="bank_id" id="bankId" value="" />
          <span id="showBank" ref="genderData">请选择</span>
        </div>
      </li>
      <li class="clearfix">
        <p class="red_start"><span>*</span>出生年月</p>
        <div class="wb"><img src="../assets/img/arrow.jpg" height="10" width="6" /></div>
        <div class="form-item item-line" id="selectDate">
          <div class="pc-box">
            <span data-year="" data-month="" data-date="" id="showDate" ref="birthDateData">请选择时间</span>
          </div>
        </div>
      </li>
      <!--<li class="clearfix">-->
      <!--<p>居住地</p>-->
      <!--<div class="wb"><img src="../assets/img/arrow.jpg" height="10" width="6"/></div>-->
      <!--<div class="form-item item-line" id="select_contact">-->
      <!--<div class="pc-box">-->
      <!--<input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code" value="" data-province-name="">-->
      <!--<input type="hidden" name="contact_city_code" id="contact_city_code" value="" data-city-name=""><span data-city-code="510100" data-province-code="510000" data-district-code="510105" id="show_contact" ref="birthAreaData">省、市</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="clearfix">-->
      <!--<p>详细地址</p>-->
      <!--<div class="wb"></div>-->
      <!--<input type="text" v-model="address.DetailedAddress"/>-->
      <!--</li>-->
      <li class="clearfix">
        <p>身高</p>
        <div class="wb">cm</div>
        <input type="number" v-model="allData.Height" />
      </li>
      <li class="clearfix">
        <p>体重</p>
        <div class="wb">kg</div>
        <input type="number" v-model="allData.Weight" />
      </li>
      <li class="clearfix">
        <p>婚姻史</p>
        <div class="wb"></div>
        <div class="pc-box">
          <input type="hidden" name="bank_id" id="marriageId" value="">
          <span id="showMarriage" ref="marriageData">请选择</span>
        </div>
      </li>
    </ul>
    <input type="submit" value="保存" class="phone-number-btn" v-on:click="setPersonInfor" />
  </div>
</template>
<script>
  import "../assets/css/iosSelect.css";
  import "../assets/js/zepto.js";
  import "../assets/js/iosSelect.js";
  import globalMixin from "../mixins/global";
  import provinces from "../assets/js/areaData_v2";

  export default {
    name: "BasicFile",
    mixins: [globalMixin],
    data() {
      return {
        proData: {},   //接收省份信息

        name: "",     //真实姓名
        cordNumber: null,  //身份证号码
        gender: "",    //性别
        birthDate: "",     //出生日期
        birthArea: "",    //出生地
        address: "",    //详细地址
        bodyHeight: null,   //身高
        bodyWeight: null,   //体重
        marriage: "",      //婚姻

        allData: {},
        IsEditPersonNo: false,
        PersonNo: "",
        IsMerge: false,
        IsSave: true,
        IsCommitShowBox: false
      }
    },
    computed: {
    },
    watch: {
      cordNumber(val) {
        this.isCardNo(val);
      },

    },
    created() {
    },
    mounted() {
      //this.$common.WebSocketConnent();
      this.$common.getNewToken().then((token)=>{
        this.getPPersonInfor().then(() => {
          if (!this.isCardNo(this.allData.PersonNo)) {
            this.choseGender();
            this.choseDate();
          }

          this.choseArea();
          this.choseMemm();
        });
      });
    },
    methods: {

      //身份证号码验证
      isCardNo(card) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(card) === false) {
          //this.errorDialogeShow("身份证输入不合法");
          return false;
        }
        return true;
      },
      //身份证号码获取出生年月日
      getBirthdayFromIdCard(idCard) {
        var birthday = "";
        var sex = "";
        if (idCard != null && idCard != "") {
          if (idCard.length == 15) {
            birthday = "19" + idCard.substr(6, 6);
          } else if (idCard.length == 18) {
            birthday = idCard.substr(6, 8);
          }

          birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        }
        return birthday;
      },
       //身份证号码获取 性别
      getSexFromIdCard(idCard) {
        var sex = "";
        if (idCard != null && idCard != "") {
          if (idCard.length == 15) {
            if (parseInt(idCard.substr(14, 1)) % 2 == 0) {
              sex = '女';
            } else {
              sex = '男';
            }

          } else if (idCard.length == 18) {
            if (parseInt(idCard.substr(16, 1)) % 2 == 0) {
              sex = '女';
            } else {
              sex = '男';
            }
          }

        }
        return sex;
      },
      //身份证号码获取 性别类型
      getSexTypeFromIdCard(idCard) {
        var sex = 0;
        if (idCard != null && idCard != "") {
          if (idCard.length == 15) {
            if (parseInt(idCard.substr(14, 1)) % 2 == 0) {
              sex = 2;
            } else {
              sex = 1;
            }

          } else if (idCard.length == 18) {
            if (parseInt(idCard.substr(16, 1)) % 2 == 0) {
              sex = 2;
            } else {
              sex = 1;
            }
          }

        }
        return sex;
      },
      //获取基本信息
      getPPersonInfor() {
        let that = this;

        let upData = {
          IsExercise: that.isActive + 1,
        };

        //return that.$axios.get(that.$common.getMobileUrl(that.$api.GetPersonInfoApi))
        return that.$fetch(that.$common.getMobileUrl(that.$api.GetPersonInfoApi))
          .then(function (res) {
            that.bindData(res);
          })
      },
      bindData(res) {
        var that = this;
        if (res.IsSuccess === true) {
          let getData = res.ReturnData;
          if (!res.ReturnData.Height) {
            res.ReturnData.Height = that.allData.Height;
          }
          if (!res.ReturnData.Weight) {
            res.ReturnData.Weight = that.allData.Weight;
          }
          that.allData = Object.assign({}, that.allData, getData);
          that.address = Object.assign({}, that.address, getData.Address);

          that.IsEditPersonNo = false;

          if (res.ReturnData.PersonNo && that.isCardNo(res.ReturnData.PersonNo)) {
            that.IsEditPersonNo = true;
            that.allData.Gender = that.getSexTypeFromIdCard(res.ReturnData.PersonNo);
            that.allData.Birthdate = that.getBirthdayFromIdCard(res.ReturnData.PersonNo);
          }

          //性别
          if (that.allData.Gender == 1) {
            document.querySelector('#showBank').innerText = "男";
            document.querySelector('#showBank').dataset['id'] = "1";
          }
          else {
            document.querySelector('#showBank').innerText = "女";
            document.querySelector('#showBank').dataset['id'] = "2";
          }
          //婚姻
          let me = parseInt(that.allData.MarriageStatus);
          switch (me) {
            case 10:
              document.querySelector('#showMarriage').innerText = "未婚";
              document.querySelector('#showMarriage').dataset['id'] = "10";
              break;
            case 20:
              document.querySelector('#showMarriage').innerText = "已婚";
              document.querySelector('#showMarriage').dataset['id'] = "20";
              break;
            case 30:
              document.querySelector('#showMarriage').innerText = "丧偶";
              document.querySelector('#showMarriage').dataset['id'] = "30";
              break;
            case 40:
              document.querySelector('#showMarriage').innerText = "离婚";
              document.querySelector('#showMarriage').dataset['id'] = "40";
              break;
            case 90:
              document.querySelector('#showMarriage').innerText = "请选择";
              document.querySelector('#showMarriage').dataset['id'] = "90";
              break;
          }

          //出生日期
          if (that.allData.Birthdate != null) {
            let d1 = that.allData.Birthdate.split("T");
            let d2 = d1[0].split("-");
            document.querySelector('#showDate').innerText = d1[0];
            document.querySelector('#showDate').dataset['year'] = d2[0];
            document.querySelector('#showDate').dataset['month'] = d2[1];
            document.querySelector('#showDate').dataset['date'] = d2[2];
          }

          //居住地
          // let address = "";
          // that.proData = provinces;
          // for(let i in that.proData.iosProvinces) {
          //   if(that.proData.iosProvinces[i].id == that.address.ProvinceID) {
          //     address += that.proData.iosProvinces[i].value;
          //     document.querySelector('#show_contact').dataset['provinceCode'] = that.address.ProvinceID;
          //   }
          // }
          // for(let i in that.proData.iosCitys) {
          //   if(that.proData.iosCitys[i].id == that.address.CityID) {
          //     address += " " + that.proData.iosCitys[i].value;
          //     document.querySelector('#show_contact').dataset['cityCode'] = that.address.CityID;
          //   }
          // }
          // for(let i in that.proData.iosCountys) {
          //   if(that.proData.iosCountys[i].id == that.address.CountyID) {
          //     address += that.proData.iosCountys[i].value;
          //     document.querySelector('#show_contact').dataset['districtCode'] = that.address.CountyID;
          //   }
          // }
          // document.querySelector('#show_contact').innerText = address;

        }
      },
      //提交基本信心
      setPersonInfor() {

        if (this.allData.Name == "" || this.name == null) {
          this.errorDialogeShow("请填写你的姓名！");
          return;
        }

        if (!!this.allData.PersonNo && !this.isCardNo(this.allData.PersonNo)) {
          this.errorDialogeShow("身份证输入不合法");
        }

        if (!this.IsSave) {
          this.errorDialogeShow("已经存在相同的证件号码");
          return;
        }

        if(!!this.allData.PersonNo && !this.isCardNo(this.allData.PersonNo)){
            this.errorDialogeShow("身份证输入不合法");
            return;
        }  

        this.gender = this.$refs.genderData.innerHTML;
        if (this.gender == "请选择") {
          this.errorDialogeShow("请选择你的性别！");
          return;
        }
        this.birthDate = this.$refs.birthDateData.innerHTML;
        if (this.birthDate == "请选择时间") {
          this.errorDialogeShow("请选择你的出生日期！");
          return;
        }
        if (this.allData.Height > 250 || this.allData.Height < 40) {
          this.errorDialogeShow("身高范围：40-250 cm！");
          return;
        }
        if (this.allData.Weight > 220 || this.allData.Weight < 1) {
          this.errorDialogeShow("体重范围：1-220 kg！");
          return;
        }

        var m = document.querySelector('#showDate').dataset['month'];
        if (m < 10) {
          m = "0" + m;
        }
        var d = document.querySelector('#showDate').dataset['date'];
        if (d < 10) {
          d = "0" + d;
        }
        var bdate = document.querySelector('#showDate').dataset['year'] + "-" + m + "-" + d;
        var today = this.$common.dataFormat(new Date(), "yyyy-MM-dd");
        var bd = "";
        if (bdate == today) {
          bd = this.$refs.birthDateData.innerHTML;
        } else {
          bd = bdate;
        }
        if (this.isCardNo(this.allData.PersonNo)) {
          bd = this.getBirthdayFromIdCard(this.allData.PersonNo);
        }
        this.marriage = this.$refs.marriageData.innerHTML;
        if (this.marriage == "请选择") {
          this.marriage = "";
        }

        let that = this;
        let upData = {
          Name: that.allData.Name,
          PersonNo: that.allData.PersonNo,
          Height: that.allData.Height,
          Weight: that.allData.Weight,
          // Address:{
          //   DetailedAddress : that.address.DetailedAddress,
          //   ProvinceID: document.querySelector('#show_contact').dataset['provinceCode'],
          //   CityID: document.querySelector('#show_contact').dataset['cityCode'],
          //   CountyID: document.querySelector('#show_contact').dataset['districtCode'],
          // },
          MarriageStatus: document.querySelector('#showMarriage').dataset['id'],
          Gender: document.querySelector('#showBank').dataset['id'],
          Birthdate: bd,
          Phone: that.allData.Phone,
          IsMerge: that.IsMerge
        };

        //that.$axios.post(that.$common.getMobileUrl(that.$api.SavePerson),upData)
        var commit = function () {
          that.$fetch(that.$common.getMobileUrl(that.$api.SavePerson), { method: 'POST', body: JSON.stringify(upData) })
            .then(function (res) {
              if (res.IsSuccess === true) {
                that.errorDialogeShow("保存成功！");
              }
            })
        }
        if (that.IsCommitShowBox) {

          var msg = "身份证号一经保存不可修改，请检查填写正确";
          var isconfirm = confirm(msg);
          if (isconfirm) {
            console.log("Save", "确定");
            commit();
          } else {
            console.log("Save", "取消");
          }
        } else {
          commit();
        }
      },
      setBlur() {
        var that = this;

        if (that.PersonNo == that.allData.PersonNo) {
          return;
        }
        that.PersonNo = that.allData.PersonNo;
        that.$fetch(that.$common.getMobileUrl(that.$api.ExistsAccount) + "?AccountName=" + that.allData.PersonNo + "&AccountType=2")
          .then(function (data) {
            that.IsSave = true;
            that.IsCommitShowBox = true;
            if (data.IsSuccess && data.ReturnData) {
              if (data.ReturnData.PersonNo) {
                that.PersonNo = data.ReturnData.PersonNo;
              }
              var msg = "身份证号已存在档案， 姓名" + data.ReturnData.Name + "，身份证号" + data.ReturnData.PersonNo + "，手机号" + (data.ReturnData.Phone || "") + "，是否确定显示档案？";
              var isconfirm = confirm(msg);
              if (isconfirm) {
                console.log("Account", "确定");
                that.IsMerge = true;
                that.bindData(data);
              } else {
                console.log("Account", "取消");
                that.IsSave = false;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
            that.errorDialogeShow(error);
          });
      }
    }
  }

</script>
<style scoped>

  html, body {
    background-color: #f7f7f7;
  }

  .red_start {
    margin-left: -10px;
  }
</style>
