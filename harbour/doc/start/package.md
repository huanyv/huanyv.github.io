# 打包部署

支持打jar包和war包两种形式

## jar

* jar包的话，你的程序应该有一个启动类，即主方法类，做为入口
* harbour-parent将`main.class`属性做为启动类，所以你要加上此maven属性，指定启动类

```java
public class MainApplication {
    public static void main(String[] args) {
        HarbourApplication.run(MainApplication.class, args);
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>top.huanyv</groupId>
        <artifactId>harbour-parent</artifactId>
        <version>1.0</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.book</groupId>
    <artifactId>harbour-test</artifactId>
    <version>1.0</version>

    <properties>
        <!-- 启动类 -->
        <main.class>com.book.MainApplication</main.class>
    </properties>

    <dependencies>
        <dependency>
            <groupId>top.huanyv</groupId>
            <artifactId>harbour-start-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

## war

* 打成war包，你不需要有启动类，但你仍要有一个类做为根包的类，这是必须的，需要用它做为IOC的容器扫描包
* 写一个类，继承`HarbourApplicationInitializer`抽象类，重写run方法，方法的返回值应该是被扫描包所在的类
* 打war包后`server`配置失效，端口等由实体容器决定

```java
public class WebApplication extends HarbourApplicationInitializer {
    @Override
    public Class<?> run() {
        return WebApplication.class;
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>top.huanyv</groupId>
        <artifactId>harbour-parent</artifactId>
        <version>1.0</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>

    <!-- 打war包 -->
    <packaging>war</packaging>

    <groupId>com.book</groupId>
    <artifactId>harbour-test</artifactId>
    <version>1.0</version>

    <dependencies>
        <dependency>
            <groupId>top.huanyv</groupId>
            <artifactId>harbour-start-web</artifactId>
           <exclusions>
               <exclusion>
                   <groupId>top.huanyv</groupId>
                   <artifactId>harbour-start-tomcat</artifactId>
               </exclusion>
           </exclusions>
        </dependency>
       <dependency>
           <groupId>javax.servlet</groupId>
           <artifactId>javax.servlet-api</artifactId>
           <version>4.0.1</version>
           <scope>provided</scope>
       </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- 打war包插件 -->
           <plugin>
               <groupid>org.apache.maven.plugins</groupid>
               <artifactid>maven-war-plugin</artifactid>
           </plugin>
        </plugins>
    </build>

</project>
```














