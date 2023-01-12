# 这是什么？

* 以上三个模块都可以独立使用，这个是对MVC、Bean、ORM模块的一个整合，使用内嵌的Tomcat容器进行运行，让开发更加方便快捷
* 加入了启动加载器概念，让应用启动时，依据条件自动装载Bean
* 打包时打成jar包即可运行，也提供了打war包的方式

## 配置

* 配置文件：默认找的是`application.properties`这个配置文件
* 命令行参数：由`--`为前缀
    * `--app.env=prod`此时配置文件就变成了`application-prod.properties`，这个配置为命令行专属
    * 命令行参数配置优先级大于配置文件，比如`--server.port=8080`这样就可以运行临时改端口
    * `java -jar xxx.jar --app.env=prod --server.port=8080 --server.contextPath=/example`

## API

* `AppArguments`配置对应的类，配置文件中的配置会映射到这个类中