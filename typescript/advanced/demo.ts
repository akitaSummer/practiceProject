class Demo {
    private static instantce: Demo
    private constructor(public name: string) {}

    static getInstance() {
        if (!this.instantce) {
            this.instantce = new Demo('dell lee')
        }
        return this.instantce
    }
}