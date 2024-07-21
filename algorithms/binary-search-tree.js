class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const node = new Node(data);
        if (this.root == null) {
            this.root = node;
        } else {
            let curr = this.root;
            let parent = null;

            for (;;) {
                parent = curr;
                if (data < curr.data) {
                    curr = curr.left;
                    if (curr == null) {
                        parent.left = node;
                        break;
                    }
                } else {
                    curr = curr.right;
                    if (curr == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }
}

function preorder(root) {
    if (root == null) {
        return;
    }

    console.log(root.data);
    preorder(root.left);
    preorder(root.right);
}

function inorder(root) {
    if (root == null) {
        return;
    }

    inorder(root.left);
    console.log(root.data);
    inorder(root.right);
}

function postorder(root) {
    if (root == null) {
        return;
    }

    inorder(root.left);
    inorder(root.right);
    console.log(root.data);
}

function preorderLoop(root) {
    const stack = [];
    let curr = root;

    while (curr != null || stack.length !== 0) {
        while (curr != null) {
            console.log(curr.data);
            stack.push(curr);
            curr = curr.left;
        }
        if (stack.length !== 0) {
            curr = stack.pop();
            curr = curr.right;
        }
    }
}

function inorderLoop(root) {
    const stack = [];
    let curr = root;

    while (curr != null || stack.length !== 0) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        if (stack.length !== 0) {
            curr = stack.pop();
            console.log(curr.data);
            curr = curr.right;
        }
    }
}

function postorderLoop(root) {
    const treeStack = [];
    const markStack = [];
    let curr = root;

    while (curr != null || treeStack.length !== 0) {
        while (curr != null) {
            treeStack.push(curr);
            markStack.push("left");
            curr = curr.left;
        }
        while (treeStack.length !== 0 && markStack[markStack.length - 1] === "right") {
            markStack.pop();
            console.log(treeStack.pop().data);
        }
        if (treeStack.length !== 0 && markStack[markStack.length - 1] === "left") {
            markStack.pop();
            markStack.push("right");
            curr = treeStack[treeStack.length - 1].right;
        }
    }
}

const nums = new BST();
nums.insert(4);
nums.insert(2);
nums.insert(6);
nums.insert(1);
nums.insert(3);
nums.insert(5);
nums.insert(7);
postorderLoop(nums.root);
