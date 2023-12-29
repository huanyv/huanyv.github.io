# RESTFul风格API

* HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。
* 它们分别对应四种基本操作：
    * GET 用来获取资源
    * POST 用来新建资源
    * PUT 用来更新资源
    * DELETE 用来删除资源。
* REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性。


| 操作     | 传统方式         | REST风格                |
| -------- | ---------------- | ----------------------- |
| 查询操作 | getUserById?id=1 | user/1-->get请求方式    |
| 保存操作 | saveUser         | user-->post请求方式     |
| 删除操作 | deleteUser?id=1  | user/1-->delete请求方式 |
| 更新操作 | updateUser       | user-->put请求方式      |

* 当在方法上使用声明`@Body`注解后，控制器的返回值直接输出为数据，默认自动转为JSON格式
* 如果使用的控制器类上，此类所有的方法如上

```java
@Bean
@Route("/admin/book")
@Body
public class BookController {

    @Inject
    private BookService bookService;

    @Get
    public ResponseResult listBook(@Param("bname") String bname, @Param("page") int pageNum, @Param("limit") int pageSize) {
        Page<Book> bookPage = bookService.listBook(bname, pageNum, pageSize);
        return new ResponseResult(0, "", bookPage.getTotal(), bookPage.getData());
    }

    /**
     * 添加图书
     */
    @Post
    public ResponseResult addBook(@Body Book book) {
        int i = bookService.insertBook(book);
        return ResponseResult.conditionResult(i > 0, "添加成功", "添加失败");
    }

    /**
     * 修改图书
     */
    @Put
    public ResponseResult updateBook(@Body Book book) {
        int i = bookService.updateBook(book);
        return ResponseResult.conditionResult(i > 0, "添加成功", "添加失败");
    }

    /**
     * 删除图书
     */
    @Delete("/{id}")
    public ResponseResult delete(@Path("id") int id) {
        int i = bookService.deleteBookById(id);
        return ResponseResult.conditionResult(i > 0, "添加成功", "添加失败");
    }

}
```

