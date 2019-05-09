import React, { useState } from 'react'
import Epic from './Epic'
import { Provider } from '../Context'
import { ContextInterface } from '../interfaces'
import Ikon from './Ikon'
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

  const context: ContextInterface = {
    pass,
    setPass,
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Provider value={context}>
        {pass === 'epic' ? <Epic /> : <Ikon />}
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
