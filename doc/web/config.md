# 配置类

* 配置类即`WebConfigurer`接口的实现类，应是一个组件，**只能有一个配置类**
* 选择性配置即可

```java
public interface WebConfigurer {
    default void addViewController(ViewControllerRegistry registry) {
        // 视图快捷配置
    }

    default void addResourceMapping(ResourceMappingRegistry registry) {
        // 静态资源映射配置
    }

    default void configNavigationRegistry(NavigationGuardRegistry registry) {
        // 路由守卫配置
    }

    default void addCorsMappings(CorsRegistry registry) {
        // 跨域配置
    }
}
```

## 视图配置

* 当控制器方法没有任何操作时，仅仅用来页面跳转

```java
@Component
public class WebConfig implements WebConfigurer {

    @Override
    public void addViewController(ViewControllerRegistry registry) {
        registry.add("/", "index");
    }

    // ...

}
```

## 静态资源配置

* `classpath:`指类路径目录
* `file:`指系统文件路径
* **注意**：最后要有目录绷带符号`/`或`\\`

```java
@Component
public class WebConfig implements WebConfigurer {

    @Override
    public void addResourceMapping(ResourceMappingRegistry registry) {
	    registry.addResourceHandler("/static/**").addResourceLocations("classpath:static/")
	    	.addResourceLocations("file:C:\\Users\\admin\\Desktop\\demo\\")
    }

}
```

## 路由守卫配置

* 这样配置后，对应的路由守卫类不需要`@Component`注解的`@Guard`注解配置

```java
@Component
public class WebConfig implements WebConfigurer {

    @Override
    public void configNavigationRegistry(NavigationGuardRegistry registry) {
        registry.addNavigationGuard(new LoginGuard()).addUrlPattern("/**")
                .excludeUrlPattern("/error/**", "/jquery/**", "/layui/**", "/login", "/admin/user/login", "/captcha")
                .setOrder(-1);
    }

    // ....

}
```

## 跨域配置

* 如果使用以下配置，直接用`registry.addMapping("/**").defaultRule();`即可

```java
@Component
public class WebConfig implements WebConfigurer {

    // ...

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            // 设置允许跨域请求的域名
            .allowedOriginPatterns("*")
            // 是否允许cookie
            .allowCredentials(true)
            // 设置允许的请求方式
            .allowedMethods("GET", "POST", "DELETE", "PUT")
            // 设置允许的header属性
            .allowedHeaders("*")
            // 跨域允许时间
            .maxAge(3600L);
    }

}
```

## 自动配置

* start模块加载了一些默认配置，为`WebConfiguration`类，如果你要使用其默认的配置
* 配置类改为继承`WebConfiguration`，调用其`super`

```java
@Component
public class WebConfig extends WebConfiguration {

    @Override
    public void addViewController(ViewControllerRegistry registry) {
        super.addViewController(registry);
        registry.add("/", "index");
        registry.add("/login", "login");
    }

    @Override
    public void addResourceMapping(ResourceMappingRegistry registry) {
        super.addResourceMapping(registry);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        super.addCorsMappings(registry);
        registry.addMapping("/**").defaultRule();
    }

}
```








