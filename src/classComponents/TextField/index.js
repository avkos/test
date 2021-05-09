import React, { PureComponent } from 'react'
import './style.css'

class TextField extends PureComponent {
  handleChangeInput = (e) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }

  render() {
    return (
      <input
        {...this.props}
        className="TextInput"
        type="text"
        onChange={this.handleChangeInput}
      />
    )
  }
}
export default TextField
