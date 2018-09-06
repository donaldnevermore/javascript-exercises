var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            console.log("Request was unsuccessful: " + xhr.status);
        }
    }
}

// 启用请求以备发送
xhr.open("get", "example.txt", true);

xhr.send(null);
