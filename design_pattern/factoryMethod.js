class ButtonFactory {
    constructor(name) {
        return this.ElementButton(name)
    }

    ElementButton(name) {
        const button = document.createElement('button')
        button.setAttribute('type', name)
        return button
    }
}

class LanguageFactory {
    constructor(type, content) {
        return new this.language[type](content)
    }

    language = {
        Java: function(content) {
            (function(content) {
                const div = document.createElement('div')
                div.innerHTML = content
                div.style.border = '1px solid red'
                document.getElementById('container').appendChild(div)
            })(content)
        },
        UI: function(content) {
            this.content = content
        }
    }
}

const ui = new LanguageFactory('UI', 'UI1234')

console.log(ui instanceof LanguageFactory)