# 注解式开发

* 可以在方法上使用`@Select`、`@Update`、`@Insert`、`@Delete`注解的方式，在其中写SQL语句，更加快速
* 框架会把注解中的**SQL和方法参数**，使用`SqlContext`对象调用某个方法，具体调用的方法是由你的方法返回值决定的
    * `List<xxxx>`泛型中应该是一个JavaBean`selectList`
    * JavaBean`selectRow`
    * Page`selectPage`
    * 基本数据类型或String类型`selectValue`

1. 创建一个接口，写一个方法，在上面使用注解

```java
public interface UserDao {
    @Select("select * from t_user where id = #{arg0}")
    User getUserById(int id);
}
```

2. 使用`SqlContext`对象的`getDao`方法，这个方法返回的是一个代理对象

```java
@Test
public void testDao() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    UserDao userDao = sqlContext.getDao(UserDao.class);
    User user = userDao.getUserById(1);
    System.out.println("user = " + user);
}
```

* 如果不使用接口，使用一个类也是可行的，前提是这个类必须实现了最少一个接口，不能是抽象类

```java
public class UserDaoImpl implements UserDao {
    @Override
    @Select("select * from t_user where id = #{arg0}")
    public User getUserById(int id) {
        return null;
    }
}
```

```java
@Test
public void testDao() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    UserDao userDao = sqlContext.getDao(UserDaoImpl.class);
    User user = userDao.getUserById(1);
    System.out.println("user = " + user);
}
```

## BaseDao<?>

* 这个接口中提供了几个增删改查常用的方法，实现这个接口后，可以直接调用
* 整个操作都是在代理对象中完成工作的，所以依然要调用`SqlContext`的`getDao`方法

```java
public interface UserDao extends BaseDao<User> {
}

@Test
public void testDao() {
    getConfig();
    SqlContext sqlContext = SqlContextFactory.getSqlContext();
    UserDao userDao = sqlContext.getDao(UserDaoImpl.class);
    List<User> users = userDao.selectAll();
    System.out.println("users = " + users);
}
```

```java
public interface BaseDao<T> {

    /**
     * 查询所有
     *
     * @return list
     */
    default List<T> selectAll() {
        return null;
    }

    /**
     * 根据ID查询一个对象
     *
     * @param id id
     * @return T
     */
    default T selectById(Number id) {
        return null;
    }

    /**
     * 根据对象实体，插入一条数据
     *
     * @param t T
     * @return 插入成功的条数
     */
    default int insert(T t) {
        return 0;
    }

    /**
     * 根据实体对象，用ID更新一条数据。只更新属性不为 null 的字段，ID不可为空
     *
     * @param t T
     * @return 更新成功的条数
     */
    default int updateById(T t) {
        return 0;
    }

    /**
     * 根据ID删除一条数据
     *
     * @param id ID
     * @return 删除成功的条数
     */
    default int deleteById(Number id) {
        return 0;
    }

}
```