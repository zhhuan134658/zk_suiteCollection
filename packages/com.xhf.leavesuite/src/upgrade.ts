
export interface UpgradeContext {
  schema: any;
  data?: any;
}

export type IScene = 'designer' | 'create' | 'detail'

export default (scene: IScene, preContext: UpgradeContext, currContext: UpgradeContext) => {
  console.log('自定义升级',scene,preContext,currContext);
  switch(scene) {
    case 'designer':
      return processDesignerContext(preContext, currContext);
    case 'create':
      return processCreateContext(preContext, currContext);
    case 'detail':
      return processDetailContext(preContext, currContext);
  }
}

function processDesignerContext(preContext: UpgradeContext, currContext: UpgradeContext) {
  return null;
}

function processCreateContext(preContext: UpgradeContext, currContext: UpgradeContext) {
  return null;
}

function processDetailContext(preContext: UpgradeContext, currContext: UpgradeContext) {
  return null;
}