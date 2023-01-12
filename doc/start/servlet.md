# 原生Servlet组件

* 原生组件有Servlet、Filter、Listener
* 通过将ServletBean、FilterBean、ServletListenerBean的对象放到容器中
* 系统在启动时会将其注册

```java
@Component
@Configuration
public class WebConfig extends WebConfiguration {

    @Override
    public void addViewController(ViewControllerRegistry registry) {
        super.addViewController(registry);
        registry.add("/", "index");
        registry.add("/login", "login");
    }

    @Override
    public void addResourceMapping(ResourceMappingRegistry registry) {
        super.addResourceMapping(registry);
    }


    // 原生Servlet注入
    @Bean
    public ServletBean captchaServlet() {
        return new ServletBean(new CaptchaServlet(), "/captcha");
    }

}

```