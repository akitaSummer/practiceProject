export const findTestWrapper = (wrapper, tag) => {
  return wrapper.findAll(`[data-testid='${tag}']`)
}
