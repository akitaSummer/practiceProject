function addSeparator(str) {
    str += ''
    const arr = str.split('.')
    const reg = /(\d+)(\d{3})/
    let int = arr[0]
    while (reg.test(int)) {
        int = int.replace(reg, '$1' + ',' + "$2")
    }
    int = arr.length > 0 ? int + '.' + arr[1] : int
    return int
}

console.log(addSeparator(1341132515.3433))