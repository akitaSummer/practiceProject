;
const app = new Vue({
    el: '#app',
    data: {
        list: [{
                name: '电子产品',
                content: [{
                        id: 1,
                        name: 'iPhone 7',
                        price: 6188,
                        count: 1,
                        checked: true,
                    },
                    {
                        id: 2,
                        name: 'iPad Pro',
                        price: 5888,
                        count: 1,
                        checked: true,
                    },
                    {
                        id: 3,
                        name: 'MacBook Pro',
                        price: 21488,
                        count: 1,
                        checked: true,
                    }
                ]
            },
            {
                name: '果蔬',
                content: [{
                        id: 4,
                        name: '西瓜',
                        price: 8,
                        count: 1,
                        checked: true,
                    },
                    {
                        id: 5,
                        name: '苹果',
                        price: 5,
                        count: 1,
                        checked: true,
                    },
                    {
                        id: 6,
                        name: '香蕉',
                        price: 2,
                        count: 1,
                        checked: true,
                    }
                ]
            },
        ]
    },
    computed: {
        totalPrice() {
            let total = 0
            for (let i = 0; i < this.list.length; i++) {
                for (let j = 0; j < this.list[i].content.length; j++) {
                    const item = this.list[i].content[j]
                    console.log(item.checked)
                    if (item.checked) {
                        total += item.price * item.count
                    }
                }
            }
            return total
        }
    },
    methods: {
        handleReduce(index1, index2) {
            if (this.list[index1].content[index2].count === 1) {
                return
            }
            this.list[index1].content[index2].count--
        },
        handleAdd(index1, index2) {
            this.list[index1].content[index2].count++
        },
        handleRemove(index1, index2) {
            this.list[index1].content[index2].splice(index, 1)
        },
        handleChecked(index1, index2) {
            this.list[index1].content[index2].checked = !this.list[index1].content[index2].checked
        }
    }
})