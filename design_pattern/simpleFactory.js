class Basketball {
    constructor() {
        this.intro = '篮球盛行于美国'
    }

    getMember() {
        console.log('每个队伍需要5名队员')
    }

    getBallSize() {
        console.log('篮球很大')
    }
}

class Football {
    constructor() {
        this.intro = '足球在世界范围内很流行'
    }

    getMember() {
        console.log('每个队伍需要11名队员')
    }

    getBallSize() {
        console.log('足球很大')
    }
}

class Tennis {
    constructor() {
        this.intro = '每年有很多网球系列赛'
    }

    getMember() {
        console.log('每个队伍需要1名队员')
    }

    getBallSize() {
        console.log('网球很小')
    }
}

const SportsFactory = (name) => {
    switch (name) {
        case 'NBA':
            return new Basketball()
        case 'wordCup':
            return new Football()
        case 'FrenchOpen':
            return new Tennis()
    }
}