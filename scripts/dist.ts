import * as globby from 'globby';
import * as path from 'path';
import * as fse from 'fs-extra';
import { execSync } from 'child_process';

const appendPackageJson = (pattern: string) => `${pattern}/package.json`;
const rootDir = process.cwd();

const packages = fse.readJSONSync(path.join(rootDir, 'lerna.json')).packages;

const pattern = packages ? packages.map(appendPackageJson) : ['*/**/package.json'];
const allPackagesPath = globby.sync(pattern, {
  cwd: rootDir,
  ignore: ['**/node_modules/**', '**/examples/**', '**/demo?(s)/**', '**/doc?(s)/**', '**/(build|dist)/**'],
  onlyFiles: true,
});

// 移动dist
allPackagesPath.forEach(pkg => {
  const dist = pkg.split('package.json')[0];
  const bizType = pkg.split('/')[1];
  //TODO:xhf-校验文件夹名字确实是套件config bizType
  //在代码提交时pre-commit拦截
  //TODO:xhf-v2-测试每个包下执行 npm run build
  //本地使用lerna时不需要
  execSync(`cd ${dist} && tnpm ii`, { stdio: 'inherit' });
  execSync(`cd ${dist} && tnpm run build-prod`, { stdio: 'inherit' });

  if(fse.existsSync(path.join(rootDir, `${dist}/dist`))) {
    fse.moveSync(
      path.join(rootDir, `${dist}/dist`), 
      path.join(rootDir, `dist/${bizType}`), 
      { overwrite: true }
    )
  }
});