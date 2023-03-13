# 日志配置

该框架默认整合了SLF4J和LOGBACK作为日志

## 日志级别

* 支持5个日志级别`TRACE`、`DEBUG`、`INFO`、`WARN`、`ERROR`，默认的日志级别为`INFO`
* `harbour.log.level.某个日志=级别`级别不区大小写
* `harbour.log.level.root=trace` 所有日志级别为`TRACE`
* `harbour.log.level.com.ppp=debug`com.ppp包下的日志级别为`DEBUG`

## 日志输出路径

* 不配置即不输出日志文件
* `harbour.log.path=/xxx/xxx/xxx`
* `harbour.log.path=/log`

