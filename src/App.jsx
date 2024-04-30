import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import UserDetails from './components/UserDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
      <UserDetails/>
    </Provider>
      
    </>
  )
}

export default App
