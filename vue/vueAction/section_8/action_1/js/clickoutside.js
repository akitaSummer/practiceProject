Vue.directive('clickoutside', {
    bind(el, binding, vnode) {
        el.__vueClickOutSide__ = (e) => {
            if (el.contains(e.target)) return false
            if (binding.expression) {
                binding.value()
            }
        }
        el.__vueKeyDown__ = (e) => {
            if (e.code === 'Escape') {
                binding.value()
            }
        }
        document.addEventListener('click', el.__vueClickOutSide__)
            // document.addEventListener('keydown', el.__vueKeyDown__)
    },
    unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSide__)
            // document.removeEventListener('keydown', el.__vueKeyDown__)
        delete el.__vueClickOutSide__
            // delete el.__vueKeyDown__
    }
})