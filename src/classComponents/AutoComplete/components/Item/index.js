import React, { PureComponent } from 'react'

class Item extends PureComponent {
  state = {
    textArr: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { search, item, labelName } = props
    if (!search) {
      state.textArr = [item[labelName]]
      return state
    }
    let arr = (item[labelName]).split(new RegExp(search, 'gi'))
    let res = []
    let pos = 0
    arr.forEach((s, index) => {
      res.push(s)
      pos += s.length
      if (index <= arr.length - 2) {
        res.push(item[labelName].substr(pos, search.length))
      }
    })
    state.textArr = res
    return state
  }

  onClick = (e) => {
    const { onSelect, item } = this.props
    onSelect(item)
  }

  render() {
    const { search } = this.props
    const { textArr } = this.state
    return (
      <div className="Autocomplete-item" onClick={this.onClick}>
        {textArr.map((s, index) => (
          <span
            key={index}
            className={s.toLowerCase() === search.toLowerCase() ? 'Autocomplete-item-text-select' : ''}
          >{s}</span>
        ))}
      </div>
    )
  }
}

export default Item
