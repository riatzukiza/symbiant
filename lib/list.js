////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Node = {
    list: null,
    next: null,
    prev: null,
    item: null
};

function node(list, item, next, prev, node) {
    let o = node || Object.create(Node);

    [o.list, o.item, o.next, o.prev] = [list, item, next, prev];

    return o;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const List = {
    length: 0,
    head: null,
    tail: null,

    init(...items) {
        [this.lengh, this.head, this.tail] = [0, null, null];

        if (items && items.length > 0) {
            items.forEach((v) => (this.push(v)));
        }
    },

    get empty() {
        return this.length === 0;
    },

    push(item) {
        if (!this.empty) this.tail = this.tail.next = node(this, item, null, this.tail);
        else this.head = this.tail = node(this, item, null, null);
        this.length++;
        return this;
    },
    unshift(item) {
        if (!this.empty) this.head = this.head.prev = node(this, item, this.head, null);
        else this.head = this.tail = node(this, item, null, null);
        this.length++;
        return this;
    },
    pop(item) {
        return (this.empty) ? null : this.removeNode(this.tail).item;
    },
    shift(item) {
        return (this.empty) ? null : this.removeNode(this.head).item;
    },
    remove(item) {
        let node = this.head;
        while (node) {
            if (node.item !== item) {
                node = node.next;
                continue
            };
            return this.removeNode(node).item;
        }
        return false;
    },
    removeNode(n) {
        if (n === this.head) this.head = n.next;
        if (n === this.tail) this.tail = n.prev;
        if (n.next) n.next.prev = n.prev;
        if (n.prev) n.prev.next = n.next;

        this.length--;
        return n;
    },
    each(f) {
        let node = this.head;
        while (node) {
            f(node.item, node.prev, node.next);
            node = node.next;
        }
        return this;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = List;
