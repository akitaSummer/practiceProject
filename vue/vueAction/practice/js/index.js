const app = new Vue({
    el: '#app',
    data() {
        return {
            questions: [{
                    question: '请问您的性别是:',
                    type: 'radio',
                    answer: ['男', '女', '保密'],
                },
                {
                    question: '请选择您的兴趣爱好: ',
                    type: 'checkbox',
                    answer: ['看书', '游泳', '跑步', '看电影', '听音乐']
                },
                {
                    question: '请介绍下自己: ',
                    type: 'textarea',
                    require: '不少于100字'
                }
            ],
            index: 0,
            able: false,
        }
    },
    methods: {
        changeindex(type) {
            if (type === 'last') {
                this.index--
            } else if (type === 'next') {
                this.index++
            }
        }
    },
    mounted() {
        bus.$on('able', (able) => {
            this.able = able
        })
        bus.$on('index', (index) => {
            this.index = index
            this.able = false
            bus.$emit('test', index)
        })
    }
})