import {
  defineComponent,
  provide,
  PropType,
  VNodeTypes,
  computed,
  inject,
} from '@vue/runtime-core'

export const contextKey = '__MDX__PROVIDE_KEY__'

export const MDXProvider = defineComponent({
  name: 'MDXProvider',
  props: {
    components: {
      type: Object as PropType<Record<string, VNodeTypes>>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const componentsRef = computed(() => props.components)

    provide(contextKey, componentsRef)

    return () => slots.default && slots.default()
  },
})

const defaultComponentsRef = computed(() => ({}))

export const useMDXComponents = (
  getPropsComponents: () => Record<string, VNodeTypes>
) => {
  const providedComponentsRef = inject(contextKey, defaultComponentsRef)

  const mergedComponentsRef = computed(() => ({
    ...providedComponentsRef,
    ...getPropsComponents(),
  }))

  return mergedComponentsRef
}
