const moveBlocks = () => {
    const blockTotal = 60
    const personTotal = 60
    const blocksPerMan = 5
    const blocksPerWoman = 3
    const childrenOneBlock = 2

    for (let manCount = 1; manCount < Math.floor(blockTotal / blocksPerMan); manCount++) {
        for (let womanCount = 1; womanCount < Math.floor(blockTotal / blocksPerWoman); womanCount++) {
            const childCount = personTotal - manCount - womanCount
            if (childCount % 2 === 0) {
                if (
                    blockTotal === manCount * blocksPerMan + womanCount * blocksPerWoman +
                    Math.floor(childCount / childrenOneBlock)
                ) {
                    console.log(`Solution combination: ${manCount}, ${womanCount}, ${childCount}`)
                }
            }
        }
    }
}

moveBlocks()
