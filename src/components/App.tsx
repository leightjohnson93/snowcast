import React, { useState } from 'react'
import Epic from './Epic'
import { Provider } from '../Context'
import { ContextInterface } from '../interfaces'
import Ikon from './Ikon'

const App = () => {
  const [pass, setPass] = useState<string>('epic')

  const context: ContextInterface = {
    pass,
    setPass,
  }

  return (
    <Provider value={context}>{pass === 'epic' ? <Epic /> : <Ikon />}</Provider>
  )
}

export default App
