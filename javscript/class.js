// Array.prototype.abc = function () {
//   console.log(this)
// }

// const arr1 = new Array(1, 2, 3)
// const arr2 = [4, 5, 6]

// arr1.abc()
// arr2.abc()

// function Abc() {
//   this.a = 123
// }

// Abc.prototype.abc = function () {
//   console.log(this.a)
// }

// const arr = new Abc()

// arr.abc()

class Abc {
  constructor() {
    this.a = 123
  }
  xyz() {
    console.log(this.a)
  }
}

const arr = new Abc()
arr.xyz()

// 리터럴 기호로 표현하는 값
//생성자: 함수 호출로 만드는 데이터
