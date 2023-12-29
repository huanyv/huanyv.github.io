# ApplicationLoader

* 约定优于配置的实现
* 应用启动加载器，使用Java内置的SPI机制
    * 不了解SPI机制的请看：[Java之SPI机制](https://www.cnblogs.com/googlemeoften/p/5715262.html)
* 当使用`ApplicationLoader`的SPI机制后，应用启动时会执行以下步骤
    1. 加载所有的`ApplicationLoader`的实现类
    2. 依照`getOrder()`方法排序
    3. 根据`@Properties`的配置前缀，将`Configuration`的属性注入到Loader中对应同名属性
    4. 执行Loader的`load()`方法
    5. 遍历Loader中的方法，根据`@Condidtion`条件是否注入


```java
@Properties(prefix = "harbour.view.")
public class EnjoyViewResolverStartLoader implements ApplicationLoader {

    private String prefix = "templates/";

    private String suffix = ".html";

    private boolean devMode = true;

    private boolean compress = false;

    @Bean
    @Conditional(ConditionOnMissingBean.class)
    public ViewResolver viewResolver() {
        EnjoyViewResolver viewResolver = new EnjoyViewResolver(ViewResolverType.CLASSLOADER);
        viewResolver.setPrefix(this.prefix);
        viewResolver.setSuffix(this.suffix);
        viewResolver.setDevMode(this.devMode);
        if (this.compress) {
            viewResolver.setCompressorOn('\n');
        }
        return viewResolver;
    }

    public static class ConditionOnMissingBean implements Condition {

        @Override
        public boolean matchers(ApplicationContext applicationContext, Configuration configuration) {
            // 不存在ViewResolver这个Bean
            return BeanFactoryUtil.isNotPresent(applicationContext, ViewResolver.class);
        }
    }
}
```

看上面的类，

* 首先：配置注入，比如`prefix`的属性对应的配置就是`harbour.view.prefix`
* `ViewResolver`注入时会判断`ConditionOnMinssingBean`是否条件成立，条件成立注入，反之不注入,也就是说，当你自己配置了ViewResolver这个Bean，系统中的视图解析器，就是你注入的，即约定优于配置



