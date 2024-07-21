function getQueryStringArgs() {
    const qs = location.search.length > 0 ? location.search.substring(1) : "";
    const args = {};
    const items = qs.length ? qs.split("&") : [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i].split("=");
        const name = decodeURIComponent(item[0]);
        const value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

function setQueryStringArgs(obj) {
    let query = "";
    for (const name of Object.keys(obj)) {
        const value = obj[name];
        query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
    }
    return query.length ? query.substring(0, query.length - 1) : "";
}
