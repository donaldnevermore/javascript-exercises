import { ListNode } from "../list-node.js"

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (head === null) {
        return null
    }
    if (head.next === null && n === 1) {
        return null
    }

    const arr: ListNode[] = []
    let curr: ListNode | null = head
    while (curr !== null) {
        arr.push(curr)
        curr = curr.next
    }

    const i = arr.length - n
    if (i === 0) {
        return head.next
    }

    const prev = arr[i - 1]
    const node = arr[i]
    prev.next = node.next
    return head
}
