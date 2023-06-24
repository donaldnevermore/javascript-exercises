import { ListNode } from "../list-node.js";

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let reverseHead: ListNode | null = null;
  let node = head;

  while (node !== null) {
    const next = node.next;

    if (next === null) {
      reverseHead = node;
    }

    node.next = prev;
    prev = node;
    node = next;
  }

  return reverseHead;
}
