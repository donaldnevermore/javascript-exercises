/**
 * Definition for singly-linked list.
 */
class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let carry = 0
    let node = new ListNode(0, null)
    const cursor = node

    while (l1 !== null || l2 !== null) {
        const value1 = l1 === null ? 0 : l1.val
        const value2 = l2 === null ? 0 : l2.val
        let sum = value1 + value2 + carry

        carry = Math.floor(sum / 10)
        sum = sum % 10

        node.next = new ListNode(sum, null)
        node = node.next

        if (l1 !== null) {
            l1 = l1.next
        }
        if (l2 !== null) {
            l2 = l2.next
        }
    }

    if (carry !== 0) {
        node.next = new ListNode(carry, null)
    }

    return cursor.next
}
