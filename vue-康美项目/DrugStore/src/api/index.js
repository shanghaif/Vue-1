const hostUrl = "http://unwu4g.natappfree.cc";
// const hostUrl = "";

let currentPage = 1;
let pageSize = 10;

let api = {
  phone: hostUrl + "/api/customer/VerificationCode?phone=",   //获取验证码
  phoneVf: hostUrl + "/api/customer/BindWechatPhone",    //上传验证码,绑定手机
  bingPhone: hostUrl + "/api/customer/GetIsBindPhone",   //是否绑定手机
  getWebTokenApi: hostUrl + "/api/WeiXin/GetWebAccessToken",    //获取微信token

  getReport: hostUrl + "/api/customer/GetHealthEvaluate",  //获取报告信息
  getToken: hostUrl + "/api/WeiXin/GetMobileToken", //获取token
  DataIntegrationApi: hostUrl + "/api/customer/DataIntegration",   //整合档案
  getWechatCode: hostUrl + "/Wechat/Index?redirect_uri=",
  getWechatOpenId: hostUrl + "/Wechat/RedirectCode?redirect_uri=",
  getMobileNewToken: hostUrl + "/api/WeiXin/GetMobileNewToken", //获取token
  BindWechatIDNumber: hostUrl + "/api/customer/BindWechatIDNumber", //绑定微信和身份证
  GetIsBindPerson: hostUrl + "/api/customer/GetIsBindPerson?OpenId=", //绑定微信和身份证

  BloodSugarReport: "/api/DailyMonitor/GetBloodSugarReport", //血糖报告
  BloodPressureReport: "/api/DailyMonitor/GetBloodPressureReport", //血糖报告npm run build

  BloodPressureApi: "/api/DailyMonitor/GetBloodPressureRecord",    //获取血压信息
  BloodSugarApi: "/api/DailyMonitor/GetBloodSugarRecord",    //获取血糖信息
  HeartRateApi: "/api/DailyMonitor/GetHeartRateRecord",    //获取心率信息
  StepApi: "/api/DailyMonitor/GetStepReocrd",    //获取步数信息
  BloodOxygenApi: "/api/DailyMonitor/GetBloodOxygenRecord",    //获取血氧信息
  VitalCapacityApi: "/api/DailyMonitor/GetVitalCapacityRecord",    //获取肺活量信息

  SaveBloodPressureApi: "/api/DailyMonitor/SaveBloodPressure",   //保存血压POST
  SaveBloodSugarApi: "/api/DailyMonitor/SaveBloodSugar",   //保存血糖POST
  SaveHeartRateApi: "/api/DailyMonitor/SaveHeartRate",   //保存心率POST
  SaveStepRecordApi: "/api/DailyMonitor/SaveStepRecord",   //保存步数POST
  SaveBloodOxygenRecordApi: "/api/DailyMonitor/SaveBloodOxygenRecord",   //保存血氧POST
  SaveVitalCapacityRecordApi: "/api/DailyMonitor/SaveVitalCapacityRecord",   //保存肺活量POST

  HealthTypeApi: "/api/HealthType",   //获取疾病类型
  HealthHistoryApi: "/api/HealthHistory",  //获取健康史疾病

  SavePersonDrinkSmokingApi: "/api/LifeStyle/SavePersonSmokeDrink",   //保存吸烟饮酒数据
  SavePersonEatHabitApi: "/api/LifeStyle/SavePersonEatHabit",  //保存饮食习惯
  SavePersonSportApi: "/api/LifeStyle/SavePersonSport",        //保存运动信息

  GetLifeHabitSelectionItemsAPI: "/api/Component/GetDictionary",  //获取指定ID的题目
  GetPersonDrinkSmokingApi: "/api/LifeStyle/GetPersonSmokeDrink",    //获取吸烟饮酒信息
  GetPersonEatHabitApi: "/api/LifeStyle/GetPersonEatHabit",   //获取饮食习惯信息
  GetPersonSportApi: "/api/LifeStyle/GetPersonSport",    //获取运动信息
  GetSportTemplateApi: `/api/SportTemplate?currentPage=${currentPage}&pageSize=${pageSize}`,//获取运动模板信息

  GetPersonInfoApi: "/api/Person/GetPersonInfo",   //获取个人基本信息
  SavePerson: "/api/Person",   //保存个人基本信息

  GetHealthInfoComplete: "/api/Person/GetHealthInfoComplete",   //获取健康史完整度
  GetLifeComplete: "/api/Person/GetLifeComplete",     //获取生活习惯完整度

  GetWeChatPersonCompleteApi: "/api/Person/GetWeChatPersonComplete",   //获取微信公众号首页信息的完整度

  GetTreatmentRecordListApi: "/api/TreatmentRecord/GetTreatmentRecordList",//诊疗记录列表
  GetTreatmentRecordApi: "/api/TreatmentRecord/GetTreatmentRecord",//根据诊疗记录ID获取诊疗信息
  GetPrescriptionApi: "/api/Prescription/GetPrescription",//根据处方信息ID获取处方信息

  ExistsAccount: "/api/Person/ExistsAccount",

  GetPhysicalExamYearList:"/api/PhysicalExam/GetPhysicalExamYearList",//获取体检记录列表
  PhysicalExam:"/api/PhysicalExam/",//获取体检记录详情
  SavePersonPhyExam:"/api/PhysicalExam",//保存手动录入体检记录

  GetDictionary:"/api/Component/GetDictionary",//获取字典信息
};

export default api;
