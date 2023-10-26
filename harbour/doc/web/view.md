# 视图

MVC模式的View，将模型Model的数据展示到页面上，支持两种视图`enjoy`和`thymeleaf`

```xml
<dependency>
    <groupId>top.huanyv</groupId>
    <artifactId>harbour-start-enjoy</artifactId>
</dependency>

<dependency>
    <groupId>top.huanyv</groupId>
    <artifactId>harbour-start-thymeleaf</artifactId>
</dependency>
```

* enjoy：<https://jfinal.com/doc/6-4>
    * 推荐：指令少，语法简单，源码轻量，中文文档
    * 在本框架中，如果要得到`contextPath`，使用`#(ctxPath)`即可
* thymeleaf：<https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html>
    * 中文教程：<https://fanlychie.github.io/post/thymeleaf.html>
* **使用视图的前提**：控制器不能有`@body`注解，返回值必需是String类型，返回值为视图名
* 视图文件默认在classpath下的`templates`目录中

## Model数据

* 可以直接使用HttpServletRquest对象或者HttpRequest对象，像以前Servlet中那样可以
* 也可以使用Model对象，其实是一样的

```java
@Component
@Route("/admin/user")
public class UserController {

    @Inject
    private UserService userService;

    @Post
    public String add(Model model) {
        List<User> users = userService.getAll();
        model.add("users", users);
        return "user/info";
    }
}
```

## 转发与重定向

```java
@Get("/testForward")
public String testForward() {
    return "forward:/success";
}

@Get("/testRedirect")
public String testRedirect() {
    return "redirect:/success";
}
```









