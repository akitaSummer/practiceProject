export const flattenArr = (arr) => {
  return arr.reduce((prev, item) => {
    prev[item.id] = item
    return prev
  }, {})
}

export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}

export const getParentNode = (node, parentClassName) => {
  let current = node
  while (current !== null) {
    if (current.parentNode.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentNode
  }
  return false
}
