Vue.component('input-number', {
    template: `
        <div class='input-number'>
            <input type='text' :value='currentValue' @keydown='handleKey' @change='handleChange'/>
            <button @click='handleDown' :disabled='currentValue <= min'>-</button>
            <button @click='handleUp' :disabled='currentValue >= max'>+</button>
            <input type='text' v-model.number='number' :style='{width: 20 + "px"}' />
        </div>
    `,
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentValue: this.value,
            number: 0,
        }
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value(val) {
            this.updateValue(val)
        }
    },
    methods: {
        updateValue(val) {
            if (val > this.max) {
                val = this.max
            } else if (val < this.min) {
                val = this.min
            }
            this.currentValue = val
        },
        handleChange(event) {
            let val = event.target.value.trim()
            const { min, max } = this
            if (isValueNumber(val)) {
                val = Number(val)
                this.currentValue = val
                if (val > this.max) {
                    this.currentValue = this.max
                } else if (val < this.min) {
                    this.currentValue = this.min
                } else {
                    event.target.value = this.currentValue
                }
            }
        },
        handleDown() {
            this.currentValue -= this.number
            if (this.currentValue <= this.min) this.currentValue = this.min
        },
        handleUp() {
            this.currentValue += this.number
            if (this.currentValue >= this.max) this.currentValue = this.max
        },
        handleKey(event) {
            if (event.keyCode === 38) {
                event.preventDefault()
                this.handleUp()
            } else if (event.keyCode === 40) {
                event.preventDefault()
                this.handleDown()
            }
        }
    },
    mounted() {
        this.updateValue(this.value)
    },
})

function isValueNumber(value) {
    return ((/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value) + '')
}