Vue.component('tabs', {
    name: 'tabs',
    template: `
    <div class="tabs">
    <div class="tabs-bar">
      <div
        :class="tabCls(item)"
        v-for="(item, index) in navList"
        @click="handleChange(index)"
      >
        {{item.label}}
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
    `,
    props: {
        value: {
            type: [String, Number]
        }
    },
    data() {
        return {
            navList: [],
            currentValue: this.value
        }
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name == this.currentValue
                }
            ]
        },
        handleChange(index) {
            const nav = this.navList[index]
            const name = nav.name
            this.currentValue = name
            this.updateStatus()
            this.$emit('input', name)
            this.$emit('on-click', name)
        },
        getTabs() {
            return this.$children.filter((item) => {
                return item.$options.name === 'pane'
            })
        },
        updateNav() {
            this.navList = []
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                })
                if (!pane.name) {
                    pane.name = index
                }
                if (index === 0) {
                    if (!this.currentValue) {
                        this.currentValue = pane.name || index
                    }
                }
            })
            console.log(this.currentValue)
            this.updateStatus()
        },
        updateStatus() {
            this.getTabs().forEach((tab) => {
                return tab.show = tab.name == this.currentValue
            })
        }
    },
    // watch: {
    //     value(val) {
    //         this.currentValue = val
    //     },
    //     currentValue() {
    //         this.updateStatus()
    //     }
    // }
})