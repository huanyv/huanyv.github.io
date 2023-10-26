# SQL构造器

* 推荐你使用手写的SQL语句，但有时我们需要依据条件，动态生成SQL
* 这里你可以使用`SqlBuilder`这个简单的工具类，动态生成SQl和参数

## condition()

* 当使用where或having关键词可以用这个方法
* 第一个参数传前缀关键词，比如`where`、`having`，第二个参数为条件生成器，如下
* 使用其中的`and()`方法或`or()`方法，可以自动去除`and`、`or`关键词
* 如果所有条件都不生效，前缀关键词也不会拼接

```java
@Override
public Page<Book> listBook(String bname, int pageNum, int pageSize) {
    SqlBuilder sb = new SqlBuilder("select * from t_book")
            .condition("where", c -> c
                    .append(StringUtil.hasText(bname), "bname like ?", "%" + bname + "%")
            );
    Page<Book> page = new Page<>(pageNum, pageSize);
    sqlContext.selectPage(page, Book.class, sb.getSql(), sb.getArgs());
    return page;
}
```

## join()

* 以指定关键词和前缀拼接一段动态SQL
* 适合用于update操作的动态拼接

```java
@Override
public int updateBook(Book book) {
    SqlBuilder sb = new SqlBuilder("update t_book")
            .join(", ", "set", j -> j
                    .append(StringUtil.hasText(book.getBname()), "bname = ?", book.getBname())
                    .append("author = ?", book.getAuthor())
                    .append("pubcomp = ?", book.getPubcomp())
                    .append("pubdate = ?", book.getPubdate())
                    .append("bcount = ?", book.getBcount())
                    .append("price = ?", book.getPrice())
            )
            .condition("where", condition -> condition.append("id = ?", book.getId()));
    return sqlContext.update(sb.getSql(), sb.getArgs());
}
```

* 这里有三个重载方法

```java
public SqlBuilder join(String separator, Consumer<SqlJoiner> joiner) {
    return join(separator, "", "", joiner);
}

public SqlBuilder join(String separator, String prefix, Consumer<SqlJoiner> joiner) {
    return join(separator, prefix, "", joiner);
}

/**
* @param separator 分隔符
* @param prefix    前缀
* @param suffix    后缀
* @param j         连接器
* @return {@link SqlBuilder}
*/
public SqlBuilder join(String separator, String prefix, String suffix, Consumer<SqlJoiner> j) {
    SqlJoiner joiner = new SqlJoiner(separator);
    j.accept(joiner);
    if (!joiner.isEmpty()) {
        append(prefix);
        append(joiner.getSql(), joiner.getArgs());
        append(suffix);
    }
    return this;
}
```

