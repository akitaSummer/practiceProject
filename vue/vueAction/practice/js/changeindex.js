const bus = new Vue()


Vue.directive('onclick', {
    bind: function(el, binding, vnode) {
        function changeindex(index, type) {
            if (type === 'last') {
                bus.$emit('index', --index)
                bus.$emit('able', true)
            } else if (type === 'next') {
                if (index === 2) {
                    bus.$emit('submit', true)
                } else {
                    bus.$emit('index', ++index)
                }
            } else if (type === 'reset') {
                bus.$emit('index', 0)
                bus.$emit('reset', 0)
            }
        }
        el.addEventListener('click', () => changeindex(binding.value, binding.arg))
    }
})