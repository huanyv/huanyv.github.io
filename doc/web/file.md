# 文件上传与下载

## 上传

* 上传文件要点
    * 表单的`encType`为`multipart/form-data`，并且表单method为POST
    * 有一个file类型的input
        * `<input type="file" name="file">`
* 以下为单个文件和多个文件的接收方式

```java
// 单个文件
@Post
public ResponseResult up(@Param("fileName") Part file) {
    Part file = req.getPart("file");
    System.out.println("文件大小：" + file.getSize());
    String fileName = file.getSubmittedFileName();
    // 上传
    file.write("C:\\Users\\admin\\Desktop\\" + fileName);
}

// 多个文件
@Post
public ResponseResult up(List<Part> files) {
    //...
}
```

* 这里使用的是Servlet3.0的Part接口

## 下载

* 使用`HttpResponse`的`file`方法

```java
public void file(File file) throws IOException {
    file("", file);
}

public void file(String fileName, File file) throws IOException {
    if (!StringUtil.hasText(fileName)) {
        fileName = file.getName();
    }
    // 设置请求头
    servletResponse.setHeader("Content-Disposition", "attachment; filename="
            + URLEncoder.encode(fileName, StandardCharsets.UTF_8.name()));
    servletResponse.setHeader("Content-Length", String.valueOf(file.length()));
    servletResponse.setContentType("application/octet-stream");
    // 获取输入输出流
    ServletOutputStream outputStream = servletResponse.getOutputStream();
    FileInputStream inputStream = new FileInputStream(file);
    // 数据拷贝
    IoUtil.copy(inputStream, outputStream);
    inputStream.close();
    outputStream.close();
}
```