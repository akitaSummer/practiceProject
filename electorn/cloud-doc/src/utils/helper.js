export const flattenArr = (arr) => {
  return arr.reduce((prev, item) => {
    prev[item.id] = item
    return prev
  }, {})
}

export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}
