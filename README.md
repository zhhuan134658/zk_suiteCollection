# 多套件开发模板
使用lerna管理套件
## 使用

1. 修改代码
2. commit代码前执行：
```shell 
npm run swap
```
3. 如果是发布npm包，包版本批量更新：
```shell 
lerna version
```
4. 本地测试云构建结果
def build -t dist