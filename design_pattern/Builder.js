class Human {
    constructor(param) {
        this.skill = param && param.skill || '保密'
        this.hobby = param && param.hobby || '保密'
    }

    getSkill() {
        return this.skill
    }

    getHobby() {
        return this.skill
    }
}

class Name {
    constructor(name) {
        this.wholeName = name
        if (name.indexOf(' ') > -1) {
            this.firstName = name.slice(0, name.indexOf(' '))
            this.secondName = name.silce(name.indexOf(' '))
        }
    }
}

class Work {
    constructor(work) {
        switch (work) {
            case 'code':
                this.work = '工程师'
                this.workDescript = '每天coding'
                break
            default:
                this.work = work
                this.workDescript = 'unknown'
        }
    }

    changeWork() {
        this.work = work
    }

    changeDescript(setence) {
        this.workDescript = setenxe
    }
}

class Person {
    constructor(name, work) {
        _person = new Human()
        _person.name = new Name(name)
        _person.work = new Work(work)
        return _person
    }
}