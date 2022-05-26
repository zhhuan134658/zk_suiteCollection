import notification from 'antd/lib/notification';
  import 'antd/lib/notification/style';
  import loadScript from './utils/loadScript';
  
  notification.info({
    message: 'Swap Debug Mode',
    description: '当前环境：套件调试环境',
    duration: 5,
  });
  
  // eruda dev-tools
  loadScript('https://g.alicdn.com/code/lib/eruda/2.4.1/eruda.min.js').then(
    () => {
      eruda.init();
      console.log('eruda init success');
    },
  );
  //TODO:xhf-本地调试生效，线上不生效
  window.__isDebug = true;
  
  
  // 运行态视图
  import PCRender from './runtime/pc';
  import MobileRender from './runtime/mobile';
  
  // 套件配置
  import BizSuiteConfig from './config';
  
  

  
  
  console.warn('swap cli debug mode start');
  
  window.thirdSuitemMaterialSet = {
    PCRender,
    MobileRender,
    BizSuiteConfig,
    
    
  };

  export default {
    PCRender,
    MobileRender,
    BizSuiteConfig,
    
    
  };