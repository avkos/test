import React, { PureComponent } from 'react'
import TextField from '../TextField'
import Item from './components/Item'
import Loading from '../Loading'
import debounce from '../../utils/debounce'
import closeIcon from '../../icons/close.svg'
import './style.css'

class AutoComplete extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      results: [],
      loading: false,
      openPopup: false,
      selected: null,
    }

    this.onLoadData = debounce(this.load.bind(this), 300)

  }

  componentWillUnmount() {
    // remove background click listener
    document.body.removeEventListener('click', this.bodyEvent)
  }

  componentDidMount() {
    // close popup on click on background
    document.body.addEventListener('click', this.bodyEvent)
    this.onLoadData()
  }

  bodyEvent = (e) => {
    const { selected } = this.state
    this.setState({ openPopup: false })
    if (!selected) {
      this.setInputValue('')
    } else {
      const { labelName } = this.props
      this.setInputValue(selected[labelName])
    }
  }

  load({ search = '', limit = 20 } = {}) {
    const { loadData } = this.props
    if (typeof loadData === 'function') {
      this.setState({ loading: true })
      loadData({
        search,
        limit,
        order: ['id'],
      })
        .then((results) => this.setState({ results }))
        .finally(() => this.setState({ loading: false }))
    }
  }

  handleClear = () => {
    this.setState({ selected: null, inputValue: '' })
  }
  handleSelect = selected => {
    const { labelName } = this.props
    this.setState({ selected, inputValue: selected[labelName], openPopup: false })
  }
  onOpenPopup = e => {
    // open popup and stop event propagation to prevent trigger background click event
    document.body.click()
    e.preventDefault()
    e.stopPropagation()
    this.setState({ openPopup: true })
  }
  setInputValue = (inputValue = '') => {
    this.setState({ inputValue: inputValue.replace(new RegExp('[^a-zA-Z0-9]'), '') })
    this.onLoadData({ search: inputValue })
  }

  render() {
    const { labelName, placeholder, idName } = this.props
    const { selected, inputValue, loading, openPopup, results } = this.state
    return (
      <div className="Autocomplete-container">
        <TextField
          onChange={this.setInputValue}
          value={inputValue}
          placeholder={placeholder}
          onClick={this.onOpenPopup}
        />

        {(selected || inputValue) && !loading && (
          <button type="button" className="Autocomplete-close" onClick={this.handleClear}>
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
            {results.length > 0 ? results.map((item, index) => (
              <Item
                key={`${index}${item[idName]}`}
                item={item}
                labelName={labelName}
                search={inputValue}
                onSelect={this.handleSelect}
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
}

export default AutoComplete
