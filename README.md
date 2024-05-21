# paper-cutting

## 姿色纸缘-剪纸云展馆(前台)

## 后端
1. 找到document中的sql文件运行,运行前建一个paper-cutting数据库
2. 找到paper-foreground中的appliication.yml配置类,更改为你自己的数据库配置
3. 创建paper-cutting-resources文件
4. 打开redis
5. 在paper-foreground找到启动类启动

jwt配置:
tokenHeader: Authorization #JWT存储的请求头
tokenHead: 'Bearer '  #JWT负载中拿到开头


knife4j：访问地址http://127.0.0.1:8082/doc.html

## 前端
1. 下载gradle-8.3-all.zip压缩包、gradle-wrapper.jar,放在/paper-client-front/android/gradle/wrapper下
2. npm i
3. 连接虚拟机/真机
4. 运行package.json中android脚本
