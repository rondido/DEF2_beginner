class Xyz {
  constructor() {
    this.b = 456
  }
  xyz() {
    console.log()
  }
}

class Abc extends Xyz {
  constructor() {
    super('') //상위
    this.a = 123
  }
}

const instance = new Abc()
arr.xyz()
console.log(instance.b) //456
