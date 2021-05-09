import React, { PureComponent } from 'react'
import waiting from '../../icons/waiting.svg'
import './style.css'

class Loading extends PureComponent {
  render() {
    return (
      <img src={waiting} alt="Loading" className="Loading"/>
    )
  }
}

export default Loading
