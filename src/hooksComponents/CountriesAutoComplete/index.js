import React from 'react'
import AutoComplete from '../AutoComplete'
import api from '../../services/api'

const CountriesAutoComplete = (props) => {

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

export default CountriesAutoComplete
