const app = new Vue({
    el: '#app',
    data() {
        return {
            hobby: []
        }
    },
    watch: {
        hobby() {
            console.log(this.hobby)
        }
    }
})