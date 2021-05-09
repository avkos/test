import React, { useCallback } from 'react'
import './style.css'

const TextField = (props) => {
  const { onChange, ...other } = props

  const onChangeInput = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <input
      className="TextInput"
      type="text"
      onChange={onChangeInput}
      {...other}
    />
  )
}

export default TextField
