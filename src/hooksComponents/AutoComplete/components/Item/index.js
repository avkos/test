import React, { useCallback, useMemo } from 'react'

const Item = (props) => {
  const { item, labelName, search = '', onSelect } = props

  const textArr = useMemo(() => {
    if (!search) {
      return [item[labelName]]
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
    return res
  }, [item, labelName, search])
  const onClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    onSelect(item)
  }, [onSelect, item])

  return (
    <div className="Autocomplete-item" onClick={onClick}>
      {textArr.map((s, index) => (
        <span key={index}
              className={s.toLowerCase() === search.toLowerCase() ? 'Autocomplete-item-text-select' : ''}>{s}</span>
      ))}
    </div>
  )
}

export default Item
