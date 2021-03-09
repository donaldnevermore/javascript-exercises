let xhr = createXHR()
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText)
        } else {
            alert("请求不成功：" + xhr.status)
        }
    }
}
xhr.open(
    "POST",
    "www.funwall.cn/trunk/wxwall_api/redbag/get_drawed_redbag_list.php",
    true
)
xhr.send({
    redbag_id: "10",
})

function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest()
    } else if (typeof arguments.callee.activeXString != "string") {
        var versions = [
                "MSXML2.XMLHttp.6.0",
                "MSXML2.XMLHttp.3.0",
                "MSXML2.XMLHttp",
            ],
            i,
            len
        for (i = 0, len = versions.length; i < len; i++) {
            try {
                new ActiveXObject(versions[i])
                arguments.callee.activeXString = versions[i]
            } catch (ex) {
                // 跳过
            }
        }
        return new ActiveXObject(arguments.callee.activeXString)
    } else {
        throw new Error("No XHR object available")
    }
}
