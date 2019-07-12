# 康美全程健康管理

## 构建命令

``` bash
# 安装依赖
npm install

# 启动开发模式，开启热加载模式 localhost:8080
npm run dev

# 构建发布版本
npm run build

# 构建预发布版本
npm run build:pre

# build for production and view the bundle analyzer report
npm run build --report
```


## 项目说明

#### 1.项目设计两套接口（康美360App、康美360H5）
```
# 康美360App
let baseUrl = "http://pre-app.kmhealth360.com";     //预发布
let baseUrl = "http://test-app.kmhealth360.com";    //开发、测试
let baseUrl = "http://app.kmhealth360.com"          //生产

# 康美360H5
let baseUrl = "http://pre-hmmobile.kmhealth360.com";    //预发布
let baseUrl = "http://test-hmmobile.kmhealth360.com";   //开发、测试
let baseUrl = "http://hmmobile.kmhealthcloud.com"       //生产
```

#### 2.接口用户认证
两套请求接口都需要在请求头配置token，而且是两个不同的token值
token暂定在打开页面时由上级调用者在`url`里作为参数传入

开发模式下设置静态token值直接使用，设置token在`src>permission.js`
```
if (process.env.IS_MOCK) {
  setToken('cdea40b5046a4335869970f18e848878')
}
```

#### 3.request封装
request使用的是`axios`框架，封装代码在`src>utils>request.js`

在封装对象中统一配置`api url`和`request header`
