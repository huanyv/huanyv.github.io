# 路由守卫

* 路由守卫可以在对应的请求执行前与执行后进行拦截，可以在执行前确定是否继续执行，类似于`Filter`过滤器
* 原生Servlet组件不会被拦截

## 使用方法

* 实现`NavigationGuard`接口
* 是一个`Component`组件
* 使用`@Guard`注解或在[配置类](/doc/web/config.md)中注册
    * `@Guard`
        * `value`拦截地址，`/**`表示拦截所有请求
        * `exclude`不拦截的地址（排除地址）
        * `order`执行顺序

```java
@Bean
@Guard(value = {"/**"}, exclude = {"/error/**", "/jquery/**", "/layui/**", "/login", "/admin/user/login", "/captcha"})
public class LoginGuard implements NavigationGuard {

    @Override
    public boolean beforeEach(HttpRequest req, HttpResponse resp) throws IOException {
        HttpSession session = req.getSession();
        Object username = session.getAttribute("username");
        if (username != null) {
            // 用户已登录，继续执行
            return true;
        }
        // 用户未登录，重定向到登录页面
        resp.redirect("/login");
        return false;
    }

}
```

* `beforeEach`在请求前执行，返回`true`表示继续执行，`false`将停止执行后续所有操作
* `afterEach`在请求后执行





