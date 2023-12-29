# IOC

IOC就是控制反转和依赖注入，框架内置的简单的IOC容器将你的对象托管起来，在其它对象中依赖的时候，不需要我们手动去`new`而自动将其注入

## 组件托管（控制反转）

### 1. 类使用@Bean注解

* 即把对象交到IOC容器中，其中，交付的类应该是一个类，不应该是一个接口或者抽象类
* 默认BeanName是类名首字母小写
* @Bean("beanName")可以指定名字

```java
@Bean
public class UserDaoImpl implements UserDao {
	// ....
}

@Bean("userDao")
public class UserDaoImpl implements UserDao {
	// ....
}
```

### 2. 方法使用@Bean注解

* 首先，要声名一个配置类，类上使用`@Bean`注解并实现`Configuration`接口
* 在方法上使用@Bean注解，方法名为Bean的名称

```java
@Bean
public class Config implements Configuration {
    @Bean
    private UserDao userDao() {
        return new UserDaoImpl();
    }
}
```

## 依赖注入

* 当一个类由上面的方式添加到IOC容器中，我们在其它的组件中依赖于其，不需要去手动`new`
* 在类的属性上使用`@Inject`注解，当指定名称时，按照BeanName注入，否则按照类型注入

```java
@Bean
public class UserServiceImpl implements UserService {

    // 不需要这样
    // private UserDao userDao = new UserDaoImpl();

    @Inject("userDao") // 名称注入
    private UserDao userDao;

	// .....

}

@Bean
public class UserController {

    @Inject // 类型注入
    private UserService userService;

    // .....
}
```

## 多实例Bean

* 有两种组件类型，多实例与单实例，默认是单实例类型
* 在`@Bean`注解上，`prototype`属性设置为`true`，Bean将是多实例的
* 单实例：每次的组件Bean是同一个，当Bean是有状态时，会出现线程安全问题
* 多实例：每次的Bean都会重新创建
* **注意：**多实例Bean不可循环依赖，否则报`BeanCurrentlyInCreationException`异常

```java
@Bean(prototype = true)
public class UserController {
	//.......
}

@Bean
public class Config {
    @Bean(prototype = true)
    private UserDao userDao() {
        return new UserDaoImpl();
    }
}
```

## 懒加载Bean

* 标识一个Bean是懒加载还是饿加载
* 懒加载：只有在第一获取的时候都会创建对象
* 饿加载：程序运行直接创建对象（默认）

```java
@Bean(lazy = true)
public class UserController {
	//.......
}

@Bean
public class Config {
    @Bean(lazy = true)
    private UserDao userDao() {
        return new UserDaoImpl();
    }
}
```


