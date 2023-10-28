$(function () {
    $.get("https://v1.hitokoto.cn/", function (msg) {
        var arr = new Array();
        arr[0] = msg.hitokoto;
        var typed = new Typed("#subtitle", {
            strings: arr,
            startDelay: 300,
            typeSpeed: 100,
            loop: true,
            backSpeed: 50,
            showCursor: true
        });
    }, "json");

    $("#home").show();
    $("#notes,#about").hide();

    /*内容切换*/
    $("#subMenuHome").click(function () {
        $("#home").fadeIn("500");
        $("#notes,#about").fadeOut("501");
    });
    $("#subMenuNotes").click(function () {
        $("#notes").fadeIn("500");
        $("#home,#about").fadeOut("500");
    });
    $("#subMenuAbout").click(function () {
        $("#about").fadeIn("500");
        $("#notes,#home").fadeOut("500");
    });

    let data = [];
    var pageNum = 1; // 当前页
    var pageSize = 10; // 每页数据量
    let total = data.length; // 数据总量
    let pages = Math.ceil(total / pageSize); // 总页数

    /* 获取内容*/
    $.get("../notes.json", function (d) {
        data = d;
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        total = data.length;
        pages = Math.ceil(total / pageSize);
        render(data.slice(0, pageSize))
    }, "json");

    // 下一页
    $("#next").on("click", function () {
        if (pageNum < pages) {
            pageNum++;
            // 最后一页，隐藏next按钮
            if (pageNum == pages) {
                $("#next>img").hide();
            }
            const start = (pageNum - 1) * pageSize;
            const end = start + pageSize;
            render(data.slice(start, end));
        }
    });

    // 上一页
    $("#last").on("click", function () {
        if (pageNum > 1) {
            pageNum--;
            // 第一页，隐藏上按钮
            if (pageNum === 1) {
                $("#last>img").hide();
            }
            const start = (pageNum - 1) * pageSize;
            const end = start + pageSize;
            render(data.slice(start, end));
        }
    });

    // 渲染数据
    function render(data) {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<li>
                    <a target="_blank" id="title" href="${data[i].url}">${data[i].title}</a>
                    <span class="li-date">${data[i].date}</span>
                </li>`;
        }
        $('#list').html(html);
    }

    // 上下页按钮显示控制
    $("#next>img").hide();
    $("#last>img").hide();

    $("#next").on("mouseover", function () {
        if (pageNum < pages) {
            $("#next>img").show();
        }
    });

    $("#last").on("mouseover", function () {
        if (pageNum > 1) {
            $("#last>img").show();
        }
    });

    $("#next").on("mouseout", function () {
        $("#next>img").hide();
    });

    $("#last").on("mouseout", function () {
        $("#last>img").hide();
    });

});