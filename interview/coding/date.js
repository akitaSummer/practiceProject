function formatDate(date) {
    const dt = date || new Date()
    const year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString()
    let day = dt.getDate().toString()
    month = month.length === 1 ? 0 + month : month
    day = day.length === 1 ? 0 + day : day
    return year + '-' + month + '-' + day
}