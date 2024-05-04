import { useState, createContext } from 'react'
import './App.scss'

import Welcome from './components/Welcom'
import PlayArea from './components/PlayArea'

export const UserData = createContext()



function App() {

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))

  const saveData = () => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const loadData = () => {
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }

  return (
    <UserData.Provider value={[userData, setUserData, saveData, loadData]}>
      {userData ? <PlayArea /> : <Welcome />}
    </UserData.Provider>
  )
}

export default App
