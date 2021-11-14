function letScope() {
    let x = 1
    if (true) {
        let x = 2
        console.log(x) // 2
    }
    console.log(x) // 1
}

letScope()
