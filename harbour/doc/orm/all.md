# 使用方法

* 可以去看示例`harbour-example`

1. 加入依赖

```xml
<dependency>
    <groupId>top.huanyv</groupId>
    <artifactId>harbour-start-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

2. application.properties加入配置

```
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test?useSSL=false
jdbc.username=root
jdbc.password=2233
# 扫描Dao的包
jdbc.scanPackages=com.book.dao
```

3. 在对应的Dao接口或实现类上使用`@Dao`注解，程序启动时，使用应用启动加载器，将对应的类或接口，用`SqlContext`对象的`getDao()`方法生成代理类放到IOC容器中，[为什么要这样？](/doc/orm/interface)


```java
@Dao
public class BookDaoImpl implements BookDao {
}

@Dao
public interface UserDao extends BaseDao<User> {

    @Select("select * from t_user where username = #{arg0} and password = #{arg1}")
    User getUserByUsernameAndPassword(String username, String password);

}
```
