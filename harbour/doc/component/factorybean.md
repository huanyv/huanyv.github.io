# FactoryBean

这是一个扩展接口，当一个组件是一个`FactoryBean`接口的实现类的话，那么这个Bean的实例为`getObject()`方法的返回值

* 工厂加工Bean
* 使用：实现`FactoryBean`接口，重写其中方法，注入到IOC容器中
* 取出的Bean为`getObject()`方法返回的实例，如果要取出原BeanFactory实例，使用`&BeanName`获得（类似C语言取地址符）

```java
public interface FactoryBean<T> {

    // Bean
    T getObject() throws Exception;

    // 类型
    Class<?> getObjectType();

    // 是否单例
    default boolean isSingleton() {
        return true;
    }
}
```

```java
// 对Bean进行代理加工（模拟Mybatis）
public class MapperFactoryBean implements FactoryBean {

    private Class<?> mapperInterface;

    @Override
    public Object getObject() throws Exception {
        return Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[]{mapperInterface}, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                if (Object.class.equals(method.getDeclaringClass())) {
                    return method.invoke(this, args);
                }
                // select、delete、insert、update
                return null;
            }
        });
    }

    @Override
    public Class<?> getObjectType() {
        return mapperInterface;
    }

    public MapperFactoryBean(Class<?> mapperInterface) {
        this.mapperInterface = mapperInterface;
    }

}

@Bean
public class Config implements Configuration {

    // 注入到IOC中
    @Bean
    private MapperFactoryBean mapperFactoryBean() {
        return new MapperFactoryBean(UserDao.class);
    }

}

public void testFactoryBean() {
    ApplicationContext app = new AnnotationConfigApplicationContext("top.huanyv.bean.test.factory");

    UserDao userDao = app.getBean(UserDao.class);
    System.out.println("userDao = " + userDao);
    System.out.println("userDao.getClass() = " + userDao.getClass());

    // 获取原BeanFactory
    System.out.println("app.getBean(\"&mapperFactoryBean\") = " + app.getBean("&mapperFactoryBean"));
}
```

> userDao = top.huanyv.bean.test.factory.MapperFactoryBean$1@512ddf17  
> userDao.getClass() = class com.sun.proxy.$Proxy6  
> app.getBean("&mapperFactoryBean") = top.huanyv.bean.test.factory.MapperFactoryBean@2c13da15  