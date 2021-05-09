import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextField from '../TextField'
import Item from './components/Item'
import Loading from '../Loading'
import debounce from '../../utils/debounce'
import closeIcon from '../../icons/close.svg'
import './style.css'

const AutoComplete = (props) => {
  const {
    loadData,
    idName = 'id',
    labelName = 'name',
    placeholder = '',
  } = props

  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [selected, onSelect] = useState(null)

  const handleChangeInput = useCallback((inputValue) => {
    setInputValue(inputValue.replace(new RegExp('[^a-zA-Z0-9]'), ''))
  }, [setInputValue])

  const handleClear = useCallback(() => {
    onSelect(null)
    setInputValue('')
  }, [onSelect, setInputValue])

  const handleSelect = useCallback((d) => {
    onSelect(d)
    setInputValue(d[labelName])
    setOpenPopup(false)
  }, [onSelect, labelName, setOpenPopup, setInputValue])

  const onOpenPopup = useCallback((e) => {
    // open popup and stop event propagation to prevent trigger background click event
    e.preventDefault()
    e.stopPropagation()
    document.body.click()
    setOpenPopup(true)
  }, [setOpenPopup])

  // load data from "server"
  const onLoadData = useMemo(
    () =>
      debounce(({ search = '', limit = 20 }) => {
        if (typeof loadData === 'function') {
          setLoading(true)
          loadData({
            search,
            limit,
            order: ['id'],
          })
            .then((res) => {
              setResults(res)

            })
            .finally(() => setLoading(false))
        }
      }, 300),
    [setLoading, loadData],
  )
  useEffect(() => {
    const onBodyClick = () => {
      setOpenPopup(false)
      if (!selected) {
        setInputValue('')
      } else {
        setInputValue(selected[labelName])
      }
      setOpenPopup(false)
    }
    // close popup on click on background
    document.body.addEventListener('click', onBodyClick, false)
    return () => {
      // remove background click listener
      document.body.removeEventListener('click', onBodyClick, false)
    }
  }, [setOpenPopup, setInputValue, selected, labelName])

  useEffect(() => {
    onLoadData({ search: inputValue })
  }, [onLoadData, selected, inputValue])

  return (
    <div className="Autocomplete-container">
      <TextField
        onChange={handleChangeInput}
        value={inputValue}
        placeholder={placeholder}
        onClick={onOpenPopup}
      />

      {(selected || inputValue) && !loading && (
        <button type="button" className="Autocomplete-close" onClick={handleClear}>
          <img src={closeIcon} alt="Clear"/>
        </button>
      )}

      {loading && (
        <div className="Autocomplete-loading">
          <Loading/>
        </div>
      )}
      {openPopup && (
        <div className="Autocomplete-popup">
          {results.length > 0 ? results.map((item) => (
            <Item
              key={item[idName]}
              item={item}
              labelName={labelName}
              search={inputValue}
              onSelect={handleSelect}
            />
          )) : (
            <div className="Autocomplete-no-results">
              <div className="Autocomplete-no-results-title">No results</div>
              <div>Please use text field to search</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AutoComplete
