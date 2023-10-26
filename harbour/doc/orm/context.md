# SqlContext

* 与数据库交互的主要对象

## 获取方式

### new

* `DefaultSqlContext`对象是线程不安全的，最好在方法中new 

```java
public void test() {
    SqlContext sqlContext = new DefaultSqlContext();
    sqlContext.getConnection();
}
```

### SqlContextFactory

* 这个使用了ThreadLocal，每个线程有独立的一个SqlContext实例，这在web开发中非常好用

```java
public void test() {
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    sqlContext.getConnection();
}
```

### SqlContextManager

* 这个对象可以是共享对象，因为它的底层也是使用SqlContextFactory工厂

```java
SqlContext sqlContext = new SqlContextManager();
public void test() {
    sqlContext.getConnection();
}
```



