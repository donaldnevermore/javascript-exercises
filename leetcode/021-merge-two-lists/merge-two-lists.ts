import { ListNode } from "../list-node"

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) {
        return list2
    }
    if (list2 === null) {
        return list1
    }

    let head: ListNode

    if (list1.val < list2.val) {
        head = list1
        head.next = mergeTwoLists(list1.next, list2)
    }
    else {
        head = list2
        head.next = mergeTwoLists(list1, list2.next)
    }

    return head
}
