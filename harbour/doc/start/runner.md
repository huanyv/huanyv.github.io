# 启动任务与定时器

## 启动任务

* 可以在系统启动时执行一系列操作，可以用来初始化等
* 通过实现`AppcalitionRunner`接口，需要是一个组件
* `getOrder()`方法为多个启动任务时，用来排序，数字越小先执行，默认是0

```java
@Bean
@Order(0)
public class Runner implements ApplicationRunner {

    @Override
    public int getOrder() {
        return 0;
    }

    @Override
    public void run(Configuration configuration) {
        System.out.println("应用启动了");
    }
}
```

## 定时器

* 定时器可以用来周期性的执行一些任务
* 通过实现`Timer`接口，需要是一个组件

```java
public interface Timer {

    /**
     * 定时的时间单位，默认为秒
     *
     * @return {@link TimeUnit}
     */
    default TimeUnit getTimeUnit() {
        return TimeUnit.SECONDS;
    }

    /**
     * 任务的间隔时长
     *
     * @return long
     */
    default long getPeriod() {
        return 10L;
    }

    /**
     * 得到初始延迟
     *
     * @return long
     */
    default long getInitialDelay() {
        return 0L;
    }

    /**
     * 任务
     */
    void run();

}
```

```java
@Bean
public class TimerTask implements Timer {

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public long getPeriod() {
        return 3L;
    }

    @Override
    public void run() {
        System.out.println("定时任务：" + dateFormat.format(new Date()));
    }
}
```