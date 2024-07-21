import { TreeNode } from "../tree-node.js";

export function lowestCommonAncestor2(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    let ancestor: TreeNode | null = null;

    const dfs = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): boolean => {
        if (root === null) {
            return false;
        }
        if (p === null || q === null) {
            return false;
        }

        const lChild = dfs(root.left, p, q);
        const rChild = dfs(root.right, p, q);

        const equalsRoot = root.val == p.val || root.val == q.val;

        if ((lChild && rChild) || (equalsRoot && (lChild || rChild))) {
            ancestor = root;
        }

        return lChild || rChild || equalsRoot;
    };

    dfs(root, p, q);

    return ancestor;
}
