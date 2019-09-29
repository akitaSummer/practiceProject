Vue.component('Com', {
    name: 'Com',
    template: `<div class="component">
    <div><p>{{question}}</p></div>
    <div v-if="questions[index].type === 'radio'">
      <ul>
        <li v-for="(answer, i) in questions[index].answer" :key="i">
          <input type="radio" :name="this.index" v-model="submit[index]" :value="answer">{{answer}}
        </li>
      </ul>
    </div>
    <div v-if="questions[index].type === 'checkbox'">
      <ul>
        <li v-for="(answer, i) in questions[index].answer" :key="i">
          <input type="checkbox" :name="this.index" v-model="submit[index]" :value="answer">{{answer}}
        </li>
      </ul>
    </div>
    <div v-if="questions[index].type === 'textarea'">
    <textarea name="textarea" rows="10" cols="30" :placeholder="questions[index].require" v-model='submit[index]'></textarea>
    </div>

  </div>`,
    props: {
        questions: {
            type: Array,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
    },
    data() {
        let arr = []
        this.questions.forEach((item, i) => {
            if (item.type === 'checkbox') {
                arr[i] = []
            } else {
                arr[i] = ''
            }
        })
        return {
            submit: arr
        }
    },
    computed: {
        question() {
            return `${this.index+1}. ${this.questions[this.index].question}`
        }
    },
    watch: {
        submit() {
            if (this.questions[this.index].type === 'radio') {
                if (this.submit[this.index].length > 0) {
                    bus.$emit('able', true)
                } else {
                    bus.$emit('able', false)
                }
            } else if (this.questions[this.index].type === 'checkbox') {
                if (this.submit[this.index].length > 1 && this.submit[this.index].length < 4) {
                    bus.$emit('able', true)
                } else {
                    bus.$emit('able', false)
                }
            } else if (this.questions[this.index].type === 'textarea') {
                if (this.submit[this.index].length > 99) {
                    bus.$emit('able', true)
                } else {
                    bus.$emit('able', false)
                }
            }
            // setTimeout(() => {
            //     // this.submit.forEach(item => {
            //     //     if (Array.isArray(item) && item.length > 3) {
            //     //         item.splice(0, 1)
            //     //     }
            //     // })
            //     if (this.questions[this.index].type === 'radio') {
            //         if (this.submit[this.index].length > 0) {
            //             bus.$emit('able', true)
            //         } else {
            //             bus.$emit('able', false)
            //         }
            //     } else if (this.questions[this.index].type === 'checkbox') {
            //         if (this.submit[this.index].length > 1 && this.submit[this.index].length < 4) {
            //             bus.$emit('able', true)
            //         } else {
            //             bus.$emit('able', false)
            //         }
            //     } else if (this.questions[this.index].type === 'textarea') {
            //         if (this.submit[this.index].length > 99) {
            //             bus.$emit('able', true)
            //         } else {
            //             bus.$emit('able', false)
            //         }
            //     }
            // }, 1)
        }
    },
    mounted() {
        bus.$emit('content', this.submit)
        bus.$on('reset', () => {
            let arr = []
            this.questions.forEach((item, i) => {
                if (item.type === 'checkbox') {
                    arr[i] = []
                } else {
                    arr[i] = ''
                }
            })
            this.submit = arr
        })
        bus.$on('submit', () => {
            console.log(this.submit)
        })
        bus.$on('test', (index) => {
            if (this.questions[index].type === 'radio') {
                if (this.submit[index].length > 0) {
                    bus.$emit('able', true)
                } else {
                    bus.$emit('able', false)
                }
            } else if (this.questions[index].type === 'checkbox') {
                if (this.submit[index].length > 1 && this.submit[index].length < 4) {
                    bus.$emit('able', true)
                } else {
                    bus.$emit('able', false)
                }
            } else if (this.questions[index].type === 'textarea') {
                if (this.submit[index].length > 99) {
                    bus.$emit('able', true)
                } else {
                    bus.$emit('able', false)
                }
            }
        })
    },
})