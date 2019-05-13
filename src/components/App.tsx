import React, { useState } from 'react'
import Header from './Header'
import Epic from './Epic'
import Ikon from './Ikon'
import { Provider } from '../Context'
import { ContextInterface } from '../interfaces'
import {
  MuiThemeProvider,
  createMuiTheme,
  createStyles,
} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#8b85ff', light: '#85f3ff', dark: '#85ff91' },
  },
  typography: {
    useNextVariants: true,
  },
})

const App = () => {
  const [pass, setPass] = useState<string>('epic')
  const [sortBy, setSortBy] = useState<string>('snowfall')
  const sortList =
    pass === 'epic' ? ['snowfall', 'temperature', 'name'] : ['snowfall', 'name']

  const context: ContextInterface = {
    pass,
    setPass,
    sortList,
    sortBy,
    setSortBy,
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Provider value={context}>
        <Header />
        {pass === 'epic' ? <Epic /> : <Ikon />}
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
