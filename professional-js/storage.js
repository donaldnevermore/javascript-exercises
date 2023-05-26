for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i)
    let value = sessionStorage.getItem(key)
    console.log(`${key} = ${value}`)
}

window.addEventListener("storage", (event) => {
    console.log(event.domain)
})
