# 静态资源映射

* 如果你使用了start-web，将自动将classpath下的static做为静态资源目录
* 此外，支持了webjars的映射，当请求为`/webjars/**`，从webjars寻找
    * [什么是webjars？](https://blog.csdn.net/q_0718/article/details/80105318)
* 这些源于`start`模块的自动加载配置

```java
@Override
public void addResourceMapping(ResourceMappingRegistry registry) {
    registry.addResourceHandler("/**").addResourceLocations("classpath:static/");
    registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:META-INF/resources/webjars/");
}
```

* 比如，以下，访问<http://localhost:2333/404.html>，即可访问到

```
src
    java
    resources
        static
            404.html
```

* 你还可以将classpath的其它目录或本地文件夹，做为静态资源映射目录，在[配置类](/doc/web/config.md)中配置