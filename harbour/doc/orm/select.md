# 执行查询

## @Column

* 框架默认开启了下划线转驼峰
* 比如：数据库字段(user_name)到JavaBean中属性应该是(userName)
* 如果属性对应的列名，不满足需要，可以使用`@Column`注解，**这个注解用于指定在数据库中的字段名称**

```java
public class User {

    @Column("user_id")
    private Integer id;

    private String username;

    private String password;
}
```

## 映射为POJO对象

* 映射成对象，对象的属性名与表格字段一一对应
* `selectRow`为第一行
* `selectList`为所有行

```java
@Test
public void selectRow() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    User user = sqlContext.selectRow(User.class, "select * from t_user where id = ?", 1);
    System.out.println("user = " + user);
}

@Test
public void selectList() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    List<User> users = sqlContext.selectList(User.class, "select * from t_user");
    System.out.println("users = " + users);
}
```


## 映射成Map

* 第一行映射成一个Map对象
* `selectMap`为第一行
* `selectListMap`为所有行

```java
@Test
public void selectMap() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    Map<String, Object> user = sqlContext.selectMap("select * from t_user");
    System.out.println("user = " + user);
}

@Test
public void selectListMap() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    List<Map<String, Object>> users = sqlContext.selectListMap("select * from t_user");
    System.out.println("users = " + users);
}
```

## 映射成Object

* 用于查询只有一行一列的值，比如count(*),max()等
* 返回的是object，但比如下边实际是一个`Integer`对象

```java
@Test
public void selectValue() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    Object o = sqlContext.selectValue("select max(id) from t_user");
    System.out.println(o);
    System.out.println("o.getClass() = " + o.getClass());
}
```

## 分页查询

* 先创建`Page`分页对象，会把查询结果放入page对象的data属性中
* `selectPage`映射成pojo
* `selectPageMap`映射成Map

```java
@Test
public void selectPage() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    Page<User> page = new Page<>(1,3);
    sqlContext.selectPage(page, User.class, "select * from t_user");
    System.out.println("page = " + page);
}

@Test
public void selectPageMap() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    Page<Map<String, Object>> page = new Page<>(1,3);
    sqlContext.selectPageMap(page,  "select * from t_user");
    System.out.println("page = " + page);
}
```