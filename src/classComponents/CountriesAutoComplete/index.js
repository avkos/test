import React, { PureComponent } from 'react'
import AutoComplete from '../AutoComplete'
import api from '../../services/api'

class CountriesAutoComplete extends PureComponent {
  render() {
    return (
      <AutoComplete
        loadData={api.getData}
        placeholder="Countries"
        onSelect={() => {}}
        idName="alpha3"
        labelName="name"
      />
    )
  }
}

export default CountriesAutoComplete
