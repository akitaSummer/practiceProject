Vue.component('mybutton', {
    name: 'mybutton',
    template: `<button class="mybottom" :style="{background: color}" :class="{notAble: able}" :disabled='able'>
    <slot></slot>
  </button>`,
    props: {
        color: {
            type: String,
            required: true
        },
        able: {
            type: Boolean,
        }
    }
})