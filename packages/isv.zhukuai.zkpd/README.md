# 高级套件初始化模板

高级套件，可以定制套件内渲染逻辑和流程，比如表单数据联动、数据初始化，也可以自定义设计态 setter，还可以创建自定义组件

## 常用开发命令

### 安装依赖

```
npm install
```

### 调试
swap cli 2.0
sudo tnpm install -g dingtalk-swap-cli@latest

```
npm run start

swap proxy

记住每次有改动，必须执行 swap build，保证本地换将和线上一致
后面我会npm run start 和 swap build 合并；   

必须使用 package.json中 antd/antd-mobile 等基础库对应版本，提供的组件；
禁止修改 package.json中 antd/antd-mobile 等基础库版本，否则禁止上线；

```

### 发布

### 说明


