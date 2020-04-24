export const findTestWrapper = (wrapper, data) => {
  return wrapper.find(`[data-testid='${data}']`)
}
