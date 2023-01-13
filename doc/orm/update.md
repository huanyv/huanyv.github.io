# 执行增删改

## 返回操作数

* 下面是一个插入示例，增加与删除相同

```java
@Test
public void update() {
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    String sql = "insert into t_user (username, password) values(?, ?)";
    int count = sqlContext.update(sql, "user", "1234");
    System.out.println(count);
}
```

## 增加返回主键ID

* 用于插入新数据后返回自增的主键ID

```java
@Test
public void insert() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    String sql = "insert into t_user (username, password) values(?, ?)";
    long id = sqlContext.insert(sql, "user2", "1234");
    System.out.println(id);
}
```