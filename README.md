# vue-antd

## 前言

基于Ant-design-vue创建的Vue后台管理系统。在vue-backend项目上积累的经验应用到这里，并对之前一些不合理的东西做出了调整。

## 代码风格说明

当前使用的是Standard风格，未增加任何自定义风格说明，以后会慢慢增加及改善。

## 环境变量说明

基于vue-cli 3.x生成项目，使用其推荐的.env进行环境变量配置，所有环境变量必须在.env中进行声明，不同环境下仅需要针对不同值进行修改即可。

## Mock说明

基于Express创建的简单Mock-server，可以自行在`mock`文件夹下使用。当前后台服务使用nodemon作为热重载，返回数据依然使用MockJS进行简单模拟，未真正链接数据库。有需要的完全可以将Mock-server完全变成前后端分离中的Node中间层，然后进行单独部署。这里仅提供基本Mock例子。

## 功能列表

- 异步路由
- 权限判断及切换
- 多语言
- 独立的Mock Server

## 常用命令

### 项目初始化
```
# 开启项目mock数据
npm install
```

### 开启本地 mock-server
```
# 开启项目mock环境
npm run dev-mock

# 开启后端 mock-server
cd mock
npm install
npm run mock
```

### 使用默认的开发模式 - 有热重载
```
npm run serve
```

### 生产环境打包
```
npm run build
```
