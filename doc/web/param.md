# 路由参数

## 函数式路由

* 调用HttpRequest对象的`param()`方法即可

## 控制器

* 控制器可以自动接收参数，可以接收原生的原生的Request和Response对象，也可以用HttpRequest对象都行
* 支持将请求参数自动映射到方法参数中

1. 单个请求参数，支持数组与List集合

```java
@Get
public ResponseResult listBook(@Param("bname") String bname, @Param("page") int pageNum, @Param("limit") int pageSize) {
    Page<Book> bookPage = bookService.listBook(bname, pageNum, pageSize);
    return new ResponseResult(0, "", bookPage.getTotal(), bookPage.getData());
}
```

2. 请求参数映射成对象

```java
@Post("/login")
public String login(@Form User user) {
    System.out.println(user);
    return "index";
}
```

3. 请求体映射成对象，也可用String接收

```java
@Post
public ResponseResult addBook(@Body Book book) {
    int i = bookService.insertBook(book);
    return ResponseResult.conditionResult(i > 0, "添加成功", "添加失败");
}
```

4. 路径参数

```java
@Delete("/{id}")
public ResponseResult delete(@Path("id") int id) {
    int i = bookService.deleteBookById(id);
    return ResponseResult.conditionResult(i > 0, "添加成功", "添加失败");
}
```

5. Cookie，只支持String

```java
@Post
public ResponseResult login(@Cookie("token") String token) {
    //...
}
```

6. Header，只支持String

```java
@Post
public ResponseResult login(@Header("token") String token) {
    //...
}
```

7. 文件

```java
@Post
public ResponseResult up(@Param("fileName") Part file) {
    //...
}

@Post
public ResponseResult up(List<Part> files) {
    //...
}
```

8. 获取原生的对象，以下对象直接在方法参数可直接接收

```java
if (HttpServletRequest.class.equals(paramType)) {
    return req.raw();
} else if (HttpServletResponse.class.equals(paramType)) {
    return resp.raw();
} else if (HttpSession.class.equals(paramType)) {
    return req.getSession();
} else if (OutputStream.class.isAssignableFrom(paramType)) {
    return resp.getOutputStream();
} else if (HttpRequest.class.equals(paramType)) {
    return req;
} else if (HttpResponse.class.equals(paramType)) {
    return resp;
} else if (Model.class.equals(paramType)) {
    return new Model(req.raw());
}
```









