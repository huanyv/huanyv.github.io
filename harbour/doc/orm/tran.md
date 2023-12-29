# 事务操作

* 一般在执行SQL结束会，框架会把Connection自动关闭（释放）
* 在开启事务后，Connection将不会自动关闭Connection

```java
public void testGetSqlContext() throws Exception {
	// 配置
    InputStream inputStream = ClassLoader.getSystemResourceAsStream("jdbc.properties");
    JdbcConfigurer.create(inputStream);

    // 获取 SqlContext 实例
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    try {
    	// 开启事务
        sqlContext.beginTransaction();
        int update = sqlContext.update("update user set username = ? where id = ?", "lisi", 7);
        System.out.println("update = " + update);
		// int i = 10 / 0;
        int delete = sqlContext.update("delete from user where uid = ?", 9);
        System.out.println("delete = " + delete);
		// 事务提交
        sqlContext.commit();
    } catch (Exception e) {
     	// 事务回滚
        sqlContext.rollback();
        e.printStackTrace();
    }
}
```

## AOP

* 基于Bean模块的AOP，可以用注解实现简单事务

```java
@Bean
@Aop(TransactionAop.class)
public class BookServiceImpl implements BookService {

    @Inject
    private BookDao bookDao;

    @Override
    public int updateBook(Book book) {
//         事务测试
        bookDao.updateBook(book);
        int i = 10 / 0;
        return bookDao.updateBook(book);
    }
}
```

```java
public class TransactionAop implements AspectAdvice {

    @Override
    public Object aroundAdvice(JoinPoint point)  {

        SqlContext sqlContext = SqlContextFactory.getSqlContext();

        Object result = null;
        try {
            // 开启事务
            sqlContext.beginTransaction();

            result = point.invoke();

            // 事务提交
            sqlContext.commit();
        } catch (Exception e) {
            // 事务回滚
            sqlContext.rollback();

            // 处理事务返回值
            Class<?> returnType = point.getMethod().getReturnType();
            // 如果是数字类型
            if (ClassUtil.isNumberType(returnType)) {
                result = 0;
            } else if (char.class.equals(returnType)){
                result = ' ';
            } else if (boolean.class.equals(returnType)) {
                result = false;
            } else {
                result = null;
            }

            Exception targetException = e;
            if (e instanceof InvocationTargetException) {
                targetException = ReflectUtil.getTargetException((InvocationTargetException) e);
            }
            targetException.printStackTrace();
        } finally {
            sqlContext.closeTransaction();
            return result;
        }
    }
}

```