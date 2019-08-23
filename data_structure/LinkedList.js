// 链表
function Node(element) {
    this.element = element
    this.next = null
}

function LList() {
    this.head = new Node('head')
    this.find = find
    this.insert = insert
    this.remove = remove
    this.display = display
    this.findPrevious = findPrevious
    this.remove = remove
}

function find(item) {
    const currNode = this.head
    while (currNode.element !== item) {
        currNode = currNode.next
    }
    return currNode
}

function insert(newElement, item) {
    const newNode = new Node(newElement)
    const currNode = this.find(item)
    newNode.next = currNode.next
    currNode.next = newNode
}

function display() {
    const currNode = this.head
    while (currNode.next !== null) {
        console.log(currNode.next.element)
        currNode = currNode.next
    }
}

function findPrevious(item) {
    const currNode = this.head
    while (currNode.next !== null && currNode.next.element !== item) {
        currNode = currNode.next
    }
    return currNode
}

function remove(item) {
    const preNode = this.findPrevious(item)
    if (preNode !== null) {
        preNode.next = preNode.next.next
    }
}