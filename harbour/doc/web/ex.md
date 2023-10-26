# 异常处理器

* 可以进行全局的异常拦截，异常统一集中管理，返回异常信息等。
* **只能有一个异常处理器**

## 使用

* 实现`ExceptionHandler`接口，该类应是一个`Component`组件
* 写处理方法，方法参数为`HttpRequest request, HttpResponse response, Exception e`
* `@ExceptionPoint`指定该方法捕获的异常，可以有多个

```java
@Component
public class ExceptionGlobalHandler implements ExceptionHandler {

    @ExceptionPoint({IllegalArgumentException.class, NumberFormatException.class})
    public void illegalArgument(HttpRequest request, HttpResponse response, Exception e) throws IOException {
        response.json(ResponseResult.fail("参数不合法"));
    }

    @ExceptionPoint(NullPointerException.class)
    public void nullPointer(HttpRequest request, HttpResponse response, Exception e) throws IOException {
        response.html("<h1>Null Pointer</h1>");
    }

}
```

* 现在你可以在组件中大胆的`throw`异常，都会被上面捕获到
* 如果没有全局捕获对应的异常，由`ExceptionHandler`的`handle`方法处理

```java
public interface ExceptionHandler {
    default void handle(HttpRequest request, HttpResponse response, Exception e) {
        e.printStackTrace();
    }
}
```