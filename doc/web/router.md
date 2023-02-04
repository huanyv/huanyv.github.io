# 路由注册

路由是一个请求的执行单元，需要在程序中创建好URL与路由和映射关系, 在本框架中，无论哪种路由注册方式的前提是，注册的类要是一个组件Bean，有三种方式注册

## Harbour

* 这是一个快速启动Web服务的类，只需要在Main函数中调用即可，适合做临时服务启动
* `Harbour.use()`返回的是一个单例对象，其中可以调用`get`、`post`、`put`、`delete`方法，有两个参数值第一个即请求地址，第二个为执行内容，这是一个函数式接口
* `run()`只可以调用一次
* 访问<http://localhost:2333/hello>

```java
public class MainApplication {
    public static void main(String[] args) {
        Harbour.use().get("/hello", (req, resp)-> resp.html("<h1>Hello World!</h1>")).run(MainApplication.class, args);
    }
}
```

## RouteRegistry

* 这个接口的注册方式与上面类似，两种方式的函数式接口是同一个，所以有相同的方法
* 适合单一职责每个类，有不同的作用
* `setBase()`方法为当前类中所有注册基地址
* 即：`/a/say`、`/a/hello`

```java
@Component
public class UserController implements RouteRegistry {

    // 依赖注入
    @Inject
    private UserService userService;

    @Override
    public void run(Routing app) {

        app.setBase("/a");

        app.get("/say", (req, resp) -> {
            System.out.println("userService.getUserById(1) = " + userService.getUserById(1));
            resp.json(userService.getUserById(1));
        }).post("/hello", (req, resp) -> {
            resp.html("<h1>Hello World!</h1>")
        });

    }
}
```

## 控制器

* 如果学习过SpringMvc或SpringBoot，这和其使用方法是类似的
* 控制器必需是一个组件，必需是有`@Route`注解声明
* `@Route`中可以有请求基地址，也可以没有
* `@Route`注册作用在方法上表明，任何请求路由，如果使用其它请求，使用对应的注册即可

```java
@Component
@Route("/test") // 必须有
public class HelloController {

    @Inject
    private UserService userService;

    @Route("/")
    public void hello(HttpRequest req, HttpResponse resp) throws IOException {
        System.out.println("userService.getUserById(1) = " + userService.getUserById(1));
        resp.html("<h1>hello</h1>");
    }

    @Route("/admin")
    public void admin(HttpRequest req, HttpResponse resp) throws IOException {
        String s = null;
        if (s.equals("")) {
            System.out.println(11);
        }
        resp.html("admin");
    }

    // get请求
    @Get("/get/{id}/{name}")
    public void gettest(HttpRequest req, HttpResponse resp) throws IOException {
        System.out.println("req.pathVar(\"id\") = " + req.pathVar("id"));
        System.out.println("req.pathVar(\"name\") = " + req.pathVar("name"));
        resp.html("<h1>get</h1>");
    }

}
```

## HttpRequest与HttpResponse

这两个类是对原生的HttpServletRequest和HttpServletResponse的封装，减少其使用复杂度，也可以调用`raw()`方法获取原生的对象

### HttpRequest

* `raw()`获取原生对象
* `getUri()`获取请求uri
* `forward()`请求转发
* `view()`视图转发
* `param()`、`paramInt()`、`paramLong()`获取请求参数
* `path()`、`pathInt()`、`pathLong()`获取路径参数
* `ctx()`获取ServletContext
* `setAttr()`设置请求域参数

### HttpResponse

* `raw()`获取原生对象
* `redirect()`重定向
* `html()`响应HTML
* `text()`响应文本
* `json()`响应JSON
* `xml()`响应XML
* `file()`下载文件
