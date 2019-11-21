function testAjax() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/', true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {}
        }
    }
    xhr.send()
}