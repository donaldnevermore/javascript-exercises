let db, request, version = 1

request = window.indexedDB.open("admin", version)

request.onerror = (event) => {
    console.log(event.target)
}

request.onsuccess = (event) => {
    db = event.target.result
    const transaction = db.transaction("users", "readwrite")
    const store = transaction.objectStore("users")

    let users = [{
        username: "007",
        firstName: "xxx",
    },
    {
        username: "009",
        firstName: "yyy",
    }]

    for (let user of users) {
        const req = store.put(user)
        req.onerror = (event) => console.log(event.target.error)
        // req.onsuccess = (event) => console.log(event.target.result)
    }
}

request.onupgradeneeded = (event) => {
    const db = event.target.result

    if (db.objectStoreNames.contains("users")) {
        db.deleteObjectStore("users")
    }

    db.createObjectStore("users", { keyPath: "username" })
}

const getBtn = document.querySelector("#get")
const cursorBtn = document.querySelector("#cursor")

getBtn.addEventListener("click", () => {
    const transaction = db.transaction("users"),
        store = transaction.objectStore("users"),
        req = store.get("007")

    req.onerror = (event) => console.log("Did not get the object")
    req.onsuccess = (event) => console.log(event.target.result.firstName)

    transaction.onerror = (event) => console.log("Transaction error")
    transaction.oncomplete = (event) => console.log("Transaction complete")
})

cursorBtn.addEventListener("click", () => {
    const k = IDBKeyRange.bound("007", "009")

    const transaction = db.transaction("users", "readwrite"),
        store = transaction.objectStore("users"),
        req = store.openCursor()

    req.onerror = (event) => console.log("Did not get the object")
    req.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
            if (cursor.key === "007") {
                let v = cursor.value
                v.firstName = "XXXXX"
                cursor.update(v)
            }
            console.log(cursor.value)
            cursor.continue()
        } else {
            console.log("Cursor is null")
        }
    }

    transaction.onerror = (event) => console.log("Transaction error")
    transaction.oncomplete = (event) => console.log("Transaction complete")
})
