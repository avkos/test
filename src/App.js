import './App.css'
import HookCountriesAutoComplete from './hooksComponents/CountriesAutoComplete'
import ClassCountriesAutoComplete from './classComponents/CountriesAutoComplete'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Class Component</h3>
        <ClassCountriesAutoComplete/>
        </div>
        <div>
          <h3>Hooks</h3>
        <HookCountriesAutoComplete/>
        </div>
      </header>
    </div>
  )
}

export default App
