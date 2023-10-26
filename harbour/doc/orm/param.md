# 参数化SQL

* 当一条语句的参数比较多时，?参数将变得复杂

```java
String sql = 
        " insert into    " + 
        " t_user(username, password, sex, age, phone, address, status)" + 
        " values (?, ?, ?, ?, ?, ?, ?)     ";
Object [] args = {"张三", "123456", 1, 18, "13122223333", "中国", 1};
```

## #参数占位符

* 用在所有SQL操作中，下面的例子只是一个插入
* 框架会把SQL语句中的`#{xxxx}`从`args`列表中提取出来
    1. JavaBean的同名属性
    2. Map对象的同名key
    3. 方法入参，按顺序为`arg0`、`arg1`、`arg2`....

```java
@Test
public void update01() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    User user = new User();
    user.setUsername("user3");
    user.setPassword("1111");

    String sql = "insert into t_user (username, password) values(#{username}, #{password})";
    int count = sqlContext.update(sql, user);
    System.out.println(count);
}

@Test
public void update02() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    Map<String, Object> map = new HashMap<>();
    map.put("username", "user4");
    map.put("password", "2222");

    String sql = "insert into t_user (username, password) values(#{username}, #{password})";
    int count = sqlContext.update(sql, map);
    System.out.println(count);
}

@Test
public void update03() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    // 这个出现的作用是当你的参数，中间有其它干扰，可以避开
    String sql = "insert into t_user (username, password) values(#{arg0}, #{arg2})";
    int count = sqlContext.update(sql, "user5",new Object() ,"44444");
    System.out.println(count);
}
```