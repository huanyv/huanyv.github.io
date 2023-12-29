# 配置

* 配置的主要是`JdbcConfigurar`这个类，这是一个单例类，调用`create()`方法获取单例实例

## 代码配置

* 创建一个properties文件

```properties
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/test?useSSL=false
username=root
password=123
```

```java
public void getConfig() {
    InputStream inputStream = ClassLoaderUtil.getInputStream("jdbc.properties");
    JdbcConfigurer.create(inputStream);
}
```

或

```java
JdbcConfigurer jdbcConfigurer = JdbcConfigurer.create();

SimpleDataSource simpleDataSource = new SimpleDataSource();
simpleDataSource.setDriverClassName("com.mysql.jdbc.Driver");
simpleDataSource.url("jdbc:mysql://localhost:3306/test?useSSL=false");
simpleDataSource.setUsername("root");
simpleDataSource.setPassword("123");

jdbcConfigurer.setDataSource(simpleDataSource);
```

## 配置文件

* 在`application.properties`中配置即可
* `harbour-start-jdbc`利用start模块的启动加载机制，在应用启动时会将以下配置到`JdbcConfigurar`中

```properties
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test?useSSL=false
jdbc.username=root
jdbc.password=222
# 扫描包
jdbc.scanPackages=com.book.dao
```

## 数据源

* 内置了一个`SimpleDataSource`数据源，你也可以按照上面的代码，使用其它数据源
* `SimpleDataSource`是连接池的

### 多数据源

* `DynamicDatasource`为多数据源，里面是一个`Map<String, DataSource>`集合
* 由`DataSourceKeyHolder`来指定使用的具体数据源，它是基于`ThreadLocal`的
* 你可以用AOP在service层的方法执行前进行切换

1. 配置多数据源

```java
@Bean
public class DynamicDataSourceRunner implements ApplicationRunner {
    @Override
    public void run(Configuration configuration) {
        JdbcConfigurer jdbcConfigurer = JdbcConfigurer.create();

        SimpleDataSource ds1 = new SimpleDataSource();
        ds1.setDriverClassName("com.mysql.jdbc.Driver");
        ds1.setUrl("jdbc:mysql://localhost:3306/test?useSSL=false");
        ds1.setUsername("root");
        ds1.setPassword("2233");

        SimpleDataSource ds2 = new SimpleDataSource();
        ds2.setDriverClassName("com.mysql.jdbc.Driver");
        ds2.setUrl("jdbc:mysql://localhost:3306/temp?useSSL=false");
        ds2.setUsername("root");
        ds2.setPassword("2233");

        DynamicDatasource dynamicDatasource = new DynamicDatasource();
        dynamicDatasource.setDefaultDataSource(ds1);
        dynamicDatasource.setDataSource("ds2", ds2);

        jdbcConfigurer.setDataSource(dynamicDatasource);
    }
}
```

2. 写一个类继承`AbstractDataSourceAOP`


```java
public class DynamicDataSourceAOP extends AbstractDataSourceAOP {
    @Override
    public String getDataSourceKey() {
        return "ds2";
    }
}
```

3. 在service上使用，在事务开启之前

```java
@Override
@Aop({DynamicDataSourceAOP.class, TransactionAop.class})
public int updateBook(Book book) {
    return bookDao.updateBook(book);
}
```