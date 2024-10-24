// export default function Button(payload = {}) {
//   const { className = '', slot = '', onClick = () => {} } = payload
//   const el = document.createElement('button')
//   el.className = `btn ${className}`

//   el.innerHTML = slot

//   el.addEventListener('click', onClick)

//   return el
// }

export default class Button extends Component {
  constructor() {
    super({
      ...payload,
      tagName: 'button'
    })
    this.el.innerHTML = `열기(${this.props.count})`
    this.el.add
    console.log(this.el)
  }
}

const button = new Button({
  props: {
    count: 1
  }
})

document.body.append(button.el)
