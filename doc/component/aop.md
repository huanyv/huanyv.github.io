# AOP

AOP为面向切面编程，可以在方法执行前后执行一些公共，需要重复编写的代码逻辑，比如，打印请求响应日志信息。

* 创建切面，实现`AspectAdvice`接口，实现其中的方法
* 支持前置通知、后置通知、环绕通知，如想使用异常、最终通知，建议使用环绕通知`try{}catch{}finaly{}`捕获
* 在Bean上使用`@Aop`注解，指定切面，可以多个
* 可以在单个方法上使用，方法上的AOP和类上的AOP会组合

```java
public interface AspectAdvice {

    default void beforeAdvice(Object[] args) {

    }

    default void afterAdvice(Object[] args, Object result) {

    }

    default Object aroundAdvice(JoinPoint point) throws InvocationTargetException, IllegalAccessException {
        // 环绕通知一定要调用这个方法才可继续执行
        return point.invoke();
    }

}
```

```java
public class LogAspect implements AspectAdvice {
    @Override
    public void beforeAdvice(Object[] args) {
        System.out.println(this.getClass() + "前置通知");
    }

    @Override
    public void afterAdvice(Object[] args, Object result) {
        System.out.println(this.getClass() + "后置通知");
    }

    @Override
    public Object aroundAdvice(JoinPoint point) throws InvocationTargetException, IllegalAccessException {
        System.out.println(this.getClass() + "环绕通知1");
        Object result = point.invoke();
        System.out.println(this.getClass() + "环绕通知2");
        return result;
    }
}

public class LogAspect2 implements AspectAdvice {
    @Override
    public void beforeAdvice(Object[] args) {
        System.out.println(this.getClass() + "前置通知");
    }

    @Override
    public void afterAdvice(Object[] args, Object result) {
        System.out.println(this.getClass() + "后置通知");
    }

    @Override
    public Object aroundAdvice(JoinPoint point) throws InvocationTargetException, IllegalAccessException {
        System.out.println(this.getClass() + "环绕通知1");
        Object result = point.invoke();
        System.out.println(this.getClass() + "环绕通知2");
        return result;
    }
}

@Component
@Aop({LogAspect.class, LogAspect2.class}) // 指定切面
public class AdminService {

    public User getUser() {
        System.out.println("方法执行");
        return new User(1, "admin", "123", "男", "111@qq.com");
    }

}

// 等效于上面
@Component
@Aop(LogAspect.class) // 指定切面
public class AdminService {

    @Aop(LogAspect2.class) // 指定切面
    public User getUser() {
        System.out.println("方法执行");
        return new User(1, "admin", "123", "男", "111@qq.com");
    }

}
```

> class top.huanyv.bean.test.aop.LogAspect环绕通知1  
> class top.huanyv.bean.test.aop.LogAspect前置通知  
> class top.huanyv.bean.test.aop.LogAspect2环绕通知1  
> class top.huanyv.bean.test.aop.LogAspect2前置通知  
> 方法执行  
> class top.huanyv.bean.test.aop.LogAspect2后置通知  
> class top.huanyv.bean.test.aop.LogAspect2环绕通知2  
> class top.huanyv.bean.test.aop.LogAspect后置通知  
> class top.huanyv.bean.test.aop.LogAspect环绕通知2  
